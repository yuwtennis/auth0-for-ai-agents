// A authorized user
resource "auth0_user" "john_doe" {
  connection_name = data.auth0_connection.default_user_database.name
  user_id = "00000"
  email = "john.doe@test.com"
  email_verified = true
  password = "john1234567890!"
}

// A non-authorized user
resource "auth0_user" "joe_shmoe" {
  connection_name = data.auth0_connection.default_user_database.name
  user_id = "00001"
  email = "joe.shmoe@test.com"
  email_verified = true
  password = "joes1234567890!"
}