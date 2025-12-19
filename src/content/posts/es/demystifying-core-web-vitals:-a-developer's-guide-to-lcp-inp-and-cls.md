---
title: Desmitificando Core Web Vitals - guía para desarrolladores sobre LCP, INP y CLS
tags:
  - web-performance
  - core-web-vitals
  - lighthouse
  - web-development
  - crux
  - chrome
  - performance
  - web-devtools
date: 2025-10-19 08:13:50
updated: 2025-10-19 08:13:50
---

Core Web Vitals son señales de ranking, pero la mayoría de los equipos todavía las optimiza como si fueran un score de laboratorio. Esta guía convierte CWV en trabajo de ingeniería accionable: cómo medir (field + lab), cómo depurar causas raíz en DevTools y qué arreglos realmente mueven el percentil 75.

<!--more-->

# Core Web Vitals es trabajo de ingeniería, no un mini-juego de Lighthouse

Si trabajas en performance web, probablemente ya viste el mismo patrón:

- **El equipo “optimiza Core Web Vitals”** persiguiendo un score verde en Lighthouse.
- **El score mejora**.
- **El reporte de Search Console no**.
- **Los usuarios reales siguen quejándose** de que el sitio “se siente trabado” o “se queda colgado cuando toco”.

Esa brecha existe porque **Core Web Vitals son métricas de campo**. Se evalúan con experiencias reales (CrUX / RUM) en el **percentil 75**, segmentadas por dispositivo + red. Lighthouse sigue siendo útil, pero no es la autoridad.

Además hay una tensión más reciente que muchos equipos aún no internalizan:

- **INP reemplazó silenciosamente a FID el 12 de marzo de 2024**.

El cambio importa porque redefine qué significa “buena performance”. FID premiaba principalmente “arrancar rápido a manejar el primer tap”. INP premia algo más estricto y más cercano a cómo los usuarios juzgan un sitio: **responsividad consistente durante toda la sesión**.

Si quieres construir páginas que _ranken_ y _se sientan_ rápidas, tienes que tratar CWV como:

- **Señales instrumentadas en producción**
- **Trazas depurables**
- **Cuellos de botella corregibles**

Referencias:

- https://developer.chrome.com/docs/crux/api?hl=en
- https://developers.google.com/search/blog/2023/05/introducing-inp

# Core Web Vitals (overview rápido)

Una tabla. Sin relleno.

| Métrica | Qué mide                      | Bueno (percentil 75) |
| ------- | ----------------------------- | -------------------- |
| LCP     | Carga del contenido principal | ≤ 2.5s               |
| INP     | Responsividad de interacción  | ≤ 200ms              |
| CLS     | Estabilidad visual            | ≤ 0.1                |

## Datos de campo vs datos de laboratorio (por qué tu “Lighthouse en verde” igual puede fallar)

- **Campo (CrUX / RUM)**: lo que Google usa para ranking y lo que los usuarios sienten.

  - Agregado sobre sesiones reales.
  - Evaluado en el **percentil 75**.
  - Sensible a dispositivos lentos, redes malas, contención de CPU, scripts de terceros y sesiones largas.

- **Laboratorio (Lighthouse / DevTools)**: lo que usas para reproducir, detectar regresiones y depurar.
  - Entorno controlado.
  - Excelente para identificar causas.
  - No es autoritativo para SEO.

Si te quedas con una sola regla de este post:

- **Si no se mide en el campo, no existe.**

Referencias:

- CrUX Dashboard: https://developer.chrome.com/docs/crux/dashboard
- PageSpeed Insights docs: https://developers.google.com/speed/docs/insights/v5/about

# LCP (Largest Contentful Paint)

## Qué cuenta realmente como LCP

LCP no es “el momento en que la página se ve lista” y tampoco es “cuando termina de cargar el hero”. Chrome rastrea continuamente **candidatos de LCP** mientras renderiza, y luego reporta el ganador final.

Los candidatos más comunes incluyen:

- **Elementos `<img>`** (incluye imágenes responsive)
- **Frames de `<video poster>`**
- **Algunas imágenes de fondo** (cuando se pintan como un elemento “contentful” de imagen)
- **Bloques grandes de texto** (títulos grandes, copy del hero)

Lo importante para depurar es _qué elemento ganó_ y _por qué llegó tarde_.

En la práctica, una investigación de LCP empieza con:

- **Identificar el elemento LCP**
- **Descomponer su timeline**
  - TTFB
  - Tiempo de carga del recurso (imagen/fuente)
  - Retraso de render (main thread / hidratación / layout)

Referencia:

- https://web.dev/lcp/
- Depuración de LCP en DevTools: https://developer.chrome.com/docs/lighthouse/performance/lighthouse-largest-contentful-paint

