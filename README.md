# myRatingList-api

Project to create and rate every work you want

## How to start
- Follow the `.env.example` and create a `.env` file
- Run `yarn` to install all dependencies
- Run `docker compose up` to create containers
- Run `yarn prisma migrate dev` to migrate tables to the database
- `yarn dev` to start server
- `yarn prisma studio` to view the database

## Layers

This project have 3 main layers

- `interfaces`: To define the entities of the project
- `repositories`: To define everything that is external
- `lib`: To define the actions of the project

## Scripts

- `yarn dev`: Start server
- `yarn start:build`: Compile TS to JS
- `yarn start:prod`: Runs the compiled JS

## Features

- Absolute paths `@/`
