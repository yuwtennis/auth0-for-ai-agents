resource "auth0_client" "ai_agent" {

  name = "ai_agent"
  app_type = "regular_web"
  callbacks = [
    "http://localhost:3000/callback"
  ]
  allowed_logout_urls = [
    "http://localhost:3000"
  ]

  jwt_configuration {
    lifetime_in_seconds = 300
    secret_encoded      = true
    alg                 = "RS256"
  }
}

resource "auth0_client_credentials" "ai_agent_cred" {
  client_id = auth0_client.ai_agent.id
  authentication_method = "client_secret_basic"
}

resource "auth0_connection_client" "ai_agent_auth_connection" {

  client_id     = auth0_client.ai_agent.id
  connection_id = auth0_connection.username_password_authentication.id
}