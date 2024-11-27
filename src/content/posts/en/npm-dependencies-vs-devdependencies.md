---
title: NPM dependencies vs devDependencies
tags:
  - javascript
  - web-development
  - npm
date: 2022-06-20 16:01:14
updated: 2022-06-20 16:01:14
---

## tl;dr

`Dependencies` are required by our application at runtime. Packages like `react`, `redux`, and `lodash` are all examples of dependencies. `devDependencies` are only required to develop or compile your application. Packages like `babel`, `enzyme`, and `prettier` are examples of devDependencies.

![NPM dependencies vs devDependencies](https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Ffvog41kjb51b3zesnmce.jpeg)

## npm install

The real difference between `dependencies` and `devDependencies` is seen when you run `npm install`.

If you run `npm install` from a directory containing a `package.json` file (which you normally do after cloning a project, for example).

✅ All packages located in `dependencies` will be installed
✅ All packages located in `devDependencies` will be installed

If you run `npm install <package-name>` (which you normally do when you want to add a new package to an existing project), i.e. `npm install react`.

✅ All packages located in `dependencies` will be installed
❌ None of the packages located in `devDependencies` will be installed

## Transitive dependencies

If package A depends on package B, and package B depends on C, then package C is a transitive dependency on package A. What that means is that for package A to run properly, it needs package B installed. However, for package B to run properly, package C needs to be installed. Why do I mention this? Well, `dependencies` and `devDependencies` also treat transitive dependencies differently.

When you run `npm install` from a directory containing a `package.json` file:

- `dependencies` ✅ Download all transitive dependencies.
- `devDependencies` ❌ Do not download any transitive dependencies.

## Specifying dependencies vs. devDependencies

Starting with NPM 5, when you run `npm install <package-name>`, that package will automatically be saved within your `dependencies` in your `package.json` file. If you wanted to specify that the specific package should be included in `devDependencies` instead, you would add the `--save-dev` flag.

```shell
npm install prettier --save-dev
```

## Installing on a production server

Often, you will need to install your project on a production server. When you do that, you will not want to install `devDependencies` as you obviously won't need them on your production server. To install only the `dependencies` (and not `devDependencies`), you can use the `--production` flag.

```shell
npm install --production
```

I hope this was helpful and/or made you learn something new!

![Profile](https://res.cloudinary.com/khriztianmoreno/image/upload/c_scale,w_148/v1591324337/KM-brand/stickers/sticker-3_2x.png)

### @khriztianmoreno
