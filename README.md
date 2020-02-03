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

In the root directory, install server & client dependencies
```bash
npm run prep
```

Install foreman
```bash
npm install -g foreman
```

Start the client and server in development mode
```bash
npm run develop
```

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
