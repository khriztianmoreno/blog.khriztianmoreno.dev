---
title: Spot the Bug - N_01
tags:
  - spot-the-bug
  - challenge
date: 2025-01-10 15:53:46
updated: 2025-01-10 15:53:46
---

**Do you consider yourself a code detective?** ️‍👩🏻‍💻🐛👨🏼‍💻 We have a little mystery to solve. This JavaScript snippet seems to work perfectly, but hides a rather peculiar bug.

Can you figure out what's going on and why the result is not as expected?

Take the challenge and put your programming skills to the test!

```javascript
function reverseString(str) {
  return str.split("").reverse().join("");
}

const reversedString = reverseString("Hello, 👋!");
console.log(reversedString);
```
Remember, the satisfaction of solving a problem yourself is priceless. Try to research and solve it before you see the answer.

<details>
  <summary>🚀 Solution 👩🏻‍💻🐛👨🏼‍💻</summary>

  This bug occurs because the `split` method treats the string as an array of 16-bit units, not as an array of characters resulting the unexpected output: `!�� ,olleH`.

  By using `Array.from(str)` or `[...str]` the string is split into an array of actual characters, respecting the surrogate pairs.

  ### Using `Array.from`:
  ```javascript
  function reverseString(str) {
    return Array.from(str).reverse().join("");
  }

  const reversedString = reverseString("Hello, 👋!");
  console.log(reversedString);
  ```

  ### Using the spread operator:
  ```javascript
  function reverseString(str) {
    return [...str].reverse().join("");
  }

  const reversedString = reverseString("Hello, 👋!");
  console.log(reversedString);
  ```
</details>

I hope this has been helpful and/or taught you something new!

![Profile](https://res.cloudinary.com/khriztianmoreno/image/upload/c_scale,w_148/v1591324337/KM-brand/stickers/sticker-3_2x.png)

#### @khriztianmoreno 🚀
