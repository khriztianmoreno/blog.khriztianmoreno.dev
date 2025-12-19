---
title: Optimizing for Speed - Practical Strategies to Improve Your Core Web Vitals
tags:
  - performance
  - core-web-vitals
  - web-vitals
  - lcp
  - inp
  - cls
  - chrome-devtools
date: 2025-12-19 08:41:05
updated: 2025-12-19 08:41:05
---

Pages can load fast.

And still feel slow.

That’s the modern performance trap: you ship a “snappy” initial render, but interactions hitch, UI jumps, and the page loses trust. **Core Web Vitals are designed to catch that gap—and they’re judged in the field**, not in your local Lighthouse run.

<!--more-->

# Speed is no longer “load time”

Core Web Vitals split performance into three different user perceptions:

- **LCP = loading perception**
  The moment users _believe_ the page is ready.
- **INP = interaction cost**
  The time between user intent and visible confirmation.
- **CLS = visual trust**
  Whether the UI respects the user’s attention.

This post is intentionally biased toward changes you can ship as pull requests that **measurably move CrUX (field) data**.

# Optimization mindset: optimize for field data, not Lighthouse

Treat lab tools as microscopes, not scoreboards.

- **CrUX decides if it matters**
  CrUX is a trailing 28‑day dataset of real users. It’s what Search Console Core Web Vitals uses, and what PSI “field data” represents.
- **Lighthouse explains why**
  Lighthouse is a synthetic run with controlled throttling. It’s great for causal debugging, regression detection, and audits—but it’s not your KPI.

If you’re serious about shipping improvements that show up in dashboards:

- **Detect** in CrUX or Search Console groups
- **Debug** locally with DevTools (Performance / Performance Insights / Rendering)
- **Validate** with PageSpeed Insights (field + lab)
- **Monitor** with RUM + weekly/monthly CrUX deltas

References:

- https://developer.chrome.com/docs/crux/
- https://developers.google.com/speed/docs/insights/v5/about
- https://support.google.com/webmasters/answer/9205520?hl=en

# Optimizing Largest Contentful Paint (LCP)

## What usually becomes LCP

In most production sites, the LCP element is one of:

- **Hero image** (or its poster / background)
- **Above-the-fold H1**
- **Featured media** (embedded video poster)

You don’t optimize LCP in the abstract—you optimize the pipeline that delivers _that one element_.

## Confirm the LCP element (field-friendly)

If you already ship RUM, the attribution build of `web-vitals` is the fastest way to identify what users are actually waiting on:

```ts
import { onLCP } from "web-vitals/attribution";

onLCP((metric) => {
  // A selector-ish string for the element associated with LCP.
  // Useful to aggregate in analytics and turn into a PR backlog.
  console.log("LCP target:", metric.attribution.element);
});
```

If you need the actual DOM element in a local debug session, use the `PerformanceObserver` and inspect entries:

```ts
new PerformanceObserver((entryList) => {
  for (const entry of entryList.getEntries()) {
    console.log("LCP candidate:", entry.startTime, entry);
  }
}).observe({ type: "largest-contentful-paint", buffered: true });
```

References:

- https://web.dev/lcp/
- https://github.com/GoogleChrome/web-vitals

## Image optimization (the biggest, most reliable LCP win)

If your LCP is an image, you’re usually fighting **bytes** and **discovery/priority**.

### Ship modern formats with a real fallback

```html
<picture>
  <source srcset="/hero.avif" type="image/avif" />
  <source srcset="/hero.webp" type="image/webp" />
  <img src="/hero.jpg" width="1200" height="630" alt="" />
</picture>
```

Why it works:

- **AVIF > WebP > JPEG** for compression efficiency in most real workloads.
- Less transfer time means less time before the browser can decode, paint, and declare LCP.

### Preload the LCP image (and set fetch priority)

If the browser “discovers” the LCP image late (or downgrades its priority), you lose hundreds of ms without any obvious “bug.” Fix discovery explicitly:

```html
<link rel="preload" as="image" href="/hero.webp" fetchpriority="high" />
```

And ensure the actual image isn’t treated as low priority:

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

Why it works:

- Preload reduces **resource load delay** (late discovery).
- `fetchpriority="high"` signals intent when heuristics would otherwise compete with CSS/JS/fonts.

References:

