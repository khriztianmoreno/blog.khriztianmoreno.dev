---
title: Por qué es tan difícil pasar el estado entre los componentes del cliente y del servidor
tags:
  - javascript
  - react
  - web-development
date: 2024-03-28 15:28:32
updated: 2024-03-28 15:28:32
---

La forma en que representamos los componentes del servidor es diferente.

Nada parecido a lo que estamos acostumbrados hasta ahora.

Y debido a que es tan diferente, también cambia dónde manejamos el estado, cómo lo manejamos y cómo logramos dormir por la noche sabiendo que todas estas son cosas importantes que deberíamos saber desde el año pasado, pero la mayoría de nosotros somos completamente inconscientes.

![WHY?](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/t68b4i20k9yxdd8b07xu.jpg)

De hecho, los componentes del servidor impactan 3 de las partes más importantes del desarrollo web:

- Performance
- Experiencia del usuario
- La forma en que nosotros, los desarrolladores, escribimos código y diseñamos nuestras aplicaciones.

No es algo que podamos ignorar o tomar a la ligera.

Como puedes ver, he estado pensando mucho en ello y probablemente tú también lo hayas estado pensando. Todo desarrollador que valore su teclado está pensando en ello.

Y está esta pregunta específica... Es como una pregunta del tipo “la gallina y el huevo”, principalmente porque ambas son preguntas que se hacen mucho.

**¿Cómo diablos manejo el estado en los componentes del servidor si no tengo acceso al estado en primer lugar?**

Antes de darte la respuesta, déjame explicarte el problema que nos ocupa. Considere lo que sucede cuando un componente del servidor solicita una nueva renderización.

A diferencia de los componentes del cliente donde el estado se conserva entre renderizaciones, los componentes del servidor no pueden darse ese lujo. Como un juego pícaro, siempre empiezan desde cero.

No existe ningún código o mecanismo inherente que pueda hacer que un componente del servidor recuerde el estado. El backend tiene todas esas bases de datos y patrones de diseño y todas esas funciones complejas y ¿para qué? Ni siquiera puede manejar el estado.

¿Asi que que hacemos? ¿Utilizamos simplemente componentes de servidor en componentes completamente estáticos que no necesitan ningún estado? Si bien esta es una posible respuesta, también es un enfoque que limita la efectividad y el ajuste de los componentes del servidor en las aplicaciones web modernas. Entonces, lo estamos descartando.

Porque todo lo que dije anteriormente tiene un inconveniente.

Si bien es posible que el backend no maneje el estado del cliente como lo hace el cliente, sí maneja el estado de la aplicación. Entonces, en cierto modo, podemos manejar el estado en el servidor. Simplemente no de la forma en que lo piensas. Y, en realidad, no es una única manera.

Y, en realidad, no es una única manera.

**Hay TRES formas de manejar el estado en el servidor.**

Cuál elegimos depende de lo que mejor se adapte a nuestras necesidades y situación actual. Y estas 3 formas son:

- Prop drilling desde el servidor a los componentes
- cookies
- state hydration

Ahora, otra pregunta del millón. ¿Por qué no podemos simplemente manejar todos los estados en el cliente?

Esto se debe a que los componentes del servidor abogan por una separación de preocupaciones. Lo que en términos más simples significa que cada parte de la aplicación debe ocuparse de sus propios asuntos. Al desacoplar el estado del renderizado, no solo mejoramos el rendimiento, sino que también obtenemos más control sobre la experiencia del usuario.

![Profile](https://res.cloudinary.com/khriztianmoreno/image/upload/c_scale,w_148/v1591324337/KM-brand/stickers/sticker-3_2x.png)

### @khriztianmoreno
