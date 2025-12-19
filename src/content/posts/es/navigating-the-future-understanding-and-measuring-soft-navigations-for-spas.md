---
title: Navegando hacia el futuro - Entendiendo y midiendo las Soft Navigations para SPAs
tags:
  - performance
  - web-development
  - javascript
  - chrome
date: 2025-11-12 09:07:54
updated: 2025-11-12 09:07:54
---

Explora el concepto de "soft navigations" en Single Page Applications (SPAs), por qué la medición tradicional de los Core Web Vitals ha sido un desafío para ellas, y los esfuerzos continuos del equipo de Chrome para estandarizar y habilitar reportes para estos cambios dinámicos de contenido.

<!--more-->

## Intro: Las SPAs realmente no navegan

Esta es la tensión en el corazón del desarrollo web moderno: las URL cambian. El contenido se actualiza. El usuario siente que ha ido a una nueva página. Pero para el navegador, **absolutamente nada sucedió**.

Las Single Page Applications (SPAs) rompieron el modelo fundamental de la web. Los Core Web Vitals (CWV)—el estándar de la industria para medir la experiencia del usuario—fueron diseñados para un mundo de cargas de página. Cuando haces clic en un enlace en un sitio tradicional, el navegador destruye el documento actual y carga uno nuevo. Esta "navegación dura" (hard navigation) le da al navegador un borrón y cuenta nueva para medir métricas como Largest Contentful Paint (LCP) y Cumulative Layout Shift (CLS).

En una SPA, ese borrón y cuenta nueva nunca llega. Después de la carga inicial, cada "página" que visitas es solo JavaScript mutando el DOM. El navegador ve una sesión larga y continua.

Google lo sabe. Y después de años de "interacciones" enmascaradas como "navegaciones", Chrome finalmente lo está solucionando.

## ¿Qué es una “Soft Navigation”?

Para cerrar esta brecha, Chrome está introduciendo el concepto de **Soft Navigation**.

Una soft navigation se define por un conjunto específico de heurísticas. Ocurre cuando:

1.  **Interacción del usuario**: El cambio es desencadenado por una acción del usuario (clic, pulsación de tecla).
2.  **Modificación de URL**: La URL cambia (a través de la History API) y el estado del historial se actualiza.
3.  **Mutación del DOM**: Hay un cambio significativo en el DOM (agregar o eliminar elementos).

Para el usuario, esto se siente exactamente como una nueva carga de página.
Para el navegador, tradicionalmente, esto era solo un manejador de eventos ejecutándose.
Con el nuevo modelo de Soft Navigation, el navegador reconoce: **"Ok, eso fue una navegación."**

Ejemplos incluyen:

- Cambiar rutas en React Router o Vue Router.
- Una acción de "Cargar más" que cambia la URL y reemplaza el feed principal.
- Renderizado del lado del cliente de una vista de detalle de producto después de hacer clic en una tarjeta.

## Por qué los Core Web Vitals fallan en las SPAs

La discrepancia entre la realidad de las SPA y el modelo de rendimiento tradicional es severa.

### El modelo tradicional

1.  **Inicio de navegación**: El navegador solicita el documento.
2.  **LCP**: El contenido más grande se carga.
3.  **CLS**: La estabilidad se mide hasta que la página se asienta.
4.  **INP**: Las interacciones se miden a lo largo del ciclo de vida.

### La realidad de las SPA

- **LCP** solo se reporta para la _página de aterrizaje_ (landing page). Si un usuario aterriza en la página de inicio y navega a una página de producto, la imagen principal pesada en la página de producto es ignorada por el LCP.
- **CLS** durante una transición de ruta a menudo se atribuye a la "página" _anterior_ o simplemente se pierde en el ruido de una sesión de larga duración.
- **INP** (Interaction to Next Paint) captura el retraso del clic que desencadena la ruta, pero trata toda la transición de ruta como una sola "interacción", no como una nueva carga de página.

