---
title: ¿Estás cometiendo ESTOS errores de pruebas y mocking unitarios?
tags:
  - javascript
  - testing
  - web-development
date: 2024-04-08 15:34:04
updated: 2024-04-08 15:34:04
---

Las pruebas son difíciles.

Y no importa si eres un tester experimentado o principiante...

Si ha realizado un esfuerzo significativo para probar una aplicación...

Es probable que hayas cometido algunos de estos errores de prueba y mocking en el pasado.

Desde casos de prueba repletos de código duplicado y enormes hooks de ciclo de vida, hasta casos de mocking convenientemente incorrectos y casos extremos que faltan y furtivos, hay muchos culpables comunes.

He seguido algunos de los casos más populares y los enumero a continuación. Continúe y cuente cuántos de ellos ha hecho en el pasado.

Con suerte, será una buena ronda.

## ¿Por qué la gente comete errores en las pruebas en primer lugar?

Si bien las pruebas automatizadas son una de las partes más importantes del proceso de desarrollo...

Y las pruebas unitarias nos ahorran innumerables horas de pruebas manuales e innumerables errores que quedan atrapados en los conjuntos de pruebas...

Muchas empresas no utilizan pruebas unitarias o no ejecutan suficientes pruebas.

¿Sabía que la cobertura de prueba promedio de un proyecto es de ~40%, mientras que la recomendada es del 80%?

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/0b6f88et53xwtximyb9y.jpg)

Esto significa que mucha gente no está acostumbrada a ejecutar pruebas (especialmente casos de prueba complejos) y cuando no estás acostumbrado a hacer algo, eres más propenso a cometer un error.

Entonces, sin más preámbulos, veamos algunos de los errores de prueba más comunes que veo

### Código duplicado

Las tres reglas más importantes del desarrollo de software son también las tres reglas más importantes de las pruebas.

¿Cuáles son estas reglas?
**Reutilizar. Reutilizar. Reutilizar**.

Un problema común que veo es repetir la misma serie de comandos en cada prueba en lugar de moverlos a un enlace de ciclo de vida como `beforeEach` o `afterEach`

Esto podría deberse a que el desarrollador estaba creando un prototipo o a que el proyecto era pequeño y el cambio insignificante. Estos casos son buenos y aceptables.

Pero unos cuantos casos de prueba más tarde, el problema de la duplicación de código se vuelve cada vez más evidente.

Y aunque esto es más bien un error de un desarrollador junior, el siguiente es similar pero mucho más astuto.

### Sobrecargar los hooks del ciclo de vida

En la otra cara de la misma moneda, a veces estamos demasiado ansiosos por refactorizar nuestros casos de prueba y ponemos tantas cosas en los hooks del ciclo de vida sin pensarlo dos veces que no vemos el problema que nos estamos creando.

A veces, los hooks del ciclo de vida crecen demasiado.

Y cuando esto sucede...

...y necesitas desplazarte hacia arriba y hacia abajo para ir desde el hook al caso de prueba y viceversa...

Esto es un problema y a menudo se lo denomina "fatiga de desplazamiento".

Recuerdo haber sido culpable de esto en el pasado.

Un patrón/práctica común para mantener el archivo legible cuando tenemos hooks de ciclo de vida inflados es extraer el código de configuración común en pequeñas funciones de fábrica.

Entonces, imaginemos que tenemos algunas (docenas de) casos de prueba que se ven así:

```javascript
describe("authController", () => {
  describe("signup", () => {
    test("given user object, returns response with 201 status", async () => {
      // Arrange
      const userObject = {
        // several lines of user setup code
      };
      const dbUser = {
        // several lines of user setup code
      };
      mockingoose(User).toReturn(undefined, "findOne");
      mockingoose(User).toReturn(dbUser, "save");
      const mockRequest = {
        // several lines of constructing the request
      };
      const mockResponse = {
        // several lines of constructing the response
      };

      // Act
      await signup(mockRequest, mockResponse);
      // Assert
      expect(mockResponse.status).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(201);
    });

    test("given user object with email of an existing user, returns 400 status - 1", async () => {
      // Arrange
      const userObject = {
        // several lines of user setup code
      };
      const dbUser = {
        // several lines of user setup code
      };
      const mockRequest = {
        // several lines of constructing the request
      };
      const mockJson = jest.fn();
      const mockResponse = {
        // several lines of constructing the response
      };
      mockingoose(User).toReturn(dbUser, "findOne");

      // Act
      await signup(mockRequest, mockResponse);

      // Assert
      expect(mockResponse.status).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(400);

      expect(mockJson).toHaveBeenCalled();
      expect(mockJson).toHaveBeenCalledWith({
        status: "fail",
        message: "Email taken.",
      });
    });
  });
});
```

