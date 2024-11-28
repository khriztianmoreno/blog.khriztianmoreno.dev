---
title: >-
  WebContainers at its best - Bolt.new combines AI and full-stack development in
  the browser
tags:
  - javascript
  - ai
  - web-development
date: 2024-10-08T16:07:39.000Z
updated: 2024-10-08T16:07:39.000Z
---

Remember WebContainers? It’s the WebAssembly-based “microoperating system” that can run Vite operations and the entire Node.js ecosystem in the browser. The StackBlitz team built WebContainers to power their in-browser IDE, but it often felt like the technology was still searching for a killer use case—until now. That’s because StackBlitz just released [bolt.new](https://bolt.new/), an AI-powered development sandbox that Eric Simons described during ViteConf as “like if Claude or ChatGPT had a baby with StackBlitz.”

![Bolt.new](https://bolt.new/social_preview_index.jpg)

I’ll try not to imagine it too vividly, but based on the overwhelmingly positive reviews so far, I’m guessing it’s working – dozens of developers [describe it](https://www.youtube.com/watch?v=B1b3ZkNTSq4&ab_channel=RasMic) as a combination of v0, Claude, Cursor, and Replit. How Bolt is different: Existing AI code tools can often run some basic JavaScript/HTML/CSS in the browser, but for more complex projects, you need to copy and paste the code to a local environment. But not Bolt. By using WebContainers, you can request, run, edit, and deploy entire web applications, all from the browser. Here’s what it looks like:

- You can ask [bolt.new](https://bolt.new/) to build a production-ready multi-page app with a specific backend and database, using any technology stack you want (e.g. “Build a personal blog using Astro, Tailwind, and shadcn”).
- Unlike other tools, Bolt can install and run relevant npm packages and libraries, interact with third-party APIs, and run Node servers.
- You can manually edit the code it generates via an in-browser editor, or have Bolt [resolve errors for you](https://x.com/stackblitz/status/1841873255961153804) . This is unique to Bolt, because it integrates AI into all levels of WebContainers (not just the CodeGen step).
- You can deploy to production from chat via Netlify, no login required.

There’s a lot more we could go over here, but Eric’s demo is pretty wild. In closing: From the outside, it wasn’t always clear whether StackBlitz would ever see a significant return on investment over the 5+ years they’ve spent developing WebContainers. But suddenly it looks like they might be uniquely positioned to help developers leverage AI to build legitimate FullStack applications.

<iframe width="560" height="315" src="https://www.youtube.com/embed/knLe8zzwNRA?si=7R7-1HxzwuyzL0EZ&amp;start=700" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

I hope this has been helpful and/or taught you something new!

![Profile](https://res.cloudinary.com/khriztianmoreno/image/upload/c_scale,w_148/v1591324337/KM-brand/stickers/sticker-3_2x.png)

@khriztianmoreno 🚀
