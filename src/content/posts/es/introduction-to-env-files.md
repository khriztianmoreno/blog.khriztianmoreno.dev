---
title: Introducción a los archivos .env
tags:
  - javascript
  - web-development
  - programming
date: 2023-03-09 14:35:51
updated: 2023-03-09 14:35:51
---

Imagínate tener que pagar cerca de $148 millones por una violación de datos que expuso los datos de unos 57 millones de usuarios 😱😰

Pues eso fue lo que le sucedio a Uber, no hace mucho tiempo, y el culpable fue nada más y nada menos que un secreto codificado publicado abiertamente para que cualquier mal actor lo explote.

Por eso en este post, vamos a conocer que son y como podríamos trabajarlos en nuestros proyecto con javascript.

![env](https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fxnr6sdobejyg1fzpld5s.png)

## Contexto

Hoy en día, millones de desarrolladores de software mantienen sus secretos (es decir, credenciales como claves de acceso y tokens a los servicios utilizados por los programas) seguros con archivos `.env`.

Para aquellos que no estén familiarizados con el tema, los archivos `.env` se introdujeron en 2012 como parte de una solución al problema del secreto codificado mencionado en el párrafo introductorio anterior.

En lugar de enviar los secretos junto con su código base a la nube, los desarrolladores ahora podrían enviar su código base a la nube y mantener sus secretos separados en sus máquinas en formato clave-valor en archivos `.env`; esta separación redujo el riesgo de que los malos actores tuvieran en sus manos las credenciales confidenciales en la nube.

Para ejecutar programas, los desarrolladores ahora solo tendrían que jalar su código base más reciente del repositorio remoto e inyectar los secretos contenidos en sus archivos `.env` locales en el código jalado.

A menos que un equipo de desarrollo sea pequeño y "desigual", que no se preocupe mucho por DevOps, normalmente mantiene múltiples "entornos" para su base de código para garantizar que los cambios se prueben bien antes de enviarse a producción para interactuar con los usuarios finales. En el caso de varios entornos, los desarrolladores pueden optar por emplear varios archivos `.env` para almacenar las credenciales, uno para cada uno de esos entornos (por ejemplo, un archivo `.env` para contener las claves de la base de datos de desarrollo y otro para contener las claves de la base de datos de producción).

Para resumir, los archivos `.env` contienen credenciales en formato clave-valor para los servicios utilizados por el programa que están creando. Están destinados a almacenarse localmente y no cargarse a repositorios de códigos en línea para que todos los lean. Cada desarrollador de un equipo normalmente lleva uno o más archivos `.env` para cada entorno.

## Uso

En este post, veremos cómo usar un archivo `.env` en un proyecto básico, asumiendo que está usando [Node.js](https://nodejs.org/en/) y [git](https://git-scm.com/) para el control de versiones; esto también debería aplicarse a otros lenguajes. Siéntase libre de omitir esta sección si no está interesado en los aspectos técnicos de cómo usar un archivo `.env`.

Para comenzar, diríjase a la raíz de la carpeta de su proyecto y cree un archivo `.env` vacío que contenga las credenciales que le gustaría inyectar en su base de código. Puede verse algo como esto:

```
SECRET_1=924a137562fc4833be60250e8d7c1568
SECRET_2=cb5000d27c3047e59350cc751ec3f0c6
```

A continuación, querrá ignorar el archivo `.env` para que no se confirme en git. Si aún no lo ha hecho, cree un archivo `.gitignore`. Debe tener un aspecto como este:

```
.env
```

Ahora, para inyectar los secretos en su proyecto, puede usar un módulo popular como [dotenv](https://www.npmjs.com/package/dotenv); analizará el archivo `.env` y hará que sus secretos sean accesibles dentro de su base de código bajo el objeto de `process`. Continúe e instale el módulo:

```shell
npm install dotenv
```

Importe el módulo en la parte superior del script de inicio para su base de código:

```javascript
require(‘dotenv’).config()
```

Eso es todo, ahora puede acceder a los secretos en cualquier lugar de su base de código:

```javascript
// display the value of SECRET_1 into your code
console.log(process.env.SECRET_1);
// -> 924a137562fc4833be60250e8d7c1568

// display the value of SECRET_2 into your code
console.log(process.env.SECRET_2);
// -> cb5000d27c3047e59350cc751ec3f0c6
```

Excelente. Ha agregado con éxito un archivo .env a su proyecto con algunos secretos y ha accedido a esos secretos en su base de código. Además, cuando envías tu código a través de git, tus secretos permanecerán en tu máquina.

## Desafíos

Aunque simples y potentes, los archivos `.env` pueden ser problemáticos cuando se administran de manera incorrecta en el contexto de un equipo más grande.

Imagine tener que distribuir y rastrear cientos de claves a su equipo de desarrollo de software.

En un nivel simplificado, entre **Developer_1** y **Developer_2**, esto es lo que podría pasar:

- **Developer_1** podría agregar una clave API a su archivo `.env` local y olvidarse de informar a **Developer_2** para que la agregue al suyo; esto le costó a **Developer_2** 15 minutos en el futuro depurando por qué su código se bloquea solo para darse cuenta de que se debe a la clave API faltante.
- **Developer_2** podría pedirle a **Developer_1** que le envíe la clave API para que pueda agregarla a su archivo `.env`, después de lo cual **Developer_1** puede optar por enviarla por mensaje de texto o correo electrónico; esto ahora pone innecesariamente a su organización en riesgo de que los malos actores como **Developer_2** esperen precisamente para interceptar la clave API.

Desafortunadamente, estos desafíos son comunes e incluso tienen un nombre: [secret sprawl](https://www.gitguardian.com/glossary/secret-sprawl-definition) (expansión secreta).

En los últimos años, muchas empresas han intentado solucionar este problema. [HashiCorp Vault](https://www.vaultproject.io/) es un producto que almacena secretos de forma segura para grandes empresas; sin embargo, es demasiado costoso, engorroso y francamente excesivo para configurarlo para el desarrollador promedio que solo necesita una forma rápida y segura de almacenar estos secretos.

Existen soluciones más simples, como [Doppler](https://www.doppler.com/) y el nuevo [dotenv-vault](https://dotenv.org/vault?r=1), pero a menudo carecen de la infraestructura de seguridad necesaria para obtener una adopción masiva.

Déjame en los comentarios cuales herramientas o servicios utilizas para solucionar de mara fácil y segura el [secret sprawl](https://www.gitguardian.com/glossary/secret-sprawl-definition) (expansión secreta).

¡Eso es todo amigxs! ¡Espero que esto te ayude a convertirte en un o una mejor dev!

![Profile](https://res.cloudinary.com/khriztianmoreno/image/upload/c_scale,w_148/v1591324337/KM-brand/stickers/sticker-3_2x.png)

@khriztianmoreno 🚀
