---
title: Introduction to Volta, the fastest way to manage Node environments
tags:
  - javascript
  - web-development
  - programming
date: 2022-05-27 15:18:15
updated: 2022-05-27 15:18:15
---

Volta is a tool that opens up the possibilities for a smoother development experience with Node.js. This is especially relevant for working in teams. Volta allows you to automate your Node.js development environment. It allows your team to use the same consistent versions of Node and other dependencies. Even better, it allows you to keep versions consistent across production and development environments, eliminating the subtle bugs that come with version mismatches.

### Volta eliminates “It works on my machine...” problems.

Version mismatches cause headaches when developing in teams.

Let's assume this scenario:

Team X built their application on local machines running Node 10, but the build pipeline defaulted to the lowest version of Node they had on hand, Node 6, and the application would not start in production. They had to revert the deployment, figure out what went wrong, it turned into a very long night.

If they had used Volta this could have been avoided.

## How does Volta work?

> Volta is “a simple way to manage your JavaScript command line tools”. It makes managing Node, npm, yarn or other JavaScript executables shipped as part of packages really easy.

Volta has a lot in common with tools like NVM, but NVM is not the easiest to set up initially and, more importantly, the developer using it still has to remember to switch to the correct version of Node for the project they are working on.

Volta, on the other hand, is easy to install and takes the thinking part out of the equation: once Volta is configured in a project and installed on a local machine, it will automatically switch to the appropriate versions of Node.

Not only that, but it will also allow you to define yarn and npm versions in a project, and if the version of Node defined in a project is not downloaded locally, Volta will go out and download the appropriate version.

But when you switch to another project, Volta will either fall back to the presets in that project or revert to the default environment variables.

## Volta in action

Let's give Volta a spin. First, create a new `React` application with `Create React App`.

Run the following command from a terminal.

```shell
npx create-react-app volta-sample-app
```

Once you have created your new React application, open the code in an IDE and start it through the command line.

```shell
npm run start
```

If all goes according to plan, you will see a rotating React logo when you open a browser at http://localhost:3000/.

Now that we have an application, let's add Volta.

### Download Volta locally

To install Volta, run the following command:

```shell
curl https://get.volta.sh | shell
```

If you have Windows, download and run the Windows installer and follow the instructions.

### Define your environment variables

Before we add our Volta-specific versions of Node and npm to our project, let's see what the default environment variables are.

### Get a reference reading

In a terminal at the root of your project, run the following command.

```shell
node -v && npm -v
```

For me, my default versions of Node and npm are v14.18.1 and v6.14.15, respectively.

With our baseline set, we can change our versions just for this project with the help of Volta.

### Setting a node.js version

We'll start with Node. Since v16 is the current version of Node, let's add that to our project.

In our project at the root level where our package.json file lives, run the following command.

```shell
volta pin node@16
```

Using `volta pin [JS_TOOL]@[VERSION]` will put this particular JavaScript tool in our version specified in our application's package.json. After committing this to our repository with git, any future developer using Volta to manage dependencies will be able to read this from the repository and use the exact same version.

With Volta we can be as specific or generic as we want to define the versions, and Volta will fill in any gaps. I specified the major version of Node that I wanted (16) and then Volta filled in the minor and patch versions for me.

After pinning, you will see the following success message on your terminal: `pinned node@16.11.1 in package.json.`.

> Tip: make your version of node pinned to match the version of Node on your build server

### Setting an npm version

Now let's tackle our npm version. Still in the root of our project in the terminal, run this command:

```shell
volta pin npm
```

Without a version specified, Volta defaults to the latest LTS version to add to our project.

The current LTS version for npm is 8, so now our project has npm v8.1.0 as its default version.

### Verify the `package.json`.

To confirm that the new versions of the JavaScript environment are part of our project, check the `package.json` file of the application.

Scroll down and you should see a new property named `“volta”`. Inside the `“volta”` property there should be a `“node”: “16.11.1”` and an `“npm”: “8.1.0”` version.

From now on, any developer who has Volta installed on their machine and downloads this repository will have the configuration of these tools to automatically switch to use these particular versions of node and npm.

To be doubly sure, you can also re-run the first command we did before anchoring our versions with Volta to see how our current development environment is configured.

```shell
node -v && npm -v
```

After that, your terminal should tell you that you are using those same versions: Node.js v16 and npm v8.

## Watch the magic happen

Now, you can sit back and let Volta take care of things for you.

If you want to see what happens when nothing is specified for Volta, try going up one level from the root of your project and check your Node and npm versions again.

Let's open two terminals side by side: the first one inside our project with Volta versions, the other one level higher in our folder structure.

Now run the following command in both of them:

```shell
node -v && npm -v
```

And in our project, Node v16 and npm v8 are running, but outside the project, Node v14 and npm v6 are present. We did nothing more than change directories and Volta took care of the rest.

By using Volta, we took the guesswork out of our JavaScript environment variables and actually made it harder for a member of the development team to use the wrong versions than the right ones.

![Profile](https://res.cloudinary.com/khriztianmoreno/image/upload/c_scale,w_148/v1591324337/KM-brand/stickers/sticker-3_2x.png)

#### @khriztianmoreno
