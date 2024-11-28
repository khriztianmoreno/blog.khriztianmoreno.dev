---
title: Hacks for effective Fullstack development with React and Node
tags:
  - javascript
  - nodejs
  - react
date: 2023-04-17 14:48:03
updated: 2023-04-17 14:48:03
---

Hoy te mostraré un flujo de trabajo óptimo para un desarrollo efectivo con Node.js y React. Si alguna vez ha trabajado en un proyecto con varios archivos package.json, es posible que conozca el dolor de hacer malabarismos con varias pestañas de terminal, recordar qué comandos inician qué servidor o manejar los errores de CORS.

Afortunadamente, hay algunas herramientas disponibles que pueden aliviar algunos de estos dolores de cabeza.

![Fullstack](https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Frxkee805brf1oiwr2abu.png)

## Configuración de Monorepo para React y Node

Digamos que estamos trabajando en un [monorepo ](https://en.wikipedia.org/wiki/Monorepo)con dos archivos `package.json`: uno está en un directorio `client` para un front-end de React impulsado por [Create React App](https://create-react-app.dev/), y uno está en la raíz del repositorio para un back-end de Node que expone un API que utiliza nuestra aplicación React. Nuestra aplicación React se ejecuta en `localhost:3000` y nuestra aplicación Node se ejecuta en `localhost:8080`. Ambas aplicaciones se inician con `npm start`

Dado que tenemos dos archivos `package.json`, esto significa que para que nuestro front-end y back-end estén en funcionamiento, debemos asegurarnos de haber ejecutado `npm install` y `npm start` tanto en el directorio raíz como en el directorio del cliente. Así es como simplificamos esto.

## 1. Ejecutar dos servidores al mismo tiempo

Una mejora que podemos hacer en nuestro flujo de trabajo de desarrollo es agregar una herramienta de compilación para ejecutar varios comandos **npm** al mismo tiempo para ahorrarnos la molestia de ejecutar `npm start` en varias pestañas de terminal. Para hacer esto, podemos agregar un paquete npm llamado [concurrently](https://www.npmjs.com/package/concurrently) a la raíz de nuestro proyecto.

En la raíz de nuestro proyecto, lo instalaremos como una dependencia de desarrollo.

```shell
npm install -D concurrently
```

Luego, en nuestras secuencias de comandos root `package.json`, actualizaremos nuestra secuencia de comandos `start` para usarlas simultáneamente.

```json
{
  "name": "my-app",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "concurrently --kill-others-on-fail npm run server npm run client",
    "server": "node index.js",
    "client": "cd client && npm start"
  },
  "dependencies": {
    "express": "^4.17.1"
  },
  "devDependencies": {
    "concurrently": "^6.0.1"
  }
}
```

Ahora, tenemos tres scripts npm:

- `npm run server` inicia nuestra aplicación Node,
- `npm run client` ejecuta `npm start` en el directorio del _client_ para iniciar nuestra aplicación React,
- `npm start` ejecuta `npm run server` y `npm run client` al mismo tiempo.

## 2. Instalar las dependencias de front-end y back-end con un solo comando

Otro aspecto de nuestro flujo de trabajo que podemos mejorar es la instalación de dependencias. Actualmente, necesitamos ejecutar manualmente `npm install` para cada archivo `package.json` que tenemos al configurar el proyecto. En lugar de pasar por esa molestia, podemos agregar un [postinstall script](https://docs.npmjs.com/cli/v7/using-npm/scripts) a nuestro `package.json` raiz para ejecutar automáticamente `npm install` en el directorio del _client_ después de que la instalación haya finalizado en el directorio raíz.

```json
{
  "name": "my-app",
  "scripts": {
    ...,
    "postinstall": "cd client && npm install"
  },
}
```

Ahora, cuando instalamos nuestro monorepo, todo lo que tenemos que hacer para ponerlo en marcha es ejecutar `npm install` y luego `npm start` en la raíz del proyecto. No es necesario ingresar a ningún otro directorio para ejecutar otros comandos.

## 3. Solicitudes API proxy desde el back-end

Como mencione anteriormente, nuestro back-end de Node expone los endpoints del API que utilizara nuestra aplicación React. Digamos que nuestra aplicación Node tiene un endpoint `/refresh_token`.

Fuera de la caja, si intentáramos enviar una solicitud GET a `http://localhost:8080/refresh_token` desde nuestra aplicación React en `http://localhost:3000`, nos encontraríamos con problemas de CORS. [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) significa intercambio de recursos de origen cruzado.

Por lo general, cuando encuentra errores de CORS, es porque está tratando de acceder a los recursos de otro dominio (es decir, `http://localhost:3000` y `http://localhost:8080`), y el dominio del que está solicitando recursos no está permitido.

Para decirle al servidor de desarrollo que envíe por proxy cualquier solicitud desconocida a nuestro servidor API en desarrollo, podemos configurar un [proxy](https://create-react-app.dev/docs/proxying-api-requests-in-development) en el archivo `package.json` de nuestra aplicación React. En `client/package.json`, agregaremos un proxy para `http://localhost:8080` (donde se ejecuta nuestra aplicación Node).

```json
{
  "name": "client-app",
  "proxy": "http://localhost:8080",
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  ...
}
```

Ahora, si reiniciamos el servidor y configuramos una solicitud al endPoint `/refresh_token` de nuestra aplicación Node (sin `http://localhost:8080`) usando [fetch()](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch), el error CORS debería resolverse.

```javascript
fetch("/refresh_token")
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch((err) => console.error(err));
```

La próxima vez que trabaje en un proyecto monorepo como este, pruebe estos tres consejos para optimizar su flujo de trabajo de desarrollo.

¡Eso es todo amigxs! ¡Espero que esto te ayude a convertirte en un o una mejor dev!

![Profile](https://res.cloudinary.com/khriztianmoreno/image/upload/c_scale,w_148/v1591324337/KM-brand/stickers/sticker-3_2x.png)

### @khriztianmoreno

Hasta la próxima.
