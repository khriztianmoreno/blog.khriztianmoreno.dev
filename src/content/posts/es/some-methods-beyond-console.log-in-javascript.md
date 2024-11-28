---
title: Algunos métodos más allá del console.log en Javascript
tags:
  - javascript
  - web-development
  - programming
date: 2023-02-17 14:17:07
updated: 2023-02-17 14:28:07
---

![Some methods beyond console.log in Javascript](https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Flbhbyz1kx5wvzc9kd770.png)

A menudo, durante la depuración, los desarrolladores javascript solemos usar el método `console.log()` para imprimir valores. Pero hay algunos otros métodos de consola que te hacen la vida mucho más fácil. ¿Quieres saber cuáles son estos métodos? ¡Vamos a conocerlos!

## 1. `console.table()`

Mostrar arreglos u objetos largos es un dolor de cabeza usando el método `console.log()`, pero con `console.table()` tenemos una forma mucho más elegante de hacerlo.

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

¿Tiene problemas para depurar una función? ¿Te quedas preguntándote cómo fluye la ejecución? ¡`console.trace()` es tu amigo!

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

## 3. `console.error()` y `console.warn()`

¿Cansado de logs/registros aburridos? Dale sabor a las cosas con `console.error()` y `console.warn()`

```javascript
console.error("This is an error message");
console.warn("This is a warning message");
console.log("This is a log message");
```

![console.error()](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/aqjpe6dwijmt7gvi3ra7.png)

## 4. `console.assert()`

¡Esta es otra herramienta brillante para la depuración! Si la aserción falla, la consola imprimirá el seguimiento/**trace**.

```javascript
function func() {
  const a = -1;
  console.assert(a === -1, "a is not equal to -1");
  console.assert(a >= 0, "a is negative");
}

func();
```

![console.assert()](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/mfqqjbfcb6592mcjar01.png)

## 5. `console.time()`, `console.timeEnd()`, y `console.timeLog()`

¿Necesita comprobar cuánto tarda algo? ¡Los métodos del temporizador están ahí para rescatarte!

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

NOTA: Los setTimeouts no se ejecutan de inmediato, lo que genera una pequeña desviación del tiempo esperado.

¡Eso es todo amigxs! ¡Espero que esto te ayude a convertirte en un o una mejor dev!

![Profile](https://res.cloudinary.com/khriztianmoreno/image/upload/c_scale,w_148/v1591324337/KM-brand/stickers/sticker-3_2x.png)

@khriztianmoreno en [Twitter](https://twitter.com/khriztianmoreno) y [GitHub](https://github.com/khriztianmoreno)
