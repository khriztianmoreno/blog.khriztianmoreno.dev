---
title: Are you making THESE unit testing and mocking mistakes?
tags:
  - javascript
  - testing
  - web-development
date: 2024-04-08 15:34:04
updated: 2024-04-08 15:34:04
---

Testing is hard.

And it doesn't matter if you're an experienced tester or a beginner...

If you've put significant effort into testing an application...

Chances are you've made some of these testing and mocking mistakes in the past.

From test cases packed with duplicate code and huge lifecycle hooks, to conveniently incorrect mocking cases and missing and sneaky edge cases, there are plenty of common culprits.

I've tracked some of the most popular cases and listed them below. Go ahead and count how many of them you've done in the past.

Hopefully, it'll be a good round.

## Why do people make mistakes in testing in the first place?

While automated testing is one of the most important parts of the development process...

And unit testing saves us countless hours of manual testing and countless bugs that get caught in test suites...

Many companies don't use unit testing or don't run enough tests.

Did you know that the average test coverage for a project is ~40%, while the recommended one is 80%?

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/0b6f88et53xwtximyb9y.jpg)

This means that a lot of people aren't used to running tests (especially complex test cases) and when you're not used to doing something, you're more prone to making a mistake.

So without further ado, let's look at some of the most common testing errors I see

### Duplicate Code

The three most important rules of software development are also the three most important rules of testing.

What are these rules?
**Reuse. Reuse. Reuse**.

A common problem I see is repeating the same series of commands in every test instead of moving them to a lifecycle hook like `beforeEach` or `afterEach`

This could be because the developer was prototyping or the project was small and the change insignificant. These cases are fine and acceptable.

But a few test cases later, the problem of code duplication becomes more and more apparent.

And while this is more of a junior developer mistake, the following one is similar but much more clever.

### Overloading lifecycle hooks

On the other side of the same coin, sometimes we are too eager to refactor our test cases and we put so much stuff in lifecycle hooks without thinking twice that we don't see the problem we are creating for ourselves.

Sometimes lifecycle hooks grow too large.

And when this happens...

...and you need to scroll up and down to get from the hook to the test case and back...

This is a problem and is often referred to as "scroll fatigue".

I remember being guilty of this in the past.

A common pattern/practice to keep the file readable when we have bloated lifecycle hooks is to extract the common configuration code into small factory functions.

So, let's imagine we have a few (dozens of) test cases that look like this:

```javascript
describe("authController", () => {
  describe("signup", () => {
    test("given user object, returns response with 201 status", async () => {
      // Arrange
      const userObject = {
        // several lines of user setup code
      };
      const dbUser = {
        // several lines of user setup code
      };
      mockingoose(User).toReturn(undefined, "findOne");
      mockingoose(User).toReturn(dbUser, "save");
      const mockRequest = {
        // several lines of constructing the request
      };
      const mockResponse = {
        // several lines of constructing the response
      };

      // Act
      await signup(mockRequest, mockResponse);
      // Assert
      expect(mockResponse.status).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(201);
    });

    test("given user object with email of an existing user, returns 400 status - 1", async () => {
      // Arrange
      const userObject = {
        // several lines of user setup code
      };
      const dbUser = {
        // several lines of user setup code
      };
      const mockRequest = {
        // several lines of constructing the request
      };
      const mockJson = jest.fn();
      const mockResponse = {
        // several lines of constructing the response
      };
      mockingoose(User).toReturn(dbUser, "findOne");

      // Act
      await signup(mockRequest, mockResponse);

      // Assert
      expect(mockResponse.status).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(400);

      expect(mockJson).toHaveBeenCalled();
      expect(mockJson).toHaveBeenCalledWith({
        status: "fail",
        message: "Email taken.",
      });
    });
  });
});
```

We can extract the repeated configuration information into its own functions called `createUserObject`, `createDbUserObject` and `createMocks`

And then the tests would look like this:

```javascript
test("given user object, returns response with 201 status", async () => {
  const userObject = createUserObject();
  const dbUser = createDbUserObject();
  const [mockRequest, mockResponse] = createMocks(userObject);
  mockingoose(User).toReturn(undefined, "findOne");
  mockingoose(User).toReturn(dbUser, "save");
  await signup(mockRequest, mockResponse);
  expect(mockResponse.status).toHaveBeenCalled();
  expect(mockResponse.status).toHaveBeenCalledWith(201);
});
```

By extracting those code snippets into their own separate factory functions, we can avoid scrolling fatigue, keep lifecycle links snappy, and make it easier to navigate the file and find what we're looking for.

### Not prioritizing the types of tests you run

This has more to do with large or huge codebases where there are literally hundreds or even thousands of test cases running every time a new set of commits wants to be merged into the codebase.

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ubhoe5naa6ww40jkao00.jpg)

In such cases, running all the test suites can take literally hours, and you may not always have the time or resources to do so.

When time or resources are limited, it's important to strategically choose the type of test to prioritize. Generally, integration tests provide better reliability assurances due to their broader scope. So when you have to choose between the two, it's often a good idea to choose integration tests over unit tests.

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/mk7shvlsw5c3x09ebmbo.jpg)

### Using logic in your test cases

We want to avoid logic in our test cases whenever possible.

Test cases should only have simple validation and avoid things like `try-catch` blocks or `if-else` conditionals.

This keeps your tests clean and focused only on the expected flow because it makes the tests easier to understand at a glance.

The only exception is when you're writing helper or factory functions that set up scenarios for tests.

### Using loose validations instead of strict assertions

This is usually a sign that you might need to refactor the piece of code you're testing or that you need to make a minor adjustment to your mocks.

For example, instead of checking if the value is greater than 1, you should be more specific and assert that the value is 2.

Or, if you're checking data for a User object, you should assert that each piece of data is exactly as you expect, rather than just checking for an ID match.

Loose checks can mask edge cases that could fail in the future.

### Improper Implementation of Mock Behavior

This one is hard to find and that's why you can find an example in every codebase.

It's one of the sneakiest but common testing issues and it's hard to notice at first glance.

It can happen when the mock behavior is overly simplified or when it doesn't accurately reflect edge cases and error conditions.

As a result, tests may pass, but they will not provide a reliable indication of how the system will perform under various conditions, resulting in future errors and unexpected problems, and test cases with simulated behavior that end up doing more harm than good.

I hope this post helps you identify those practices that we should avoid when testing.

![Profile](https://res.cloudinary.com/khriztianmoreno/image/upload/c_scale,w_148/v1591324337/KM-brand/stickers/sticker-3_2x.png)

@khriztianmoreno
