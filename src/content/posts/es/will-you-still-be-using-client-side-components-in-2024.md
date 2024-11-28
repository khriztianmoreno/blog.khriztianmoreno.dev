---
title: ¿Seguirás utilizando componentes del lado del cliente en 2024?
tags:
  - javascript
  - react
  - web-development
date: 2024-02-14 15:23:51
updated: 2024-02-14 15:23:51
---

Me encantan los componentes del servidor. Pero no son para todas las ocasiones. De hecho, usarlos en todas y cada una de las oportunidades que tengas es más como ablandar un bistec con el mismo martillo que usaste para clavar un alfiler.

Dicho esto, también hay algunos casos en los que los componentes del servidor encajan como Cenicienta y su zapato.

## Dashboards & Reports

En el caso de los paneles y los informes, se maximiza el rendimiento al procesar y representar todos los datos en el servidor y, al mismo tiempo, permitir que el cliente haga lo que se suponía que debía hacer en primer lugar.

Si solo usamos componentes del cliente, le estamos descargando más tareas y haciendo que desempeñe más tareas de las que potencialmente puede manejar.

Si procesó y representó los datos en el cliente, pasaría mucho tiempo esperando con un feo spinner burlándose de usted debido a todos los pasos adicionales que el cliente tiene que seguir para lograr el mismo resultado.

Primero, necesitaría obtener los datos de su endpoint, que a su vez tendría que obtener datos de la base de datos, que a su vez tendría que obtener datos de sus registros.

No sólo eso, sino que también hay que esperar pacientemente a que los datos lleguen al cliente, aunque llegue tarde.

Y sólo una vez que llegan, el cliente puede comenzar a procesarlos y mostrárselos al usuario.

Por eso, en este caso, es mejor tener los componentes bloqueados y renderizados directamente en el servidor.

Y luego, el cliente puede obtener todos los widgets que su corazón electrónico desea, todos transmitidos en paralelo, lo que es una forma mucho más rápida y sencilla de realizar negocios.

## Blog Posts

Las publicaciones de blog son algunos de los contenidos más estáticos que puedes encontrar. Después de todo, se trata principalmente de un montón de palabras, en orden, con alguna imagen, gif o meme ocasional aquí y allá.

Con los componentes del servidor, estás renderizando previamente el contenido en el servidor, que es el mejor de los casos en términos de SEO porque se entrega rápido y completo.

Este caso de uso anterior es lo que tiende a desequilibrar a los desarrolladores y confundirlos. Porque las publicaciones de blogs son lo primero en lo que también piensan cuando se trata de SSR. Entonces, si piensan en SSR y componentes de servidor cuando piensan en publicaciones de blog, es natural pensar que ambos son lo mismo o que pueden usarse indistintamente.

Lo cual es total y absolutamente incorrecto y es un pecado digno de arder en el infierno por la eternidad, según mi [blog post anterior](https://dev.to/khriztianmoreno/server-components-vs-server-side-rendering-4ghe).

Pero al mismo tiempo tiene sentido desde el punto de vista de los resultados. Porque aunque sus enfoques son muy diferentes en la práctica, los resultados son bastante similares.

## Server-Side Data Fetching

La obtención de datos del lado del servidor es una excelente manera de darle a su código un impulso de seguridad en caso de que, de lo contrario, revele lógica o claves API que se supone deben permanecer ocultas o si está paranoico con respecto a cada pieza de información que posee.

Puede utilizar este tipo de obtención de datos para acceder no sólo a su base de datos sino también a cualquier otra API que desee. Todo ello siendo astuto.

Sin embargo, hay casos en los que los componentes del servidor **NO** son ideales y, de hecho, deben evitarse.

## Requisitos de alta interactividad

Esta es una redacción elegante para cualquier cosa a la que le haces algo y le devuelves algo. Algo así como gelatina, pero no tanto.

Algo potencialmente más familiar y más acorde con el desarrollo web en sí son elementos como formularios y botones.

Estos componentes a menudo tienen que reaccionar de alguna manera a sus acciones, pueden tener su propio estado y comunicarse con otros componentes en el lado del cliente, lo que los convierte en el eslabón más débil cuando se trata de componentes de servidor.

## Stateful Components

Si lo tomas lo más literalmente posible y usas la definición que hemos estado usando hasta ahora, no hay manera de manejar el estado en un componente del servidor.

Pero si entrecierras los ojos, inclinas la cabeza un poco hacia un lado, desenfocas un poco y respiras profundamente, podrás ver que esto es sólo una verdad a medias.

En otro momento aprenderemos cuáles son los matices, pero por ahora digamos que los componentes del servidor NO tienen acceso al estado. Después de todo, no tienen acceso a hooks relacionados con el estado.

## Conclusión

Los componentes del servidor son una herramienta poderosa para escenarios específicos en el desarrollo web. Utilícelos para mejorar el rendimiento y la seguridad de tareas con uso intensivo de datos. Pero recuerde, es posible que no se adapten a todas las situaciones, especialmente para elementos interactivos o con estado.

![Profile](https://res.cloudinary.com/khriztianmoreno/image/upload/c_scale,w_148/v1591324337/KM-brand/stickers/sticker-3_2x.png)

_@khriztianmoreno_ Hasta la próxima.