## Medir LCP (código)

Usa `web-vitals` en producción para capturar LCP de campo y el elemento responsable.

```js
import { onLCP } from "web-vitals";

onLCP((metric) => {
  console.log(metric.value, metric.element);
});
```

Si esto es trabajo serio, no te quedes en `console.log`. Envíalo a tu endpoint de RUM y segmenta:

- Clase de dispositivo
- Tipo de conexión efectiva
- Ruta/template
- Cohorte A/B

## Asesinos típicos de LCP en el mundo real

- **Imágenes hero que cargan tarde**

  - El hero se solicita después de que resuelven CSS/JS.
  - La imagen se descubre tarde porque está en CSS o se inyecta después de hidratar.

- **TTFB del servidor**

  - Origin lento.
  - Arranques en frío.
  - SSR pesado (compute costoso).
  - Fallos de caché.

- **Cascadas de rendering del lado del cliente**
  - “Blank shell” + fetch + render.
  - Hidratación del framework bloqueando el paint.
  - Fuentes retrasando el paint de texto (FOIT) o causando relayout (FOUT).

## Arreglos que sí funcionan

### 1) Hacer el request del hero temprano (e intencional)

```html
<link rel="preload" as="image" href="/hero.webp" fetchpriority="high" />
```

Guía rápida:

- **Preload vs prefetch**

  - `preload` es una señal fuerte de “lo necesito para esta navegación”.
  - `prefetch` es especulativo y puede ser ignorado bajo presión.

- **`fetchpriority`**
  - Usa `high` para el elemento que realmente es LCP.
  - No lo apliques a todo, o solo vas a reordenar la contención.

### 2) Evitar que la hidratación bloquee el primer render significativo

Cada framework es distinto, pero el principio es el mismo: **enviar menos JS antes del primer paint**.

Si tu stack lo soporta, prefiere:

- SSR o rendering estático para la zona LCP
- Hidratación parcial / islands para widgets debajo del fold
- Streaming SSR cuando reduzca tiempo bloqueante

### 3) Arregla TTFB antes de tocar imágenes

Si tu desglose de LCP muestra que domina TTFB, optimizar imágenes no va a mover la aguja.

Victorias típicas “TTFB-first”:

- Cache en CDN para HTML
- Cache del render del servidor
- Reducir fan-out del backend
- Evitar personalización costosa antes del primer byte

### Nota específica (Next.js)

El knob exacto depende de la versión y del routing (Pages vs App), pero la intención es reducir JS en runtime cuando sea posible.

```js
export const config = {
  unstable_runtimeJS: false,
};
```

Tómalo como un recordatorio, no como un arreglo de copy/paste: **valida qué soporta realmente tu versión del framework** y mide el impacto en hidratación + interactividad.

# INP (Interaction to Next Paint)

Este es el corazón del trabajo de CWV en 2025.

## Por qué FID era engañoso (y por qué Google lo reemplazó)

FID medía solo una cosa:

- El delay entre la **primera** interacción del usuario y el momento en que el navegador puede empezar a procesarla.

No medía:

- Tiempo de ejecución del event handler
- Tiempo de render después del handler
- La interacción número 20 en una página de larga duración
- Responsividad cuando la app “ya cargó”, pero el main thread está constantemente ocupado

Por eso los equipos podían “arreglar FID” con pequeños ajustes (o pateando trabajo para después) y aun así entregar experiencias que se sienten lentas.

INP corrige eso. Rastrea la responsividad durante toda la vida de la página y está diseñado para alinearse con el dolor real percibido en UX.

Referencia:

- https://web.dev/inp/

## Cómo funciona INP (modelo mental)

INP es, a grandes rasgos:

- **La peor (o casi la peor) latencia de interacción** observada durante la vida de la página
- Para cada interacción, mide desde el **input** hasta el **siguiente paint**

Así que INP no solo castiga “handlers de click lentos”. Castiga cualquier momento en el que:

- El main thread está ocupado (long tasks)
- Renderizar es costoso
- Los updates son sincrónicos y bloquean el paint

## Medir INP (código)

```js
import { onINP } from "web-vitals";

onINP((metric) => {
  console.log(metric.value, metric.attribution);
});
```

El payload de atribución es tu puente de “INP está mal” a “esta interacción exacta está mal”. Los campos varían por browser + versión de la librería, pero deberías ver (o derivar):

- **`eventType`** (e.g. `click`, `pointerdown`, `keydown`)
- **`target`** / **objetivo de la interacción** (qué elemento)
- **`interactionId`** (para correlacionar eventos relacionados)

## Problemas típicos de INP (lo que más veo)

### 1) Tareas largas de JS

