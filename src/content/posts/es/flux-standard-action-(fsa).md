---
title: Flux Standard Action (FSA)
tags:
  - react
  - javascript
  - redux
  - tutorial
date: 2020-01-20 14:59:22
updated: 2020-01-20 14:59:22
---

Es una especificación ligera que define la estructura de una acción, para ser implementada en librerías que usan el patrón o arquitectura Flux.

El cumplimiento de **_FSA_** ayuda a los desarrolladores a crear abstracciones que pueden funcionar con diferentes implementaciones de Flux.

![Flux Standard Action — Example](https://miro.medium.com/v2/resize:fit:1376/format:webp/1*iZKJNnbZ1PjiBpJjTd-X0A.png)_**Flux Standard Action — Example**_

Todo inicia después de que Facebook publicó su arquitectura/patrón [Flux](https://facebook.github.io/flux/), muchas librerías implementaron la filosofía Flux, **Redux** fue una de ellas.

Flux se puede dividir en varios conceptos **Dispatcher**, **Store**, **Action** y **View**. Pero en este post vamos a conocer la parte de **Action** y como trabajar con estas de una forma mas estandarizada, para mas adelante poder hacer uso de otras librerías que implementan la filosofía **FSA**.

Antes de adentrarnos mas en el tema principal de hoy, conozcamos el concepto de [Action](https://github.com/facebook/flux/tree/master/examples/flux-concepts#actions) y como es definido por flux:

> Actions define the internal API of your application. They capture the ways to interact with your application. They are simple objects that consist of a “type” field and data.

La especificación conduciría al siguiente objeto:

```js
{
  type: 'ADD_TODO',
  text: 'TODO content'
}
```

El único problema con este ejemplo simple es que el desarrollador puede elegir cualquier nombre de propiedad para los valores. Todos los siguientes nombres son válidos: título, nombre, texto, todoNombre, etc. Es imposible saber qué propiedades esperar del _ADD_TODO_ en el reductor de Redux.

Sería mucho más fácil trabajar con acciones de Flux, si pudiéramos hacer ciertas suposiciones sobre su forma. Tal vez la definición de un **estándar común mínimo** para estos patrones permitiría tener la abstracción necesaria para comunicar nuestras acciones con el reducer. Esto es algo que **Flux Standard Action (FSA)** viene a resolver.

Para entrar un poco en detalle sobre FSA, en necesario partir de la siguiente premisa que **Flux Standard Action** nos proporciona sobre las acciones:

Una **acción** DEBE:

- ser un objeto JavaScript simple.

- tener una propiedad type.

Una **acción** PUEDE

- tener una propiedad error.

- tener una propiedad payload.

- tener una propiedad meta.

Una acción NO DEBE incluir propiedades que no sean type, payload, error, y meta.

**¿pero entonces que significa cada una de estas propiedades que nuestro objeto javascript puede llegar a contener?**

Veamos entonces cada uno de estos

### type

La **propiedad requerida** type identifica la naturaleza de la acción que ha ocurrido al consumidor, type es una constante de tipo _String_

### payload

La propiedad opcional payload PUEDE ser cualquier tipo de valor. Representa la carga de la acción. Cualquier información sobre la acción que no sea el type o el estado de la acción debe ser parte del campo payload.

Por convención, el payload DEBERÍA ser un objeto.

### error

La propiedad opcional error PUEDE establecerse en verdadero si la acción representa un error.

An action whose error is true is analogous to a rejected Promise. By convention, the payload SHOULD be an error object.

Si el error tiene cualquier otro valor además de true, incluyendo undefined y null, la acción NO DEBE ser interpretada como un error.

### meta

La propiedad opcional meta PUEDE ser cualquier tipo de valor. Está destinado a cualquier información adicional que no forme parte de payload .

El concepto **Flux Standard Action (FSA)** es usado por algunas librerías que nos puede ayudar a reducir el texto repetitivo que debemos crear para nuestras acciones

## Librerías

- [redux-actions](https://github.com/acdlite/redux-actions) — un conjunto de _helpers_ para crear y manejar acciones de FSA en Redux..

- [redux-promise](https://github.com/acdlite/redux-promise) — Es un _middleware_ que admite acciones de FSA.

- [redux-rx](https://github.com/acdlite/redux-rx) — Utilidades RxJS para Redux, incluido un middleware que admite acciones de FSA.

Espero en una próxima ocasión tener la posibilidad de dar una introducción de como reducir el _Boilerplate_ de Redux con Redux-Actions.

¡Espero que esto haya sido útil y/o te haya hecho aprender algo nuevo!

![Profile](https://res.cloudinary.com/khriztianmoreno/image/upload/c_scale,w_148/v1591324337/KM-brand/stickers/sticker-3_2x.png)

#### @khriztianmoreno 🚀
