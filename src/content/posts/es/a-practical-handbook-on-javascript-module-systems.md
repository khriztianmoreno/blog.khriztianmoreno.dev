---
title: Un manual práctico sobre los sistemas de módulos de JavaScript
tags:
  - javascript
  - web-development
date: 2022-06-12 15:34:36
updated: 2022-06-12 15:34:36
---

Hoy te daré una introducción práctica sobre los sistemas de módulos que usamos cuando construimos bibliotecas en JavaScript. A medida que una aplicación web o biblioteca crece y se agregan más funciones, la modularización del código mejora la legibilidad y el mantenimiento. Esta guía rápida le dará una visión incisiva de las opciones disponibles para crear y consumir módulos en JavaScript.

![JavaScript Module Systems](https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F276byz01crxajk5sxvyq.png)

Si alguna vez se ha preguntado cuáles son los pros y los contras de AMD, ESM o CommonJS, esta guía le brindará la información que necesita para elegir con confianza entre todas las opciones.

## Una historia de módulos de JavaScript

Sin funciones nativas integradas para espacios de nombres y módulos en las primeras versiones del lenguaje JavaScript, se han introducido diferentes formatos de módulo a lo largo de los años para llenar este vacío.

Los más notables, que le mostraré cómo usar en su código JavaScript a continuación, son:

- Expresión de función inmediatamente invocada (IIFE)
- CommonJS (CJS)
- Definición de módulo asíncrono (AMD)
- Definición de módulo universal (UMD)
- Módulos ECMAScript (ESM)

La selección de un sistema de módulos es importante al desarrollar una biblioteca de JavaScript. Para los autores de bibliotecas, la elección del sistema de módulos para su biblioteca afecta la adopción por parte del usuario y la facilidad de uso. Querrá estar familiarizado con todas las posibilidades.

### 1. Expresión de función inmediatamente invocada (IIFE) - Immediately Invoked Function Expression

Una de las primeras formas de exponer bibliotecas en el navegador web, las **expresiones de función invocadas inmediatamente** (IIFE) son funciones anónimas que se ejecutan inmediatamente después de ser definidas.

```javascript
(function () {
  // Module's Implementation Code
})();
```

