---
title: Redux explicado de manera simple y sucinta para los desarrolladores de React
tags:
  - react
  - redux
  - javascript
date: 2022-08-10 16:22:20
updated: 2022-08-10 16:22:20
---

Redux es una biblioteca de administración de estado ampliamente utilizada para aplicaciones React y TypeScript. Es más fácil que nunca administrar el estado en React gracias al `useState` React Hook, así como a la API de contexto. Sin embargo, cuando su base de código crezca mucho, necesitará una solución de administración de estado más potente y estructurada, en lugar de ad-hoc. Ahí es donde Redux puede ayudar.

![Redux](https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fnfh5hc7xxgnm1y9yq6hd.png)

## ¿Por qué necesitas Redux?

Cuando trabajas con React, generalmente terminas con un estado que se usa globalmente en toda la aplicación.

Uno de los enfoques para compartir el estado en todo el árbol de componentes es usar la [API de contexto](https://reactjs.org/docs/context.html). A menudo, lo usamos en combinación con hooks como `useReducer` y `useState` para administrar el estado global de la aplicación.

Este enfoque funciona, pero solo puede llevarte hasta cierto punto. Al final, debes inventar tus propias formas de administrar los side-effects, depurar y dividir código de administración de estado en módulos para que no se convierta en un desastre incomprensible.

Una mejor idea es utilizar herramientas especializadas. Una de esas herramientas para administrar el estado de la aplicación global es Redux.

## Cómo funciona Redux

Redux es un marco de gestión de estado que se basa en la idea de representar el estado global de la aplicación como una función reductora.

En Redux, para administrar el estado, definimos una función que acepta dos argumentos: `state`, para el estado anterior, y `action`, el objeto que describe la actualización del estado.

```javascript
function reducer(state = "", action: Action) {
  switch (action.type) {
    case "SET_VALUE":
      return action.payload;
    default:
      return state;
  }
}
```

Este reductor representa un valor de tipo cadena. Maneja solo un tipo de acción: `SET_VALUE`.

Si el tipo de campo de acción recibido no es `SET_VALUE`, el reductor devuelve el estado sin cambios.

Después de tener el reductor, creamos la `store`(tienda) usando el método redux `createStore`.

```javascript
const store = createStore(reducer, "Initial Value");
```

La `store` proporciona un método de suscripción que nos permite suscribirnos a las actualizaciones de la `store`.

```javascript
store.subscribe(() => {
  const state = store.getState();
  console.log(state);
});
```

Aquí, le hemos pasado un callback que registra el valor del estado en la consola.

Para actualizar el estado, despachamos(`dispatch`) una acción:

```javascript
store.dispatch({
  type: "SET_VALUE",
  payload: "New value",
});
```

Aquí pasamos un objeto que representa la acción(`action`). Se requiere que cada acción tenga el campo de `type` y opcionalmente, `payload`.

Por lo general, en lugar de crear acciones en el lugar, las personas definen `action creator functions`:

```javascript
const setValue = (value) => ({
  type: "SET_VALUE",
  payload: value,
});
```

Y esta es la esencia de Redux.

## ¿Por qué no podemos usar el hook useReducer en lugar de Redux?

Desde la versión 16.8, React admite Hooks. Uno de ellos, `useReducer`, funciona de manera muy similar a Redux.

Es fácil administrar el estado de la aplicación usando una combinación de `useReducer` y React Context API.

Entonces, ¿por qué necesitamos Redux si tenemos una herramienta nativa que también nos permite representar el estado como un reductor? Si lo ponemos a disposición en toda la aplicación mediante la API de contexto, ¿no será suficiente?

Redux ofrece algunas ventajas importantes:

- **Herramientas del navegador**: pueded usar [Redux DevTools](https://github.com/reduxjs/redux-devtools) para depurar tu código Redux. Est nos permite ver la lista de acciones enviadas, inspeccionar el estado e incluso viajar en el tiempo. Puede alternar en el historial de acciones y ver cómo el estado se ocupó de cada uno de ellos.
- **Manejo de efectos secundarios**: con `useReducer`, debes inventar tus propias formas de organizar el código que realiza las solicitudes de red. Redux proporciona la [API de middleware](https://redux.js.org/tutorials/fundamentals/part-4-store) para manejar eso. Además, existen herramientas como [Redux Thunk](https://github.com/reduxjs/redux-thunk) que facilitan aún más esta tarea.
- **Pruebas**: como Redux se basa en funciones puras, es fácil de probar. Todas las pruebas se reducen a verificar la salida con las entradas dadas.
- **Patrones y organización de código**: Redux está bien estudiado y hay recetas y mejores prácticas que puede aplicar. Existe una metodología llamada [Ducks](https://github.com/erikras/ducks-modular-redux) que puedes usar para organizar el código Redux.

## Construyendo con Redux

Ahora que ha visto ejemplos de lo que hace Redux y cómo funciona, está listo para usarlo en un proyecto real.

![Profile](https://res.cloudinary.com/khriztianmoreno/image/upload/c_scale,w_148/v1591324337/KM-brand/stickers/sticker-3_2x.png)

### @khriztianmoreno

Hasta la próxima.
