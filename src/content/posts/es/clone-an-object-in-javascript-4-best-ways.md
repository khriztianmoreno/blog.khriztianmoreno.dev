---
title: Clonar un objeto en JavaScript - 4 mejores formas [Ejemplos]
tags:
  - javascript
  - programming
  - web-development
date: 2023-06-18 15:07:57
updated: 2023-06-18 15:07:57
---

Clonar un objeto en JavaScript significa crear una copia idéntica de un objeto existente. Esto significa que el nuevo objeto tendrá los mismos valores para cada propiedad, pero será un objeto diferente.

## ¿Por qué es importante clonar un objeto en javascript?

Clonar un objeto en javascript es importante para preservar el estado original de un objeto y evitar la propagación de los cambios. Esto es especialmente útil cuando hay varias instancias de un objeto que se comparten entre varias partes de la aplicación. Clonar el objeto original garantiza que las otras instancias no se vean afectadas por los cambios realizados en el objeto original. Esto también permite a los desarrolladores usar una sola instancia del objeto y crear una copia única para cada parte de la aplicación. Esto evita tener que crear cada vez una nueva instancia del objeto, lo que ahorra tiempo y recursos.

### ¿Cómo clonar un objeto?

Para clonar un objeto JavaScript correctamente, tienes 4 opciones diferentes:

1. Usar la función `structuredClone()`
2. Usar el spread operator
3. Llamar la función `Object.assign()`
4. Usar JSON parsing.

```javascript
const data = { name: "khriztianmoreno", age: 33 };
// 1
const copy4 = structuredClone(data);
// 2
const copy1 = { ...data };
// 3
const copy2 = Object.assign({}, data);
// 4
const copy3 = JSON.parse(JSON.stringify(data));
```

### 1. `structuredClone()`

Crea un clon profundo de un valor dado utilizando el algoritmo de clonación estructurada.

```javascript
const original = {
  someProp: "with a string value",
  anotherProp: {
    withAnotherProp: 1,
    andAnotherProp: true,
  },
};

const myDeepCopy = structuredClone(original);
```

### 2. spread operator

El operador de propagación `(...)` permite expandir un objeto o un arreglo en una lista de elementos individuales, y se utiliza para crear una copia de un objeto.

```javascript
const original = { name: "khriztianmoreno", age: 33 };
const clone = { ...original };
```

En el ejemplo anterior, se esta creando un nuevo objeto clone a partir de los valores del objeto original, es importante notar que esto solo hace una **copia superficial**, si el objeto original contiene objetos o arreglos dentro de el, estos no serán clonados sino que se asigna la referencia del objeto original.

También se puede utilizar para clonar arreglos de la siguiente manera:

```javascript
const original = [1, 2, 3, 4];
const clone = [...original];
```

### 3. `Object.assign`

La función `Object.assign()` es otra forma de clonar objetos en JavaScript. La función toma un objeto destino como primer argumento, y uno o más objetos fuente como argumentos adicionales. Copia las propiedades enumerables de los objetos fuente al objeto destino.

```javascript
const original = { name: "khriztianmoreno", age: 33 };
const clone = Object.assign({}, original);
```

### 4. JSON parsing

El método `JSON.parse()` y `JSON.stringify()` es otra forma de clonar objetos en JavaScript. El método `JSON.stringify()` convierte un objeto en una cadena de texto en formato JSON, mientras que el método `JSON.parse()` convierte una cadena de texto en formato JSON en un objeto de JavaScript.

```javascript
const original = { name: "khriztianmoreno", age: 33 };
const clone = JSON.parse(JSON.stringify(original));
```

## Conclusiones

### Ventajas de clonar un objeto en javascript

1. El clonado de objetos permite al desarrollador crear una copia de un objeto existente sin tener que redefinir todos los valores del objeto. Esto significa que el desarrollador puede ahorrar tiempo y esfuerzo al no tener que recrear un objeto desde cero.

2. El clonado de objetos también permite al desarrollador crear una versión modificada de un objeto existente. Por ejemplo, un desarrollador puede modificar los valores de un objeto existente para crear una versión personalizada. Esto es útil para ahorrar tiempo al no tener que reescribir el código para crear un objeto desde cero.

3. El clonado de objetos también permite al desarrollador crear una versión mejorada de un objeto existente. Por ejemplo, un desarrollador puede añadir nuevas propiedades a un objeto existente para mejorar su funcionalidad.

4. El clonado de objetos también ofrece una forma de hacer copias de seguridad de los objetos. Esto significa que si el objeto existente se ve afectado por una falla de software, el desarrollador puede recurrir a la copia de seguridad para recuperar los valores originales.

### Desventajas de clonar un objeto en javascript

Clonar un objeto en Javascript puede ser una tarea útil, pero también hay algunos inconvenientes que deben tenerse en cuenta. El primero es el tiempo de ejecución. El clonado de objetos en Javascript puede ser un proceso lento, especialmente si el objeto es grande. Esto puede llevar a una mala experiencia de usuario si se está intentando clonar un objeto mientras se ejecuta una aplicación.

Otra desventaja del clonado de objetos en Javascript es que no se pueden clonar objetos complejos. Esto significa que los objetos que contienen referencias a otros objetos no se pueden clonar correctamente. Esto puede ser un problema si se está intentando clonar un objeto que contiene referencias a otros objetos importantes, ya que el clon no tendrá estas referencias.

Por último, el clonado de objetos en Javascript también puede llevar a problemas de seguridad si se clonan objetos que contienen información sensible. El clon puede contener la misma información que el objeto original, lo que puede ser un riesgo para la seguridad si se comparte el clon con otros usuarios.

¡Eso es todo amigxs! ¡Espero que este artículo lo ayude a comprender las diferentes opciones que tenemos a la hora de clonar un objecto/arraglo en javascript.

![Profile](https://res.cloudinary.com/khriztianmoreno/image/upload/c_scale,w_148/v1591324337/KM-brand/stickers/sticker-3_2x.png)

### @khriztianmoreno

Hasta la próxima.

PD: Este articulo fue escrito completamente usando [Inteligencia Aritifcial](https://openai.com/)
