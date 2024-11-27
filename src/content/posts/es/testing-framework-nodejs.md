---
title: Testing framework - Node.js
tags:
  - javascript
  - testing
  - nodejs
date: 2020-04-17 14:08:03
updated: 2020-04-17 14:08:03
---

Una vez que una aplicación se está ejecutando en producción, puede darnos miedo hacer cambios. ¿Cómo sabemos que una nueo feature, un fix o un refactor no romperá la funcionalidad existente?

Podemos usar nuestra aplicación manualmente para tratar de encontrar errores, pero sin mantener una lista de verificación exhaustiva, es poco probable que cubramos todos los posibles puntos de falla. Y, sinceramente, incluso si lo hiciéramos, llevaría demasiado tiempo ejecutar nuestra aplicación completa después de cada commit.

Al usar un framework de testing, podemos **escribir código que verifique que nuestro código anterior aún funciona**. Esto nos permite realizar cambios sin temor a romper la funcionalidad esperada.

Pero hay muchos frameworks de testing diferentes, puede ser difícil saber cuál usar. A continuación, voy a hablar sobre tres de ellos para Node.js:

- [Tape](https://github.com/substack/tape)
- [Ava](https://github.com/avajs/ava)
- [Jest](https://jestjs.io)

## TAPE

Este deriva su nombre de su capacidad para proporcionar resultados estructurados a través de [TAP](https://testanything.org/) (Test Anything Protocol). La salida de nuestro runner es amigable para los humanos, pero otros programas y aplicaciones no la pueden analizar fácilmente. El uso de un protocolo estándar permite una mejor interoperabilidad con otros sistemas.

Además, Tape tiene varios métodos de conveniencia que nos permiten omitir y aislar pruebas específicas, así como verificar expectativas adicionales como errores, _deep equality_ y _throwing_.

En general, la ventaja de Tape es su simplicidad y velocidad. Es un arnés sólido y sencillo que hace el trabajo sin una curva de aprendizaje empinada.

Así es como se ve una prueba básica con tape:

```javascript
const test = require("tape");

test("timing test", (t) => {
  t.plan(2);

  t.equal(typeof Date.now, "function");
  const start = Date.now();

  setTimeout(function () {
    t.equal(Date.now() - start, 100);
  }, 100);
});
```

Y si lo ejecutamos, se ve así:

```shell
$ node example/timing.js
TAP version 13
# timing test
ok 1 should be strictly equal
not ok 2 should be strictly equal
  ---
    operator: equal
    expected: 100
    actual:   107
  ...

1..2
# tests 2
# pass  1
# fail  1
```

El método `test()` espera dos argumentos: el nombre de la prueba y la función de prueba. La función de prueba tiene el objeto `t` como argumento, y este objeto tiene métodos que podemos usar para aserciones: `t.ok()`, `t.notOk()`, `t.equal()` y `t.deepEqual()` solo para nombrar un pocos.

## AVA

AVA tiene una API concisa, salida de error detallada, abarca nuevas características de lenguaje y tiene aislamiento de proceso para ejecutar pruebas en paralelo. AVA está inspirado en la sintaxis de Tape y admite la generación de informes a través de TAP, pero se desarrolló para ser más obstinado, proporcionar más funciones y poder ejecutar pruebas al mismo tiempo.

AVA solo ejecutará pruebas `ava binary`. Con _Tape_ podríamos ejecutar `node my-tape-test.js`, pero con AVA primero debemos asegurarnos de que: AVA esté instalado globalmente y disponible en la línea de comandos (por ejemplo, `npm i -g ava`).

Además, AVA es exigente acerca de cómo se nombran los archivos de prueba y no se ejecutará a menos que el archivo termine con "test.js".

Una cosa que debe saber sobre AVA es que por defecto ejecuta pruebas en paralelo. Esto puede acelerar muchas pruebas, pero no es ideal en todas las situaciones. Cuando las pruebas que leen y escriben en la base de datos se ejecutan simultáneamente, pueden afectarse entre sí.

AVA también tiene algunas funciones útiles de ayuda que facilitan la configuración y el desmontaje: métodos `test.before()` y `test.after()` para la configuración y limpieza.

AVA también tiene métodos `test.beforeEach()` y `test.afterEach()` que se ejecutan antes o después de cada prueba. Si tuviéramos que agregar más pruebas de base de datos, podríamos borrar nuestra base de datos aquí en lugar de pruebas individuales.

Así es como se ve una prueba de AVA:

```javascript
const test = require("ava");

test("foo", (t) => {
  t.pass();
});

test("bar", async (t) => {
  const bar = Promise.resolve("bar");
  t.is(await bar, "bar");
});
```

Al iterar en las pruebas, puede ser útil ejecutar AVA en "watch mode". Esto observará tus archivos en busca de cambios y volverá a ejecutar automáticamente las pruebas. Esto funciona particularmente bien cuando creamos primero una prueba fallida. Podemos concentrarnos en agregar funcionalidad sin tener que seguir cambiando para reiniciar las pruebas.

AVA es muy popular y es fácil ver por qué. **AVA es una excelente opción** si estamos buscando algo que nos facilite la ejecución simultánea de pruebas, proporcione helpers como `before()` y `afterEach()` y proporcione un mejor rendimiento por defecto, todo mientras mantiene una API concisa y fácil de entender.

## Jest

Es un framework de pruebas que ha aumentado en popularidad junto con React.js. La documentación de React lo enumeran como la forma recomendada de probar React, ya que permite usar [jsdom](https://github.com/jsdom/jsdom) para simular fácilmente un entorno de navegador. También proporciona funciones para ayudar a simular [módulos](https://jestjs.io/docs/en/manual-mocks) y [temporizadores](https://jestjs.io/docs/en/timer-mocks).

Aunque Jest es muy popular, se usa principalmente para pruebas de front-end. Utiliza Node.js para ejecutarse, por lo que es capaz de probar tanto el código basado en el navegador como las aplicaciones y módulos de Node.js. Sin embargo, tenga en cuenta que el uso de Jest para probar las aplicaciones del lado del servidor Node.js viene con advertencias y configuración adicional.

En general, Jest tiene muchas funcionalidades que pueden ser atractivas. Aquí hay algunas diferencias clave de Tape y AVA:

- **Jest no se comporta como un módulo Node.js normal.**

- El archivo de prueba debe ejecutarse con jest, y varias [funciones se agregan automáticamente al alcance global](https://jestjs.io/docs/en/api) (por ejemplo, `describe()`, `test()`, `beforeAll()` y `expect()`). Esto hace que los archivos de prueba sean "especiales" ya que no siguen la convención de Node.js de usar `require()` para cargar la funcionalidad de _jest_. Esto causará problemas con linters como _standard_ que restringen el uso de globales indefinidos.

- **Jest utiliza su `expect()` global para realizar comprobaciones**, en lugar de afirmaciones estándar. Jest espera que se lea más como inglés. Por ejemplo, en lugar de hacer algo como `t.equal(actual, expected, comment)` con _tape_ y _AVA_, usamos `expect(actual).toBe(expected)`. Jest también tiene modificadores inteligentes que puede incluir en la cadena como [`.not()`](https://jestjs.io/docs/en/expect) (por ejemplo, `expect(actual).not.toBe(unexpected)`).

- **Jest tiene la capacidad de [mockear funciones y módulos](https://jestjs.io/docs/en/mock-functions)**. Esto puede ser útil en situaciones en las que es difícil escribir o cambiar el código que estamos probando para evitar resultados lentos o impredecibles en un entorno de prueba. Un ejemplo en la documentación de Jest es evitar que _axios_ realice una solicitud HTTP real a un servidor externo y, en su lugar, devolver una respuesta preconfigurada.

- **Jest tiene una API mucho más grande** y con muchas más [opciones de configuración](https://jestjs.io/docs/en/configuration). Algunos de ellos **no funcionan bien cuando se realizan pruebas para Node.js**. La opción más importante que debemos establecer es que `testEnvironment` debe ser "node". Si no hacemos esto, _jest_ usa la configuración predeterminada en la que nuestras pruebas se ejecutarán en un entorno similar a un navegador usando _jsdom_.

Así es como se ve una prueba de Jest:

```javascript
const sum = require("./sum");

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});
```

Jest tiene una API mucho más grande y ofrece más funcionalidad que AVA o _tape_. Sin embargo, el mayor alcance no está exento de inconvenientes. Al usar Jest para probar el código Node.js, tenemos que:

- Estar de acuerdo con el uso de globales indefinidos.
- No usar funciones como temporizadores simulados que interfieren con paquetes como `Mongoose`.
- Debemos configurar el entorno correctamente para que no se ejecute en un navegador simulado de forma predeterminada.
- Considere que cierto código puede correr 20-30 veces más lento en Jest en comparación con otros _test runners_.

Muchos equipos elegirán Jest porque ya lo están utilizando en el front-end y no les gusta la idea de tener múltiples _test runners_, o les gustan las características integradas como _mocks_ y no quieren incorporar módulos adicionales. En última instancia, estas compensaciones deben realizarse caso por caso.

## Otras herramientas de prueba

Hay un montón de otras herramientas de prueba como [Istanbul](https://istanbul.js.org/), [nyc](https://github.com/istanbuljs/nyc), [nock](https://www.npmjs.com/package/nock) y [replay](https://www.npmjs.com/package/replay) que no tenemos espacio para entrar aquí.

¡Espero que esto haya sido útil y/o te haya hecho aprender algo nuevo!

![Profile](https://res.cloudinary.com/khriztianmoreno/image/upload/c_scale,w_148/v1591324337/KM-brand/stickers/sticker-3_2x.png)

#### @khriztianmoreno 🚀
