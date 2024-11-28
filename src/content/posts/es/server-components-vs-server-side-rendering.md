---
title: Server Components Vs Server-side Rendering
tags:
  - javascript
  - react
  - web-development
date: 2024-01-28 15:19:16
updated: 2024-01-28 15:19:16
---

¿Sabías que los componentes del servidor y el renderizado del lado del servidor son dos cosas completamente diferentes?

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/gikft6v2xsd073a1il47.jpg)

Y si bien van de la mano en muchos casos, hay igualmente muchos ejemplos en los que puedes y debes usar solo uno de ellos.

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/smpzsmnjj5ckq2g17z85.jpg)

Ahora bien, para ser justos, dada la documentación en línea que la mayoría de los desarrolladores encuentran sobre los componentes del servidor y el renderizado del lado del servidor, el hecho de que asuman que estas dos cosas son iguales no es exactamente una sorpresa.

(Esto también les da la excusa perfecta para evitar los componentes del servidor por completo, en lugar de enfrentar el hecho de que esto es algo que ya deberían saber usar bastante bien y que eventualmente tendrán que aprender de todos modos)

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/chw6m0iyg2ky9cy1xyvx.jpg)

Dicho esto, los componentes del servidor tienen muchas ventajas sobre el renderizado del lado del servidor, especialmente cuando se trata de crear aplicaciones más grandes y complejas.

Hablemos un poco más de las diferencias entre ambos.

## Server-Side Rendering

La representación del lado del servidor representa la página en el servidor. Pero, obviamente, eso no es realmente útil, así que profundicemos un poco más.

La representación del lado del servidor representa la página en el servidor en el **momento de la solicitud**, lo que significa que **cada vez que un cliente realiza una solicitud al servidor**, como cuando un nuevo visitante llega a su página, **el servidor vuelve a representar la misma página** y la envía a el cliente.

Y si bien esto es excelente para SEO, ya que incluso las **páginas más dinámicas aparecen como estáticas a los ojos de los robots que las indexan y las usan para búsquedas**, la representación del lado del servidor tiene muchos pasos entre el cliente que realiza la solicitud al servidor y La página finalmente se carga frente a ti.

Primero, cuando la solicitud llega al servidor, el servidor representa estáticamente la página y la envía de regreso al cliente, donde el usuario obtiene una versión de su página que está desprovista de toda interactividad.

Pero eso no es lo único que el servidor envía al cliente. Junto con el HTML de la página estática, el servidor envía sus condolencias junto con un gran paquete de código React que el cliente deberá ejecutar para que la página vuelva a ser dinámica.

Pero ¿qué pasa cuando el 90% de nuestra página es estática?

Podrías pensar que la respuesta correcta es “prácticamente nada” y no estarías exactamente equivocado, pero al igual que en la clase de Cálculo, pierdes puntos porque esta no es la respuesta que estaba buscando.

En realidad, todavía se envía una gran cantidad de JavaScript al cliente y debe ejecutarse sin cambiar mucho en la página misma.

Esto es una pérdida de tiempo y datos y es una de las principales razones por las que se crearon los componentes del servidor.

(Lo que también significa que si está utilizando SSR como alternativa a los componentes del servidor, ha tenido un gran problema y es hora de cambiar su forma de actuar antes de que lo arrojen a una cárcel de "rendimiento lento").

## Server Components

Los componentes del servidor, como SSR, se representan en el servidor, pero tienen la capacidad única de incluir lógica del lado del servidor sin enviar ningún JavaScript adicional al cliente, ya que los componentes del servidor se ejecutan en el servidor.

Esto significa que mientras en SSR el código JavaScript se ejecuta en el cliente, en Server Components, el código se ejecuta directamente en el servidor. Y el cliente solo recibe la salida del código a través de la carga útil del servidor, como un bebé al que le mastican la comida.

Entonces, en pocas palabras, la diferencia entre componentes de servidor y renderizado del lado del servidor tiene que ver con cuándo y cómo se ejecuta el código. En el caso de los componentes del servidor, no es necesario enviar ni manejar código adicional en el lado del cliente porque ya lo ejecutamos en el servidor.

El único código necesario es si está uniendo los componentes del servidor y del cliente y el cliente tiene que unir los dos.

El gran beneficio de los componentes de servidor es que ofrecen un mayor rendimiento porque necesitan menos JavaScript del lado del cliente y descargan todo el procesamiento y la recuperación de datos al servidor mientras el cliente puede relajarse y beber Aperol Spritz hasta que llegue el HTML renderizado.

En ese momento, el cliente simplemente se lo muestra al usuario final y se lleva todo el crédito por el arduo trabajo realizado por el servidor.

Y si bien esto puede parecer un poco complejo en este momento, todo se aclarará a medida que aprenda más sobre los componentes del servidor. Lo cual es algo que realmente no se puede evitar, ya que se están volviendo cada vez más populares en casos de uso como:

- Tener muchos cálculos pesados ​​que necesitan mucho procesamiento
- Acceso API privado (para mantener el secreto… secret)
- Cuando la mayor parte del lado del cliente ya es estático y sería un desperdicio enviar más JavaScript al cliente

## Conclusión

Si bien los componentes de servidor pueden parecer desalentadores en este momento, en su mayoría son algo nuevo y extraño. Una vez que los conozcas mejor y aprendas algunos de los conceptos básicos, te darás cuenta de que no son tan complejos como parecen.

La curva de aprendizaje no es tan pronunciada como podría pensar y solo porque tengan "sever" en el nombre, no significa que tengan que ser algo extraño y críptico de lo que los desarrolladores frontend debamos mantenernos alejados. De hecho, son bastante similares a los componentes del cliente e incluso más livianos ya que carecen de elementos como enlaces de estado, etc.

![Profile](https://res.cloudinary.com/khriztianmoreno/image/upload/c_scale,w_148/v1591324337/KM-brand/stickers/sticker-3_2x.png)

@khriztianmoreno
