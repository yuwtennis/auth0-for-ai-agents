require('dotenv').config()

const auth0_config = {
    authRequired: false,
    auth0Logout: true,
    baseURL: process.env.AUTH0_BASE_URL,
    clientID: process.env.AUTH0_CLIENT_ID,
    issuerBaseURL: process.env.AUTH0_DOMAIN,
    secret: 'LONG_RANDOM_STRING',
    idpLogout: true
}

const app_config = {
    openaiAgentModel: process.env.OPENAI_AGENT_MODEL,
    openaiEmbeddingsModel: process.env.OPENAI_EMBEDDINGS_MODEL,
    openAIApiKey: process.env.OPENAI_API_KEY,
}

module.exports = {
    auth0_config,
    app_config
}