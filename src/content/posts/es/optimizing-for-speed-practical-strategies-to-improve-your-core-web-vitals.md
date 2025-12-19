---
title: Optimizar para velocidad - Estrategias prácticas para mejorar tus Core Web Vitals
tags:
  - performance
  - core-web-vitals
  - web-vitals
  - lcp
  - inp
  - cls
  - chrome-devtools
date: 2025-11-09 08:41:05
updated: 2025-11-09 08:41:05
---

Las páginas pueden cargar rápido.

Y aun así sentirse lentas.

Esa es la trampa moderna del performance: shippeas un render inicial “snappy”, pero las interacciones se traban, la UI salta y la página pierde confianza. **Core Web Vitals existen para exponer esa brecha—y se evalúan en el field**, no en tu corrida local de Lighthouse.

<!--more-->

# La velocidad ya no es solo “load time”

Core Web Vitals divide el performance en tres percepciones distintas del usuario:

- **LCP = loading perception**
  El momento en el que el usuario _cree_ que la página ya está lista.
- **INP = interaction cost**
  El tiempo entre la intención del usuario y la confirmación visible.
- **CLS = visual trust**
  Si la UI respeta la atención del usuario.

Este post está intencionalmente sesgado hacia cambios que puedas shippear como pull requests y que **muevan de forma medible los datos de CrUX (field)**.

# Mentalidad de optimización: optimiza para field data, no para Lighthouse

Trata las herramientas de lab como microscopios, no como marcadores.

- **CrUX decides if it matters**
  CrUX es un dataset trailing de 28 días de usuarios reales. Es lo que usa el reporte de Core Web Vitals en Search Console, y lo que PSI expone como “field data”.
- **Lighthouse explains why**
  Lighthouse es una corrida sintética con throttling controlado. Es excelente para causal debugging, detectar regresiones y correr audits—pero no es tu KPI.

Si vas en serio con shippear mejoras que aparezcan en dashboards:

- **Detecta** en CrUX o grupos de Search Console
- **Debug** localmente con DevTools (Performance / Performance Insights / Rendering)
- **Valida** con PageSpeed Insights (field + lab)
- **Monitorea** con RUM + deltas semanales/mensuales de CrUX

Referencias:

- https://developer.chrome.com/docs/crux/
- https://developers.google.com/speed/docs/insights/v5/about
- https://support.google.com/webmasters/answer/9205520?hl=en

# Optimizar Largest Contentful Paint (LCP)

## Qué suele convertirse en LCP

En la mayoría de sitios en producción, el elemento LCP es uno de:

- **Hero image** (o su poster / background)
- **Above-the-fold H1**
- **Featured media** (poster de video embebido)

No optimizas LCP “en abstracto”: optimizas el pipeline que entrega _ese único elemento_.

## Confirmar el elemento de LCP (field-friendly)

Si ya shippeas RUM, el build de attribution de `web-vitals` es la forma más rápida de identificar qué es lo que los usuarios realmente están esperando:

```ts
import { onLCP } from "web-vitals/attribution";

onLCP((metric) => {
  // A selector-ish string for the element associated with LCP.
  // Useful to aggregate in analytics and turn into a PR backlog.
  console.log("LCP target:", metric.attribution.element);
});
```

Si necesitas el DOM element real en una sesión local de debugging, usa `PerformanceObserver` e inspecciona los entries:

```ts
new PerformanceObserver((entryList) => {
  for (const entry of entryList.getEntries()) {
    console.log("LCP candidate:", entry.startTime, entry);
  }
}).observe({ type: "largest-contentful-paint", buffered: true });
```

Referencias:

- https://web.dev/lcp/
- https://github.com/GoogleChrome/web-vitals

## Optimización de imágenes (la mejora de LCP más grande y confiable)

Si tu LCP es una imagen, casi siempre estás peleando con **bytes** y **discovery/priority**.

### Shippea formatos modernos con un fallback real

