terraform {
  required_version = "~>1.13.0"
  required_providers {
    auth0 = {
      source = "auth0/auth0"
      version = "~>1.32.0"
    }
    openfga = {
      source  = "openfga/openfga"
      version = ">=0.4.0"
    }
  }
}

provider "auth0" {
  debug = true
}

provider "openfga" {}