Podemos extraer la información de configuración repetida en sus propias funciones llamadas `createUserObject`, `createDbUserObject` y `createMocks`

Y luego las pruebas quedarían así:

```javascript
test("given user object, returns response with 201 status", async () => {
  const userObject = createUserObject();
  const dbUser = createDbUserObject();
  const [mockRequest, mockResponse] = createMocks(userObject);
  mockingoose(User).toReturn(undefined, "findOne");
  mockingoose(User).toReturn(dbUser, "save");
  await signup(mockRequest, mockResponse);
  expect(mockResponse.status).toHaveBeenCalled();
  expect(mockResponse.status).toHaveBeenCalledWith(201);
});
```

Al extraer esos fragmentos de código en sus propias funciones de fábrica separadas, podemos evitar la fatiga del desplazamiento, mantener los enlaces del ciclo de vida ágiles y facilitar la navegación por el archivo y encontrar lo que estamos buscando.

### No priorizar los tipos de pruebas que ejecutas

Esto tiene más que ver con bases de código grandes o enormes donde hay literalmente cientos o incluso miles de casos de prueba ejecutándose cada vez que una nueva serie de commits quiere fusionarse en la base de código.

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ubhoe5naa6ww40jkao00.jpg)

En tales casos, ejecutar todos los conjuntos de pruebas puede llevar literalmente horas y es posible que no siempre tenga el tiempo o los recursos para hacerlo.

Cuando el tiempo o los recursos están limitados, es importante elegir estratégicamente el tipo de prueba a priorizar. Generalmente, las pruebas de integración brindan mejores garantías de confiabilidad debido a su alcance más amplio. Por lo tanto, cuando se tiene que elegir entre los dos, suele ser una buena idea elegir las pruebas de integración en lugar de las pruebas unitarias.

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/mk7shvlsw5c3x09ebmbo.jpg)

### Usar lógica en tus casos de prueba

Queremos evitar la lógica en nuestros casos de prueba siempre que sea posible.

Los casos de prueba solo deben tener una validación simple y evitar cosas como bloques `try-catch` o condicionales `if-else`.

Esto mantiene tus pruebas limpias y enfocadas solo en el flujo esperado porque hace que las pruebas sean más fáciles de entender de un vistazo.

La única excepción es cuando estás escribiendo funciones auxiliares o de fábrica que configuran escenarios para pruebas.

### Utilizar validaciones vagas en lugar de afirmaciones estrictas

Esto suele ser una señal de que es posible que necesites refactorizar el fragmento de código que estás probando o que necesites hacer un ajuste menor en tus mocks.

Por ejemplo, en lugar de comprobar si el valor es mayor que 1, deberías ser más específico y afirmar que el valor es 2.

O, si está verificando los datos de un objeto Usuario, debe afirmar que cada dato es exactamente como lo espera, en lugar de simplemente verificar una coincidencia de ID.

Los controles sueltos pueden enmascarar casos extremos que podrían fallar en el futuro.

### Implementación incorrecta del Mock Behavior

Este es difícil de encontrar y es por eso que puedes encontrar un ejemplo en cada código base.

Es uno de los problemas de prueba más astutos pero comunes y es difícil notarlo a primera vista.

Puede suceder cuando el comportamiento del mock está demasiado simplificado o cuando no refleja con precisión los casos extremos y las condiciones de error.

Como resultado, las pruebas pueden pasar, pero no proporcionarán una indicación confiable de cómo funcionará el sistema bajo diversas condiciones, lo que resulta en errores futuros y problemas inesperados, y casos de prueba con comportamiento simulado que terminan haciendo más daño que bien.

Espero este post te ayude a indetificar esas practicas que deberiamos evitar al momento de hacer pruebas.

![Profile](https://res.cloudinary.com/khriztianmoreno/image/upload/c_scale,w_148/v1591324337/KM-brand/stickers/sticker-3_2x.png)

@khriztianmoreno
