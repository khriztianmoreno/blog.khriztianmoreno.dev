---
title: Introduction to Apollo Client with React for GraphQL
tags:
  - javascript
  - react
  - graphql
  - tutorial
date: 2020-01-30 16:42:17
updated: 2020-01-30 16:42:17
---

GraphQL has become popular recently and is likely to replace the Rest API. In this tutorial, we will use the Apollo Client to communicate with GitHub's GraphQL API. We will integrate Apollo Client with ReactJS, but you can also use it with other platforms (VueJS, Angular, etc).

<!--more-->

This tutorial does not cover how to start a React project, but you can use create-react-app to get started.

Once we have the React application ready to run, the next step is to install the required modules.

## Installing Modules

The following line installs all the required modules.

```bash
npm i -S apollo-client-preset react-apollo graphql-tag graphql
```

Now we can provide our component with a client.

## Providing a Client to a Component

You can provide a client anywhere in the React component hierarchy. However, it is always a good practice to provide the component by wrapping your entire application with the client.

![Index.js](https://cdn-images-1.medium.com/max/2424/1*eXHU29eIA6QxycMizLiGIg.png)_Index.js_

Above you can see that we defined the uri for GitHub and also used a specific token for the headers. You should use your own token generated from GitHub. So don't forget to replace it in YOUR_TOKEN.

_You can check this link [how to get an API Token](https://blog.github.com/2013-05-16-personal-api-tokens/)._

For this example, we defined the API token on the client side. However, you should not reveal your API token publicly. Therefore, it is always good to keep it on the server abstracted from the client side.

Note that we have wrapped the <App/> component with ApolloProvider and used the client variable we created for the client prop.

## GraphiQL Application

Before diving into queries, I want to point out that there is a very useful tool called **GraphiQL** for testing your GraphQL queries. Before continuing, make sure you have [downloaded it](http://www.electronjs.org/apps/graphiql).

Once you open GraphiQL, you need to configure **GraphQL Endpoint** and **HTTP Headers**.

**GraphQL Endpoint:** [https://api.github.com/graphql](https://api.github.com/graphql)

**Header Name:** Authorization

**Header Value:** Bearer YOUR_TOKEN

Of course, you should replace **YOUR_TOKEN** with your own token. Don't forget to include the **Bearer** before your token when defining the **header value**.

If you don't want to download an application, you can also use [GraphQL API Explorer](https://developer.github.com/v4/explorer/) for GitHub.

## GraphQL Queries

Unlike a REST API with multiple endpoints, the GraphQL API only has one endpoint and only gets what your query defines.

The [GitHub GraphQL API documentation](https://developer.github.com/v4/) provides more information.

Additionally, the best part of the GraphiQL application is that it gives you access to the query documentation within the application. You can see the sidebar on the right called **Docs**.

![GraphiQL — Side Bar Docs](https://cdn-images-1.medium.com/max/4064/1*MkBxnS-YSZhtgTN5TUpeCA.png)_GraphiQL — Side Bar Docs_

Let's start with the simplest query:

```graphql
query {
  viewer {
    login
  }
}
```

This query returns the login information of the _viewer_. In this case, the _viewer_ is you since you used your own API token.

In this tutorial, I will not give detailed information about queries. You can always refer to the documentation and try queries in GraphQL tools to see if you are getting the correct data.

Let's use the following query for the rest of the tutorial.

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

This query searches for the last 10 repositories that match the specific input string, which we will define in our application.

It returns the **id**, **name**, **description**, and **URL** of each result.

## Using GraphQL Query in a React Component

We need to import two modules below into our React component to define the query within the component and then pass the results to the component as props.

```javascript
import gql from "graphql-tag";
import { graphql } from "react-apollo";
```

Here we assign our query to a constant variable, but we have not yet defined the name parameter.

![GraphQL Query](https://cdn-images-1.medium.com/max/2256/1*UgyX4_ZY8H7gmrsoxCb2Kg.png)_GraphQL Query_

Now we wrap our component with graphql HOC (Higher Order Component) to define the query parameters, execute the query, and then pass the result as props to our component.

![graphql HOC](https://cdn-images-1.medium.com/max/2000/1*kIbiA76ZmEy2LIo6NfDILQ.png)_graphql HOC_

Below is the final version of our component.

![App.js](https://cdn-images-1.medium.com/max/2256/1*YxwbN-7T1G46m4WBldicIw.png)_App.js_

Note that we do not export the actual App component, but the wrapped component, which is AppWithData.

## Check the Data in the Console

Let's go ahead and add `console.log(this.props)` to your component's render method.

When you check your browser's console, you will see that there are two object logs.

Within each object, you will see the data property. This is provided to our component through the graphql HOC.

Notice that the first log has the property loading: true within data and the second log has loading: false and a new object called search, which is exactly the information we wanted to get.

## Display the Data

Let's write some JSX to display the obtained data.

Since the search object is not initially there, we cannot attempt to render it directly. Therefore, we first need to check if the data and the search object are ready to be used.

To do that, we will simply use the loading information provided within the data property.

If loading is true, we simply render the text **Loading**, otherwise the data itself.

![Display Data](https://cdn-images-1.medium.com/max/2592/1*G_SUe17GrnJ8NsKcqEfm9g.png)_Display Data_

I used the ternary operator `?`: for basic inline conditional expressions. If loading is true, we show **Loading** and if it is false, we use the _map_ function to iterate through our data array to display the information within `ul` and `li` elements.

This is just a basic example. You can use a regular if-else statement and return different results for your render method.

![App.js Final](https://cdn-images-1.medium.com/max/2592/1*Q_sPytXSlxsDH5PLJ01oRg.png)_App.js Final_

You can check the repository [apollo-client-with-react](https://github.com/khriztianmoreno/apollo-client-with-react), clone it to your computer, and play around.

PS. Don't forget to replace the token variable with your own GitHub API token.

## Conclusion

We covered how to get started with Apollo Client for React. We installed the required modules, set up the client, and then provided it to our component at the top of the component hierarchy. We learned how to quickly test GraphQL queries before implementing them in our real application. Finally, we integrated the query into a React component and displayed the obtained data.

I hope this was helpful and/or taught you something new!

![Profile](https://res.cloudinary.com/khriztianmoreno/image/upload/c_scale,w_148/v1591324337/KM-brand/stickers/sticker-3_2x.png)

#### @khriztianmoreno 🚀
