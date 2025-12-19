---
title: Navigating the Future - Understanding and Measuring Soft Navigations for SPAs
tags:
  - performance
  - web-development
  - javascript
  - chrome
date: 2025-11-12 09:07:54
updated: 2025-11-12 09:07:54
---

Explore the concept of "soft navigations" in Single Page Applications (SPAs), why traditional Core Web Vitals measurement has been challenging for them, and the ongoing efforts by the Chrome team to standardize and enable reporting for these dynamic content changes.

<!--more-->

## Intro: SPAs Don’t Really Navigate

Here is the tension at the heart of modern web development: URLs change. Content updates. The user feels like they’ve gone to a new page. But to the browser, **absolutely nothing happened**.

Single Page Applications (SPAs) broke the fundamental model of the web. Core Web Vitals (CWV)—the industry standard for measuring user experience—were designed for a world of page loads. When you click a link in a traditional site, the browser tears down the current document and loads a new one. This "hard navigation" gives the browser a clean slate to measure metrics like Largest Contentful Paint (LCP) and Cumulative Layout Shift (CLS).

In an SPA, that clean slate never comes. After the initial load, every "page" you visit is just JavaScript mutating the DOM. The browser sees one long, continuous session.

Google knows this. And after years of "interactions" masking as "navigations," Chrome is finally fixing it.

## What is a “Soft Navigation”?

To bridge this gap, Chrome is introducing the concept of a **Soft Navigation**.

A soft navigation is defined by a specific set of heuristics. It occurs when:

1.  **User Interaction**: The change is triggered by a user action (click, keypress).
2.  **URL Modification**: The URL changes (via the History API) and the history state is updated.
3.  **DOM Mutation**: There is a significant change to the DOM (adding or removing elements).

To the user, this feels exactly like a new page load.
To the browser, traditionally, this was just an event handler running.
With the new Soft Navigation model, the browser acknowledges: **"Okay, that was a navigation."**

Examples include:

- Switching routes in React Router or Vue Router.
- A "Load More" action that changes the URL and replaces the main feed.
- Client-side rendering of a product detail view after clicking a card.

## Why Core Web Vitals Fail in SPAs

The mismatch between the SPA reality and the traditional performance model is severe.

### The Traditional Model

1.  **Navigation Start**: Browser requests document.
2.  **LCP**: The largest content loads.
3.  **CLS**: Stability is measured until the page settles.
4.  **INP**: Interactions are measured throughout the lifecycle.

### The SPA Reality

- **LCP** is only reported for the _landing page_. If a user lands on the home page and navigates to a product page, the heavy hero image on the product page is ignored by LCP.
- **CLS** during a route transition is often attributed to the _previous_ "page" or just lost in the noise of a long-lived session.
- **INP** (Interaction to Next Paint) captures the delay of the click that triggers the route, but it treats the entire route transition as just one "interaction," not a new page load.

