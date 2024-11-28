---
title: Why is it so difficult to pass state between client and server components?
tags:
  - javascript
  - react
  - web-development
date: 2024-03-28 15:28:32
updated: 2024-03-28 15:28:32
---

The way we represent server components is different.

Nothing like what we're used to so far.

And because it's so different, it also changes where we handle state, how we handle it, and how we manage to sleep at night knowing that these are all important things we should know since last year, but most of us are completely unaware of.

![WHY?](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/t68b4i20k9yxdd8b07xu.jpg)

In fact, server components impact 3 of the most important parts of web development:

- Performance
- User Experience
- The way we, developers, write code and design our applications.

It's not something we can ignore or take lightly.

As you can see, I've been thinking about it a lot and you've probably been thinking about it too. Every developer who values ​​their keyboard is thinking about it.

And there's this specific question... It's kind of a "chicken and the egg" type of question, mainly because they're both questions that get asked a lot.

**How ​​the heck do I handle state in server components if I don't have access to the state in the first place?**

Before I give you the answer, let me explain the problem at hand. Consider what happens when a server component requests a new render.

Unlike client components where state is preserved between renders, server components don't have that luxury. Like a roguelike game, they always start from scratch.

There is no inherent code or mechanism that can make a server component remember state. The backend has all those databases and design patterns and all those complex functions and for what? It can't even handle state.

So what do we do? Do we simply use server components on completely static components that don't need any state? While this is a possible answer, it's also an approach that limits the effectiveness and tuning of server components in modern web applications. So, we're ruling it out.

Because everything I said above has a drawback.

While the backend may not handle client state like the client does, it does handle application state. So, in a way, we can handle state on the server. Just not in the way you think. And, actually, there's not one way.

And, actually, there's not one way.

**There are THREE ways to handle state on the server.**

Which one we choose depends on what best suits our needs and current situation. And these 3 ways are:

- Prop drilling from the server to the components
- cookies
- state hydration

Now, another million dollar question. Why can't we just handle all the state on the client?

This is because server components advocate a separation of concerns. Which in simpler terms means that each part of the application should mind its own business. By decoupling state from rendering, we not only improve performance, but we also gain more control over the user experience.

![Profile](https://res.cloudinary.com/khriztianmoreno/image/upload/c_scale,w_148/v1591324337/KM-brand/stickers/sticker-3_2x.png)

### @khriztianmoreno
