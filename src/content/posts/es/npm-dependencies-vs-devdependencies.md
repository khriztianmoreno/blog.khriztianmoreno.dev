---
title: NPM dependencies vs devDependencies
tags:
  - javascript
  - web-development
  - npm
date: 2022-06-20 16:01:14
updated: 2022-06-20 16:01:14
---

## tl;dr

Las `dependencies` son requeridas por nuestra aplicación en tiempo de ejecución. Paquetes como `react`, `redux` y `lodash` son todos ejemplos de dependencias. Las `devDependencies` solo son necesarias para desarrollar o compilar su aplicación. Paquetes como `babel`, `enzyme` y `prettier` son ejemplos de devDependencies.

![NPM dependencies vs devDependencies](https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Ffvog41kjb51b3zesnmce.jpeg)

## npm install

La diferencia real entre `dependencies` y `devDependencies` se ve cuando ejecuta `npm install`.

Si ejecuta `npm install` desde un directorio que contiene un archivo `package.json` (lo que normalmente hace después de clonar un proyecto, por ejemplo).

✅ Se instalarán todos los paquetes ubicados en `dependencies`
✅ Se instalarán todos los paquetes ubicados en `devDependencies`

Si ejecuta `npm install <package-name>` (lo que normalmente hace cuando desea agregar un nuevo paquete aL proyecto existente), es decir, `npm install react`.

✅ Se instalarán todos los paquetes ubicados en `dependencies`
❌ No se instalará ninguno de los paquetes ubicados en `devDependencies`

## Dependencias transitivas

Si el paquete A depende del paquete B y el paquete B depende de C, entonces el paquete C es una dependencia transitiva del paquete A. Lo que eso significa es que para que el paquete A se ejecute correctamente, necesita el paquete B instalado. Sin embargo, para que el paquete B se ejecute correctamente, es necesario que esté instalado el paquete C. ¿Por qué menciono esto? Bueno, las `dependencies` y `devDependencies` también tratan las dependencias transitivas de manera diferente.

Cuando ejecutas `npm install` desde un directorio que contiene un archivo `package.json`:

- `dependencies` ✅ Descarga todas las dependencias transitivas.
- `devDependencies` ❌ No descarga ninguna dependencia transitiva.

## Especificar dependencies frente a devDependencies

A partir de NPM 5, cuando ejecuta `npm install <package-name>`, ese paquete se guardará automáticamente dentro de sus `dependencies` en su archivo `package.json`. Si quisiera especificar que el paquete específico debería incluirse en `devDependencies` en su lugar, agregaría la marca `--save-dev`.

```shell
npm install prettier --save-dev
```

## Instalación en un servidor de producción

A menudo, necesitará instalar su proyecto en un servidor de producción. Cuando haga eso, no querrá instalar `devDependencies` ya que obviamente no las necesitará en su servidor de producción. Para instalar solo las `dependencies` (y no `devDependencies`), puede usar la marca `--production`.

```shell
npm install --production
```

¡Espero que esto haya sido útil y/o te haya hecho aprender algo nuevo!

![Profile](https://res.cloudinary.com/khriztianmoreno/image/upload/c_scale,w_148/v1591324337/KM-brand/stickers/sticker-3_2x.png)

### @khriztianmoreno