Un patrón de diseño común que aprovecha los IIFE es el **patrón Singleton**, que crea una única instancia de objeto y código de espacios de nombres. Este objeto sirve como un único punto de acceso a un grupo específico de funciones. Para ver ejemplos del mundo real, no busque más allá del objeto [Math](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math) o la biblioteca [jQuery](https://jquery.com/).

#### Pros

Escribir módulos de esta manera es conveniente y compatible con navegadores más antiguos. De hecho, puede concatenar y agrupar de forma segura varios archivos que contienen IIFE sin preocuparse por las colisiones de nomenclatura y alcance.

#### Contras

Sin embargo, los módulos IIFE se cargan sincrónicamente, lo que significa que ordenar correctamente los archivos del módulo es fundamental. De lo contrario, la aplicación se romperá. Para proyectos grandes, los módulos IIFE pueden ser difíciles de administrar, especialmente si tiene muchas dependencias superpuestas y anidadas.

### 2. CommonJS (CJS)

El sistema de módulos predeterminado de [Node.js](https://nodejs.org/), **CommonJS** (CJS) usa la sintaxis require para importar módulos y la sintaxis`module.exports` y `export` para exportaciones predeterminadas y con nombre, respectivamente. Cada archivo representa un módulo y todas las variables locales del módulo son privadas, ya que Node.js envuelve el módulo dentro de un contenedor de funciones.

Por ejemplo, este módulo ..

```javascript
const { PI, pow } = Math;

function calculateArea(radius) {
  return PI * pow(radius, 2);
}

module.exports = calculateArea;
```

Se convierte en ...

```javascript
(function (exports, require, module, __filename, __dirname) {
  const { PI, pow } = Math;

  function calculateArea(radius) {
    return PI * pow(radius, 2);
  }

  module.exports = calculateArea;
});
```

El módulo no solo tiene sus variables dentro del ámbito privado, sino que aún tiene acceso global a, `exports`, `require` y `module`. `__filename` y `__dirname` tienen el ámbito del módulo y contienen el nombre del archivo y el nombre del directorio del módulo, respectivamente.

La sintaxis requerida le permite importar módulos incorporados de Node.js o módulos de terceros instalados localmente

#### Pros

Las sentencias `require` de CommonJS son síncronas, lo que significa que los módulos de CommonJS se cargan de forma síncrona. Siempre que sea el único punto de entrada de la aplicación, CommonJS automáticamente sabe cómo ordenar los módulos y manejar las dependencias circulares.

#### Contras

Al igual que los IIFE, CommonJS no se diseñó para generar paquetes de tamaño pequeño. El tamaño del paquete no se tuvo en cuenta en el diseño de CommonJS, ya que CommonJS se utiliza principalmente para desarrollar aplicaciones del lado del servidor. Para las aplicaciones del lado del cliente, el código debe descargarse primero antes de ejecutarlo. La falta de agitación de árboles convierte a CommonJS en un sistema de módulos no óptimo para aplicaciones del lado del cliente.

### 3. Definición de módulo asíncrono (AMD) - Asynchronous Module Definition

A diferencia de IIFE y CommonJS, **Asynchronous Module Definition** (AMD) carga módulos y sus dependencias de forma asincrónica. Con origen en Dojo Toolkit, AMD está diseñado para aplicaciones del lado del cliente y no requiere herramientas adicionales. De hecho, todo lo que necesita para ejecutar aplicaciones siguiendo el formato del módulo AMD es la biblioteca [RequireJS](https://requirejs.org/), un cargador de módulos en el navegador. Eso es. Aquí hay un ejemplo simple que ejecuta una aplicación React simple, estructurada con AMD, en el navegador.

```html
<!-- index.html -->
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta
      name="viewport"
      content="width=device-width,
      initial-scale=1.0"
    />
    <title>React + AMD</title>
  </head>
  <body>
    <div id="root"></div>
    <script
      type="text/javascript"
      src="https://cdnjs.cloudflare.com
       /ajax/libs/require.js/2.3.6
       /require.min.js"
    ></script>
    <script type="text/javascript" src="main.js"></script>
  </body>
</html>
```

A continuación, este es el aspecto de JavaScript.

```javascript
// main.js
requirejs.config({
  paths: {
    react:
      "https://unpkg.com/react@15.3.2
      /dist/react",
    "react-dom":
      "https://unpkg.com
      /react-dom@15.3.2
      /dist/react-dom",
  },
});

requirejs(
  ["react", "react-dom"],
  (React, ReactDOM) => {
    ReactDOM.render(
      React.createElement(
        "p",
        {},
        "Greetings!"
      ),
      document.getElementById("root")
    );
  }
);
```

Llamar a los métodos `requirejs` o `define` registra la función de fábrica (la función anónima pasada como segundo argumento a estos métodos). AMD ejecuta esta función solo después de que se hayan cargado y ejecutado todas las dependencias.

#### Pros

AMD permite definir varios módulos dentro de un solo archivo y es compatible con navegadores más antiguos.

#### Contras

AMD no es tan popular como los formatos de módulos más modernos, como los módulos ECMAScript y la definición de módulo universal.

### 4. Definición de módulo universal (UMD) - Universal Module Definition

Para las bibliotecas que admiten entornos del lado del cliente y del lado del servidor, la **Definición de módulo universal** (UMD) ofrece una solución unificada para hacer que los módulos sean compatibles con muchos formatos de módulo diferentes, como CommonJS y AMD.

Aquí está UMD en acción desde la biblioteca de desarrollo de [React](https://unpkg.com/react@17.0.2/umd/react.development.js)

```javascript
(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    // Checks for RequireJS's
    // `define` function.
    // Register as an anonymous module.
    define(["exports"], factory);
  } else if (
    typeof exports === "object" &&
    typeof exports.nodeName !== "string"
  ) {
    // Checks for CommonJS.
    // Calls the module factory
    // immediately.
    factory(exports);
  } else {
    // Register browser globals.
    global = root || self;
    factory((global.React = {}));
  }
})(this, function (exports) {
  "use strict";

  // Place React's module code here.
  // ...
});
```

- Si el IIFE detecta una función de definición en el alcance global y una propiedad amd en la definición, entonces ejecuta el módulo como un módulo AMD.
- Si el IIFE detecta un objeto de exportación en el ámbito global y una propiedad `nodeName` dentro de las exportaciones, entonces ejecuta el módulo como un módulo CommonJS.

#### Pros

Independientemente de si una aplicación consume su biblioteca como un módulo CommonJS, AMD o IIFE, UMD verifica condicionalmente el formato del módulo que se está utilizando en tiempo de ejecución y ejecuta código específico para el formato del módulo detectado.

#### Contras

El código de la plantilla UMD es un IIFE de aspecto intimidante y su uso es inicialmente un desafío. Sin embargo, UMD en sí no es conceptualmente complicado.

### 5. Módulos ECMAScript (ESM)

Los **módulos ECMAScript** (ESM), el formato de módulo introducido más recientemente, es la forma estándar y oficial de manejar módulos en JavaScript. Este formato de módulo se usa comúnmente en aplicaciones TypeScript.

Al igual que CommonJS, ESM proporciona varias formas de exportar código: exportaciones predeterminadas o exportaciones con nombre.

```javascript
// circle.js
export function calculateArea() {
  return Math.PI * Math.pow(radius, 2);
}

export function calculateCircumference() {
  return 2 * Math.PI * radius;
}
```

La importación de estas exportaciones nombradas por separado le dice al paquete de módulos qué partes del módulo importado deben incluirse en el código generado. Se omiten todas las exportaciones con nombre no importadas. Esto reduce el tamaño de la biblioteca, lo cual es útil si su biblioteca se basa en algunos métodos de una biblioteca de utilidades grande como [lodash](https://lodash.com/).

Ahora, en algún archivo en el mismo directorio que `./circle.js`, necesitaríamos el módulo de la siguiente manera.

```javascript
const { calculateArea, calculateCircumference } = require("./circle");

console.log(calculateArea(5));
console.log(calculateCircumference(5));
```

#### Pros

Los paquetes de módulos son compatibles con ESM y optimizan el código mediante técnicas como la agitación de árboles (elimina el código no utilizado del resultado final), que no son compatibles con otros formatos de módulo. La carga y análisis de módulos es asincrónica, pero su ejecución es sincrónica.

#### Contras

Este es el sistema de módulos principales más nuevo. Como tal, algunas bibliotecas aún no lo han adoptado.

## Creación de tu propia biblioteca de React/JavaScript

Como puede imaginar, elegir el sistema de módulos correcto se vuelve importante al crear tu propia biblioteca React. Personalmente con el uso hoy en dia de herramientas como [babel.js](https://babeljs.io/) podriamos trabajar con modulos de ECMAScript, pero yo soy partidario de usar CommonJS en Node y ECMAScript Modules (ESM) en el frontend.

![Profile](https://res.cloudinary.com/khriztianmoreno/image/upload/c_scale,w_148/v1591324337/KM-brand/stickers/sticker-3_2x.png)

#### @khriztianmoreno