Si el main thread está bloqueado por 200ms+, básicamente estás tirando los dados con INP.

Causas comunes:

- Parseo/serialización sincrónica pesada
- Formateo costoso
- Reconciliación de listas grandes
- Updates de “un reducer gigante”

### 2) Overhydration / trabajo excesivo en el cliente

Hidratar todo de entrada suele crear un main thread permanentemente ocupado:

- Demasiados componentes hidratando al mismo tiempo
- Transiciones de routing del lado del cliente haciendo trabajo costoso
- Recalcular estado derivado en cada input

### 3) Scripts de terceros

Los terceros son un saboteador frecuente de INP porque:

- Programa trabajo de manera impredecible
- Compite por CPU durante interacciones del usuario
- Muchas veces se entrega sin presupuestos de performance

## Depurar INP: de la métrica → interacción → long task

Lo que funciona de forma consistente:

1. **Empieza por datos de campo**

   - Confirma que INP es realmente un problema en producción.
   - Identifica los templates/rutas más afectados.

2. **Reproduce en DevTools Performance**

   - Graba una interacción (click, escribir, abrir menú).
   - Busca long tasks alrededor de la interacción.

3. **Usa el desglose “why is this slow?”**
   - Scripting vs rendering vs estilos/layout.
   - Identifica la función/componente específico que causa el bloqueo.

Referencias:

- Panel Performance de DevTools: https://developer.chrome.com/docs/devtools/performance
- API de Long Tasks: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceLongTaskTiming

## Patrones de fix que mueven INP

### 1) Sacar trabajo no crítico del camino de interacción

```js
requestIdleCallback(() => {
  initAnalytics();
});
```

Reglas prácticas:

- El trabajo en idle debe ser cancelable.
- No programes tareas “idle” que en realidad son necesarias para la UX.

### 2) Partir long tasks (no solo “optimizarlas”)

Si tienes 300ms de trabajo, recortar 20ms rara vez salva INP. Necesitas crear oportunidades de paint.

Opciones:

- Partir el trabajo en chunks usando `setTimeout(0)` / `queueMicrotask` de forma estratégica
- Usar `scheduler.postTask` cuando esté disponible
- Mover cómputo a un Web Worker

### 3) Hacer updates de UI “interruptibles” (ejemplo en React)

```js
button.addEventListener("click", () => {
  startTransition(() => {
    setState(expensiveUpdate);
  });
});
```

La idea clave no es “usar transitions en todas partes”. Es:

- Mantener la respuesta inmediata liviana
- Permitir que el trabajo costoso haga yield para que el navegador pueda pintar

### 4) Reducir la cantidad de trabajo por interacción

Victorias de alto impacto:

- Virtualizar listas largas
- Evitar `JSON.stringify` sincrónico en objetos grandes durante input
- Memoizar cómputos derivados (pero valida que realmente reduzca trabajo)
- No re-renderizar páginas completas en cada tecla

### 5) Poner a los terceros con correa

Si no puedes removerlos:

- Cargarlos más tarde
- Gatearlos detrás de consentimiento o después de la primera interacción
- Usar Partytown o enfoques basados en workers cuando aplique
- Definir presupuestos de performance y hacerlos cumplir

# CLS (Cumulative Layout Shift)

CLS es la métrica que la mayoría cree entender… hasta que ads, fuentes y “solo un banner dinámico” destruyen producción.

## Por qué CLS todavía le falla a los equipos

- **Ads y embeds** que cambian de tamaño después de cargar
- **Fuentes** que hacen swap y cambian métricas
- **Componentes dinámicos** que montan por encima del contenido existente
- **Inyección tardía de UI** (banners de cookies, promos, consent, tooltips)

## Medir CLS (código)

```js
import { onCLS } from "web-vitals";

onCLS((metric) => {
  console.log(metric.value);
});
```

Para depurar, captura atribución (fuentes del shift) cuando sea posible y combínalo con “Layout Shift Regions” en DevTools.

Referencia:

- https://web.dev/cls/
- Regiones de layout shift en DevTools: https://web.dev/articles/debug-layout-shifts

## Arreglos que importan

### 1) Reservar espacio para media

```css
img {
  aspect-ratio: 16 / 9;
}
```

Por qué funciona:

- El navegador puede asignar espacio antes de que cargue el recurso.
- Evitas “empujes hacia abajo” que cuentan como layout shifts.

Si puedes, también incluye atributos explícitos `width` y `height` en imágenes. `aspect-ratio` es un gran complemento, especialmente cuando el responsive hace menos obvio el tamaño estático.

### 2) Evitar que las fuentes “sorprendan” el layout

```html
<link
  rel="preload"
  as="font"
  href="/inter.woff2"
  type="font/woff2"
  crossorigin
/>
```

