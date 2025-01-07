---
title: Encuentra el Bug - N_01
tags:
  - spot-the-bug
  - challenge
date: 2025-01-10 15:53:46
updated: 2025-01-10 15:53:46
---

**¿Te consideras un detective de código?** ️‍👩🏻‍💻🐛👨🏼‍💻 Tenemos un pequeño misterio por resolver. Este fragmento de JavaScript parece funcionar perfectamente, pero esconde un bug bastante peculiar.

¿Puedes averiguar qué está pasando y por qué el resultado no es el esperado?

¡Acepta el desafío y pon a prueba tus habilidades de programación!

```javascript
function reverseString(str) {
  return str.split("").reverse().join("");
}

const reversedString = reverseString("Hello, 👋!");
console.log(reversedString);
```
Recuerda, la satisfacción de resolver un problema por ti mismo no tiene precio. Intenta investigar y resolverlo antes de ver la respuesta.

<details>
  <summary>🚀 Solución 👩🏻‍💻🐛👨🏼‍💻</summary>

  Este bug ocurre porque el método `split` trata la cadena como un array de unidades de 16 bits, no como un array de caracteres, resultando en una salida inesperada: `!�� ,olleH`.

  Al usar `Array.from(str)` o `[...str]`, la cadena se divide en un array de caracteres reales, respetando los pares sustitutos.

  ### Usando `Array.from`:
  ```javascript
  function reverseString(str) {
    return Array.from(str).reverse().join("");
  }

  const reversedString = reverseString("Hello, 👋!");
  console.log(reversedString);
  ```

  ### Usando el operador de propagación:
  ```javascript
  function reverseString(str) {
    return [...str].reverse().join("");
  }

  const reversedString = reverseString("Hello, 👋!");
  console.log(reversedString);
  ```
</details>

Espero que te haya sido útil y/o te haya enseñado algo nuevo

![Profile](https://res.cloudinary.com/khriztianmoreno/image/upload/c_scale,w_148/v1591324337/KM-brand/stickers/sticker-3_2x.png)

#### @khriztianmoreno 🚀
