---
title: Una mejor manera de crear bibliotecas de componentes React
tags:
  - react
  - javascript
  - web-development
date: 2022-07-05 16:01:14
updated: 2022-07-05 16:01:14
---

Hoy repasarémos rápidamente cuatro patrones de programación que se aplican a los componentes compartidos en React.

![React](https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fl8nx60qsslxx6ebcdjrl.png)

El uso de estos permite crear una biblioteca de componentes compartidos bien estructurada. El beneficio que obtiene es que los desarrolladores de tu organización pueden reutilizar fácilmente los componentes en numerosos proyectos. Tú y tu equipo serán más eficientes.

## Patrones comunes

En este post, te muestro cuatro patrones de API que puede usar con todos sus componentes compartidos. Estos son:

- JSX children pass-through
- React `fowardRef `API
- JSX prop-spreading cont TypeScript
- Opinionated `prop` defaults

## Patrón 1: JSX Children Pass-Through

React ofrece la posibilidad de componer elementos utilizando la [prop children](https://reactjs.org/docs/jsx-in-depth.html). El diseño de componentes compartidos se apoya en gran medida en este concepto.

Permitir que los consumidores proporcionen el `children` siempre que sea posible les facilita proporcionar contenido personalizado y otros componentes. También ayuda a alinear las API de componentes con las de los elementos nativos.

Supongamos que tenemos un componente `Button` para empezar. Ahora permitimos que nuestro componente `Button` represente sus `children`, de la siguiente manera:

```jsx
// File: src/Button.tsx

export const Button: React.FC = ({ children }) => {
  return <button>{children}</button>;
};
```

La definición de `React.FC` ya incluye a `children` como una `prop` válida. Lo pasamos directamente al elemento de botón nativo.

A continuación, un ejemplo con Storybook para proporcionar contenido al Button.

```jsx
// File: src/stories/Button.stories.tsx

const Template: Story = (args) => (
  <Button {...args}>my button component</Button>
);
```

## Patrón 2: `forwardRef` API

Muchos componentes tienen una asignación de uno a uno a un elemento HTML. Para permitir que los consumidores accedan a ese elemento subyacente, proporcionamos una `prop` de referencia utilizando la API [React.forwardRef()](https://reactjs.org/docs/forwarding-refs.html).

No es necesario proporcionar un `red` para el desarrollo diario de React, pero es útil dentro de las bibliotecas de componentes compartidos. Permite una funcionalidad avanzada, como colocar una información sobre herramientas en relación con nuestro `Button` con una [biblioteca de posicionamiento](https://popper.js.org/).

Nuestro componente `Button` proporciona un solo `HTMLButtonElement (button)`. Le proporcionamos una referencia con `forwardRef()`.

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

Para ayudar a los consumidores de TypeScript a entender qué elemento se devuelve desde el objeto `ref`, proporcionamos una variable `type` que representa el elemento al que lo estamos pasando, `HTMLButtonElement` en este caso.

## Patrón 3: JSX Prop-Spreading

Otro patrón que aumenta la flexibilidad de los componentes es la [propagación de props](https://reactpatterns.com/#jsx-spread-attributes). La propagación de props permite a los consumidores tratar nuestros componentes compartidos como reemplazos directos para sus contrapartes nativas durante el desarrollo.

La propagación de props ayuda con los siguientes escenarios:

1. Proporcionar `props` accesibles para cierto contenido.
2. Agrega atributos de datos personalizados para pruebas automatizadas
3. Utiliza un evento nativo que no esta definido en nuestras props.

Sin propagación de `props`, cada uno de los escenarios anteriores requeriría que se definieran atributos explícitos. La propagación de `props` ayuda a garantizar que nuestros componentes compartidos permanezcan tan flexibles como los elementos nativos que utilizan internamente.

Agreguemos propagación de `props` a nuestro componente Botón.

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

Podemos hacer referencia a nuestras props restantes con la [sintaxis de propagación](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) y aplicarlos al botón. `React.ComponentPropsWithoutRef` es una utilidad de `tipos` que ayuda a documentar los props válidos para un elemento de botón para nuestros consumidores de TypeScript.

Algunos ejemplos de esta verificación de tipos en acción:

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

## Patrón 4: Valores predeterminados con opiniones

Para ciertos componentes, es posible que desee asignar atributos predeterminados a valores específicos. Ya sea para reducir errores o mejorar la experiencia del desarrollador, proporcionar un conjunto de valores predeterminados es específico para una organización o equipo. Si encuentra la necesidad de predeterminar ciertas props, debe asegurarse de que aún sea posible para los consumidores anular esos valores si es necesario.

Una complejidad común que se encuentra con los elementos `button` es el [tipo de valor predeterminado](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-type), `"submit"`. Este tipo predeterminado a menudo envía formularios circundantes accidentalmente y conduce a escenarios de depuración difíciles. A continuación, le mostramos cómo establecemos el atributo `"button"` de forma predeterminada.

Actualicemos el componente `Button` para devolver un botón con el tipo actualizado.

```jsx
// File: src/buttons/Button.tsx

return (
  <button ref={ref} type="button" {...props}>
    {children}
  </button>
);
```

Al colocar las props predeterminadas antes de la difusión de props, nos aseguramos de que cualquier valor proporcionado por los consumidores tenga prioridad.

## Mira algunas bibliotecas de código abierto

Si está creando una biblioteca de componentes para tu equipo, eche un vistazo a las bibliotecas de componentes de código abierto más populares para ver cómo utilizan los patrones anteriores. Aquí hay una lista de algunas de las principales bibliotecas de componentes de React de código abierto para examinar:

- [Ant Design](https://ant.design/docs/react/introduce)
- [Rainbow UI](https://www.rainbow-ui.com/)
- [Grommet](https://v2.grommet.io/)

![Profile](https://res.cloudinary.com/khriztianmoreno/image/upload/c_scale,w_148/v1591324337/KM-brand/stickers/sticker-3_2x.png)

### @khriztianmoreno

Hasta la próxima.
