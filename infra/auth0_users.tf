resource "auth0_user" "john_doe" {
  connection_name = auth0_connection.username_password_authentication.name
  user_id = "00000"
  email = "john.doe@test.com"
  email_verified = true
  password = "john123!"
}
