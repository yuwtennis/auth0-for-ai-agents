# auth0-for-ai-agents

This prototype is intended for the [Auth0 for AI agents challenge](https://dev.to/devteam/join-the-auth0-for-ai-agents-challenge-3000-in-prizes-11gi) from the DEV community.

## Pre-requisite

- [M2M Credential for bootstrapping with terraform](https://registry.terraform.io/providers/auth0/auth0/latest/docs/guides/quickstart)
- [Auth0 FGA account setup](https://dashboard.fga.dev/customers/01K7V7BA2YG20WKAZB3JYKN585)
- [OpenAPI platform API](https://platform.openai.com/docs/libraries#create-and-export-an-api-key)
- NodeJS
- Terraform client
- Optional [asdf](https://asdf-vm.com/) >= `0.18.0`

## How tos

### Setup Auth0 and Auth0 FGA account

Directory `infra/` includes sample terraform manifests created from my _Auth0_ and _Auth0 FGA_ account as a reference.  
If you are using this repository, replace with your manifest. Check docs for information to apply the code.

- [Auto-generating Terraform config files from Auth0 tenant](https://registry.terraform.io/providers/auth0/auth0/latest/docs/guides/generate_terraform_config)
- [openfga terraform getting started](https://github.com/openfga/terraform-provider-openfga?tab=readme-ov-file#getting-started)

This is a reference. So do not apply to your environment !

### Launch nodejs

Install packages

```shell
npm i
```
For dev

```shell
npm run dev
```

For otheruse
```shell
npm run start
```

### Login and logout

Below is example for accessing dev environment.

Login

```shell
http://localhost:3000/login
```

Logout
```shell
http://localhost:3000/logout
```

Agent call
```shell
http://localhost:3000/agent/call
```

## References

- [Quickstart with Express js](https://auth0.com/docs/quickstart/webapp/express/01-login)
- [Authorization for RAG](https://auth0.com/ai/docs/get-started/authorization-for-rag)
