---
title: Spot the Bug - N_02
tags:
  - spot-the-bug
  - challenge
date: 2025-01-29 11:13:50
updated: 2025-01-29 11:13:50
---

¡Atención, cazadores de bugs! Tenemos un nuevo desafío para ti. Este fragmento de código JavaScript se supone que enriquece una lista de eventos con metadatos de usuario. Pero, ¿todo funciona como debería?

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

**Tu misión**:

- **Encuentra el error**: Hay un pequeño error que impide que el código funcione correctamente. ¿Puedes encontrarlo?
- **Explícalo**: Una vez que hayas encontrado el problema, explica por qué crees que es un error y cuál sería la solución correcta.
- **Sugiere mejoras**: Si ves algo que podría optimizarse o mejorarse en el código, ¡no dudes en compartir tus sugerencias!

¡Acepta el desafío y demuestra tus habilidades de depuración!

<details>
  <summary>🚀 Solución 👩🏻‍💻🐛👨🏼‍💻</summary>

Lo más probable es que tu IDE detecte este error por ti, pero hay un error de sintaxis. La función `map` es una función flecha que devuelve implícitamente el resultado de la expresión dentro del bloque. En este caso, el bloque no es una expresión válida, por lo que el código lanzará un error de sintaxis. Para solucionarlo, puedes envolver el objeto entre paréntesis para convertirlo en una expresión.

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