```html
<picture>
  <source srcset="/hero.avif" type="image/avif" />
  <source srcset="/hero.webp" type="image/webp" />
  <img src="/hero.jpg" width="1200" height="630" alt="" />
</picture>
```

Por qué funciona:

- **AVIF > WebP > JPEG** por eficiencia de compresión en la mayoría de casos reales.
- Menos tiempo de transferencia significa menos tiempo hasta que el browser pueda decodificar, pintar y declarar LCP.

### Preload de la imagen LCP (y setear fetch priority)

Si el browser “descubre” tarde la imagen LCP (o le baja la prioridad), pierdes cientos de ms sin que se vea ningún “bug” obvio. Arregla el discovery explícitamente:

```html
<link rel="preload" as="image" href="/hero.webp" fetchpriority="high" />
```

Y asegúrate de que la imagen real no sea tratada como low priority:

```html
<img
  src="/hero.webp"
  width="1200"
  height="630"
  fetchpriority="high"
  loading="eager"
  decoding="async"
  alt=""
/>
```

Por qué funciona:

- Preload reduce el **resource load delay** (late discovery).
- `fetchpriority="high"` señala intención cuando las heuristics competirían contra CSS/JS/fonts.

Referencias:

- https://developer.chrome.com/docs/performance/insights/lcp-discovery
- https://developer.chrome.com/blog/new-in-chrome-101
- https://developer.chrome.com/blog/devtools-tips-30

### No hagas lazy-load de la imagen LCP

Esta es la regresión más común de “optimizamos imágenes”.

- Si es LCP, debería estar en el initial viewport.
- Si está en el initial viewport, **no puede esperar a intersection observers**.

Usa `loading="eager"` para el hero. Lazy-load para todo lo demás.

## Reduce server response time (TTFB todavía importa)

TTFB no es un Core Web Vital, pero está upstream de LCP. Si el HTML llega tarde, _todo_ llega tarde.

Fixes de alto impacto que típicamente se convierten en PRs limpios:

- **Edge/CDN caching** para HTML donde sea viable (incluso TTLs cortos ayudan)
- **Cache-friendly architecture** (static assets versionados, immutable caching)
- **Streaming SSR** (flush temprano del head; desbloquea discovery de CSS/hero preload)
- Headers **Server-Timing** para ubicar bottlenecks del backend en el field

Ejemplo conceptual de caching para HTML en el CDN:

```http
Cache-Control: public, max-age=0, s-maxage=86400
```

Referencias:

- https://web.dev/articles/ttfb
- https://web.dev/articles/optimize-ttfb
- https://web.dev/articles/optimize-lcp

## LCP PR checklist (copy/paste directo a tu backlog)

- **Identify LCP element** en field (RUM attribution) y confirma localmente en DevTools.
- **If LCP is an image**
  - Convierte a AVIF/WebP con fallbacks correctos.
  - Asegura sizing intrínseco correcto (`width`/`height`) para evitar sorpresas de decode/layout.
  - Agrega preload + `fetchpriority="high"`.
  - Asegura que no esté lazy-loaded.
- **If LCP is text**
  - Asegura que el render-critical CSS sea pequeño y temprano.
  - Arregla el font discovery (ver sección de CLS).
- **If TTFB is high**
  - Agrega caching o mueve compute fuera del critical path.
  - Agrega Server-Timing y desglosa el trabajo del backend.

# Optimizar Interaction to Next Paint (INP)

La mayoría de equipos fallan en INP porque lo tratan como un problema de “JS bundle size”. Normalmente es un problema de **main-thread scheduling**.

INP se basa en las peores interacciones (técnicamente p98) a lo largo de la vida de la página, así que un solo interaction path malo puede hundir toda la experiencia.

Referencias:

- https://web.dev/inp/
- https://developer.chrome.com/docs/performance/insights/inp-breakdown

## Encontrar long tasks y correlacionarlos con interacciones

Usa DevTools:

- **Performance panel** para traces y long tasks
- **Performance Insights** para el breakdown de INP (input delay / processing / presentation)

Referencia:

- https://developer.chrome.com/docs/devtools/performance/

