---
title: Hacks for effective Fullstack development with React and Node
tags:
  - javascript
  - nodejs
  - react
date: 2023-04-17 14:48:03
updated: 2023-04-17 14:48:03
---

Today I'm going to show you an optimal workflow for effective development with Node.js and React. If you've ever worked on a project with multiple package.json files, you might know the pain of juggling multiple terminal tabs, remembering which commands start which server, or handling CORS errors.

Fortunately, there are some tools available that can alleviate some of these headaches.

![Fullstack](https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Frxkee805brf1oiwr2abu.png)

## Monorepo Setup for React and Node

Let's say we're working on a [monorepo ](https://en.wikipedia.org/wiki/Monorepo) with two `package.json` files: one is in a `client` directory for a React front-end powered by [Create React App](https://create-react-app.dev/), and one is at the root of the repository for a Node back-end that exposes an API that our React app uses. Our React app runs on `localhost:3000` and our Node app runs on `localhost:8080`. Both apps are started with `npm start`

Since we have two `package.json` files, this means that in order to get our front-end and back-end up and running, we need to make sure we've run `npm install` and `npm start` in both the root directory and the client directory. Here's how we simplify this.

## 1. Running two servers at the same time

One improvement we can make to our development workflow is to add a build tool to run multiple **npm** commands at the same time to save us the trouble of running `npm start` in multiple terminal tabs. To do this, we can add an npm package called [concurrently](https://www.npmjs.com/package/concurrently) to the root of our project.

In the root of our project, we will install it as a development dependency.

```shell
npm install -D concurrently
```

Then, in our root `package.json` scripts, we will update our `start` script to use them simultaneously.

```json
{
  "name": "my-app",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "concurrently --kill-others-on-fail npm run server npm run client",
    "server": "node index.js",
    "client": "cd client && npm start"
  },
  "dependencies": {
    "express": "^4.17.1"
  },
  "devDependencies": {
    "concurrently": "^6.0.1"
  }
}
```

Now, we have three npm scripts:

- `npm run server` starts our Node application,
- `npm run client` runs `npm start` in the _client_ directory to start our React application,
- `npm start` runs `npm run server` and `npm run client` at the same time.

## 2. Installing front-end and back-end dependencies with a single command

Another aspect of our workflow that we can improve is the installation of dependencies. Currently, we need to manually run `npm install` for every `package.json` file we have when setting up the project. Instead of going through that hassle, we can add a [postinstall script](https://docs.npmjs.com/cli/v7/using-npm/scripts) to our root `package.json` to automatically run `npm install` in the _client_ directory after the installation has finished in the root directory.

```json
{
  "name": "my-app",
  "scripts": {
    ...,
    "postinstall": "cd client && npm install"
  },
}
```

Now, when we install our monorepo, all we need to do to get it up and running is run `npm install` and then `npm start` at the root of the project. There is no need to enter any other directory to run other commands.

## 3. Proxy API requests from the backend

As I mentioned earlier, our Node backend exposes the API endpoints that our React app will use. Let's say our Node app has a `/refresh_token` endpoint.

Out of the box, if we tried to send a GET request to `http://localhost:8080/refresh_token` from our React app at `http://localhost:3000`, we would run into CORS issues. [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) stands for cross-origin resource sharing.

Typically when you encounter CORS errors, it's because you're trying to access resources from another domain (i.e., `http://localhost:3000` and `http://localhost:8080`), and the domain you're requesting resources from is not allowed.

To tell the development server to proxy any unknown requests to our API server in development, we can set up a [proxy](https://create-react-app.dev/docs/proxying-api-requests-in-development) in our React app's `package.json` file. In `client/package.json`, we'll add a proxy for `http://localhost:8080` (where our Node app is running).

```json
{
  "name": "client-app",
  "proxy": "http://localhost:8080",
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  ...
}
```

Now, if we restart the server and set a request to our Node app's `/refresh_token` endPoint (without `http://localhost:8080`) using [fetch()](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch), the CORS error should be resolved.

```javascript
fetch("/refresh_token")
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch((err) => console.error(err));
```

Next time you're working on a monorepo project like this, try these three tips to streamline your development workflow.

That's all folks! I hope this helps you become a better dev!

![Profile](https://res.cloudinary.com/khriztianmoreno/image/upload/c_scale,w_148/v1591324337/KM-brand/stickers/sticker-3_2x.png)

@khriztianmoreno
