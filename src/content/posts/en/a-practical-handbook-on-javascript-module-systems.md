---
title: A practical handbook on JavaScript module systems
tags:
  - javascript
  - web-development
date: 2022-06-12 15:34:36
updated: 2022-06-12 15:34:36
---

Today I'll give you a practical introduction to the module systems we use when building libraries in JavaScript. As a web application or library grows and more features are added, modularizing the code improves readability and maintainability. This quick guide will give you an incisive look at the options available for creating and consuming modules in JavaScript.

![JavaScript Module Systems](https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F276byz01crxajk5sxvyq.png)

If you've ever wondered what the pros and cons of AMD, ESM, or CommonJS are, this guide will give you the information you need to confidently choose among all the options.

## A history of JavaScript modules

With no built-in native functions for namespaces and modules in early versions of the JavaScript language, different module formats have been introduced over the years to fill this gap.

The most notable ones, which I'll show you how to use in your JavaScript code below, are:

- Immediately Invoked Function Expression (IIFE).
- CommonJS (CJS)
- Asynchronous Module Definition (AMD)
- Universal Module Definition (UMD)
- ECMAScript Modules (ESM)

The selection of a module system is important when developing a JavaScript library. For library authors, the choice of module system for your library affects user adoption and ease of use. You will want to be familiar with all the possibilities.

### 1. Immediately Invoked Function Expression (IIFE) - Immediately Invoked Function Expression

One of the earliest forms of exposing libraries in the web browser, **immediately Invoked Function Expressions** (IIFE) are anonymous functions that are executed immediately after being defined.

```javascript
(function () {
  // Module's Implementation Code
})();
```

