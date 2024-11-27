---
title: A better way to build React component libraries
tags:
  - react
  - javascript
  - web-development
date: 2022-07-05 16:01:14
updated: 2022-07-05 16:01:14
---

Today we'll quickly go over four programming patterns that apply to shared components in React.

![React](https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fl8nx60qsslxx6ebcdjrl.png)

Using these allows you to create a well-structured shared component library. The benefit you get is that developers in your organization can easily reuse components across numerous projects. You and your team will be more efficient.

## Common Patterns

In this post, I show you four API patterns that you can use with all your shared components. These are:

- JSX children pass-through
- React `fowardRef `API
- JSX prop-spreading cont TypeScript
- Opinionated `prop` defaults

## Pattern 1: JSX Children Pass-Through

React provides the ability to compose elements using the [children](https://reactjs.org/docs/jsx-in-depth.html) prop. The shared component design leans heavily on this concept.

Allowing consumers to provide the `children` whenever possible makes it easier for them to provide custom content and other components. It also helps align component APIs with those of native elements.

Let's say we have a `Button` component to start with. Now we allow our `Button` component to render its `children`, like this:

```jsx
// File: src/Button.tsx

export const Button: React.FC = ({ children }) => {
  return <button>{children}</button>;
};
```

The definition of `React.FC` already includes `children` as a valid `prop`. We pass it directly to the native button element.

Here is an example using Storybook to provide content to the Button.

```jsx
// File: src/stories/Button.stories.tsx

const Template: Story = (args) => (
  <Button {...args}>my button component</Button>
);
```

## Pattern 2: `forwardRef` API

Many components have a one-to-one mapping to an HTML element. To allow consumers to access that underlying element, we provide a referencing `prop` using the [React.forwardRef()](https://reactjs.org/docs/forwarding-refs.html) API.

It is not necessary to provide a `net` for day-to-day React development, but it is useful within shared component libraries. It allows for advanced functionality, such as positioning a tooltip relative to our `Button` with a [positioning library](https://popper.js.org/).

Our `Button` component provides a single `HTMLButtonElement (button)`. We provide a reference to it with `forwardRef()`.

```jsx
// File: src/buttons/Button.tsx

export const Button =
  React.forwardRef <
  HTMLButtonElement >
  (({ children }, ref) => {
    return <button ref={ref}>{children}</button>;
  });

Button.displayName = "Button";
```

To help TypeScript consumers understand what element is returned from the `ref` object, we provide a `type` variable that represents the element we are passing it to, `HTMLButtonElement` in this case.

## Pattern 3: JSX Prop-Spreading

Another pattern that increases component flexibility is [prop propagation](https://reactpatterns.com/#jsx-spread-attributes). Prop propagation allows consumers to treat our shared components as drop-in replacements for their native counterparts during development.

Prop propagation helps with the following scenarios:

1. Providing accessible `props` for certain content.
2. Adding custom data attributes for automated testing
3. Using a native event that is not defined in our props.

Without `prop propagation`, each of the above scenarios would require explicit attributes to be defined. `prop propagation` helps ensure that our shared components remain as flexible as the native elements they use internally.

Let's add `prop propagation` to our Button component.

```jsx
// File: src/buttons/Button.tsx

export const Button = React.forwardRef<
  HTMLButtonElement,
  React
   .ComponentPropsWithoutRef<'button'>
>(({ children, ...props }, ref) => {
  return (
    <button ref={ref} {...props}>
      {children}
    </button>
  );
});
```

We can reference our remaining props with the [spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) and apply them to the button. `React.ComponentPropsWithoutRef` is a `type` utility that helps document valid props for a button element for our TypeScript consumers.

Some examples of this type checking in action:

```jsx
// Pass - e is typed as
// `React.MouseEventMouseEvent>`
<Button onClick={(e) => { console.log(e) }} />

// Pass - aria-label is typed
// as `string | undefined`
<Button aria-label="My button" />

// Fail - type "input" is not
// assignable to `"button" |
// "submit" | "reset" | undefined`
<Button type="input" />
```

## Pattern 4: Opinionated Defaults

For certain components, you may want to map default attributes to specific values. Whether to reduce bugs or improve the developer experience, providing a set of default values ​​is specific to an organization or team. If you find the need to default certain props, you should ensure that it is still possible for consumers to override those values ​​if necessary.

A common complexity encountered with `button` elements is the [default value type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-type), `"submit"`. This default type often accidentally submits surrounding forms and leads to difficult debugging scenarios. Here's how we set the `"button"` attribute by default.

Let's update the `Button` component to return a button with the updated type.

```jsx
// File: src/buttons/Button.tsx

return (
  <button ref={ref} type="button" {...props}>
    {children}
  </button>
);
```

By placing the default props before the prop broadcast, we ensure that any value provided by consumers is prioritized.

## Look at some open source libraries

If you're building a component library for your team, take a look at the most popular open source component libraries to see how they use the patterns above. Here's a list of some of the top open source React component libraries to look into:

- [Ant Design](https://ant.design/docs/react/introduce)
- [Rainbow UI](https://www.rainbow-ui.com/)
- [Grommet](https://v2.grommet.io/)

![Profile](https://res.cloudinary.com/khriztianmoreno/image/upload/c_scale,w_148/v1591324337/KM-brand/stickers/sticker-3_2x.png)

### @khriztianmoreno

Until next time.
