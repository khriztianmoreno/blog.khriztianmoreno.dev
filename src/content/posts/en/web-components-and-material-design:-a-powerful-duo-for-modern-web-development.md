---
title: Web Components and Material Design - A Powerful Duo for Modern Web Development
tags:
  - web-components
  - material-design
  - frontend
  - javascript
date: 2025-09-24 07:45:43
updated: 2025-09-24 07:45:43
---

In the ever-evolving world of frontend development, we often find ourselves trapped in silos. You build a perfect Button component in React, following the design system specs to the pixel. But six months later, the company acquires a startup that uses Vue, or your team decides to migrate a legacy app to Angular.

Suddenly, that perfect button is useless. You have to rebuild it. You have to "silo" your design system.

This is the problem that **Web Components** solve. They are the W3C standard solution for interoperability. And when you pair them with **Material Design**, you get something truly powerful.

Today, I want to explore how Web Components can structure your frontends into small, interoperable parts, and how toolkits supporting Material Design provide accessible, best-practice UI elements right out of the box.

<!--more-->

## Introduction: The End of Framework Silos

Think about it: why do we accept that a UI component can be "React-only" or "Vue-only"? A button is a button. An input is an input. The behavior is the same. The accessibility requirements are the same. The design rules are the same.

But in practice, we end up building the same component multiple times because the implementation is tied to a framework.

Web Components are the escape hatch. They are built on browser standards, which means they can live _alongside_ frameworks instead of _inside_ them.

## Section 1: The Anatomy of a Web Component

Web Components are powered by three main technical pillars. The APIs are surprisingly approachable once you see them in context.

### Custom Elements: Defining new HTML tags

Custom Elements let you define a new tag, backed by a JavaScript class.

```javascript
class HelloWorld extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<h1>Hello World</h1>`;
  }
}

customElements.define("hello-world", HelloWorld);
```

Once registered, you can use it anywhere:

```html
<hello-world></hello-world>
```

### Shadow DOM: Style encapsulation (no CSS collisions)

If you've ever worked on a large project, you know the pain of "mysteriously broken" styles because two teams used the same `.button` class name.

Shadow DOM provides encapsulation so your component's styles don't leak out, and global styles don't leak in.

```javascript
class ProtectedCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        .card {
          padding: 16px;
          border-radius: 12px;
          border: 1px solid rgba(0, 0, 0, 0.12);
        }

        h3 {
          margin: 0 0 8px;
          font: 600 16px/1.2 system-ui;
        }
      </style>

      <div class="card">
        <h3>Shadow DOM Card</h3>
        <slot></slot>
      </div>
    `;
  }
}

customElements.define("protected-card", ProtectedCard);
```

### HTML Templates: Reusable structures (rendered only when needed)

The `<template>` element gives you a reusable DOM blueprint that does _not_ render until you clone it.

```html
<template id="user-row-template">
  <style>
    .row {
      display: flex;
      gap: 8px;
      padding: 8px;
    }
    .name {
      font-weight: 600;
    }
  </style>
  <div class="row">
    <span class="name"></span>
    <span class="email"></span>
  </div>
</template>
```

```javascript
const tpl = document.getElementById("user-row-template");

function renderUserRow({ name, email }) {
  const fragment = tpl.content.cloneNode(true);
  fragment.querySelector(".name").textContent = name;
  fragment.querySelector(".email").textContent = email;
  return fragment;
}
```

## Section 2: Material Design as the "Visual Brain"

Web Components solve interoperability and encapsulation, but they don't automatically solve _design coherence_. If every team builds components with different spacing, typography, and interaction states, you'll still end up with a fragmented product.

Material Design acts as the shared visual brain: rules, patterns, and constraints that keep a UI consistent.

### Accessibility (A11y)

Accessibility is one of those things that looks easy until you do it correctly:

- **Keyboard navigation** across complex components
- **Focus states** that are visible and consistent
- **Color contrast** that meets WCAG
- **ARIA semantics** for screen readers

Material components bake these behaviors in, so you're not reinventing them in every project.

### Material 3 (M3): "Material You" and personalization

Material 3 is a big shift towards customization. The design system is built around a set of tokens (colors, typography, elevations) that can be remixed to match your brand, and it adapts naturally to different devices and contexts.

In other words: you can have a shared system without having a generic-looking product.

## Section 3: The Dynamic Duo: Material Web (Lit & MWC)

This is where it gets real.

Google maintains **Material Web** (`@material/web`), a collection of Material Design components implemented as Web Components.

The advantage is simple: you can use a Material button in a static HTML page, a PHP-rendered template, a React app, or an Angular project without changing the component itself.

### Using a Material Web button (framework-agnostic)

```html
<script type="module">
  import "@material/web/button/filled-button.js";
</script>

<md-filled-button>Save</md-filled-button>
```

### Why Lit matters here

Lit is the lightweight library that makes authoring Web Components ergonomic and fast. It's a great fit when you want to build your own components next to Material Web.

```javascript
import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("user-chip")
class UserChip extends LitElement {
  static styles = css`
    .chip {
      display: inline-flex;
      gap: 8px;
      align-items: center;
      border-radius: 999px;
      padding: 6px 10px;
      border: 1px solid rgba(0, 0, 0, 0.14);
      font: 500 14px/1 system-ui;
    }
    img {
      width: 20px;
      height: 20px;
      border-radius: 50%;
    }
  `;

  @property() name = "Anonymous";
  @property() avatarUrl = "";

  render() {
    return html`
      <span class="chip">
        ${this.avatarUrl ? html`<img src=${this.avatarUrl} alt="" />` : ""}
        <span>${this.name}</span>
      </span>
    `;
  }
}
```

## Technical Concepts Worth Highlighting

### Interoperability

The ability to mix libraries and frameworks inside the same organization using a common base component library.

In practice, this reduces duplicate work and makes UI consistency much easier.

### Encapsulation

Shadow DOM prevents selector collisions and style leakage, which is vital in large codebases and especially in micro-frontend architectures.

### Design Tokens

Material Design relies heavily on tokens, typically exposed as CSS variables. Changing your "Primary" color in one place can update the whole component suite.

```css
:root {
  --md-sys-color-primary: #6750a4;
  --md-sys-color-on-primary: #ffffff;
}
```

## Reader Hook Ideas: Micro-frontends, Performance, and Storybook

### Micro-frontends

I've seen micro-frontend setups where different teams ship independently using different stacks (React, Vue, Angular). A shared set of Web Components (especially a shared Material kit) becomes the most pragmatic way to keep a consistent UI without forcing a single framework.

### Performance

Because Web Components are platform-native and Lit is tiny, you often get a lower impact on bundle size compared to framework-specific component libraries.

### Recommended practice: Use Storybook

If you're building (or adopting) a component library, Storybook is one of the best ways to document components in isolation. It's also a nice forcing function for consistency: props, slots, states, and accessibility checks become visible and testable.

## References and Tools

- **Material Web**: https://material-web.dev/
- **Lit**: https://lit.dev/
- **WebComponents.org**: https://www.webcomponents.org/
- **Material 3 Design System**: https://m3.material.io/

I hope this gives you a clear mental model of why Web Components + Material Design are such a strong combo. Interoperability + encapsulation + a mature design system is a pretty rare blend in frontend.

![Profile](https://res.cloudinary.com/khriztianmoreno/image/upload/c_scale,w_148/v1591324337/KM-brand/stickers/sticker-3_2x.png)

#### @khriztianmoreno 🚀
