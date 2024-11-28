---
title: Server Components Vs Server-side Rendering
tags:
  - javascript
  - react
  - web-development
date: 2024-01-28 15:19:16
updated: 2024-01-28 15:19:16
---

Did you know that server components and server-side rendering are two completely different things?

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/gikft6v2xsd073a1il47.jpg)

And while they go hand-in-hand in many cases, there are equally many examples where you can and should use just one of them.

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/smpzsmnjj5ckq2g17z85.jpg)

Now, to be fair, given the online documentation most developers find about server components and server-side rendering, the fact that they assume these two things are the same isn't exactly a surprise.

(This also gives them the perfect excuse to avoid server-side components altogether, rather than face the fact that this is something they should already be pretty good at using and will eventually have to learn anyway.)

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/chw6m0iyg2ky9cy1xyvx.jpg)

That said, server-side components have a lot of advantages over server-side rendering, especially when it comes to building larger, more complex applications.

Let's talk a bit more about the differences between the two.

## Server-Side Rendering

Server-side rendering renders the page on the server. But obviously that's not really useful, so let's dig a little deeper.

Server-side rendering renders the page on the server at **request time**, meaning that **every time a client makes a request to the server** — such as when a new visitor comes to your page — **the server re-renders the same page** and sends it to the client.

And while this is great for SEO, since even the **most dynamic pages appear static in the eyes of the robots that index them and use them for searches**, server-side rendering has a lot of steps between the client making the request to the server and the page finally loading in front of you.

First, when the request hits the server, the server statically renders the page and sends it back to the client, where the user gets a version of your page that's devoid of all interactivity.

But that's not the only thing the server sends to the client. Along with the static page HTML, the server sends its condolences along with a big bundle of React code that the client will need to run to make the page dynamic again.

But what happens when 90% of our page is static?

You might think the correct answer is “practically nothing” and you wouldn’t be exactly wrong, but just like in Calculus class, you lose points because this isn’t the answer I was looking for.

In reality, there’s still a lot of JavaScript being sent to the client and it needs to be executed without changing much on the page itself.

This is a waste of time and data and is one of the main reasons server components were created.

(Which also means that if you’re using SSR as an alternative to server components, you’ve hit a big snag and it’s time to change your ways before you get thrown into a “slow performance” jail.)

## Server Components

Server components, like SSR, are rendered on the server, but they have the unique ability to include server-side logic without sending any additional JavaScript to the client, since server components are executed on the server.

This means that while in SSR the JavaScript code is executed on the client, in Server Components, the code is executed directly on the server. And the client only receives the output of the code through the server payload, like a baby getting its food chewed up.

So, in a nutshell, the difference between server components and server-side rendering is all about when and how the code is executed. In the case of server components, there is no need to send or handle any additional code on the client side because we already run it on the server.

The only code needed is if you are tying the server and client components together and the client has to tie the two together.

The big benefit of server components is that they offer higher performance because they need less client-side JavaScript and offload all the processing and data retrieval to the server while the client can relax and drink Aperol Spritz until the rendered HTML arrives.

At that point, the client simply displays it to the end user and takes all the credit for the hard work done by the server.

And while this may seem a bit complex right now, it will all become clearer as you learn more about server components. Which is something that can't really be avoided, as they are becoming more and more popular in use cases like:

- Having a lot of heavy calculations that need a lot of processing
- Private API access (to keep things secret… secret)
- When most of the client side is already static and it would be a waste to send more JavaScript to the client

## Conclusion

While server components may seem daunting right now, they are mostly something new and strange. Once you get to know them better and learn some of the basics, you'll realize that they are not as complex as they seem.

The learning curve is not as steep as you might think and just because they have "sever" in the name, it doesn't mean they have to be something strange and cryptic that we frontend developers should stay away from. In fact, they are quite similar to client components and even more lightweight as they lack things like state hooks, etc.

![Profile](https://res.cloudinary.com/khriztianmoreno/image/upload/c_scale,w_148/v1591324337/KM-brand/stickers/sticker-3_2x.png)

@khriztianmoreno
