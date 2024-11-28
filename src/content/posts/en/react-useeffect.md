---
title: React useEffect
tags:
  - javascript
  - react
  - hooks
date: 2022-09-05 10:39:52
updated: 2022-09-05 10:39:52
---

`useEffect` is probably the most confusing and misunderstood hook in React. Today I want to clarify that for you.

We use hooks all the time at Make It Real and understanding useEffect is crucial if we are going to write modern-style React code.

Next, we will see:

- What is `useEffect`?
- How to run an effect on every `render`
- How to run an effect only on the first `render`
- How to run an effect on the first `render` and re-run it when a "dependency" changes
- How to run an effect with cleanup

## What is useEffect?

The [useEffect](https://reactjs.org/docs/hooks-reference.html) hook allows us to perform **side effects** in our function components. Side effects are essentially anything where we want an "imperative" action to happen. This includes things like:

- API calls
- Updating the DOM
- Subscribing to event listeners

All of these are side effects that we might need a component to perform at different times.

## Running useEffect on every render

The `useEffect` hook does not return any value, but it takes two arguments. The first is mandatory and the second is optional. The first argument **is the callback function of the effect we want the Hook to execute (i.e., the effect itself)**. Suppose we wanted to place a `console.log()` message inside the useEffect callback.

```jsx
import { useEffect } from "react";

export const FunctionComponent = () => {
  useEffect(() => {
    console.log("run for every component render");
  });

  return (
    // ...
  );
}
```

By default, the effect set in the `useEffect` hook runs when the component **renders for the first time** and **after every update**. If we run the above code, we will notice that the `console.log('run for every component render')` message is generated as our component renders. _If_ our component ever re-renders (for example, from a state change with something like `useState`), the effect would run again.

Sometimes, re-running an effect on every render is exactly what you want. But most of the time, **you only want to run the effect in certain situations**, such as on the first render.

## **How to run** useEffect **only on the first render**

The second argument of the `useEffect` hook is optional and is a **dependency list** that allows us to tell React to _skip_ applying the effect until certain conditions are met. In other words, the second argument of the `useEffect` hook allows us to limit **when the effect will run**. If we simply place an empty array as the second argument, this is how we tell React to only run the effect on the initial render.

```jsx
import { useEffect } from "react";

export const FunctionComponent = () => {
  useEffect(() => {
    console.log("run only for first component render (i.e., component mount)");
  }, []);

  return (
    // ...
  );
}
```

With the above code, the `console.log()` message will only trigger when the component mounts for the first time and will not re-trigger, even if the component re-renders multiple times.

This is much more "efficient" than running on every render, but isn't there a happy medium? What if we want to re-run the effect if something changes?

## **Running** useEffect **on the first render and re-running it when the dependency changes**

Instead of making an effect run once at the beginning and on every update, we can try to restrict the effect to run only at the beginning and **when a certain dependency changes**.

Suppose we wanted to trigger a `console.log()` message every time the value of a state property changes. We can achieve this by placing the state property as a _dependency_ of the effect callback. See the following code example:

```jsx
import { useState, useEffect } from "react";

export const FunctionComponent = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log(
      "run for first component render and re-run when 'count' changes"
    );
  }, [count]);

  return (
    <button onClick={() => setCount(count + 1)}>
      Click to increment count and trigger effect
    </button>
  );
};
```

Above, we have a button in the component template responsible for changing the value of the `count` state property when clicked. Each time the `count` state property changes (i.e., each time the button is clicked), we will notice that the effect callback runs and the `console.log()` message triggers.

## **Running an effect with cleanup**

An effect callback runs every time on the initial render and when we specify when an effect should run. The `useEffect` hook also provides the ability to run a cleanup _after_ the effect. This can be done by specifying a return function at the end of our effect.

```jsx
import { useState, useEffect } from "react";

export const FunctionComponent = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log(
      "run for first component render and re-run when 'count' changes"
    );

    return () => {
      console.log("run before the next effect and when component unmounts");
    };
  }, [count]);

  return (
    <button onClick={() => setCount(count + 1)}>
      Click to increment count and trigger effect
    </button>
  );
};
```

In the above example, we will notice that the cleanup function message triggers before the desired effect runs. Additionally, if our component ever unmounts, the cleanup function will also run.

A good example of when we might need a cleanup is when we set up a subscription in our effect but want to remove the subscription whenever the next subscription call is to be made, to avoid memory leaks.

These are mainly all the different ways the `useEffect` hook can be used to run side effects in components. I invite you to check out this [visual guide to useEffect](https://alexsidorenko.com/blog/useeffect/) by ALEX SIDORENKO that illustrates these concepts through a series of GIFs that are both clever and effective, especially for visual learners. There is also a visualization of how first-class functions work if you want more.

I hope this has been helpful and/or taught you something new!

![Profile](https://res.cloudinary.com/khriztianmoreno/image/upload/c_scale,w_148/v1591324337/KM-brand/stickers/sticker-3_2x.png)

@khriztianmoreno 🚀
