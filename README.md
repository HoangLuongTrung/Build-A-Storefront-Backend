# Storefront Backend Project

## Getting Started

This repo contains a basic Node and Express app to get you started in constructing an API. To get started, clone this repo and run `yarn` in your terminal at the project root.

## Installation Instructions:

### Packages

#### express
`npm i -S express`
`npm i -D @types/express`

#### typescript
`npm i -D typescript`

#### db-migrate
`npm install -g db-migrate`

#### rimraf
`npm install --save rimraf`

#### cors
`npm install --save cors`

#### bcrypt
`npm -i bcrypt`
`npm -i -D @types/bcrypt`

### nodemon
`npm i nodemon`

#### jsonwebtoken
`npm install jsonwebtoken`
`npm i --save-dev @types/jsonwebtoken`

#### jasmine
`npm install jasmine`

#### supertest
`npm i supertest`
`npm i --save-dev @types/supertest`

## Instructions set up the Database and connect to it
- connect to the default postgres database as the server's root user `psql -U postgres`
- Create a user `CREATE USER postgres WITH PASSWORD '!@#QWE123qwe';`
- Create database: `CREATE DATABASE storefront;`
- Create database test: `CREATE DATABASE storefronttest;`
- Connection: `\c storefront`

## Set up Database
`docker-compose up` to start the docker container
`npm install` to install all dependencies
`db-migrate up` to set up the database and get access via http://127.0.0.1:5432
`npm run build` to build the app

### ENV
PG_HOST="localhost"
PG_DB="storefront"
PG_USER=#####
PG_PASSWORD=#####
ENV="dev"
BCRYPT_PASSWORD=#####
SALT_ROUNDS="10"
TOKEN_SECRET=#####

## Start App
`npm run start`

### Running Ports 
After start up, the server will start on port `3000` and the database on port `5432`

## Testing
`npm run test`
