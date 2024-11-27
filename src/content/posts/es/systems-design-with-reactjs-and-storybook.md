---
title: Design Systems con ReactJS y Storybook
tags:
  - javascript
  - react
  - storybook
  - design-system
date: 2020-03-05 10:17:06
updated: 2020-03-05 10:17:06
---

Documentar y probar tus componentes de React de forma aislada utilizando Storybook.

![Storybook React](https://miro.medium.com/v2/resize:fit:4276/format:webp/1*a4s-rq6LnhDmCNGreCSvdQ.png)_Storybook React_

**tl;dr:** En esta entrada, aprenderemos cómo configurar toda la infraestructura necesaria para construir un sistema de diseño de componentes reutilizables en React, utilizando Storybook.\*

Comencemos por entender que un sistema de diseño es una serie de componentes que se pueden reutilizar en diferentes combinaciones. Los sistemas de diseño te permiten gestionar el diseño. Si vamos a a [designsystemsrepo.com](http://designsystemsrepo.com) podrá ver los sistemas de diseño utilizados por algunas de las compañías más grandes y las marcas más sólidas, como Priceline, Apple, IBM, WeWork, GitHub e incluso el gobierno de los EE. UU.

Los sistemas de diseño pueden ser un importante multiplicador de la productividad en cualquier proyecto o empresa de tamaño mediano a grande, ya que podemos documentar nuestros componentes a medida que los desarrollamos, garantizando una apariencia y sensación coherente en todas las pantallas, y teniendo un flujo de trabajo continuo entre diseñadores y desarrolladores.

<iframe width="100%" height="315" src="https://www.youtube.com/embed/guteTaeLoys?si=_8X6KwUOZCjQvwan" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

A lo largo de este video, construiremos progresivamente un sistema de diseño muy simple que contiene un solo botón, pero mostraré varias de las funciones que Storybook puede ofrecer para mejorar nuestra experiencia de desarrollado y la velocidad del proyecto.

Aprendermos a configurar los StoryBook utilizados en la producción por todos, desde Lonely Planet hasta Uber, pero al mismo tiempo, lo mantendremos lo más simple posible, para que podamos reutilizar estas API para nuestras necesidades futuras.

¡Espero que esto haya sido útil y/o te haya hecho aprender algo nuevo!

![Profile](https://res.cloudinary.com/khriztianmoreno/image/upload/c_scale,w_148/v1591324337/KM-brand/stickers/sticker-3_2x.png)

#### @khriztianmoreno 🚀
