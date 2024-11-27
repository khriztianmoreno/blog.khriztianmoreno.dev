---
title: What is a “side effect”?
tags:
  - javascript
  - react
  - redux
date: 2020-02-20T05:00:00.000Z
updated: 2020-02-20T05:00:00.000Z
---

In the previous post, we learned a bit about immutability and why it should matter when writing our code, especially our reducers.

This time, I want to talk a bit about _side effects_ and how working with _pure functions_ can help us. However, first, let's see what makes a function pure and why it is closely related to immutability.

## Immutability Rules

To be pure, a function must follow these rules:

1. A pure function must always return the same value when given the same inputs.

1. A pure function must not have any side effects.

“Side effects” is a broad term, but it basically means modifying things outside the immediate scope of that function. Some examples of side effects are:

- Mutating/modifying input parameters, like giveAwesomePowers (function from the [previous post](/en/posts/what-is-immutability))

- Modifying any other state outside the function, such as global variables, or document.(anything) or window.(anything)

- Making API calls

- console.log()

- Math.random()

API calls might surprise you. After all, making a call to something like fetch('/users') might not change anything in your UI.

But ask yourself this: if you called fetch('/users'), could it _change anything_ anywhere? Even outside your UI?

Yes. It will create an entry in the browser's network log. It will create (and perhaps later close) a network connection to the server. And once that call reaches the server, all bets are off. The server could do whatever it wants, including calling other services and making more mutations. At the very least, it will probably place an entry in a log file somewhere (which is a mutation).

So, as I said: “_side effect_” is a pretty broad term. Here is a function that has no _side effects_:

![](https://cdn-images-1.medium.com/max/2000/1*FWSMRT2ZLsnD3PAoaM8s5g.png)

You can call this function once, you can call it a million times and nothing will change. I mean, technically, this satisfies **Rule 2**. Calling this function will not directly cause any side effects.

Also, every time you call this function like add(1, 2) you will get the same answer. No matter how many times you call add(1, 2) you will get the same answer. That satisfies **Rule 1**: same inputs == same outputs.

## JS Array Methods That Mutate

Certain array methods will mutate the array they are used on:

- push (add an item to the end)

- pop (remove an item from the end)

- shift (remove an item from the beginning)

- unshift (add an item to the beginning)

- sort

- reverse

- splice

## Pure Functions Can Only Call Other Pure Functions

A possible source of trouble is calling an impure function from a pure one.

Purity is transitive and it's all or nothing. You can write a perfectly pure function, but if you end it with a call to some other function that eventually calls setState or dispatch or causes some other kind of side effect… then all bets are off.

Now, there are some types of side effects that are “acceptable”. Logging messages with console.log is fine. Yes, technically it is a side effect, but it is not going to affect anything.

## A Pure Version of giveAwesomePowers

Now we can rewrite our function keeping the Rules in mind.

![giveAwesomePowers — Pure function](https://cdn-images-1.medium.com/max/2016/1*jLt5X42ghSV3lMtsQ-QJrQ.png)_giveAwesomePowers — Pure function_

This is a bit different now. Instead of modifying the person, we are creating a _completely_ new person.

If you haven't seen Object.assign, what it does is assign properties from one object to another. You can pass it a series of objects, and it will combine them, from left to right, while overwriting any duplicate properties. (And by “from left to right”, I mean that running Object.assign(result, a, b, c) will copy a into result, then b, then c).

However, it does not do a deep merge: only the immediate properties of each argument will be moved. Also, most importantly, it does not create copies or clones of the properties. It assigns them as they are, keeping the references intact.

So the above code creates an empty object, then assigns all the properties of person to that empty object and then assigns the specialPower property to that object as well. Another way to write this is with the object spread operator ([spread](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)):

![giveAwesomePowers — ES6 || [spread](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)](https://cdn-images-1.medium.com/max/2000/1*5-0U-StLYch5aoWn7fqgTg.png)_giveAwesomePowers — ES6 || [spread](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)_

You can read this as: “Create a new object, then insert the properties of person, then add another property called specialPower”. As of this writing, this **spread** syntax is officially part of the JavaScript specification in ES2018.

## Pure Functions Return Brand New Objects

Now we can rerun our experiment from before, using our new pure version of giveAwesomePowers.

![](https://cdn-images-1.medium.com/max/2624/1*iVul8KDfpMRTEkfh0TWrzg.png)

The big difference is that person was not modified. Mafe has not changed. The function created a _clone_ of Mafe, with all the same properties, plus the ability to become invisible.

This is kind of a weird thing about functional programming. Objects are constantly being created and destroyed. We did not change Mafe; we created a clone, modified her clone, and then replaced Mafe with her clone.

I hope this has been helpful and/or taught you something new!

![Profile](https://res.cloudinary.com/khriztianmoreno/image/upload/c_scale,w_148/v1591324337/KM-brand/stickers/sticker-3_2x.png)

#### @khriztianmoreno 🚀
