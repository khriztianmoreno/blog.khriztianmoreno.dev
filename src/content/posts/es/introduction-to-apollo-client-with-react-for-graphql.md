---
title: Introducción a Apollo Client con React para GraphQL
tags:
  - javascript
  - react
  - graphql
  - tutorial
date: 2020-01-30T16:42:17.000Z
updated: 2020-01-30T16:42:17.000Z
---

GraphQL se ha vuelto popular recientemente y es probable que reemplace la API Rest. En este tutorial, utilizaremos el Cliente Apollo para comunicarnos con la API GraphQL de GitHub. Integraremos Apollo Client con ReactJS, pero también puede usarlo con otras plataformas (VueJS, Angular, etc).

<!--more-->

Este tutorial no cubre cómo iniciar un proyecto de React, pero puede usar create-react-app para comenzar.

Una vez que tengamos la aplicación de react lista para funcionar, lo siguiente es instalar los módulos requeridos.

## Instalación de módulos

La siguiente línea instala todos los módulos requeridos.

```shell
npm i -S apollo-client-preset react-apollo graphql-tag graphql
```

Ahora podemos proporcionar a nuestro componente un cliente.

## Proporcionar un cliente a un componente

Puede proporcionar un cliente en cualquier lugar de la jerarquía de componentes de React. Sin embargo, siempre es una buena práctica proporcionar el componente, envolviendo toda su aplicación, con el cliente.

