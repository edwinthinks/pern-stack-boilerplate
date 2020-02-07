# PERN Stack Boilerplate

This is a boilerplate for a project that aims to use React with Express, Node, and Postgres. Using this boilerplate
you should be able to easily develop & deploy a functioning React application that communicates with a API backend
written with express. You are afforded the ability to deploy this to heroku into a single dyno. Read more beneath
to get started.

#### Happy coding!
![Cat Typing Very Fast](https://media.giphy.com/media/heIX5HfWgEYlW/giphy.gif)

## Getting Started

Clone the repo
```bash
git clone https://github.com/edwinthinks/pern-stack-boilerplate.git
```

### Installation Dependencies

In the root directory, install server & client dependencies
```bash
npm run prep
```

Install foreman, nodemon, and sequelize
```bash
npm install -g foreman
npm install -g nodemon
npm install -g sequelize
```

### Setup the database

First modify `server/src/config/config.json` to match your database credentials. Primarily, you should only need to change the username, password, and database values of the development and test keys. More information on production in the [deployment to heroku section]()

```json
{
  "development": {
    "username": "YOUR_USERNAME",
    "password":  "YOUR_PASSWORD",
    "database": "YOUR_APP_DEVELOPMENT",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "operatorsAliases": false
  },
  "test": {
    "username": "YOUR_USERNAME",
    "password":  "YOUR_PASSWORD",
    "database": "YOUR_APP_TEST",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "operatorsAliases": false
  },
  "production": {
    "use_env_variable": "DATABASE_URL",
    "dialect":"postgres",
    "ssl": true
  }
}
```

Create the database, migrate, and seed with sample data.
```
cd server
npx sequelize db:create
npx sequelize db:migrate
npx sequelize db:seed:all
```

### Starting the server & client

Start the client and server in development mode
```bash
npm run develop
```

Accessing [http://localhost:3001/api/users](http://localhost:3001/api/users) should then return json
of all sample users: Jake The Human and Finn The Dog!

## Tests

You can run both client & server tests
```bash
npm run test
```

Or optionally you can run the server tests by itself
```bash
npm run server:test
```

## Linting

You can run both client & server linting
```bash
npm run lint
```

Or optionally you can run the server tests by itself
```bash
npm run server:lint
```





