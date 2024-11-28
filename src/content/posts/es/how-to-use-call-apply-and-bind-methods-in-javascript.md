---
title: Cómo usar los métodos Call, Apply y Bind en javascript
tags:
  - javascript
  - web-development
  - programming
date: 2023-05-12 14:56:43
updated: 2023-05-12 14:56:43
---

En este artículo, veremos qué son los métodos `call`, `apply` y `bind` en javascript y por qué existen.

Antes de saltar, necesitamos saber que es `this` en javascript, en [este post](https://www.freecodecamp.org/espanol/news/la-guia-completa-sobre-this-en-javascript/#:~:text=El%20this%20de%20JavaScript%20es,a%20veces%20se%20llama%20contexto) puedes profundizar un poco más.

![Call, Apply and Bind](https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fta2559iodb957wb4cm38.png)

_En Javascript, todas las funciones tendrán acceso a una palabra clave especial llamada `this`, el valor de `this` apuntará al objeto en el que se ejecuta esa función._

## ¿Qué son estos métodos `call`, `apply` y `bind`?

Para decirlo de una manera simple, todos estos métodos se usan para cambiar el valor de `this` dentro de una función.

Entendamos cada método en detalle.

## [call()](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Function/call)

Usando el método `call`, podemos invocar una función, pasando un valor que será tratado como `this` dentro de ella.

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

en el ejemplo anterior, estamos invocando el método `call` en la función `printName` al pasar `newObj` como parámetro, por lo que ahora `this` dentro de `printName` apunta a `newObj`, por lo tanto, `this.myName` imprime ` mafeserna`.

### ¿Cómo pasar argumentos a funciones?

El primer argumento del método `call` es el valor al que apunta `this` dentro de la función, para pasar argumentos adicionales a esa función, podemos comenzar a pasarlo desde el segundo argumento del método `call`.

```javascript
function foo(param1, param2) {}
foo.call(thisObj, arg1, arg2);
```

dónde:

- `foo` es la función que estamos invocando al pasar el nuevo valor `this` que es `thisObj`
- `arg1`, `arg2`, son los argumentos adicionales que tomará la función `foo` ( `param1`= `arg1` , `param2` = `arg2` )

## [apply()](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)

La función `apply` es muy similar a la función `call`. La única diferencia entre `call` y `apply` es la diferencia en cómo se pasan los argumentos.

- `call` — pasamos argumentos como valores individuales, comenzando desde el segundo argumento
- `apply` — los argumentos adicionales se pasarán como un arreglo

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

en el ejemplo anterior, tanto el método `call` como `apply` en la función `sayHello` están haciendo lo mismo, la única diferencia es cómo estamos pasando argumentos adicionales.

## [bind()](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)

A diferencia de los métodos `call` y `apply`, `bind` no invocará la función directamente, sino que cambiará el valor `this` dentro de la función y devolverá la instancia de la función modificada.

Podemos invocar la función devuelta más tarde.

```javascript
function sayHello() {
  console.log(this.name);
}

const obj = { name: "khriztianmoreno" };

// it won't invoke, it just returns back the new function instance
const newFunc = sayHello.bind(obj);

newFunc(); // khriztianmoreno
```

**pasando argumentos adicionales:**
pasar argumentos adicionales en `bind` funciona de manera similar al método `call`, podemos pasar argumentos adicionales como valores individuales a partir del segundo argumento del método `bind`.

```javascript
function sayHello(greet) {
  console.log(`${greet} ${this.name}`);
}

const obj = { name: "khriztianmoreno" };

const newFunc = sayHello.bind(obj, "Hello");
newFunc(); // Hello khriztianmoreno
```

En el caso del método `bind`, podemos pasar argumentos adicionales de dos formas:

- Al llamar al método `bind` en sí mismo, podemos pasar argumentos adicionales junto con el valor de `this` a esa función.
- Otra forma es que podemos pasar argumentos adicionales mientras invocamos la función de retorno del método `bind`.

Podemos seguir cualquiera de las formas anteriores y funciona de manera similar sin ninguna diferencia en la funcionalidad.

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

**NOTA**: _si no pasamos ningún valor o pasamos`null` mientras llamamos a los métodos `call`, `apply`, `bind`, entonces `esta` función interna de llamada apuntará al objeto `global`._

```javascript
function sayHello() {
  // executing in browser env
  console.log(this === window);
}

sayHello.call(null); // true
sayHello.apply(); // true
sayHello.bind()(); // true
```

No podemos usar los métodos `call`, `apply` y `bind` en las [funciones flecha](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) para cambiar el valor de `this`, porque las funciones de flecha no tienen su propio contexto `this`.

El `this` dentro de la función de flecha apuntará a la función externa/principal en la que está presente.

Por lo tanto, aplicar estos métodos en la función de flecha no tendrá ningún efecto.

¡Eso es todo amigxs! ¡Espero que este artículo lo ayude a comprender qué son los métodos `call()`, `apply()` y `bind()` en javascript.!

![Profile](https://res.cloudinary.com/khriztianmoreno/image/upload/c_scale,w_148/v1591324337/KM-brand/stickers/sticker-3_2x.png)

@khriztianmoreno
