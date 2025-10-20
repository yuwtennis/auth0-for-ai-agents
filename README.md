# auth0-for-ai-agents

Notes

This prototype is intended for implementing the [prompt](https://dev.to/devteam/join-the-auth0-for-ai-agents-challenge-3000-in-prizes-11gi).  


## Point of View statement

Bob works at IT team at EMarket , an online e-commerce company .  
The company wants to provide chat services to their employee to boost productivity.  
The team wants to first launch the service to LIMIED team as prototype and gather information with usability testing.


## Requirements

- The RAG will be generated using the test data which the IT team manages. That is ,
    - IT team manages vecstor store , test_it_rag_vs
- The user of chat service will be authenticated at first access.


## Pre-requisite

- M2M Credential for bootstrapping with terraform. See doc([link](https://registry.terraform.io/providers/auth0/auth0/latest/docs/guides/quickstart)). 
- Optional [asdf](https://asdf-vm.com/) >= `0.18.0`

## How to's

### Setup Auth0

Set environment variables for Auth0.
Check the official doc([link](https://registry.terraform.io/providers/auth0/auth0/latest/docs) for more info.

```shell
export AUTH0_DOMAIN=***********
export AUTH0_CLIENT_ID=***********
export AUTH0_CLIENT_SECRET=***********
```

Set environment variables for openfga.  
Check the official github([link](https://github.com/openfga/terraform-provider-openfga?tab=readme-ov-file#environment-variables) for more info.

```shell
# Step 01. Install the CLI
# Install the CLI by following the steps at https://docs.fga.dev/integration/install-sdk

# Step 02. Set the relevant environment variables
export FGA_API_URL='https://api.us1.fga.dev'
export FGA_STORE_ID='01K7V7BAZAP73K8G0ZCDG0QDCX'
# export FGA_MODEL_ID='YOUR_MODEL_ID' # Optionally, you can specify a model id to target, which can improve latency
export FGA_API_TOKEN_ISSUER='auth.fga.dev'
export FGA_API_AUDIENCE='https://api.us1.fga.dev/'
export FGA_CLIENT_ID='DktZjSm8vGeu3SLyczlvmG6lKfehiJrY'
export FGA_CLIENT_SECRET='usDU-ZfhCcYUAPcD8ZThBW30T7U7hVKUg8m_Mly1lbFjBUjqBv2HkyVSTFUgZtXr'

# Step 03. Interact with the store
fga model get
```

## Generate Terraform for auth0

Single tenant is only available for _free_ version .  
The codebase in this repository is generated from my default tenant using the [online guide](https://registry.terraform.io/providers/auth0/auth0/latest/docs/guides/generate_terraform_config).

Please REPLACE with your own definition when you are cloning this repository.