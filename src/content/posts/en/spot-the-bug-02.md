---
title: Spot the Bug - N_02
tags:
  - spot-the-bug
  - challenge
date: 2025-01-29 11:13:50
updated: 2025-01-29 11:13:50
---

Bug hunters, assemble! We have a new challenge for you. This JavaScript code snippet is supposed to enrich a list of events with user metadata. But, is everything working as it should?

```javascript
const enrichEvents = (events) => {
  const metadata = {
    usr_789: { tier: "premium", joined: "2023-04-01" },
  };

  const enriched = events.map(event =>
    {
      id: event.id,
      time: event.time,
      user: metadata[event.userId],
      value: event.properties.totalValue
    }
  );

  return enriched;
};

const events = [
  {
    id: "evt_123",
    time: "2024-12-10T10:00:00Z",
    userId: "usr_789",
    properties: {
      totalValue: 99.99,
    },
  },
];

console.log(enrichEvents(events));
```

**Your mission**:

- **Find the bug**: There's a small error preventing the code from working correctly. Can you spot it?
- **Explain it**: Once you've found the issue, explain why you think it's a bug and what the correct solution would be.
- **Suggest improvements**: If you see anything that could be optimized or improved in the code, feel free to share your suggestions!

Accept the challenge and show off your debugging skills!

<details>
  <summary>🚀 Solution 👩🏻‍💻🐛👨🏼‍💻</summary>

Most likely your IDE would catch this one for you, but there is a syntax error. The `map` function is an arrow function that implicitly returns the result of the expression inside the block. In this case, the block is not a valid expression, so the code will throw a syntax error. To fix this, you can wrap the object in parentheses to make it an expression.

```javascript
const enrichEvents = (events) => {
  const metadata = {
    usr_789: { tier: "premium", joined: "2023-04-01" },
  };

  const enriched = events.map((event) => ({
    id: event.id,
    time: event.time,
    user: metadata[event.userId],
    value: event.properties.totalValue,
  }));

  return enriched;
};

const events = [
  {
    id: "evt_123",
    time: "2024-12-10T10:00:00Z",
    userId: "usr_789",
    properties: {
      totalValue: 99.99,
    },
  },
];

console.log(enrichEvents(events));
```

</details>

![Profile](https://res.cloudinary.com/khriztianmoreno/image/upload/c_scale,w_148/v1591324337/KM-brand/stickers/sticker-3_2x.png)

#### @khriztianmoreno 🚀
