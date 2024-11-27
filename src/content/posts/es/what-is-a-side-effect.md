---
title: ¿Qué es un “side effect”?
tags:
  - javascript
  - react
  - redux
date: 2020-02-20T05:00:00.000Z
updated: 2020-02-20T05:00:00.000Z
---

En el anterior post, conocimos un poco sobre la inmutabilidad y la razon de porque deberia importarnos a la hora de escribir nuestro codigo en especial nuestros reducers.

En esta ocasion, quiero abordar un poco sobre los *side effect *y como el trabajar con _funciones puras_ nos puede servir, sin embargo, primero veamos qué hace que una función sea pura y porque está muy relacionada con la inmutabilidad.

## Reglas de inmutabilidad

Para ser pura, una función debe seguir estas reglas:

1. Una función pura siempre debe devolver el mismo valor cuando se le dan las mismas entradas.

1. Una función pura no debe tener ningún efecto secundario (_side effect_).

Los “side effects” son un término amplio, pero básicamente significa modificar cosas fuera del alcance de esa función inmediata. Algunos ejemplos de efectos secundarios …

- Mutar/modificar parámetros de entrada, como giveAwesomePowers (funcion del [post anterior](/es/posts/what-is-immutability))

- Modificación de cualquier otro estado fuera de la función, como variables globales, o document.(anything) o window.(anything)

- Hacer llamadas a la API

- console.log()

- Math.random()

Las llamadas a la API pueden sorprenderte. Después de todo, hacer una llamada a algo comofetch('/users')podría no cambiar nada en su UI.

Pero pregúntate esto: si llamó fetch('/users'), ¿podría _cambiar algo_ en cualquier lugar? ¿Incluso fuera de tu UI?

Sí. Creará una entrada en el registro de red del navegador. Creará (y quizás luego cerrará) una conexión de red al servidor. Y una vez que esa llamada llega al servidor, todas las apuestas están desactivadas. El servidor podría hacer lo que quiera, incluyendo llamar a otros servicios y hacer más mutaciones. Por lo menos, probablemente colocará una entrada en un archivo de registro en algún lugar (que es una mutación).

Entonces, como dije: “_side effect_” es un término bastante amplio. Aquí hay una función que no tiene _side effects_:

![](https://cdn-images-1.medium.com/max/2000/1*FWSMRT2ZLsnD3PAoaM8s5g.png)

Puedes llamar esta función una vez, puedes llamarla un millón de veces y nada cambiará. Quiero decir, técnicamente, esto satisface la **Regla 2**. Llamar a esta función no causará directamente ningun efecto secundario.

Además, cada vez que llame a esta función como add(1, 2) obtendrá la misma respuesta. No importa cuántas veces llame a add(1, 2) obtendrá la misma respuesta. Eso satisface la **Regla 1**: las mismas entradas == mismas respuestas.

## JS Array métodos que mutan

Ciertos métodos de vector mutarán el vector en el que se utiliza:

- push (agregar un item hasta el final)

- pop (eliminar un item del final)

- shift (eliminar un item desde el principio)

- unshift (agregar un item desde el principio)

- sort

- reverse

- splice

## Las funciones puras solo pueden llamar a otras funciones puras

Una posible fuente de problemas es llamar a una función no pura desde una pura.

La pureza es transititiva y es todo o nada. Puede escribir una función pura perfecta, pero si la finaliza con una llamada a alguna otra función que eventualmente llame a setStateo dispatch o cause algún otro tipo de efecto secundario … entonces todas las apuestas estarán desactivadas.

Ahora, hay algunos tipos de efectos secundarios que son “aceptables”. Registrar mensajes con console.log está bien. Sí, técnicamente es un efecto secundario, pero no va a afectar nada.

## A Pure Version of giveAwesomePowers

Ahora podemos reescribir nuestra función teniendo en cuenta las Reglas.

![giveAwesomePowers — Pure function](https://cdn-images-1.medium.com/max/2016/1*jLt5X42ghSV3lMtsQ-QJrQ.png)_giveAwesomePowers — Pure function_

Esto es un poco diferente ahora. En lugar de modificar a la persona, estamos creando una persona _completamente_ nueva.

Si no ha visto Object.assign, lo que hace es asignar propiedades de un objeto a otro. Puede pasarle una serie de objetos, y los combinará, de izquierda a derecha, mientras sobrescribe cualquier propiedad duplicada.(Y por “de izquierda a derecha”, quiero decir que la ejecución de Object.assign(result, a, b, c) copiará a en result, luego b, luego c).

Sin embargo, no hace una fusión profunda(_deep merge_): solo se moverán las propiedades secundarias inmediatas de cada argumento. También, lo más importante, no crea copias o clones de las propiedades. Los asigna tal como están, manteniendo las referencias intactas.

Entonces el código anterior crea un objeto vacío, luego asigna todas las propiedades de person, a ese objeto vacío y luego asigna la propiedad specialPower a ese objeto también. Otra forma de escribir esto es con el operador de propagación de objetos ([spread](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)):

![giveAwesomePowers — ES6 || [spread](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)](https://cdn-images-1.medium.com/max/2000/1*5-0U-StLYch5aoWn7fqgTg.png)_giveAwesomePowers — ES6 || [spread](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)_

Puedes leer esto como: “Cree un nuevo objeto, luego inserte las propiedades de person, luego agregue otra propiedad llamada specialPower”. Al escribir estas líneas, esta sintaxis **spread** es oficialmente parte de la especificación de JavaScript en ES2018.

## Funciones puras devuelven nuevos objetos a estrenar

Ahora podemos volver a ejecutar nuestro experimento desde antes, utilizando nuestra nueva versión pura degiveAwesomePowers.

![](https://cdn-images-1.medium.com/max/2624/1*iVul8KDfpMRTEkfh0TWrzg.png)

La gran diferencia es que esa person no fue modificada. Mafe no ha cambiado. La función creó un _clon_ de Mafe, con todas las mismas propiedades, además de la capacidad de hacerse invisible.

Esto es una especie de cosa extraña acerca de la programación funcional. Los objetos se crean y destruyen constantemente. No cambiamos a Mafe; creamos un clon, modificamos su clon y luego reemplazamos a Mafe con su clon.

¡Espero que esto haya sido útil y/o te haya hecho aprender algo nuevo!

![Profile](https://res.cloudinary.com/khriztianmoreno/image/upload/c_scale,w_148/v1591324337/KM-brand/stickers/sticker-3_2x.png)

#### @khriztianmoreno 🚀
