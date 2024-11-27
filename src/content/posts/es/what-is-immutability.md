---
title: ¿Qué es la inmutabilidad?
tags:
  - javascript
  - redux
  - react
date: 2020-02-10T16:53:03.000Z
updated: 2020-02-10T16:53:03.000Z
---

Inmutabilidad en React y Redux

La inmutabilidad puede ser un tema confuso, y aparece en todas partes en React, Redux y JavaScript en general.

Es posible que hayas encontrado errores en los que tus componentes de **React** no se vuelven a renderizar, a pesar de que sabes que has cambiado las *props*, y alguien dice, “Deberías estar haciendo actualizaciones de estado inmutables.” Tal vez tú o uno de tus compañeros de equipo escribe regularmente *reducers* en **Redux** que mutan el estado, y nos toca corregirlos constantemente (los *reducers*, o a nuestros compañeros de trabajo 😄).

Es complicado. Puede ser muy sutil, especialmente si no estás seguro de qué buscar. Y sinceramente, si no estás seguro de por qué es importante, es difícil preocuparse.

<!--more-->

## ¿Qué es la inmutabilidad?

En primer lugar, lo inmutable es lo opuesto a mutable, y mutable significa cambiante, modificable … capaz de ser molestado.

Entonces, algo que es **in**mutable, entonces, es algo que no se puede cambiar.

Llevado al extremo, esto significa que en lugar de tener variables tradicionales, estarías constantemente creando nuevos valores y reemplazando los antiguos. JavaScript no es tan extremo, pero algunos lenguajes no permiten la mutación (me vienen a la mente Elixir, Erlang y ML).

Si bien JavaScript no es un lenguaje puramente funcional, a veces puede pretender serlo. Ciertas operaciones con vectores (*arrays*) en JS son inmutables (lo que significa que devuelven un nuevo vector, en lugar de modificar el original). Las operaciones de cadena siempre son inmutables (crean una nueva cadena con los cambios). Y también puede escribir sus propias funciones que son inmutables. Solo necesita conocer algunas reglas.

## Un ejemplo de código con mutación

Veamos un ejemplo para ver cómo funciona la mutabilidad. Comenzaremos con este objeto de persona aquí:

![](https://cdn-images-1.medium.com/max/2000/1*HTWRoy6C_54yrz1o4LHe9g.png)

Entonces digamos que escribimos una función que le da a una persona poderes especiales:

![](https://cdn-images-1.medium.com/max/2000/1*5nRGGompyTkaJJhabPprXw.png)

Ok, todos tienen el mismo poder. No importa, la invisibilidad es genial. Vamos a darle algunos poderes especiales a la **super Mafe.**

![](https://cdn-images-1.medium.com/max/2624/1*E58AJFG3FaMyjaTrXV0iLA.png)

Esta función giveAwesomePowers *muta* al objeto person que se ingresa en ella. Si ejecutas este código; verás que la primera vez que imprimimos una persona, **Mafe** no tiene ninguna propiedad specialPower. Pero luego, la segunda vez, de repente tiene el specialPower de invisibilidad.

El objeto devuelto por giveAwesomePowers es el mismo objeto que se transfirió, pero se ha modificado en sus entrañas. Sus propiedades han cambiado. Ha sido *mutado*.

Quiero decir esto de nuevo porque es importante: las partes internas del objeto han cambiado, pero la referencia del objeto no. Es el mismo objeto en el exterior (por lo que una verificación de igualdad como person === samePerson será true).

Si queremos que la función giveAwesomePowers no modifique a la persona, tendremos que hacer algunos cambios.

No vamos a entrar en muchos detalles sobre el siguiente codigo, porque tendrá protagonismo en el siguiente post de esta serie.

![Object.assign()](https://cdn-images-1.medium.com/max/2016/1*l6dOEaAUno5wc9loMlueoA.png)***Object.assign()***

Si no ha visto Object.assign, lo que hace es asignar propiedades de un objeto a otro. Sin modificar el objeto original, en pocas palabras, Object.assign crea una copia del objeto original con una nueva propiedad specialPower

👋 En mi proximo post, abordaremos que es una \*\*función pura \*\*y\*\* **porque está muy relacionada con la inmutabilidad, ademas nos centraremos en comprender el concepto \***side effects\*\*\*. 🤝

¡Espero que esto haya sido útil y/o te haya hecho aprender algo nuevo!

![Profile](https://res.cloudinary.com/khriztianmoreno/image/upload/c_scale,w_148/v1591324337/KM-brand/stickers/sticker-3_2x.png)

#### @khriztianmoreno 🚀
