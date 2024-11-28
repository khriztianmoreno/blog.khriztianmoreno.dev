---
title: Introduction to .env files
tags:
  - javascript
  - web-development
  - programming
date: 2023-03-09 14:35:51
updated: 2023-03-09 14:35:51
---

Imagine having to pay nearly $148 million for a data breach that exposed the data of some 57 million users 😱😰

Well, that's what happened to Uber, not long ago, and the culprit was none other than a coded secret published openly for any bad actor to exploit.

That's why in this post, we're going to learn what they are and how we could work them into our projects with javascript.

![env](https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fxnr6sdobejyg1fzpld5s.png)

## Context

Today, millions of software developers keep their secrets (i.e. credentials such as access keys and tokens to services used by programs) safe with `.env` files.

For those unfamiliar with the topic, `.env` files were introduced in 2012 as part of a solution to the hard-coded secret problem mentioned in the introductory paragraph above.

Instead of sending secrets along with their codebase to the cloud, developers could now send their codebase to the cloud and keep their secrets separated on their machines in key-value format in `.env` files; this separation reduced the risk of bad actors getting their hands on sensitive credentials in the cloud.

To run programs, developers would now just need to pull their latest codebase from the remote repository and inject the secrets contained in their local `.env` files into the pulled code.

Unless a development team is small and "skeletal" and doesn't care much about DevOps, it typically maintains multiple "environments" for its codebase to ensure that changes are well tested before being pushed to production to interact with end users. In the case of multiple environments, developers may choose to employ multiple `.env` files to store credentials, one for each of those environments (for example, one `.env` file to hold development database keys and another to hold production database keys).

To summarize, `.env` files contain credentials in key-value format for the services used by the program they are building. They are meant to be stored locally and not uploaded to online code repositories for everyone to read. Each developer on a team typically maintains one or more `.env` files for each environment.

## Usage

In this post, we'll look at how to use a `.env` file in a basic project, assuming you're using [Node.js](https://nodejs.org/en/) and [git](https://git-scm.com/) for version control; this should apply to other languages ​​as well. Feel free to skip this section if you're not interested in the technicalities of how to use a `.env` file.

To get started, head to the root of your project folder and create an empty `.env` file containing the credentials you'd like to inject into your codebase. It might look something like this:

```
SECRET_1=924a137562fc4833be60250e8d7c1568
SECRET_2=cb5000d27c3047e59350cc751ec3f0c6
```

Next, you'll want to ignore the `.env` file so that it doesn't get committed to git. If you haven't already, create a `.gitignore` file. It should look something like this:

```
.env
```

Now, to inject the secrets into your project, you can use a popular module like [dotenv](https://www.npmjs.com/package/dotenv); it will parse the `.env` file and make your secrets accessible within your codebase under the `process` object. Go ahead and install the module:

```shell
npm install dotenv
```

Import the module at the top of the startup script for your codebase:

```javascript
require(‘dotenv’).config()
```

That's it, you can now access secrets anywhere in your codebase:

```javascript
// display the value of SECRET_1 into your code
console.log(process.env.SECRET_1);
// -> 924a137562fc4833be60250e8d7c1568

// display the value of SECRET_2 into your code
console.log(process.env.SECRET_2);
// -> cb5000d27c3047e59350cc751ec3f0c6
```

Excelente. Ha agregado con éxito un archivo .env a su proyecto con algunos secretos y ha accedido a esos secretos en su base de código. Además, cuando envías tu código a través de git, tus secretos permanecerán en tu máquina.

## Challenges

While simple and powerful, `.env` files can be problematic when managed incorrectly in the context of a larger team.

Imagine having to distribute and track hundreds of keys to your software development team.

On a simplified level, between **Developer_1** and **Developer_2**, here's what could happen:

- **Developer_1** could add an API key to their local `.env` file and forget to tell **Developer_2** to add it to theirs - this cost **Developer_2** 15 minutes down the road debugging why their code is crashing only to realize it's because of the missing API key.
- **Developer_2** could ask **Developer_1** to send them the API key so they can add it to their `.env` file, after which **Developer_1** can choose to send it via text or email - this cost **Developer_2** 15 minutes down the road debugging why their code is crashing only to realize it's because of the missing API key.

This now unnecessarily puts your organization at risk of bad actors like **Developer_2** waiting precisely to intercept the API key.

Unfortunately, these challenges are common and even have a name: [secret sprawl](https://www.gitguardian.com/glossary/secret-sprawl-definition).

Over the past few years, many companies have attempted to solve this problem. [HashiCorp Vault](https://www.vaultproject.io/) is a product that securely stores secrets for large enterprises; however, it is too expensive, cumbersome, and downright overkill to set up for the average developer who just needs a fast and secure way to store these secrets.

Simpler solutions exist, such as [Doppler](https://www.doppler.com/) and the new [dotenv-vault](https://dotenv.org/vault?r=1), but they often lack the security infrastructure needed to gain mass adoption.

Let me know in the comments what tools or services you use to easily and safely solve [secret sprawl](https://www.gitguardian.com/glossary/secret-sprawl-definition).

That's all folks! I hope this helps you become a better dev!

![Profile](https://res.cloudinary.com/khriztianmoreno/image/upload/c_scale,w_148/v1591324337/KM-brand/stickers/sticker-3_2x.png)

@khriztianmoreno 🚀
