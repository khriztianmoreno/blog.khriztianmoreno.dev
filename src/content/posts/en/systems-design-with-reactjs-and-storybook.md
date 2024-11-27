---
title: Systems Design with ReactJS and Storybook
tags:
  - javascript
  - react
  - storybook
  - design-system
date: 2020-03-05 10:17:06
updated: 2020-03-05 10:17:06
---

Document and test your React components in isolation using Storybook.

![Storybook React](https://miro.medium.com/v2/resize:fit:4276/format:webp/1*a4s-rq6LnhDmCNGreCSvdQ.png)_Storybook React_

**tl;dr:** In this post, we will learn how to set up the necessary infrastructure to build a reusable component design system in React, using Storybook.

Let's start by understanding that a design system is a series of components that can be reused in different combinations. Design systems allow you to manage design. If we go to [designsystemsrepo.com](http://designsystemsrepo.com), we can see the design systems used by some of the largest companies and strongest brands, such as Priceline, Apple, IBM, WeWork, GitHub, and even the US government.

Design systems can be a significant productivity multiplier in any medium to large-sized project or company, as we can document our components as we develop them, ensuring a consistent look and feel across all screens, and having a continuous workflow between designers and developers.

<iframe width="100%" height="315" src="https://www.youtube.com/embed/guteTaeLoys?si=_8X6KwUOZCjQvwan" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

Throughout this video, we will progressively build a very simple design system that contains a single button, but I will show several of the features that Storybook can offer to improve our development experience and project speed.

We will learn to set up the StoryBook used in production by everyone from Lonely Planet to Uber, but at the same time, we will keep it as simple as possible, so we can reuse these APIs for our future needs.

I hope this has been helpful and/or taught you something new!

![Profile](https://res.cloudinary.com/khriztianmoreno/image/upload/c_scale,w_148/v1591324337/KM-brand/stickers/sticker-3_2x.png)

#### @khriztianmoreno 🚀
