require('dotenv').config();
const {OpenAIEmbeddings} =  require("@langchain/openai");
const {MemoryVectorStore} = require("langchain/vectorstores/memory");
const  {FGARetriever} = require("@auth0/ai-langchain/RAG");
const {readDocuments, RetrievalAgent} = require("../helpers/retrieval_agent");
const {app_config} = require("../env");

exports.agent_call_get = async (req, res) => {

    const question = "Show me forecast for ZEKO?";
    const user = req.oidc.user.sub;
    // 1. Read and load documents from the assets folder
    const documents = await readDocuments();
    // 2. Create an in-memory vector store from the documents for OpenAI models.
    const vectorStore = await MemoryVectorStore.fromDocuments(
        documents,
        new OpenAIEmbeddings({
            model: app_config.openaiEmbeddingsModel,
            maxRetries: 1})
    );
    // 3. Create a retriever that uses FGA to gate fetching documents on permissions.
    const retriever = FGARetriever.create({
        retriever: vectorStore.asRetriever(),
        // FGA tuple to query for the user's permissions
        buildQuery: (doc) => ({
            user: `user:${user}`,
            object: `document:${doc.metadata.id}`,
            relation: "viewer",
        }),
    });
    // 4. Convert the retriever into a tool for an agent.
    const fgaTool = retriever.asJoinedStringTool();
    // 5. The agent will call the tool, rephrasing the original question and
    // populating the "query" argument, until it can answer the user's question.
    const retrievalAgent = RetrievalAgent.create([fgaTool]);
    // 6. Query the retrieval agent with a prompt
    const answer = await retrievalAgent.query(question);

    res.render('agent', {
        headline: "..:: LangGraph Agents Example: Agentic Retrieval with Auth0 FGA",
        question: "Show me forecast for ZEKO?",
        answer: answer
    });
}