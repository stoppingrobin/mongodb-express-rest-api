# MongoDB and Express.js REST API sample application

This repository contains the sample application for the [MongoDB and Express.js REST API tutorial](https://www.mongodb.com/languages/express-mongodb-rest-api-tutorial).

## How To Run

1. Create your Atlas mongodb account, create a cluser and a collection and get your connection URL:
2. create a .env in /server

```
example
ATLAS_URI=mongodb+srv://<username>:<password>@sandbox.jadwj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
```

2. Start your Backend:

```
cd server
npm install
npm run dev
```

3. Start your Frontend

```
cd app
npm install
npm start
```