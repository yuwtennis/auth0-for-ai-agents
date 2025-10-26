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
    fgaApiUrl: process.env.FGA_API_URL,
    fgaApiTokenIssuer: process.env.FGA_API_TOKEN_ISSUER,
    fgaApiAudience: process.env.FGA_API_AUDIENCE,
    fgaClientId: process.env.FGA_CLIENT_ID,
    fgaClientSecret: process.env.FGA_CLIENT_SECRET,
    fgaStoreId: process.env.FGA_STORE_ID,
}

module.exports = {
    auth0_config,
    app_config
}