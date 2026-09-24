locals {
  default_user_database_name = "Username-Password-Authentication"
  iac_client_id = "Yhsl5sxVI6RKgMKk0fQb2joO33C2fJAM"
  default_client_id = "T9mFTfF15bLXSk1hVXg6262t2XymVPwK"
}

data "auth0_connection" "default_user_database" {
  name = local.default_user_database_name
}

resource "auth0_connection_clients" "enabled_clients" {
  connection_id = data.auth0_connection.default_user_database.id
  enabled_clients = [
    local.iac_client_id,
    local.default_client_id,
    auth0_client.ai_agent.id
  ]
}