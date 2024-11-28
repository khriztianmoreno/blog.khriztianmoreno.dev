---
title: How to use Call, Apply and Bind methods in javascript
tags:
  - javascript
  - web-development
  - programming
date: 2023-05-12 14:56:43
updated: 2023-05-12 14:56:43
---

In this article, we'll look at what `call`, `apply`, and `bind` methods are in javascript and why they exist.

Before we jump in, we need to know what `this` is in javascript, in [this post](https://www.freecodecamp.org/news/the-complete-guide-to-this-in-javascript/#:~:text=JavaScript%20this%20is,%20sometimes%20called%20in%20context) you can go a little deeper.

![Call, Apply and Bind](https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fta2559iodb957wb4cm38.png)

_In Javascript, all functions will have access to a special keyword called `this`, the value of `this` will point to the object on which that function is executed._

## What are these `call`, `apply` and `bind` methods?

To put it in a simple way, all these methods are used to change the value of `this` inside a function.

Let us understand each method in detail.

## [call()](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Function/call)

Using the `call` method, we can invoke a function, passing a value that will be treated as `this` within it.

```javascript
const obj = {
  myName: "khriztianmoreno",
  printName: function () {
    console.log(this.myName);
  },
};

obj.printName(); // khriztianmoreno

const newObj = {
  myName: "mafeserna",
};

obj.printName.call(newObj); //mafeserna
```

In the above example, we are invoking the `call` method in the `printName` function by passing `newObj` as a parameter, so now `this` inside `printName` points to `newObj`, hence `this.myName` prints `mafeserna`.

### How to pass arguments to functions?

The first argument of the `call` method is the value pointed to by `this` inside the function, to pass additional arguments to that function, we can start passing it from the second argument of the `call` method.

```javascript
function foo(param1, param2) {}
foo.call(thisObj, arg1, arg2);
```

where:

- `foo` is the function we are calling by passing the new `this` value which is `thisObj`
- `arg1`, `arg2` are the additional arguments that the `foo` function will take ( `param1`= `arg1` , `param2` = `arg2` )

## [apply()](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)

The `apply` function is very similar to the `call` function. The only difference between `call` and `apply` is the difference in how the arguments are passed.

- `call` — we pass arguments as individual values, starting from the second argument
- `apply` — additional arguments will be passed as an array

```javascript
function sayHello(greet, msg) {
  console.log(`${greet} ${this.name} ! ${msg}`);
}

const obj = {
  name: "khriztianmoreno",
};

// Call
sayHello.call(obj, "Hello", "Good Morning");
// Hello khriztianmoreno ! Good Morning

// Apply
sayHello.apply(obj, ["Hello", "Good Morning"]);
// Hello khriztianmoreno ! Good Morning
```

In the above example, both the `call` and `apply` methods in the `sayHello` function are doing the same thing, the only difference is how we are passing additional arguments.

## [bind()](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)

Unlike the `call` and `apply` methods, `bind` will not invoke the function directly, but will change the `this` value inside the function and return the modified function instance.

We can invoke the returned function later.

```javascript
function sayHello() {
  console.log(this.name);
}

const obj = { name: "khriztianmoreno" };

// it won't invoke, it just returns back the new function instance
const newFunc = sayHello.bind(obj);

newFunc(); // khriztianmoreno
```

**passing additional arguments:**
Passing additional arguments in `bind` works similarly to the `call` method, we can pass additional arguments as individual values ​​starting from the second argument of the `bind` method.

```javascript
function sayHello(greet) {
  console.log(`${greet} ${this.name}`);
}

const obj = { name: "khriztianmoreno" };

const newFunc = sayHello.bind(obj, "Hello");
newFunc(); // Hello khriztianmoreno
```

In case of `bind` method, we can pass additional arguments in two ways:

- While calling the `bind` method itself, we can pass additional arguments along with the value of `this` to that function.
- Another way is that we can pass additional arguments while invoking the return function of the `bind` method.

We can follow any of the above ways and it works similarly without any difference in functionality.

```javascript
function sayHello(greet) {
  console.log(`${greet} ${this.name}`);
}

const obj = { name: "khriztianmoreno" };
const newFunc1 = sayHello.bind(obj, "Hello");
newFunc1(); // Hello khriztianmoreno

const newFunc2 = sayHello.bind(obj);
newFunc2("Hello"); // Hello khriztianmoreno
```

**NOTE**: _if we don't pass any value or we pass `null` while calling `call`, `apply`, `bind` methods, then `this` inner calling function will point to the `global` object._

```javascript
function sayHello() {
  // executing in browser env
  console.log(this === window);
}

sayHello.call(null); // true
sayHello.apply(); // true
sayHello.bind()(); // true
```

We cannot use `call`, `apply` and `bind` methods in [arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) to change the value of `this`, because arrow functions do not have their own `this` context.

The `this` inside the arrow function will point to the outer/parent function in which it is present.

Therefore, applying these methods in the arrow function will have no effect.

That's all folks! I hope this article helped you understand what `call()`, `apply()` and `bind()` methods are in javascript!

![Profile](https://res.cloudinary.com/khriztianmoreno/image/upload/c_scale,w_148/v1591324337/KM-brand/stickers/sticker-3_2x.png)

@khriztianmoreno