![Index.js](https://cdn-images-1.medium.com/max/2424/1*eXHU29eIA6QxycMizLiGIg.png)*Index.js*

Arriba puede ver que definimos el uri para GitHub y también usamos un token específico para losheaders. Deberías usar tu propio token generado desde GitHub. Así que no olvides reemplazarlo en YOUR\_TOKEN.

*Puedes revisar en este enlace [como obtener un API Token](https://blog.github.com/2013-05-16-personal-api-tokens/).*

Para este ejemplo, definimos el token API en el lado del cliente. Sin embargo, no debes revelar tu API token públicamente. Por lo tanto, siempre es bueno mantenerlo en el servidor abstraído del lado del cliente.

Ten en cuenta que hemos envuelto el componente <App/> con ApolloProvider y usamos la variable del client que creamos para la prop del client.

## Aplicación GraphiQL

Antes de sumergirme en las consultas, quiero señalar que hay una herramienta muy útil llamada **GraphiQL** para probar sus consultas GraphQL. Antes de continuar, asegúrese de haberlo [descargado](http://www.electronjs.org/apps/graphiql).

Una vez que abre GraphiQL, necesita configurar **GraphQL Endpoint** y **HTTP Headers** .

**GraphQL Endpoint:** [https://api.github.com/graphql](https://api.github.com/graphql)

**Header Name:** Authorization

**Header Value:** Bearer YOUR\_TOKEN

Por supuesto, debes reemplazar **YOUR\_TOKEN** con tu propio token. No olvide incluir el **Bearer** delante de su token cuando defina el **valor de encabezado** .

Si no desea descargar una aplicación, también puede utilizar [GraphQL API Explorer](https://developer.github.com/v4/explorer/) para GitHub.

## Consultas GraphQL

A diferencia de una API REST con varios end-points, la API GraphQL solo tiene un punto final y solo obtiene lo que define su consulta.

La [documentación de la API GraphQL de GitHub](https://developer.github.com/v4/) le brinda más información.

Además, la mejor parte de la aplicación GraphiQL es que le da acceso a la documentación de las consultas dentro de la aplicación. Puede ver la barra lateral a la derecha llamada **Docs**.

![GraphiQL — Side Bar Docs](https://cdn-images-1.medium.com/max/4064/1*MkBxnS-YSZhtgTN5TUpeCA.png)*GraphiQL — Side Bar Docs*

Comencemos con la consulta más simple:

```graphql
query {
  viewer {
    login
  }
}
```

Esta consulta devuelve la información de inicio de sesión del *viewer*. En este caso, el *viewer* es usted ya que usó su propio token de API.

En este tutorial, no daré información detallada sobre consultas. Siempre puede consultar la documentación e intentar consultas en las herramientas GraphQL para ver si está obteniendo los datos correctos.

Usemos la siguiente consulta para el resto del tutorial.

```graphql
query ($name: String!) {
  search(query: $name, last: 10, type: REPOSITORY) {
    edges {
      node {
        ... on Repository {
          id
          name
          description
          url
        }
      }
    }
  }
}
```

Esta consulta busca los últimos 10 repositorios que coinciden con la cadena de entrada específica, que definiremos en nuestra aplicación.

Devuelve la **identificación** , el **nombre** , la **descripción** y la **URL** de cada resultado.

## Usando GraphQL Query en un componente React

Necesitamos importar dos módulos a continuación a nuestro componente React para poder definir la consulta dentro del componente y luego pasar los resultados al componente como props.

```javascript
import gql from "graphql-tag";
import { graphql } from "react-apollo";
```

Aquí asignamos nuestra consulta a una variable constante, pero aún no hemos definido el parámetro dename.

![GraphQL Query](https://cdn-images-1.medium.com/max/2256/1*UgyX4_ZY8H7gmrsoxCb2Kg.png)*GraphQL Query*

Ahora envolvemos nuestro componente con graphql HOC (Higher Order Component) para definir los parámetros de consulta, ejecutar la consulta y luego pasar el resultado como accesorios a nuestro componente.

![graphql HOC](https://cdn-images-1.medium.com/max/2000/1*kIbiA76ZmEy2LIo6NfDILQ.png)*graphql HOC*

A continuación está la versión final de nuestro componente.

![App.js](https://cdn-images-1.medium.com/max/2256/1*YxwbN-7T1G46m4WBldicIw.png)*App.js*

Tenga en cuenta que no exportamos el componente de la App real, sino el componente empaquetado, que es AppWithData.

## Verifique los datos en la consola

Avancemos y agreguemos `console.log(this.props)` al método de representación de su componente.

Cuando revisa la consola de su navegador, verá que hay dos registros de objetos.

Dentro de cada objeto, verá la propiedad de data. Esto se proporciona a nuestro componente a través del graphql HOC.

Observe que el primer registro tiene la propiedad loading: true dentro de data y el segundo registro tiene loading: false y un nuevo objeto llamado search, que es exactamente la información que queríamos obtener.

## Mostrar los datos

Vamos a escribir algo de JSX para mostrar los datos obtenidos.

Dado que el objeto de search no está inicialmente allí, no podemos intentar renderizarlo directamente. Por lo tanto, primero debemos verificar si los datos y el objeto search está listo para ser utilizado.

Para hacer eso, simplemente usaremos la información de loading provista dentro de la propiedad de data.

Si la loading es true , simplemente renderizamos el texto **Cargando**, de lo contrario los datos mismos.

![Mostrar datos](https://cdn-images-1.medium.com/max/2592/1*G_SUe17GrnJ8NsKcqEfm9g.png)*Mostrar datos*

Usé el operador ternario `?`: para expresiones condicionales básicas en línea. Si la loading es true, mostramos **Loading** y si es falso, usamos la función de *map* para iterar a través de nuestro array de datos para mostrar la información dentro de los elementos `ul` y `li`.

Este es solo un ejemplo básico. Puede usar una instrucción regular if-else y devolver resultados diferentes para su método de representación.

![App.js Final](https://cdn-images-1.medium.com/max/2592/1*Q_sPytXSlxsDH5PLJ01oRg.png)*App.js Final*

Puede consultar el repositorio [apollo-client-with-react](https://github.com/khriztianmoreno/apollo-client-with-react), clonarlo en su computadora y jugar.

PD. No olvides reemplazar la variable del token con tu propio token de API para GitHub.

## Conclusión

Cubrimos cómo comenzar con Apollo Client for React. Instalamos los módulos requeridos, configuramos el cliente y luego lo proporcionamos a nuestro componente en la parte superior de la jerarquía de componentes. Aprendimos a probar las consultas GraphQL rápidamente antes de implementarlas en nuestra aplicación real. Finalmente, integramos la consulta en un componente React y mostramos los datos obtenidos.

¡Espero que esto haya sido útil y/o te haya hecho aprender algo nuevo!

![Profile](https://res.cloudinary.com/khriztianmoreno/image/upload/c_scale,w_148/v1591324337/KM-brand/stickers/sticker-3_2x.png)

#### @khriztianmoreno 🚀
