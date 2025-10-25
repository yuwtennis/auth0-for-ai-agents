const {createReactAgent} = require("@langchain/langgraph/prebuilt");
const {ChatOpenAI} = require("@langchain/openai");
const {Document} = require("@langchain/core/documents");
const {readdir, readFile} = require("node:fs/promises");
const {app_config} = require("../env");
const {HumanMessage} = require("@langchain/core/messages");

class RetrievalAgent {
    #agent;

    constructor(agent) {
        this.#agent = agent;
    }

    // Create a retrieval agent with a retriever tool and a language model
    static create(tools) {
        const llm = new ChatOpenAI({
            temperature: 0,
            model: app_config.openaiAgentModel,
            maxRetries: 1,  // Safeguard for limit rate
            cache: false
        });

        const systemMessage = [
            "Answer the user's question only based on context retrieved from provided tools.",
            "Only use the information provided by the tools.",
            "If you need more information, ask for it.",
        ].join(" ");

        // Create a retrieval agent that has access to the retrieval tool.
        const agent = createReactAgent({
            llm,
            tools,
            messageModifier: systemMessage
        });

        return new RetrievalAgent(agent);
    }

    // Query the retrieval agent with a user question
    async query(query) {
        const { messages } = await this.#agent.invoke({
            messages: [new HumanMessage(query)],
        });

        return messages;
    }
}

async function readDoc(path) {
    return await readFile(path, "utf-8");
}

/* Reads documents from the assets folder and converts them to langChain Documents */
async function readDocuments() {
    const folderPath = "./assets";
    const files = await readdir(folderPath);
    const documents = [];

    for (const file of files) {
        documents.push(
            new Document({
                pageContent: await readDoc(`${folderPath}/${file}`),
                metadata: { id: file.slice(0, file.lastIndexOf(".")) },
            })
        );
    }

    return documents;
}

module.exports = {
    RetrievalAgent,
    readDocuments
}