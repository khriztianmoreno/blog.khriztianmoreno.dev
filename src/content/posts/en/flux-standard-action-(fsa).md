---
title: Flux Standard Action (FSA)
tags:
  - react
  - javascript
  - redux
  - tutorial
date: 2020-01-20 14:59:22
updated: 2020-01-20 14:59:22
---

It is a lightweight specification that defines the structure of an action, to be implemented in libraries that use the Flux pattern or architecture.

Compliance with **_FSA_** helps developers create abstractions that can work with different implementations of Flux.

![Flux Standard Action — Example](https://miro.medium.com/v2/resize:fit:1376/format:webp/1*iZKJNnbZ1PjiBpJjTd-X0A.png)_**Flux Standard Action — Example**_

It all started after Facebook published its architecture/pattern [Flux](https://facebook.github.io/flux/), many libraries implemented the Flux philosophy, **Redux** was one of them.

Flux can be divided into several concepts **Dispatcher**, **Store**, **Action**, and **View**. But in this post, we are going to learn about the **Action** part and how to work with them in a more standardized way, so later we can use other libraries that implement the **FSA** philosophy.

Before delving deeper into today's main topic, let's get to know the concept of [Action](https://github.com/facebook/flux/tree/master/examples/flux-concepts#actions) and how it is defined by flux:

> Actions define the internal API of your application. They capture the ways to interact with your application. They are simple objects that consist of a “type” field and data.

The specification would lead to the following object:

```js
{
  type: 'ADD_TODO',
  text: 'TODO content'
}
```

The only problem with this simple example is that the developer can choose any property name for the values. All the following names are valid: title, name, text, todoName, etc. It is impossible to know what properties to expect from _ADD_TODO_ in the Redux reducer.

It would be much easier to work with Flux actions if we could make certain assumptions about their shape. Maybe defining a **minimum common standard** for these patterns would allow us to have the necessary abstraction to communicate our actions with the reducer. This is something that **Flux Standard Action (FSA)** comes to solve.

To go into a bit more detail about FSA, it is necessary to start from the following premise that **Flux Standard Action** provides us about actions:

An **action** MUST:

- be a plain JavaScript object.

- have a type property.

An **action** MAY

- have an error property.

- have a payload property.

- have a meta property.

An action MUST NOT include properties other than type, payload, error, and meta.

**But then what does each of these properties that our JavaScript object can contain mean?**

Let's see each of these

### type

The **required property** type identifies the nature of the action that has occurred to the consumer, type is a constant of type _String_

### payload

The optional payload property MAY be any type of value. It represents the action's payload. Any information about the action that is not the type or the status of the action should be part of the payload field.

By convention, the payload SHOULD be an object.

### error

The optional error property MAY be set to true if the action represents an error.

An action whose error is true is analogous to a rejected Promise. By convention, the payload SHOULD be an error object.

If the error has any value other than true, including undefined and null, the action MUST NOT be interpreted as an error.

### meta

The optional meta property MAY be any type of value. It is intended for any additional information that is not part of the payload.

The **Flux Standard Action (FSA)** concept is used by some libraries that can help us reduce the repetitive text we have to create for our actions.

## Libraries

- [redux-actions](https://github.com/acdlite/redux-actions) — a set of helpers to create and handle FSA actions in Redux.

- [redux-promise](https://github.com/acdlite/redux-promise) — A middleware that supports FSA actions.

- [redux-rx](https://github.com/acdlite/redux-rx) — RxJS utilities for Redux, including a middleware that supports FSA actions.

I hope to have the opportunity to give an introduction on how to reduce Redux boilerplate with Redux-Actions in a future occasion.

I hope this has been useful and/or taught you something new!

![Profile](https://res.cloudinary.com/khriztianmoreno/image/upload/c_scale,w_148/v1591324337/KM-brand/stickers/sticker-3_2x.png)

#### @khriztianmoreno 🚀