- https://developer.chrome.com/docs/performance/insights/lcp-discovery
- https://developer.chrome.com/blog/new-in-chrome-101
- https://developer.chrome.com/blog/devtools-tips-30

### Do not lazy-load the LCP image

This is the single most common “we optimized images” regression.

- If it’s LCP, it should be in the initial viewport.
- If it’s in the initial viewport, **it must not wait for intersection observers**.

Use `loading="eager"` for the hero. Lazy-load everything else.

## Reduce server response time (TTFB still matters)

TTFB is not a Core Web Vital, but it’s upstream of LCP. If the HTML is late, _everything_ is late.

High-leverage fixes that typically become clean PRs:

- **Edge/CDN caching** for HTML where feasible (even short TTLs help)
- **Cache-friendly architecture** (versioned static assets, immutable caching)
- **Streaming SSR** (flush head early; unblock discovery of CSS/hero preload)
- **Server-Timing** headers to locate backend bottlenecks in the field

Conceptual caching example for HTML at the CDN:

```http
Cache-Control: public, max-age=0, s-maxage=86400
```

References:

- https://web.dev/articles/ttfb
- https://web.dev/articles/optimize-ttfb
- https://web.dev/articles/optimize-lcp

## LCP PR checklist (copy/paste into your backlog)

- **Identify LCP element** in field (RUM attribution) and confirm locally in DevTools.
- **If LCP is an image**
  - Convert to AVIF/WebP with correct fallbacks.
  - Ensure correct intrinsic sizing (`width`/`height`) to avoid decode/layout surprises.
  - Add preload + `fetchpriority="high"`.
  - Ensure not lazy-loaded.
- **If LCP is text**
  - Ensure render-critical CSS is small and early.
  - Fix font discovery (see CLS section).
- **If TTFB is high**
  - Add caching or move compute off the critical path.
  - Add Server-Timing and break down backend work.

# Optimizing Interaction to Next Paint (INP)

Most teams fail INP because they treat it like a “JS bundle size” problem. It’s usually a **main-thread scheduling** problem.

INP is based on the worst (technically p98) interactions across the page lifetime, so one bad interaction path can tank the entire experience.

References:

- https://web.dev/inp/
- https://developer.chrome.com/docs/performance/insights/inp-breakdown

## Find long tasks and correlate them to interactions

Use DevTools:

- **Performance panel** for traces and long tasks
- **Performance Insights** for INP breakdown (input delay / processing / presentation)

Reference:

- https://developer.chrome.com/docs/devtools/performance/

## Rule of thumb: tasks over ~50ms are hostile

Any “one big function” that runs on input is a candidate to split, defer, or move.

### Break work intentionally (chunking)

```ts
function chunkWork<T>(items: T[], doWork: (item: T) => void) {
  if (!items.length) return;

  doWork(items.shift()!);

  setTimeout(() => chunkWork(items, doWork));
}
```

Why it works:

- Yields the main thread so inputs can be processed and a paint can happen.
- Reduces “processing duration” for your worst interactions.

### Defer non-critical JavaScript

If a script doesn’t contribute to the first interaction path, it shouldn’t compete for main-thread time.

```html
<script src="analytics.js" defer></script>
```

Or when appropriate:

```ts
requestIdleCallback(() => {
  loadAnalytics();
});
```

Why it works:

- Less contention during the period where users start clicking.
- Less CPU spikes that inflate input delay and processing.

### Framework-specific example (React)

```ts
import { startTransition } from "react";

startTransition(() => {
  setState(expensiveUpdate);
});
```

Why it helps:

- Keeps urgent updates responsive.
- Defers non-urgent rendering work.

## INP PR checklist

- **Identify the worst interaction** in field (RUM) and reproduce locally.
- **Trace in DevTools**
  - Long tasks on Main
  - INP breakdown: input delay vs processing vs presentation
- **Fix strategy**
  - Split synchronous work (chunking / yielding)
  - Defer non-critical scripts (`defer`, idle, route-based loading)
  - Reduce re-renders (memoization, transitions, avoid expensive layout reads)
- **Validate**
  - Confirm interaction is now consistently below the “good” threshold in lab.
  - Monitor the p75 trend in CrUX/PSI field over time.

# Optimizing Cumulative Layout Shift (CLS)

CLS is the “respect” metric.

