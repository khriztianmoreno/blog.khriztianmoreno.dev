---
title: Web Components y Material Design - Un Dúo Poderoso para el Desarrollo Web Moderno
tags:
  - web-components
  - material-design
  - frontend
  - javascript
date: 2025-09-24 07:45:43
updated: 2025-09-24 07:45:43
---

En el mundo siempre cambiante del desarrollo frontend, a menudo nos encontramos atrapados en silos. Construyes un componente de Botón perfecto en React, siguiendo las especificaciones del sistema de diseño al píxel. Pero seis meses después, la empresa adquiere una startup que usa Vue, o tu equipo decide migrar una aplicación legacy a Angular.

De repente, ese botón perfecto es inútil. Tienes que reconstruirlo. Tienes que crear un "silo" de tu sistema de diseño.

Este es el problema que resuelven los **Web Components**. Son la solución estándar de la W3C para la interoperabilidad. Y cuando los combinas con **Material Design**, obtienes algo verdaderamente poderoso.

Hoy quiero explorar cómo los Web Components pueden estructurar tus frontends en partes pequeñas e interoperables, y cómo los kits de herramientas que soportan Material Design proporcionan elementos de UI accesibles y con las mejores prácticas desde el primer momento.

<!--more-->

## Introducción: El Fin de los Silos de Frameworks

Piénsalo: ¿por qué aceptamos que un componente de UI sea "solo-React" o "solo-Vue"? Un botón es un botón. Un input es un input. El comportamiento es el mismo. Los requisitos de accesibilidad son los mismos. Las reglas de diseño son las mismas.

Pero en la práctica, terminamos construyendo el mismo componente múltiples veces porque la implementación está atada a un framework.

Los Web Components son la vía de escape. Están construidos sobre estándares del navegador, lo que significa que pueden vivir _junto_ a los frameworks en lugar de _dentro_ de ellos.

## Sección 1: La Anatomía de un Web Component

Los Web Components están impulsados por tres pilares técnicos principales. Las APIs son sorprendentemente accesibles una vez que las ves en contexto.

### Custom Elements: Definiendo nuevas etiquetas HTML

Los Custom Elements te permiten definir una nueva etiqueta, respaldada por una clase de JavaScript.

```javascript
class HolaMundo extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<h1>Hola Mundo</h1>`;
  }
}

