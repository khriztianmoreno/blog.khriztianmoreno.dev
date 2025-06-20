---
title: Using await at the top level in ES modules
tags:
  - javascript
  - web-development
date: 2025-06-20T13:39:26.000Z
updated: 2025-06-20T13:39:26.000Z
---

# Using await at the top level in ES modules

As I was refactoring one of my React projects last week, I realized how much JavaScript has evolved since I first started coding. Remember when we had to wrap everything in callbacks? Then came Promises, followed by async/await. And now, in 2025, I find myself regularly using a feature that quietly changed the game for JavaScript developers: top-level await in ES modules.

## The Evolution of Asynchronous JavaScript

Through my journey as a developer, I've witnessed the transformation of asynchronous JavaScript. In the early days, handling async operations meant callback hell—nested functions that became increasingly difficult to read and maintain. Then Promises arrived, offering a more structured approach but still requiring `.then()` chains.

When async/await appeared, it was a revelation. Suddenly our asynchronous code could look synchronous! But there was still one limitation that frustrated me daily: we could only use `await` inside async functions. This meant wrapping our module initialization code in unnecessary boilerplate:

```javascript
// The old way we had to do things
(async () => {
  const data = await fetchImportantData();
  initializeApp(data);
})();
```

ES2022 changed everything by introducing top-level await. After using it extensively in my projects over the past few years, I can confidently say it's one of those features that once you start using, you never want to go back.

## What Exactly Is Top-Level await?

Top-level await is exactly what it sounds like—the ability to use the `await` keyword directly at the top level of your ES modules, outside of async functions:

```javascript
// This now works in ES modules
const data = await fetchImportantData();
initializeApp(data);
```

No more wrapping in async IIFEs (Immediately Invoked Function Expressions). No more unnecessary nesting. Just clean, straightforward code that expresses your intent directly.

## Real-World Use Cases From My Projects

Over the past year, I've found myself reaching for top-level await in several common scenarios:

### 1. Configuration Loading

In my latest web app, I needed to fetch configuration before initializing the application. Top-level await made this beautifully simple:

```javascript
// config.js
const config = await fetch('/api/configuration').then(res => res.json());
export default config;

// Other modules can now import this config
```

### 2. Dynamic Module Loading

I recently built a dashboard where features needed to be loaded based on user permissions. Top-level await paired perfectly with dynamic imports:

```javascript
let analyticsModule;

if (userPermissions.includes('analytics')) {
  analyticsModule = await import('./features/analytics.js');
}

export const enabledFeatures = {
  analytics: analyticsModule?.default,
  // other features...
};
```

### 3. Database Connection Initialization

For a Node.js backend service I worked on, establishing the database connection before exporting the module was crucial:

```javascript
// db.js
const connection = await createDatabaseConnection();

export async function query(sql) {
  return connection.query(sql);
}
```

## Gotchas I've Learned the Hard Way

After using top-level await on several projects, I've encountered some pitfalls worth sharing:

### Module Execution Is Not What You Might Expect

I once spent hours debugging a mysterious load order issue before I understood a key behavior: when a module uses top-level await, any module that imports it will pause execution until those awaited promises resolve.

In one particularly painful debugging session, I discovered that having a chain of modules with top-level await created a cascading delay effect that significantly slowed my application startup.

### Watch Out for Circular Dependencies

In a complex React application I was developing, I created an unintentional circular dependency between two modules that both used top-level await. The result? A runtime error that was much harder to debug than usual circular dependency issues.

```javascript
// Avoid patterns like this:
// moduleA.js
export const dataA = await fetchDataA();
import { dataB } from './moduleB.js';

// moduleB.js
export const dataB = await fetchDataB();
import { dataA } from './moduleA.js';
```

## Compatibility in 2025

The good news is that in 2025, top-level await is well-supported across the JavaScript ecosystem:

- All modern browsers fully support it
- Node.js v16+ has stable support
- Major frameworks like React, Vue, and Angular have embraced it
- Bundlers like Vite, Webpack, and Rollup handle it elegantly

Just remember that top-level await only works in ES modules (not CommonJS), so you'll need to use:
- Files with the `.mjs` extension, or
- `.js` files with `"type": "module"` in your package.json

## Why You Should Embrace Top-Level await Today

As I look back at my JavaScript code from just a few years ago, I'm amazed at how much more elegant and maintainable it's become thanks to features like top-level await. It's not just syntactic sugar—it fundamentally changes how we structure our modules.

By eliminating boilerplate async wrappers, our code becomes:
- More readable
- More maintainable
- More directly expressive of our intent

The best part? This isn't some experimental feature we need to be cautious about anymore. It's a stable part of the language that you can confidently use in production code today.

## Getting Started

If you're still not using top-level await in your projects, start today! Update your Node.js version if needed, ensure you're using ES modules, and begin refactoring those async IIFEs into clean, top-level async operations.

In my experience, this small change will make a noticeable difference in your code quality and developer happiness. As we move further into 2025 and beyond, I expect top-level await to become as standard in our JavaScript modules as imports themselves.

Have you started using top-level await in your projects yet? I'd love to hear about your experiences in the comments below!