Your layout should not surprise users after they start reading or aiming for a button.

Reference:

- https://web.dev/cls/

## Debug CLS: visualize layout shift regions

DevTools can show you exactly what moved:

- Open DevTools → More tools → Rendering
- Enable **Layout Shift Regions**

Reference:

- https://developer.chrome.com/docs/devtools/rendering/performance

## Always reserve space

### Images: set intrinsic size

```html
<img src="/card.jpg" width="400" height="300" alt="" />
```

### Or reserve with CSS

```css
.card {
  aspect-ratio: 4 / 3;
}
```

Why it works:

- The browser can compute layout before the resource arrives.
- No “push down” shift when the media loads.

## Font loading done right (without CLS regressions)

Preload the font you need for above-the-fold text:

```html
<link
  rel="preload"
  as="font"
  href="/inter.woff2"
  type="font/woff2"
  crossorigin
/>
```

And avoid FOIT:

```css
@font-face {
  font-family: "Inter";
  src: url("/inter.woff2") format("woff2");
  font-display: swap;
}
```

Important nuance for performance owners:

- `swap` can introduce a shift if fallback metrics differ from the final font.
- If CLS is sensitive, invest in fallback selection and font metric alignment.

Reference:

- https://web.dev/learn/performance/optimize-web-fonts

## Avoid late DOM injection above the fold

Common offenders:

- Cookie banners
- Chat widgets
- Ads

PR-friendly strategy:

- **Reserve a container** (fixed height / min-height)
- **Inject inside the reserved space**
- **Load below the fold** when possible

## CLS PR checklist

- **Turn on Layout Shift Regions** and reproduce the shift.
- **Classify the offender**
  - Missing size/aspect ratio
  - Font swap
  - Late injection
- **Fix**
  - Reserve space via intrinsic sizes or aspect ratio
  - Preload key fonts; use `font-display` intentionally
  - Reserve containers for banners/widgets

# CSS and JS minimization (supporting role)

Be precise: “smaller bundles” matter only insofar as they reduce **critical work**.

- Less JS improves **INP** (less parse/compile/execution pressure, fewer long tasks)
- Less CSS improves render speed and reduces time-to-first-render for key content

DevTools tooling that actually produces PRs:

- **Coverage tab** to find unused CSS/JS shipped to initial routes
- Bundler analyzers to identify large transitive dependencies

References:

- https://developer.chrome.com/docs/devtools/coverage/

# Caching strategy (often overlooked)

Caching is the silent multiplier: it improves TTFB, reduces bandwidth, and makes repeat navigations dramatically better.

Mental model (layered):

- **Browser cache** (Cache-Control, ETag)
- **CDN cache** (s-maxage, stale-while-revalidate)
- **Application cache** (memoization, SSR caches, edge KV)

Key rule:

If it does not change per user, **cache it hard** and version URLs when you can.

Reference:

- https://web.dev/articles/http-cache

# Measurement loop (non-negotiable)

If you want “bad CWV → concrete PRs,” you need a consistent workflow.

## 1) Detect via CrUX (or Search Console groups)

- Identify whether the issue is **origin-wide** or **URL-group specific**.
- Focus on p75 field regressions, not one-off lab anomalies.

References:

- https://developer.chrome.com/docs/crux/
- https://support.google.com/webmasters/answer/9205520?hl=en

## 2) Debug via DevTools

- LCP: request discovery and priority
- INP: long tasks + interaction breakdown
- CLS: layout shift regions

Reference:

- https://developer.chrome.com/docs/devtools/performance/

## 3) Validate via PageSpeed Insights

Use PSI to keep field vs lab in the same report and sanity-check improvements.

Reference:

- https://developers.google.com/speed/docs/insights/v5/about

## 4) Monitor (dashboards + patience)

CrUX is a trailing 28‑day window. You won’t see an instant “win” unless traffic is high.

Use:

- RUM for fast feedback
- CrUX/PSI for field reality
- Search Console CWV for SEO-adjacent reporting (with lag)

# Conclusion

Speed is interaction quality.

INP changed the game: you can’t brute-force responsiveness with a single “optimize bundle size” sprint.

LCP is still mostly images and discovery.

CLS is about respect for layout.

Optimizing Core Web Vitals is not about tools.

It’s about engineering discipline, measured in the real world.

# Sources

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
