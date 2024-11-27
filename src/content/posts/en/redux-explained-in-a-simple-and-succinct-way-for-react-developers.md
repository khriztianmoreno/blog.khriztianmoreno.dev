---
title: Redux explained in a simple and succinct way for React developers
tags:
  - react
  - redux
  - javascript
date: 2022-08-10 16:22:20
updated: 2022-08-10 16:22:20
---

Redux is a widely used state management library for React and TypeScript applications. It’s easier than ever to manage state in React thanks to the `useState` React Hook, as well as the Context API. However, when your codebase grows very large, you’ll need a more powerful and structured state management solution, rather than an ad-hoc one. That’s where Redux can help.

![Redux](https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fnfh5hc7xxgnm1y9yq6hd.png)

## Why do you need Redux?

When working with React, you usually end up with state that is used globally throughout the entire application.

One of the approaches to sharing state across the component tree is to use the [Context API](https://reactjs.org/docs/context.html). We often use it in combination with hooks like `useReducer` and `useState` to manage global application state.

This approach works, but it can only take you so far. In the end, you have to invent your own ways to manage side-effects, debug, and split state management code into modules so that it doesn't become an incomprehensible mess.

A better idea is to use specialized tools. One such tool to manage global application state is Redux.

## How Redux Works

Redux is a state management framework that is based on the idea of ​​representing the global state of the application as a reducer function.

In Redux, to manage state, we define a function that accepts two arguments: `state`, for the previous state, and `action`, the object that describes the state update.

```javascript
function reducer(state = "", action: Action) {
  switch (action.type) {
    case "SET_VALUE":
      return action.payload;
    default:
      return state;
  }
}
```

This reducer represents a string value. It handles only one type of action: `SET_VALUE`.

If the received action field type is not `SET_VALUE`, the reducer returns the unchanged state.

After having the reducer, we create the `store` using the redux `createStore` method.

```javascript
const store = createStore(reducer, "Initial Value");
```

The `store` provides a subscription method that allows us to subscribe to updates to the `store`.

```javascript
store.subscribe(() => {
  const state = store.getState();
  console.log(state);
});
```

Here, we've passed a callback that logs the state value to the console.

To update the state, we dispatch an action:

```javascript
store.dispatch({
  type: "SET_VALUE",
  payload: "New value",
});
```

Here we pass an object representing the action (`action`). Each action is required to have the `type` field and optionally, `payload`.

Usually, instead of creating actions in place, people define `action creator functions`:

```javascript
const setValue = (value) => ({
  type: "SET_VALUE",
  payload: value,
});
```

And this is the essence of Redux.

## Why can't we use the useReducer hook instead of Redux?

Since version 16.8, React supports Hooks. One of them, `useReducer`, works very similarly to Redux.

It's easy to manage application state using a combination of `useReducer` and the React Context API.

So why do we need Redux if we have a native tool that also allows us to represent state as a reducer? If we make it available throughout the application using the Context API, won't that be enough?

Redux offers some important advantages:

- **Browser Tools**: You can use [Redux DevTools](https://github.com/reduxjs/redux-devtools) to debug your Redux code. It allows us to see the list of dispatched actions, inspect the state, and even travel back in time. You can toggle through the history of actions and see how the state dealt with each of them.
- **Handling Side Effects**: With `useReducer`, you have to invent your own ways to organize the code that makes network requests. Redux provides the [Middleware API](https://redux.js.org/tutorials/fundamentals/part-4-store) to handle that. Additionally, there are tools like [Redux Thunk](https://github.com/reduxjs/redux-thunk) that make this task even easier.
- **Testing**: Since Redux is based on pure functions, it is easy to test. All testing comes down to checking the output against the given inputs.
- **Patterns and code organization**: Redux is well studied and there are recipes and best practices you can apply. There is a methodology called [Ducks](https://github.com/erikras/ducks-modular-redux) that you can use to organize Redux code.

## Building with Redux

Now that you've seen examples of what Redux does and how it works, you're ready to use it in a real project.

![Profile](https://res.cloudinary.com/khriztianmoreno/image/upload/c_scale,w_148/v1591324337/KM-brand/stickers/sticker-3_2x.png)

### @khriztianmoreno
