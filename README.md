### Running the project

Prerequisites

- Docker & Docker compose installed
- pnpm installed
- NodeJS > 20.14 installed
- Preferably, the host machine is running on GNU/Linux or Windows with WSL2.

Instructions

- Copy the contents of `.env.example` to `.env` file and fill out the appropriate information or you can get the contents from the previously sent email.
- run `docker compose up -d`
- run `pnpm install`
- run `pnpm start:dev`

App Instructions

- On initial startup the app will load all of the seed data for appropriate tables.
- On system startup, the system will run all of the database migrations.
- The system will not create an initial user.
- User can register as a user from the Frontend.
