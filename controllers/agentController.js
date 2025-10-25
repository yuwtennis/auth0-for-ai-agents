require('dotenv').config();
const {OpenAIEmbeddings} =  require("@langchain/openai");
const {MemoryVectorStore} = require("langchain/vectorstores/memory");
const  {FGARetriever} = require("@auth0/ai-langchain/RAG");
const {readDocuments, RetrievalAgent} = require("../helpers/retrieval_agent");
const {app_config} = require("../env");

const HEADLINE = "..:: LangGraph Agents Example: Agentic Retrieval with Auth0 FGA";
const QUESTION = "Describe what Zeko is in less than 50 words.";
const UNAUTHORIZED_ERR_MSG = "You are unauthorized to make a agent call. Please contact administrator to fix the problem.";

exports.agent_call_get = async (req, res) => {
    const user = req.oidc.user.email;

    // 1. Read and load documents from the assets folder
    const documents = await readDocuments();

    // 2. Create an in-memory vector store from the documents for OpenAI models.
    const vectorStore = await MemoryVectorStore.fromDocuments(
        documents,
        new OpenAIEmbeddings({
            model: app_config.openaiEmbeddingsModel,
            maxRetries: 1})  // Safeguard for limit rate
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

    const retrievalAgent = RetrievalAgent.create(
        [fgaTool],
        );
    // 6. Query the retrieval agent with a prompt
    const messages = await retrievalAgent.query(QUESTION);

    if(messages.at(2).content.length === 0
        && messages.at(-1).invalid_tool_calls.length === 0) {

        res.render('agent', {
            headline: HEADLINE,
            question: QUESTION,
            answer: UNAUTHORIZED_ERR_MSG,
        });
    } else {
        res.render('agent', {
            headline: HEADLINE,
            question: QUESTION,
            answer: messages.at(-1)?.content,
        });
    }
}