Como se detalla en las [discusiones de rendimiento de SPA de web.dev](https://web.dev/articles/vitals-spa-faq), esto lleva a un punto ciego donde las peores experiencias de usuario—transiciones de ruta lentas y grandes cambios de diseño después de la navegación—son invisibles para el monitoreo estándar.

## Ejemplo del mundo real

Veamos un flujo de usuario concreto:

1.  **Usuario carga la página de inicio**: El navegador obtiene HTML, CSS, JS. **El LCP se mide aquí.**
2.  **Usuario hace clic en "Producto A"**:
    - JavaScript intercepta el clic.
    - Se llama a `fetch('/api/product/a')`.
    - Aparece un spinner de carga.
    - Llega el JSON y el DOM se reemplaza completamente.
    - Una imagen grande del producto se carga, empujando el contenido hacia abajo (Layout Shift).

**Lo que Chrome mide hoy:**
Ve el clic en "Producto A" como una _interacción_. El cambio de diseño causado por la imagen del producto podría agregarse al puntaje acumulativo de la sesión, pero no se atribuye a una "Página de Producto". El LCP de la imagen del producto se ignora completamente porque el LCP deja de reportarse después de la primera interacción del usuario.

**Lo que el usuario siente:**
Navegó a una página de producto lenta que saltó mientras cargaba.

Esta brecha es la motivación para las Soft Navigations.

## La respuesta de Chrome: Soft Navigations

La intención de Chrome es **detectar navegaciones de SPA automáticamente** y **tratarlas como navegaciones reales**.

Este cambio mueve el monitoreo de rendimiento de estar "basado en documentos" a estar "basado en experiencias". Si el usuario percibe un cambio de contexto, las métricas deberían reflejarlo. Al reiniciar la vara de medición en cada soft navigation, podemos calcular los Core Web Vitals _por vista_ en lugar de _por sesión_.

## La API de Soft Navigations (Experimental)

_Nota: Esta característica es actualmente experimental y está sujeta a cambios. Puede habilitarse a través de origin trials o banderas del navegador._

La API de Soft Navigations expone un nuevo tipo de `PerformanceEntry`: `soft-navigation`.

Cuando Chrome detecta una soft navigation (cambio de URL + cambio de DOM + interacción del usuario), dispara esta entrada. Puedes observarla tal como cualquier otra métrica de rendimiento:

```javascript
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.log("Soft Navigation detectada:", entry);
  }
});

observer.observe({
  type: "soft-navigation",
  buffered: true,
});
```

### Qué habilita esto

Esto no es solo una notificación; cambia cómo se reportan otras métricas.

- **LCP por Soft Navigation**: Chrome ahora puede reportar un nuevo candidato de LCP _después_ de que comienza la soft navigation.
- **Atribución**: Las entradas de rendimiento como `layout-shift` y `paint` tendrán una propiedad `navigationId`, vinculándolas a la soft navigation específica (vista) en la que ocurrieron.

Esto efectivamente nos da un botón de "Reinicio" para las métricas de rendimiento sin recargar la página.

Para más detalles técnicos, revisa la [documentación del experimento de Soft Navigations](https://developer.chrome.com/docs/web-platform/soft-navigations-experiment).

## Relación con la View Transitions API

Mientras que las **Soft Navigations** resuelven el problema de _medición_, la **View Transitions API** resuelve el problema _visual_.

- **View Transitions** proporcionan una forma estandarizada de animar entre estados del DOM (por ejemplo, desvanecimiento cruzado de contenido durante un cambio de ruta).
- **Soft Navigations** proporcionan la marca de tiempo estandarizada de cuándo ocurrió ese cambio.

Juntas, redefinen la experiencia de usuario de las SPA:

1.  El usuario hace clic en un enlace.
2.  **View Transition** maneja la transformación visual suave de Lista a Detalle.
3.  **Soft Navigation** marca el tiempo de inicio, permitiéndonos medir exactamente cuánto tomó esa transición y el renderizado posterior.

Consulta la [documentación de View Transitions de Chrome](https://developer.chrome.com/docs/web-platform/view-transitions) para saber cómo implementar estas interfaces suaves.

## Impacto en Monitoreo y Herramientas

_Alerta de especulación: La industria todavía se está adaptando a esto._

A medida que esta API madure, podemos esperar un cambio mayor en el ecosistema:

1.  **Nuevas dimensiones en CrUX**: El Chrome User Experience Report (CrUX) puede comenzar a reportar datos segmentados por soft navigations, dándote visibilidad sobre el rendimiento de rutas específicas, no solo del origen.
2.  **Precisión de RUM**: Los proveedores de Real User Monitoring (RUM) (como Sentry, Datadog, New Relic) podrán dejar de depender de instrumentación personalizada del router y usar la señal nativa del navegador en su lugar.
3.  **KPIs de Carga de Página**: La definición de "Tiempo de Carga de Página" se retirará. Los equipos necesitarán rastrear "Tiempo de Carga de Vista" o "Tiempo de Transición de Ruta" en su lugar.

**Advertencia**: Esto no está listo para producción para todos los usuarios todavía. Sin embargo, ignorarlo significa que estás optimizando para una métrica (carga inicial) que representa una pequeña fracción del tiempo real de tu usuario en tu aplicación.

## Qué pueden hacer los desarrolladores hoy

No tienes que esperar a que la API sea estable para empezar a pensar de esta manera.

1.  **Mide interacciones, no solo cargas**: Usa `performance.mark()` y `performance.measure()` alrededor de tus transiciones de ruta.
2.  **Evita JS pesado durante las transiciones**: Dado que el navegador no limpia la memoria, asegúrate de estar limpiando los event listeners y no bloqueando el hilo principal durante la fase crítica de "navegación".
3.  **Rastreo manual**: La mayoría de las herramientas de RUM te permiten disparar manualmente una "vista de página virtual". Asegúrate de que tu router (React Router, Vue Router) esté conectado para enviar estas señales.

```javascript
// Ejemplo: Medición manual en un guard de router
router.afterEach((to) => {
  performance.mark(`route-start-${to.path}`);
  // En una app real, medirías esto contra una marca de 'render-finished'
});
```

## Conclusión

Las SPAs rompieron el modelo tradicional de navegación web, y durante años, hemos estado volando a ciegas con respecto al rendimiento de nuestras rutas de aplicación reales. Los Core Web Vitals expusieron este problema, y las Soft Navigations son la respuesta.

Nos estamos alejando de un mundo donde "rendimiento" equivale a "qué tan rápido llega el HTML". Estamos entrando en un mundo donde el rendimiento está **basado en interacciones, basado en vistas y centrado en el usuario**.

El futuro del rendimiento web no está basado en páginas. Es hora de empezar a medir lo que realmente importa.

### Referencias clave

- [Experimenting with measuring soft navigations](https://developer.chrome.com/docs/web-platform/soft-navigations-experiment) - Chrome for Developers
- [How SPA architectures affect Core Web Vitals](https://web.dev/articles/vitals-spa-faq) - web.dev
- [View Transitions API](https://developer.chrome.com/docs/web-platform/view-transitions) - Chrome for Developers

Espero que esto haya sido útil y/o te haya enseñado algo nuevo.

![Profile](https://res.cloudinary.com/khriztianmoreno/image/upload/c_scale,w_148/v1591324337/KM-brand/stickers/sticker-3_2x.png)

#### @khriztianmoreno 🚀
