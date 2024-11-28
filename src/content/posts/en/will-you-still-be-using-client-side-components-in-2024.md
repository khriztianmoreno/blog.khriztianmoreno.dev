---
title: Will you still be using client-side components in 2024?
tags:
  - javascript
  - react
  - web-development
date: 2024-02-14 15:23:51
updated: 2024-02-14 15:23:51
---

I love server components. But they're not for every occasion. In fact, using them at each and every opportunity you get is more like tenderizing a steak with the same hammer you used to hammer a pin.

That said, there are also some cases where server components fit like Cinderella and her shoe.

## Dashboards & Reports

In the case of dashboards and reports, you maximize performance by processing and rendering all the data on the server while still allowing the client to do what it was supposed to do in the first place.

If we only use client components, we're offloading more tasks to it and making it perform more tasks than it can potentially handle.

If you processed and rendered the data on the client, you'd spend a lot of time waiting around with an ugly spinner mocking you because of all the extra steps the client has to take to achieve the same result.

First, you would need to get the data from your endpoint, which in turn would need to get data from the database, which in turn would need to get data from its logs.

Not only that, but you also have to wait patiently for the data to arrive at the client, even if it arrives late.

And only once it arrives, the client can start processing it and displaying it to the user.

That's why, in this case, it's better to have the components locked and rendered directly on the server.

And then, the client can get all the widgets its electronic heart desires, all streamed in parallel, which is a much faster and easier way to conduct business.

## Blog Posts

Blog posts are some of the most static content you can find. After all, it's mostly just a bunch of words, in order, with the occasional image, gif, or meme here and there.

With server components, you're pre-rendering the content on the server, which is the best case scenario in terms of SEO because it's delivered fast and complete.

This use case above is what tends to throw developers off balance and confuse them. Because blog posts are the first thing they think of when it comes to SSR as well. So if they think of SSR and server components when they think of blog posts, it's natural to think that they're both the same thing or can be used interchangeably.

Which is completely and utterly wrong and is a sin worthy of burning in hell for eternity, according to my [previous blog post](https://dev.to/khriztianmoreno/server-components-vs-server-side-rendering-4ghe).

But at the same time it makes sense from the point of view of results. Because although their approaches are very different in practice, the results are quite similar.

## Server-Side Data Fetching

Server-side data fetching is a great way to give your code a security boost in case you otherwise reveal logic or API keys that are supposed to remain hidden or if you are paranoid about every piece of information you hold.

You can use this type of data fetching to access not only your database but also any other API you want. All by being sneaky.

However, there are cases where server-side components are **NOT** ideal and should in fact be avoided.

## High Interactivity Requirements

This is fancy wording for anything you do something to and get something back. Kind of like Jell-O, but not quite.

Something potentially more familiar and more in keeping with web development itself are things like forms and buttons.

These components often have to react in some way to your actions, may have their own state, and communicate with other components on the client side, making them the weakest link when it comes to server components.

## Stateful Components

If you take it as literally as possible and use the definition we've been using so far, there is no way to handle state in a server component.

But if you squint, tilt your head a little to the side, defocus a bit, and take a deep breath, you can see that this is only half true.

We'll learn what the nuances are another time, but for now let's just say that server components do NOT have access to state. After all, they don't have access to state-related hooks.

## Conclusion

Server components are a powerful tool for specific scenarios in web development. Use them to improve performance and security for data-intensive tasks. But remember, they may not fit every situation, especially for interactive or stateful elements.

![Profile](https://res.cloudinary.com/khriztianmoreno/image/upload/c_scale,w_148/v1591324337/KM-brand/stickers/sticker-3_2x.png)

_@khriztianmoreno_ see you soon.
