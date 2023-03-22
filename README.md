# Chayneu Website

Frontend

## Software Requirements

- NodeJS: 16

## Branches

| Branch | Environment |
| :----- | ----------- |
| dev    | dev         |
| main   | prod        |

## Warnings

- Use `npm`, Avoid `yarn`, mixing both will make `package-lock.json` out of sync and create issue during automated deployment.

## How to setup

- Copy `.env.example` to `.env.local` and udpate values.
- Run `npm ci` to install the dependencies.
- Run `npm run dev` to run the server in watch mode.

### Env references

| Variable                         | Description                  |
| :------------------------------- | ---------------------------- |
| NEXT_PUBLIC_DIRECTUS_URL         | URL of direcuts server       |
| NEXT_PUBLIC_BACKEND_URL          | URL of backend server        |
| NEXT_PUBLIC_BRAINTREE_AUTH_TOKEN | Braintree token              |

## Automated Deployment

Automated deployment is done using GitHub Actions. The following variables
are needed for each environment to set up the Github Actions CI.

| Variable     | Description                              |
| :----------- | ---------------------------------------- |
| SSH_KEY      | Private SSH key to connect to the server |
| SSH_HOST     | Server IP Address or domain name         |
| SSH_PORT     | SSH port (Default 22)                    |
| SSH_USER     | Username                                 |
| PROJECT_PATH | Where project is saved on the server     |
| PM2_NAME     | Name of the service in pm2               |

### How to setup GitHub Actions for automated deployment

Set the following environment variables in the GitHub repository secrets tab.

- Go to repository settings.
- In the sidebar click `Secret and variables` and select `Actions`.
- Click on `New repository secret` button.
- Enter secret name prefixed with `DEV_` for dev and `PROD_` for prod and
add the the variable value. `SSH_KEY` will become `DEV_SSH_KEY` for dev and
`PROD_SSH_KEY` for prod.