## Regla práctica: tasks por encima de ~50ms son hostiles

Cualquier “one big function” que corra durante un input es candidata a split, defer o mover.

### Rompe el trabajo intencionalmente (chunking)

```ts
function chunkWork<T>(items: T[], doWork: (item: T) => void) {
  if (!items.length) return;

  doWork(items.shift()!);

  setTimeout(() => chunkWork(items, doWork));
}
```

Por qué funciona:

- Libera el main thread para que inputs puedan procesarse y pueda ocurrir un paint.
- Reduce el “processing duration” de tus peores interacciones.

### Defer non-critical JavaScript

Si un script no contribuye al primer interaction path, no debería competir por tiempo del main thread.

```html
<script src="analytics.js" defer></script>
```

O cuando aplique:

```ts
requestIdleCallback(() => {
  loadAnalytics();
});
```

Por qué funciona:

- Menos contención durante el periodo en el que los usuarios empiezan a hacer click.
- Menos picos de CPU que inflan input delay y processing.

### Ejemplo específico de framework (React)

```ts
import { startTransition } from "react";

startTransition(() => {
  setState(expensiveUpdate);
});
```

Por qué ayuda:

- Mantiene responsive los updates urgentes.
- Defiere trabajo de rendering no urgente.

## INP PR checklist

- **Identify the worst interaction** en field (RUM) y reprodúcelo localmente.
- **Trace in DevTools**
  - Long tasks on Main
  - INP breakdown: input delay vs processing vs presentation
- **Fix strategy**
  - Split trabajo síncrono (chunking / yielding)
  - Defer non-critical scripts (`defer`, idle, route-based loading)
  - Reduce re-renders (memoization, transitions, evita lecturas de layout costosas)
- **Validate**
  - Confirma que la interacción quede consistentemente por debajo del umbral “good” en lab.
  - Monitorea la tendencia p75 en el field de CrUX/PSI con el tiempo.

# Optimizar Cumulative Layout Shift (CLS)

CLS es la métrica de “respeto”.

Tu layout no debería sorprender al usuario después de que empieza a leer o a apuntar a un botón.

Referencia:

- https://web.dev/cls/

## Debug de CLS: visualiza layout shift regions

DevTools puede mostrarte exactamente qué se movió:

- Abre DevTools → More tools → Rendering
- Activa **Layout Shift Regions**

Referencia:

- https://developer.chrome.com/docs/devtools/rendering/performance

## Siempre reserva espacio

### Imágenes: setear tamaño intrínseco

```html
<img src="/card.jpg" width="400" height="300" alt="" />
```

### O reservar con CSS

```css
.card {
  aspect-ratio: 4 / 3;
}
```

Por qué funciona:

- El browser puede calcular el layout antes de que llegue el recurso.
- Sin “push down” shift cuando carga el media.

## Font loading bien hecho (sin regresiones de CLS)

Preload del font que necesitas para texto above-the-fold:

```html
<link
  rel="preload"
  as="font"
  href="/inter.woff2"
  type="font/woff2"
  crossorigin
/>
```

Y evita FOIT:

```css
@font-face {
  font-family: "Inter";
  src: url("/inter.woff2") format("woff2");
  font-display: swap;
}
```

Matiz importante para performance owners:

- `swap` puede introducir un shift si las métricas del fallback difieren del font final.
- Si CLS es sensible, invierte en fallback selection y en alineación de métricas del font.

Referencia:

- https://web.dev/learn/performance/optimize-web-fonts

## Evita late DOM injection above the fold

Ofensores comunes:

- Cookie banners
- Chat widgets
- Ads

Estrategia PR-friendly:

- **Reserva a container** (fixed height / min-height)
- **Inject inside the reserved space**
- **Load below the fold** cuando sea posible

## CLS PR checklist

- **Activa Layout Shift Regions** y reproduce el shift.
- **Classify the offender**
  - Missing size/aspect ratio
  - Font swap
  - Late injection
