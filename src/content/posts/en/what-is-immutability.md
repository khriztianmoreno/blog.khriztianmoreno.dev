---
title: What is immutability?
tags:
  - javascript
  - redux
  - react
date: 2020-02-10 16:53:03
updated: 2020-02-10 16:53:03
---

Immutability in React and Redux

Immutability can be a confusing topic, and it appears everywhere in React, Redux, and JavaScript in general.

You may have encountered errors where your **React** components do not re-render, even though you know you have changed the _props_, and someone says, "You should be making immutable state updates." Maybe you or one of your teammates regularly writes _reducers_ in **Redux** that mutate the state, and we have to constantly correct them (the _reducers_, or our teammates 😄).

It's complicated. It can be very subtle, especially if you're not sure what to look for. And honestly, if you're not sure why it's important, it's hard to care.

<!--more-->

## What is immutability?

First of all, immutable is the opposite of mutable, and mutable means changeable, modifiable... capable of being altered.

So, something that is **im**mutable, then, is something that cannot be changed.

Taken to the extreme, this means that instead of having traditional variables, you would constantly be creating new values and replacing the old ones. JavaScript is not that extreme, but some languages do not allow mutation (Elixir, Erlang, and ML come to mind).

While JavaScript is not a purely functional language, it can sometimes pretend to be. Certain operations with arrays in JS are immutable (meaning they return a new array, rather than modifying the original). String operations are always immutable (they create a new string with the changes). And you can also write your own functions that are immutable. You just need to know a few rules.

## A code example with mutation

Let's look at an example to see how mutability works. We'll start with this person object here:

![](https://cdn-images-1.medium.com/max/2000/1*HTWRoy6C_54yrz1o4LHe9g.png)

So let's say we write a function that gives a person special powers:

![](https://cdn-images-1.medium.com/max/2000/1*5nRGGompyTkaJJhabPprXw.png)

Ok, everyone has the same power. No matter, invisibility is cool. Let's give some special powers to **super Mafe.**

![](https://cdn-images-1.medium.com/max/2624/1*E58AJFG3FaMyjaTrXV0iLA.png)

This function giveAwesomePowers _mutates_ the person object that is passed into it. If you run this code, you'll see that the first time we print a person, **Mafe** has no specialPower property. But then, the second time, she suddenly has the specialPower of invisibility.

The object returned by giveAwesomePowers is the same object that was passed in, but it has been modified internally. Its properties have changed. It has been _mutated_.

I want to say this again because it's important: the internal parts of the object have changed, but the object reference has not. It's the same object on the outside (so an equality check like person === samePerson will be true).

If we want the giveAwesomePowers function not to modify the person, we'll have to make some changes.

We won't go into much detail about the following code, because it will take center stage in the next post of this series.

![**Object.assign()**](https://cdn-images-1.medium.com/max/2016/1*l6dOEaAUno5wc9loMlueoA.png)**_Object.assign()_**

If you haven't seen Object.assign, what it does is assign properties from one object to another. Without modifying the original object, in short, Object.assign creates a copy of the original object with a new specialPower property.

👋 In my next post, we will address what a **pure function** is and why it is closely related to immutability, and we will focus on understanding the concept of **side effects**. 🤝

I hope this was helpful and/or taught you something new!

![Profile](https://res.cloudinary.com/khriztianmoreno/image/upload/c_scale,w_148/v1591324337/KM-brand/stickers/sticker-3_2x.png)

#### @khriztianmoreno 🚀
