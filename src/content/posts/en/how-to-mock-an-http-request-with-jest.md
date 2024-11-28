---
title: How to mock an HTTP request with Jest 💻
tags:
  - javascript
  - testing
  - nodejs
  - jest
  - web-development
date: 2024-05-07 15:43:57
updated: 2024-05-07 15:43:57
---

Today I wanted to show you how to properly write a test.

But anyone can figure out how to run a simple test. And here, we're looking to help you find answers you won't find anywhere else.

So I thought we'd take things one step further.

Let's run a more complex test, where you'll have to mock 1 or 2 parts of the function you're testing.

[In case you're new here: mock is like using a stunt double in a movie. It's a way to replace a complicated part of your code (like calling an API) with something simpler that pretends to be real, so you can test the rest of your code easily.]

MY testing framework of choice is Jest, because it makes everything so much easier:

1. **Zero Configuration:** One of the main advantages of Jest is its zero-configuration setup. It is designed to work out of the box with minimal configuration, making it very attractive for projects that want to implement tests quickly and efficiently.
2. **Snapshot Testing:** Jest introduced the concept of Snapshot Testing, which is particularly useful for testing UI components. It takes a snapshot of a component’s rendered output and ensures that it doesn’t change unexpectedly in future tests.
3. **Built-In Mocking and Spies:** Jest comes with built-in support for mock functions, modules, and timers, making it easy to test components or functions in isolation without worrying about their dependencies.
4. **Asynchronous Testing Support:** Jest supports asynchronous testing out of the box, which is essential for testing in modern JavaScript applications that often rely on asynchronous operations like API calls or database queries.

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/au3m8kw0rtsrclm6s8fo.jpg)

De todos modos, entremos en las pruebas:

### Step 1: Setting up your project

1. Create a new project directory and navigate to it
2. Initialize a new npm project: `npm init -y`
3. Install Jest: `npm install --save-dev jest`
4. Install axios to make HTTP requests: `npm install axios`

These are the basic requirements. Nothing new or fancy here. Let's get started.

### Step 2: Write a function with an API call

Now, let's say you log into some kind of application. StackOverflow, for example. Most likely, at the top right you'll see information about your profile. Maybe your full name and username, for example.

In order to get these, we typically have to make an API call to get them. So, let's see how we would do that.

1. Create a file called `user.js`
2. Inside `user.js`, write a function that makes an API call. For example, using axios to retrieve user data:

```javascript
// user.js
import axios from "axios";

export const getUser = async (userId) => {
  const response = await axios.get(`https://api.example.com/users/${userId}`);
  return response.data;
};
```

### Step 3: Create the Test File

Okay, now that we have a function that brings us the user based on the ID we requested, let's see how we can test it.

Remember, we want something that works always and for all developers.

Which means we don't want to depend on whether the server is running or not (since this is not what we are testing).

And we don't want to depend on the users we have in the database.

Because in my database, ID1 could belong to my admin user, while in your database, ID1 could belong to YOUR admin user.

This means that the same function would give us different results. Which would cause the test to fail, even though the function works correctly.

Read on to see how we tackled this problem using mocks.

1. Create a file called `user.test.js` in the same directory.

2. Inside this file, import the function you want to test:

```javascript
import axios from "axios";
jest.mock("axios");

import { getUser } from "./user";
```

3. Write your test case, mock the call, and retrieve mock data.

```javascript
test("should fetch user data", async () => {
  // Mock data to be returned by the Axios request
  const mockUserData = { id: "1", name: "John Doe" };
  axios.get.mockResolvedValue({ data: mockUserData });

  // Call the function
  const result = await getUser("1");

  // Assert that the Axios get method was called correctly
  expect(axios.get).toHaveBeenCalledWith("https://api.example.com/users/1");

  // Assert that the function returned the correct data
  expect(result).toEqual(mockUserData);
});
```

### Step 4: Run the test

1. Add a test script to your `package.json`:

```json
"scripts": {
  "test": "jest"
}
```

2. Run your tests with `npm test`.

#### Step 5: Review the results

Jest will display the result of your test in the terminal. The test should pass, indicating that `getUser` is returning the mocked data as expected.

Congratulations, you now have a working test with Jest and Mocking.

I hope this was helpful and/or made you learn something new!

![Profile](https://res.cloudinary.com/khriztianmoreno/image/upload/c_scale,w_148/v1591324337/KM-brand/stickers/sticker-3_2x.png)

@khriztianmoreno