As detailed in the [web.dev SPA performance discussions](https://web.dev/articles/vitals-spa-faq), this leads to a blind spot where the worst user experiences—slow route transitions and heavy layout shifts after navigation—are invisible to standard monitoring.

## Real-World Example

Let's look at a concrete user flow:

1.  **User loads Homepage**: The browser fetches HTML, CSS, JS. **LCP is measured here.**
2.  **User clicks "Product A"**:
    - JavaScript intercepts the click.
    - `fetch('/api/product/a')` is called.
    - A loading spinner appears.
    - JSON arrives, and the DOM is completely replaced.
    - A large product image loads, pushing content down (Layout Shift).

**What Chrome measures today:**
It sees the click on "Product A" as an _interaction_. The layout shift caused by the product image might be added to the session's cumulative score, but it's not attributed to a "Product Page." The LCP of the product image is completely ignored because LCP stops reporting after the first user interaction.

**What the user feels:**
They navigated to a slow Product Page that jumped around while loading.

This gap is the motivation for Soft Navigations.

## Chrome’s Response: Soft Navigations

Chrome’s intent is to **detect SPA navigations automatically** and **treat them like real navigations**.

This shift moves performance monitoring from being "document-based" to being "experience-based." If the user perceives a context switch, the metrics should reflect that. By resetting the measuring stick on every soft navigation, we can compute Core Web Vitals _per view_ rather than _per session_.

## The Soft Navigations API (Experimental)

_Note: This feature is currently experimental and subject to change. It can be enabled via origin trials or browser flags._

The Soft Navigations API exposes a new `PerformanceEntry` type: `soft-navigation`.

When Chrome detects a soft navigation (URL change + DOM change + User interaction), it fires this entry. You can observe it just like any other performance metric:

```javascript
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.log("Soft Navigation detected:", entry);
  }
});

observer.observe({
  type: "soft-navigation",
  buffered: true,
});
```

### What This Enables

This isn't just a notification; it changes how other metrics are reported.

- **LCP per Soft Navigation**: Chrome can now report a new LCP candidate _after_ the soft navigation starts.
- **Attribution**: Performance entries like `layout-shift` and `paint` will have a `navigationId` property, linking them to the specific soft navigation (view) they occurred in.

This effectively gives us a "Reset" button for performance metrics without reloading the page.

For more technical details, check out the [Soft Navigations experiment documentation](https://developer.chrome.com/docs/web-platform/soft-navigations-experiment).

## Relationship with View Transitions API

While **Soft Navigations** solve the _measurement_ problem, the **View Transitions API** solves the _visual_ problem.

- **View Transitions** provide a standardized way to animate between DOM states (e.g., cross-fading content during a route change).
- **Soft Navigations** provide the standardized timestamp for when that change occurred.

Together, they redefine the SPA User Experience:

1.  The user clicks a link.
2.  **View Transition** handles the smooth visual morph from List to Detail.
3.  **Soft Navigation** marks the start time, allowing us to measure exactly how long that transition and subsequent render took.

See the [Chrome View Transitions docs](https://developer.chrome.com/docs/web-platform/view-transitions) for how to implement these smooth interfaces.

## Impact on Monitoring and Tooling

_Speculation Alert: The industry is still adapting to this._

As this API matures, we can expect a major shift in the ecosystem:

1.  **New CrUX Dimensions**: The Chrome User Experience Report (CrUX) may start reporting data segmented by soft navigations, giving you visibility into the performance of specific routes, not just the origin.
2.  **RUM Accuracy**: Real User Monitoring (RUM) providers (like Sentry, Datadog, New Relic) will be able to stop relying on custom router instrumentation and use the native browser signal instead.
3.  **Page Load KPIs**: The definition of "Page Load Time" will retire. Teams will need to track "View Load Time" or "Route Transition Time" instead.

**Warning**: This is not production-ready for all users yet. However, ignoring it means you are optimizing for a metric (initial load) that represents a tiny fraction of your user's actual time in your app.

## What Developers Can Do Today

You don't have to wait for the API to be stable to start thinking this way.

1.  **Measure Interactions, Not Just Loads**: Use `performance.mark()` and `performance.measure()` around your route transitions.
2.  **Avoid Heavy JS During Transitions**: Since the browser doesn't wipe the memory, ensure you are cleaning up event listeners and not blocking the main thread during the critical "navigation" phase.
3.  **Manual Tracking**: Most RUM tools allow you to manually trigger a "virtual page view." Ensure your router (React Router, Vue Router) is hooked up to send these signals.

```javascript
// Example: Manual measurement in a router guard
router.afterEach((to) => {
  performance.mark(`route-start-${to.path}`);
  // In a real app, you'd measure this against a 'render-finished' mark
});
```

## Conclusion

SPAs broke the traditional web navigation model, and for years, we've been flying blind regarding the performance of our actual application routes. Core Web Vitals exposed this problem, and Soft Navigations are the answer.

We are moving away from a world where "performance" equals "how fast the HTML arrives." We are entering a world where performance is **interaction-based, view-based, and user-centered**.

The future of web performance is not page-based. It's time to start measuring what actually matters.

### Key References

- [Experimenting with measuring soft navigations](https://developer.chrome.com/docs/web-platform/soft-navigations-experiment) - Chrome for Developers
- [How SPA architectures affect Core Web Vitals](https://web.dev/articles/vitals-spa-faq) - web.dev
- [View Transitions API](https://developer.chrome.com/docs/web-platform/view-transitions) - Chrome for Developers

I hope this has been useful and/or taught you something new!

![Profile](https://res.cloudinary.com/khriztianmoreno/image/upload/c_scale,w_148/v1591324337/KM-brand/stickers/sticker-3_2x.png)

#### @khriztianmoreno 🚀
