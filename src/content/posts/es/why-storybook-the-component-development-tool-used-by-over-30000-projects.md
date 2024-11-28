---
title: Por qué Storybook? la herramienta de desarrollo de componentes utilizada por más de 30,000 proyectos
tags:
  - javascript
  - storybook
  - react
date: 2022-08-22 10:32:44
updated: 2022-08-22 10:32:44
---

Storybook es una herramienta para desarrollar componentes e interfaces de usuario más rápido que nunca. **Storybook** es increíblemente versátil: puedes usarlo con una variedad de librerías y frameworks de JavaScript, no solo React. Está disponible para Vue, React, Svelte, Angular y Ember.js.

![Storybook](https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F7p151chhlrxzgri6q93t.jpeg)

Si has estado desarrollando tus componentes a la antigua usanza, en tu editor de texto o IDE, una herramienta como Storybook te permite desbloquear una mayor productividad al desarrollar componentes. A continuación, aprenderád qué es Storybook, cómo funciona y si es adecuado para tu equipo.

## Los problemas de desarrollar componentes de forma tradicional

Comencemos observando la fricción involucrada con el proceso típico de desarrollo de componentes:

1. Recibes una tarea para desarrollar una función: digamos que es un formulario en la página de pago.
2. Luego, debes configurar el entorno de desarrollo: conectarse a la VPN, ejecutar el backend, ejecutar el frontend, etc.
3. Finalmente, llega a la página en la que vivirá el feature (característica).

Es engorroso navegar entre varias páginas, completar formularios y hacer clic en botones cada vez que tiene que llegar a donde debería estar la función. A veces, sus componentes tienen varios estados, por ejemplo, `loading`, `success`, y `error`. No siempre es fácil replicar todos los estados de un componente, lo que lo lleva a modificar el código del componente solo para forzar un estado específico.

## Storybook aísla tus componentes: depuración de componentes más fácil

Es posible que haya pasado por estas situaciones y se haya encontrado con el dolor que implica este tipo de flujo de trabajo de desarrollo de componentes.

La mayor parte del tiempo, mientras desarrollas, deseas concentrarte en el componente que estás creando, por lo que otros elementos en una página se vuelven ruido. Tener una forma de acceder rápidamente a cualquier componente o función, y también poder simular todos los casos de uso, es increíblemente beneficioso y te ahorra mucho tiempo.

Storybook te brinda este tipo de aislamiento de componentes para que puedas trabajar solo en el componente que tienes en mente, sin tener que interactuar con otros componentes.

## ¿Qué es Storybook?

Storybook es una herramienta de código abierto que te ayuda a desarrollar componentes de interfaz de usuario de forma aislada. Se ejecuta en tu base de código, pero por separado de tu aplicación, por lo que funciona como una caja de arena, lo que permite a los desarrolladores no distraerse con API incompletas, datos inestables y otras dependencias externas. Se integra con marcos como React, Vue, Svelte, Angular y otros.

Piense en Storybook como un libro real, con un índice de páginas que se vincula a los componentes de la interfaz de usuario. Cada componente tiene historias (**stories**) que contar sobre sí mismo, y estas historias representan los diferentes **estados** de la interfaz de usuario de ese componente. Independientemente de la situación, incluso si está desconectado, podrás acceder a esa página y encontrar y jugar fácilmente con los componentes.

Debido a sus ventajas de productividad y colaboración, Storybook es utilizado por más de [30_000 proyectos de código abierto](https://storybook.js.org/blog/state-of-storybook-2019/), especialmente bibliotecas de componentes. Sin embargo, muchas empresas de tecnología, como Airbnb, Atlassian y JetBrains, se encuentran entre sus usuarios.

## ¿Para quién es Storybook?

Algunas personas parecen pensar que Storybook es una herramienta solo para desarrolladores de bibliotecas de componentes y eso ciertamente no lo es.

Storybook nos ayuda a construir desde el componente más simple y atómico, como un botón o un input, hasta características complejas o páginas completas.

Dado que Storybook nos ayuda a resumir la interfaz de usuario de las aplicaciones, los **diseñadores** y los **QA** pueden beneficiarse de ello. Con Storybook, puedes facilitar el desarrollo de un sistema de diseño y compartir un solo lenguaje con los diseñadores. Los QA pueden obtener una descripción general y probar las funcionalidades de forma aislada. Storybook incluso se puede usar para demostrar la funcionalidad a las partes interesadas, como si fuera un demo.

Muchas empresas han hecho públicos sus Storybooks. No son solo inspiración, sino una guía de aprendizaje para equipos nuevos en Storybook y puedes encontrar una [lista de Storybooks públicos aquí](https://storybook.js.org/showcase).

## Como funciona

Desde un aspecto técnico, Storybook es esencialmente una aplicación React que se ejecuta en tu base de código, por separado de tu aplicación principal. Lo inicia ejecutando un comando CLI. Buscará archivos en tu base de código que contengan una extensión `.stories.*`, reunirá todos esos componentes y los mostrará en una interfaz de usuario agradable.

Supongamos que estás creando, por ejemplo, una tarjeta de restaurante. Tendría un archivo `RestaurantCard.stories.tsx`, que representa el componente con propiedades simuladas para cada escenario.

Es importante tener en cuenta que Storybook no produce ningún código de producción. Tus archivos `.stories.tsx` se utilizan únicamente con fines de desarrollo.

¡Espero que esto haya sido útil y/o te haya hecho aprender algo nuevo!

![Profile](https://res.cloudinary.com/khriztianmoreno/image/upload/c_scale,w_148/v1591324337/KM-brand/stickers/sticker-3_2x.png)

### @khriztianmoreno