customElements.define("hola-mundo", HolaMundo);
```

Una vez registrado, puedes usarlo en cualquier lugar:

```html
<hola-mundo></hola-mundo>
```

### Shadow DOM: Encapsulamiento de estilos (sin colisiones de CSS)

Si alguna vez has trabajado en un proyecto grande, conoces el dolor de los estilos "misteriosamente rotos" porque dos equipos usaron el mismo nombre de clase `.button`.

El Shadow DOM proporciona encapsulamiento para que los estilos de tu componente no se filtren hacia afuera, y los estilos globales no se filtren hacia adentro.

```javascript
class TarjetaProtegida extends HTMLElement {
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
        <h3>Tarjeta con Shadow DOM</h3>
        <slot></slot>
      </div>
    `;
  }
}

customElements.define("tarjeta-protegida", TarjetaProtegida);
```

### HTML Templates: Estructuras reutilizables (renderizadas solo cuando se necesitan)

El elemento `<template>` te da un plano del DOM reutilizable que _no_ se renderiza hasta que lo clonas.

```html
<template id="fila-de-usuario-template">
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
const tpl = document.getElementById("fila-de-usuario-template");

function renderFilaDeUsuario({ name, email }) {
  const fragment = tpl.content.cloneNode(true);
  fragment.querySelector(".name").textContent = name;
  fragment.querySelector(".email").textContent = email;
  return fragment;
}
```

## Sección 2: Material Design como el "Cerebro Visual"

Los Web Components resuelven la interoperabilidad y el encapsulamiento, pero no resuelven automáticamente la _coherencia de diseño_. Si cada equipo construye componentes con diferentes espaciados, tipografía y estados de interacción, seguirás terminando con un producto fragmentado.

Material Design actúa como el cerebro visual compartido: reglas, patrones y restricciones que mantienen una UI consistente.

### Accesibilidad (A11y)

La accesibilidad es una de esas cosas que parece fácil hasta que intentas hacerla correctamente:

- **Navegación por teclado** a través de componentes complejos
- **Estados de foco** que son visibles y consistentes
- **Contraste de color** que cumple con WCAG
- **Semántica ARIA** para lectores de pantalla

Los componentes de Material integran estos comportamientos, para que no tengas que reinventarlos en cada proyecto.

### Material 3 (M3): "Material You" y personalización

Material 3 es un gran cambio hacia la personalización. El sistema de diseño está construido alrededor de un conjunto de tokens (colores, tipografía, elevaciones) que pueden adaptarse para coincidir con tu marca, y se adapta naturalmente a diferentes dispositivos y contextos.

En otras palabras: puedes tener un sistema compartido sin tener un producto que se vea genérico.

## Sección 3: El Dúo Dinámico: Material Web (Lit & MWC)

Aquí es donde se pone real.

Google mantiene **Material Web** (`@material/web`), una colección de componentes de Material Design implementados como Web Components.

La ventaja es simple: puedes usar un botón de Material en una página HTML estática, una plantilla renderizada en PHP, una app de React o un proyecto de Angular sin cambiar el componente en sí.

### Usando un botón de Material Web (agnóstico del framework)

```html
<script type="module">
  import "@material/web/button/filled-button.js";
</script>

<md-filled-button>Guardar</md-filled-button>
```

### Por qué Lit importa aquí

Lit es la librería ligera que hace que crear Web Components sea ergonómico y rápido. Es ideal cuando quieres construir tus propios componentes junto a Material Web.

```javascript
import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("chip-de-usuario")
class ChipDeUsuario extends LitElement {
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

  @property() name = "Anónimo";
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

## Conceptos Técnicos para Destacar

### Interoperabilidad

La capacidad de mezclar librerías y frameworks dentro de la misma organización usando una librería de componentes base común.

En la práctica, esto reduce el trabajo duplicado y hace que la consistencia de la UI sea mucho más fácil.

### Encapsulamiento

El Shadow DOM previene colisiones de selectores y filtrado de estilos, lo cual es vital en grandes bases de código y especialmente en arquitecturas de micro-frontends.

### Design Tokens

Material Design depende mucho de los tokens, típicamente expuestos como variables CSS. Cambiar tu color "Primario" en un lugar puede actualizar toda la suite de componentes.

```css
:root {
  --md-sys-color-primary: #6750a4;
  --md-sys-color-on-primary: #ffffff;
}
```

## Ideas para Enganchar al Lector: Micro-frontends, Rendimiento y Storybook

### El Caso de Uso de Micro-frontends

He visto configuraciones de micro-frontends donde diferentes equipos despliegan independientemente usando diferentes stacks (React, Vue, Angular). Un conjunto compartido de Web Components (especialmente un kit compartido de Material) se convierte en la forma más pragmática de mantener una UI consistente sin forzar un solo framework.

### Rendimiento (Performance)

Debido a que los Web Components son nativos de la plataforma y Lit es diminuto, a menudo obtienes un menor impacto en el tamaño del bundle comparado con librerías de componentes específicas de frameworks.

### Práctica recomendada: Usa Storybook

Si estás construyendo (o adoptando) una librería de componentes, Storybook es una de las mejores formas de documentar componentes de forma aislada. También es una buena función para forzar la consistencia: props, slots, estados y chequeos de accesibilidad se vuelven visibles y testeables.

## Referencias y Herramientas

- **Material Web**: https://material-web.dev/
- **Lit**: https://lit.dev/
- **WebComponents.org**: https://www.webcomponents.org/
- **Material 3 Design System**: https://m3.material.io/

Espero que esto te dé un modelo mental claro de por qué Web Components + Material Design son una combinación tan fuerte. Interoperabilidad + encapsulamiento + un sistema de diseño maduro es una mezcla bastante rara en el frontend.

![Profile](https://res.cloudinary.com/khriztianmoreno/image/upload/c_scale,w_148/v1591324337/KM-brand/stickers/sticker-3_2x.png)

#### @khriztianmoreno 🚀
