
data "openfga_authorization_model_document" "user_policy" {
  dsl = <<EOT
model
  schema 1.1
type user
type document
  relations
    define owner: [user]
    define viewer: [user]
  EOT
}

resource "openfga_authorization_model" "user_doc_model" {
  store_id = var.fga_store_id
  model_json = data.openfga_authorization_model_document.user_policy.result
}

resource "openfga_relationship_tuple" "john_can_view_doc_tuple" {

  authorization_model_id = openfga_authorization_model.user_doc_model.id
  object   = "document:public-doc"
  relation = "viewer"
  store_id = var.fga_store_id
  user     = "user:john.doe@test.com"
}