A common design pattern that leverages IIFEs is the **Singleton pattern**, which creates a single object instance and namespace code. This object serves as a single point of access to a specific set of functions. For real-world examples, look no further than the [Math](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math) object or the [jQuery](https://jquery.com/) library.

#### Pros

Writing modules this way is convenient and compatible with older browsers. In fact, you can safely concatenate and bundle multiple files containing IIFEs without worrying about naming and scope collisions.

#### Cons

However, IIFE modules are loaded synchronously, which means that properly ordering module files is critical. Otherwise, the application will break. For large projects, IIFE modules can be difficult to manage, especially if you have a lot of overlapping and nested dependencies.

### 2. Common JS (CJS)

[Node.js](https://nodejs.org/)'s default module system, **CommonJS** (CJS) uses the require syntax for importing modules and the `module.exports` and `export` syntax for exported and named exports, respectively. Each file represents a module and all local variables of the module are private, since Node.js wraps the module inside a function container.

For example, this module ...

```javascript
const { PI, pow } = Math;

function calculateArea(radius) {
  return PI * pow(radius, 2);
}

module.exports = calculateArea;
```

It becomes...

```javascript
(function (exports, require, module, __filename, __dirname) {
  const { PI, pow } = Math;

  function calculateArea(radius) {
    return PI * pow(radius, 2);
  }

  module.exports = calculateArea;
});
```

Not only does the module have its variables within the private scope, but it still has global access to, `exports`, `require`, and `module`. `__filename` and `__dirname` are module-scoped and contain the filename and directory name of the module, respectively.

The require syntax allows you to import built-in Node.js modules or locally installed third-party modules

#### Pros

CommonJS `require` statements are synchronous, meaning that CommonJS modules are loaded synchronously. As long as it is the only entry point for the application, CommonJS automatically knows how to order modules and handle circular dependencies.

#### Cons

Like IIFEs, CommonJS was not designed to generate small-sized packages. Package size was not considered in the design of CommonJS, as CommonJS is primarily used to develop server-side applications. For client-side applications, code must be downloaded first before running. The lack of tree shaking makes CommonJS a suboptimal module system for client-side applications.

### 3. Asynchronous Module Definition (AMD)

Unlike IIFE and CommonJS, **Asynchronous Module Definition** (AMD) loads modules and their dependencies asynchronously. Originating from the Dojo Toolkit, AMD is designed for client-side applications and requires no additional tools. In fact, all you need to run applications following the AMD module format is the [RequireJS](https://requirejs.org/) library, an in-browser module loader. That's it. Here's a simple example that runs a simple React application, structured with AMD, in the browser.

```html
<!-- index.html -->
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta
      name="viewport"
      content="width=device-width,
      initial-scale=1.0"
    />
    <title>React + AMD</title>
  </head>
  <body>
    <div id="root"></div>
    <script
      type="text/javascript"
      src="https://cdnjs.cloudflare.com
       /ajax/libs/require.js/2.3.6
       /require.min.js"
    ></script>
    <script type="text/javascript" src="main.js"></script>
  </body>
</html>
```

Here's what the JavaScript looks like.

```javascript
// main.js
requirejs.config({
  paths: {
    react:
      "https://unpkg.com/react@15.3.2
      /dist/react",
    "react-dom":
      "https://unpkg.com
      /react-dom@15.3.2
      /dist/react-dom",
  },
});

requirejs(
  ["react", "react-dom"],
  (React, ReactDOM) => {
    ReactDOM.render(
      React.createElement(
        "p",
        {},
        "Greetings!"
      ),
      document.getElementById("root")
    );
  }
);
```

Calling the `requirejs` or `define` methods registers the factory function (the anonymous function passed as the second argument to these methods). AMD runs this function only after all dependencies have been loaded and executed.

#### Pros

AMD allows multiple modules to be defined within a single file and is compatible with older browsers.

#### Cons

AMD is not as popular as more modern module formats such as ECMAScript modules and Universal Module Definition.

### 4. Universal Module Definition (UMD)

For libraries that support both client-side and server-side environments, the **Universal Module Definition** (UMD) offers a unified solution for making modules compatible with many different module formats, such as CommonJS and AMD.

Here's UMD in action from the [React](https://unpkg.com/react@17.0.2/umd/react.development.js) development library

```javascript
(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    // Checks for RequireJS's
    // `define` function.
    // Register as an anonymous module.
    define(["exports"], factory);
  } else if (
    typeof exports === "object" &&
    typeof exports.nodeName !== "string"
  ) {
    // Checks for CommonJS.
    // Calls the module factory
    // immediately.
    factory(exports);
  } else {
    // Register browser globals.
    global = root || self;
    factory((global.React = {}));
  }
})(this, function (exports) {
  "use strict";

  // Place React's module code here.
  // ...
});
```

- If the IIFE detects a defining function in the global scope and an amd property in the definition, then it runs the module as an AMD module.
- If the IIFE detects an export object in the global scope and a `nodeName` property within the exports, then it runs the module as a CommonJS module.

#### Pros

Regardless of whether an application consumes your library as a CommonJS, AMD, or IIFE module, UMD conditionally checks the format of the module being used at runtime and executes code specific to the detected module format.

#### Cons

The UMD template code is an intimidating-looking IIFE and is initially challenging to use. However, UMD itself is not conceptually complicated.

### 5. ECMAScript Modules (ESM)

ECMAScript Modules (ESM), the most recently introduced module format, is the standard and official way of handling modules in JavaScript. This module format is commonly used in TypeScript applications.

Like CommonJS, ESM provides several ways to export code: default exports or named exports.

```javascript
// circle.js
export function calculateArea() {
  return Math.PI * Math.pow(radius, 2);
}

export function calculateCircumference() {
  return 2 * Math.PI * radius;
}
```

Importing these named exports separately tells the module bundler which parts of the imported module should be included in the generated code. Any unimported named exports are skipped. This reduces the library size, which is useful if your library relies on some methods from a large utility library like [lodash](https://lodash.com/).

Now, in some file in the same directory as `./circle.js`, we would need the module as follows.

```javascript
const { calculateArea, calculateCircumference } = require("./circle");

console.log(calculateArea(5));
console.log(calculateCircumference(5));
```

#### Pros

Module bundlers are supported by ESM and optimize code using techniques like tree shaking (removes unused code from the final result), which are not supported by other module formats. Module loading and parsing is asynchronous, but their execution is synchronous.

#### Cons

This is the newest core module system. As such, some libraries have not yet adopted it.

## Building your own React/JavaScript library

As you can imagine, choosing the right module system becomes important when building your own React library. Personally with the use of tools like [babel.js](https://babeljs.io/) nowadays we could work with ECMAScript modules, but I am a proponent of using CommonJS in Node and ECMAScript Modules (ESM) on the frontend.

![Profile](https://res.cloudinary.com/khriztianmoreno/image/upload/c_scale,w_148/v1591324337/KM-brand/stickers/sticker-3_2x.png)

#### @khriztianmoreno
