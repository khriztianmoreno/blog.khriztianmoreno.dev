---
title: Some methods beyond console.log in Javascript
tags:
  - javascript
  - web-development
  - programming
date: 2023-02-17 14:17:07
updated: 2023-02-17 14:28:07
---

![Some methods beyond console.log in Javascript](https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Flbhbyz1kx5wvzc9kd770.png)

Often, during debugging, JavaScript developers tend to use the `console.log()` method to print values. But there are some other console methods that make life much easier. Want to know what these methods are? Let's get to know them!

## 1. `console.table()`

Displaying long arrays or objects is a headache using the `console.log()` method, but with `console.table()` we have a much more elegant way to do it.

```javascript
// Matrix
const matrix = [
  ["apple", "banana", "cherry"],
  ["Rs 80/kg", "Rs 100/kg", "Rs 120/kg"],
  ["5 ⭐", "4 ⭐", "4.5 ⭐"],
];
console.table(matrix);

// Maps
class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
}

const family = {};
family.mother = new Person("Jane", "Smith");
family.father = new Person("John", "Smith");
family.daughter = new Person("Emily", "Smith");
console.table(family);
```

![console.table()](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/37w9ez8w43n3ybe3bl94.png)

## 2. `console.trace()`

Having trouble debugging a function? Wondering how the execution flows? `console.trace()` is your friend!

```javascript
function outerFunction() {
  function innerFunction() {
    console.trace();
  }
  innerFunction();
}
outerFunction();
```

![console.trace()](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/5422ywzh99jnppjifyqi.png)

## 3. `console.error()` and `console.warn()`

Tired of boring logs? Spice things up with `console.error()` and `console.warn()`

```javascript
console.error("This is an error message");
console.warn("This is a warning message");
console.log("This is a log message");
```

![console.error()](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/aqjpe6dwijmt7gvi3ra7.png)

## 4. `console.assert()`

This is another brilliant debugging tool! If the assertion fails, the console will print the trace.

```javascript
function func() {
  const a = -1;
  console.assert(a === -1, "a is not equal to -1");
  console.assert(a >= 0, "a is negative");
}

func();
```

![console.assert()](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/mfqqjbfcb6592mcjar01.png)

## 5. `console.time()`, `console.timeEnd()`, and `console.timeLog()`

Need to check how long something is taking? Timer methods are there to rescue you!

```javascript
console.time("timeout-timer");

setTimeout(() => {
  console.timeEnd("timeout-timer");
}, 1000);

setTimeout(() => {
  console.timeLog("timeout-timer");
}, 500);
```

![console.time()](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/p23gnvotxhkr7ejvklhf.png)

NOTE: setTimeouts are not executed immediately, which results in a slight deviation from the expected time.

That's all folks! I hope this helps you become a better dev!

![Profile](https://res.cloudinary.com/khriztianmoreno/image/upload/c_scale,w_148/v1591324337/KM-brand/stickers/sticker-3_2x.png)

@khriztianmoreno on [Twitter](https://twitter.com/khriztianmoreno) and [GitHub](https://github.com/khriztianmoreno)
