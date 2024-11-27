---
title: Testing framework - Node.js
tags:
  - javascript
  - testing
  - nodejs
date: 2020-04-17 14:08:03
updated: 2020-04-17 14:08:03
---

Once an application is running in production, we might be afraid to make changes. How do we know that a new feature, a fix, or a refactor won't break existing functionality?

We can manually use our application to try to find bugs, but without maintaining an exhaustive checklist, it's unlikely we'll cover all possible failure points. And honestly, even if we did, it would take too long to run our entire application after every commit.

By using a testing framework, we can **write code that verifies our previous code still works**. This allows us to make changes without fear of breaking expected functionality.

But there are many different testing frameworks, and it can be difficult to know which one to use. Below, I will talk about three of them for Node.js:

- [Tape](https://github.com/substack/tape)
- [Ava](https://github.com/avajs/ava)
- [Jest](https://jestjs.io)

## TAPE

This derives its name from its ability to provide structured results through [TAP](https://testanything.org/) (Test Anything Protocol). The output of our runner is human-friendly, but other programs and applications cannot easily parse it. Using a standard protocol allows for better interoperability with other systems.

Additionally, Tape has several convenience methods that allow us to skip and isolate specific tests, as well as verify additional expectations such as errors, deep equality, and throwing.

Overall, the advantage of Tape is its simplicity and speed. It is a solid and straightforward harness that gets the job done without a steep learning curve.

Here is what a basic test with Tape looks like:

```javascript
const test = require("tape");

test("timing test", (t) => {
  t.plan(2);

  t.equal(typeof Date.now, "function");
  const start = Date.now();

  setTimeout(function () {
    t.equal(Date.now() - start, 100);
  }, 100);
});
```

And if we run it, it looks like this:

```shell
$ node example/timing.js
TAP version 13
# timing test
ok 1 should be strictly equal
not ok 2 should be strictly equal
  ---
    operator: equal
    expected: 100
    actual:   107
  ...

1..2
# tests 2
# pass  1
# fail  1
```

The `test()` method expects two arguments: the name of the test and the test function. The test function has the `t` object as an argument, and this object has methods we can use for assertions: `t.ok()`, `t.notOk()`, `t.equal()`, and `t.deepEqual()` to name a few.

## AVA

AVA has a concise API, detailed error output, embraces new language features, and has process isolation to run tests in parallel. AVA is inspired by Tape's syntax and supports reporting through TAP, but it was developed to be more opinionated, provide more features, and run tests concurrently.

AVA will only run tests with the `ava` binary. With Tape, we could run `node my-tape-test.js`, but with AVA we must first ensure that AVA is installed globally and available on the command line (e.g., `npm i -g ava`).

Additionally, AVA is strict about how test files are named and will not run unless the file ends with "test.js".

One thing to know about AVA is that by default it runs tests in parallel. This can speed up many tests, but it is not ideal in all situations. When tests that read and write to the database run simultaneously, they can affect each other.

AVA also has some helpful features that make setup and teardown easier: `test.before()` and `test.after()` methods for setup and cleanup.

AVA also has `test.beforeEach()` and `test.afterEach()` methods that run before or after each test. If we had to add more database tests, we could clear our database here instead of individual tests.

Here is what an AVA test looks like:

```javascript
const test = require("ava");

test("foo", (t) => {
  t.pass();
});

test("bar", async (t) => {
  const bar = Promise.resolve("bar");
  t.is(await bar, "bar");
});
```

When iterating on tests, it can be useful to run AVA in "watch mode". This will watch your files for changes and automatically rerun the tests. This works particularly well when we first create a failing test. We can focus on adding functionality without having to keep switching to restart the tests.

AVA is very popular and it's easy to see why. **AVA is an excellent choice** if we are looking for something that makes it easy to run tests concurrently, provides helpers like `before()` and `afterEach()`, and provides better performance by default, all while maintaining a concise and easy-to-understand API.

## Jest

It is a testing framework that has grown in popularity alongside React.js. The React documentation lists it as the recommended way to test React, as it allows using [jsdom](https://github.com/jsdom/jsdom) to easily simulate a browser environment. It also provides features to help mock [modules](https://jestjs.io/docs/en/manual-mocks) and [timers](https://jestjs.io/docs/en/timer-mocks).

Although Jest is very popular, it is mainly used for front-end testing. It uses Node.js to run, so it is capable of testing both browser-based code and Node.js applications and modules. However, keep in mind that using Jest to test Node.js server-side applications comes with caveats and additional configuration.

Overall, Jest has many features that can be attractive. Here are some key differences from Tape and AVA:

- **Jest does not behave like a normal Node.js module.**

- The test file must be run with jest, and several [functions are automatically added to the global scope](https://jestjs.io/docs/en/api) (e.g., `describe()`, `test()`, `beforeAll()`, and `expect()`). This makes test files "special" as they do not follow the Node.js convention of using `require()` to load jest functionality. This will cause issues with linters like standard that restrict the use of undefined globals.

- **Jest uses its global `expect()` to perform checks**, instead of standard assertions. Jest expects it to read more like English. For example, instead of doing something like `t.equal(actual, expected, comment)` with tape and AVA, we use `expect(actual).toBe(expected)`. Jest also has smart modifiers that you can include in the chain like [`.not()`](https://jestjs.io/docs/en/expect) (e.g., `expect(actual).not.toBe(unexpected)`).

- **Jest has the ability to [mock functions and modules](https://jestjs.io/docs/en/mock-functions)**. This can be useful in situations where it is difficult to write or change the code we are testing to avoid slow or unpredictable results in a test environment. An example in the Jest documentation is preventing axios from making a real HTTP request to an external server and instead returning a preconfigured response.

- **Jest has a much larger API** and many more [configuration options](https://jestjs.io/docs/en/configuration). Some of them **do not work well when testing for Node.js**. The most important option we need to set is that `testEnvironment` should be "node". If we do not do this, jest uses the default configuration where our tests will run in a browser-like environment using jsdom.

Here is what a Jest test looks like:

```javascript
const sum = require("./sum");

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});
```

Jest has a much larger API and offers more functionality than AVA or tape. However, the larger scope is not without drawbacks. When using Jest to test Node.js code, we have to:

- Agree to use undefined globals.
- Not use functions like mocked timers that interfere with packages like `Mongoose`.
- Configure the environment correctly so it does not run in a simulated browser by default.
- Consider that some code may run 20-30 times slower in Jest compared to other test runners.

Many teams will choose Jest because they are already using it on the front-end and do not like the idea of having multiple test runners, or they like the built-in features like mocks and do not want to incorporate additional modules. Ultimately, these trade-offs must be made on a case-by-case basis.

## Other testing tools

There are plenty of other testing tools like [Istanbul](https://istanbul.js.org/), [nyc](https://github.com/istanbuljs/nyc), [nock](https://www.npmjs.com/package/nock), and [replay](https://www.npmjs.com/package/replay) that we do not have space to go into here.

I hope this has been helpful and/or taught you something new!

![Profile](https://res.cloudinary.com/khriztianmoreno/image/upload/c_scale,w_148/v1591324337/KM-brand/stickers/sticker-3_2x.png)

#### @khriztianmoreno 🚀