Matiz importante:

- **`font-display` por sí solo no alcanza**.
  - Cambia el comportamiento de swap, pero no garantiza compatibilidad de métricas.
- Usa **fallbacks compatibles en métricas** (o `size-adjust`) para reducir reflow cuando carga la fuente custom.

### 3) Tratar la inyección tardía de UI como un breaking change

Banners de cookies, promos, “new feature” banners: si se monta por encima del contenido después del paint inicial, probablemente pega CLS.

Patrones que evitan CLS:

- Renderizar el espacio desde el inicio (aunque el contenido se llene después)
- Superponer en vez de empujar (con cuidado; no bloquees contenido)
- Insertar por debajo del fold

# Stack de herramientas (Google-first, amigable para ingeniería)

Usa cada herramienta para lo que mejor hace.

## Lighthouse

Mejor para:

- Detección de regresiones en CI
- Comparaciones controladas de antes/después
- Detectar temprano problemas obvios de LCP/CLS

No tan buena para:

- Probar impacto en SEO
- Predecir el percentil 75

## PageSpeed Insights (PSI)

Mejor para:

- Un snapshot por página que combina **datos de campo CrUX** + lab
- Comunicar “campo vs lab” a stakeholders

## Chrome DevTools (Performance panel)

Mejor para:

- Análisis de causa raíz
- Trazas de interacción para INP
- Identificar long tasks, layout thrash y paints costosos

## CrUX Dashboard

Mejor para:

- Realidad SEO
- Análisis de tendencias en el tiempo
- Segmentar por clase de dispositivo y conexión

## Reporte de CWV en Search Console (úsalo con cuidado)

Sirve para monitoreo general, pero tiene bordes filosos:

- La agregación puede esconder los peores templates
- “Needs Improvement” (Necesita mejorar) puede ocultar qué tan mala es la cola
- No es una herramienta de depuración

# Impacto en SEO (breve y preciso)

- **Core Web Vitals son señales de ranking** (parte de page experience).
- Funcionan como **desempates**, no como balas mágicas.
- CWV malos pueden poner un techo al crecimiento porque:
  - Pierdes tie-breaks en queries competitivas.
  - El comportamiento de usuario (bounce / back-to-SERP) empeora.
  - La eficiencia de crawl y render puede sufrir en páginas pesadas.

Referencia:

- https://developers.google.com/search/docs/appearance/page-experience

# Conclusión: optimiza cómo se siente, no cómo puntúa

Core Web Vitals dejan de ser ambiguas en el momento en que las tratas como métricas de ingeniería:

- **LCP** se trata de entregar el contenido principal con mínima demora del servidor y mínimo bloqueo de render.
- **INP** se trata de mantener el main thread disponible para humanos, no solo para métricas de arranque.
- **CLS** se trata de respetar el layout como un contrato.

El mayor cambio (y la razón por la que INP importa tanto) es que la performance ahora es **interaction-first**. Ya no alcanza con cargar rápido; tienes que mantenerte responsivo.

Y la regla no negociable sigue vigente:

- **Si no se mide en el campo, no existe.**

Optimizar Core Web Vitals significa optimizar cómo se siente para el usuario, no solo cómo carga.

# Checklist (alto impacto)

## Baseline

- **Verifica la realidad en campo**: datos de 28 días en CrUX/PSI para rutas/templates clave.
- **Segmenta**: mobile vs desktop; red lenta vs rápida; logged-in vs logged-out.
- **Elige un objetivo**: mover el percentil 75, no la mediana.

## LCP

- **Identifica el elemento LCP** (campo + lab).
- **Haz preload del recurso LCP** (normalmente el hero) y configura `fetchpriority="high"`.
- **Elimina trabajo render-blocking** en el camino de LCP (CSS/JS/hidratación).
- **Arregla TTFB** si domina el breakdown.

## INP

- **Graba interacciones reales** en DevTools Performance.
- **Encuentra long tasks** alrededor de la interacción.
- **Parte tareas** y crea oportunidades de paint.
- **Difere trabajo no crítico** (`requestIdleCallback`, planificación post-task).
- **Reduce el trabajo por interacción** (virtualiza, memoiza, evita rerenders completos).
- **Audita scripts de terceros** con budgets.

## CLS

- **Reserva espacio** para imágenes, embeds y ads (`width`/`height`, `aspect-ratio`).
- **Haz preload de fuentes críticas** y usa fallbacks compatibles en métricas.
- **Elimina UI insertada tarde** por encima del contenido existente.

![Profile](https://res.cloudinary.com/khriztianmoreno/image/upload/c_scale,w_148/v1591324337/KM-brand/stickers/sticker-3_2x.png)

@khriztianmoreno