- **Fix**
  - Reserva espacio con tamaños intrínsecos o `aspect-ratio`
  - Preload de fonts clave; usa `font-display` de forma intencional
  - Reserva contenedores para banners/widgets

# Minimización de CSS y JS (rol de soporte)

Sé preciso: “bundles más pequeños” solo importan en la medida en que reduzcan **critical work**.

- Menos JS mejora **INP** (menos presión de parse/compile/execution, menos long tasks)
- Menos CSS mejora la velocidad de render y reduce time-to-first-render para contenido clave

Tooling de DevTools que de verdad produce PRs:

- **Coverage tab** para encontrar CSS/JS sin uso que estás shippeando a rutas iniciales
- Bundler analyzers para identificar dependencias transitivas grandes

Referencias:

- https://developer.chrome.com/docs/devtools/coverage/

# Estrategia de caching (a menudo ignorada)

El caching es el multiplicador silencioso: mejora TTFB, reduce bandwidth y hace que repeat navigations sean dramáticamente mejores.

Modelo mental (por capas):

- **Browser cache** (Cache-Control, ETag)
- **CDN cache** (s-maxage, stale-while-revalidate)
- **Application cache** (memoization, SSR caches, edge KV)

Regla clave:

Si no cambia por usuario, **cache it hard** y versiona URLs cuando puedas.

Referencia:

- https://web.dev/articles/http-cache

# Measurement loop (no negociable)

Si quieres “bad CWV → PRs concretos”, necesitas un workflow consistente.

## 1) Detecta vía CrUX (o grupos de Search Console)

- Identifica si el problema es **origin-wide** o **URL-group specific**.
- Enfócate en regresiones p75 en el field, no en anomalías aisladas de lab.

Referencias:

- https://developer.chrome.com/docs/crux/
- https://support.google.com/webmasters/answer/9205520?hl=en

## 2) Debug vía DevTools

- LCP: request discovery y priority
- INP: long tasks + interaction breakdown
- CLS: layout shift regions

Referencia:

- https://developer.chrome.com/docs/devtools/performance/

## 3) Valida vía PageSpeed Insights

Usa PSI para tener field vs lab en el mismo reporte y sanity-checkear mejoras.

Referencia:

- https://developers.google.com/speed/docs/insights/v5/about

## 4) Monitor (dashboards + paciencia)

CrUX es una ventana trailing de 28 días. No vas a ver un “win” instantáneo a menos que el tráfico sea alto.

Usa:

- RUM para fast feedback
- CrUX/PSI para field reality
- Search Console CWV para reporting SEO-adjacent (con lag)

# Conclusión

La velocidad es calidad de interacción.

INP cambió el juego: no puedes brute-forcear la responsiveness con un solo sprint de “optimizar bundle size”.

LCP sigue siendo, en su mayoría, imágenes y discovery.

CLS es sobre respeto al layout.

Optimizar Core Web Vitals no es sobre herramientas.

Es disciplina de ingeniería, medida en el mundo real.

# Fuentes

- https://web.dev/vitals/
- https://web.dev/lcp/
- https://web.dev/inp/
- https://web.dev/cls/
- https://web.dev/articles/optimize-lcp
- https://web.dev/articles/ttfb
- https://web.dev/articles/optimize-ttfb
- https://web.dev/articles/http-cache
- https://web.dev/learn/performance/optimize-web-fonts
- https://developer.chrome.com/docs/crux/
- https://developer.chrome.com/docs/devtools/performance/
- https://developer.chrome.com/docs/devtools/coverage/
- https://developer.chrome.com/docs/devtools/rendering/performance
- https://developer.chrome.com/docs/performance/insights/inp-breakdown
- https://developer.chrome.com/docs/performance/insights/lcp-discovery
- https://developers.google.com/speed/docs/insights/v5/about
- https://support.google.com/webmasters/answer/9205520?hl=en

![Profile](https://res.cloudinary.com/khriztianmoreno/image/upload/c_scale,w_148/v1591324337/KM-brand/stickers/sticker-3_2x.png)

#### @khriztianmoreno
