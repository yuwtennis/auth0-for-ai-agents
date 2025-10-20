
// data "openfga_authorization_model_document" "example" {
//   dsl = <<EOT
// model
//   schema 1.1
//
// type user
//
// type document
//   relations
//     define viewer: [user]
//   EOT
// }
//
// resource "openfga_authorization_model" "example" {
//   store_id = "01K7V7BAZAP73K8G0ZCDG0QDCX"
//
//   model_json = data.openfga_authorization_model_document.example.result
// }