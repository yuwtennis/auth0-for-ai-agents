terraform {
  required_version = "~>1.15.0"
  required_providers {
    auth0 = {
      source = "auth0/auth0"
      version = "~>1"
    }
    openfga = {
      source  = "openfga/openfga"
      version = "~>0"
    }
  }
}

provider "auth0" {
  debug = true
}

provider "openfga" {}