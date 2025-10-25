// A authorized user
resource "auth0_user" "john_doe" {
  connection_name = auth0_connection.username_password_authentication.name
  user_id = "00000"
  email = "john.doe@test.com"
  email_verified = true
  password = "john123!"
}

// A non-authorized user
resource "auth0_user" "joe_shmoe" {
  connection_name = auth0_connection.username_password_authentication.name
  user_id = "00001"
  email = "joe.shmoe@test.com"
  email_verified = true
  password = "joes123!"
}