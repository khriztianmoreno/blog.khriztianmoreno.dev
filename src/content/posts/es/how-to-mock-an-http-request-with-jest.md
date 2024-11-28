---
title: Cómo mockear una solicitud HTTP con Jest 💻
tags:
  - javascript
  - testing
  - nodejs
  - jest
  - web-development
date: 2024-05-07 15:43:57
updated: 2024-05-07 15:43:57
---

Hoy quería mostrarles cómo escribir correctamente una prueba.

Pero cualquiera puede encontrar cómo ejecutar una prueba sencilla. Y aquí, buscamos ayudarle a encontrar respuestas que no encontrará en ningún otro lugar.

Entonces pensé que llevaríamos las cosas un paso más allá.

Ejecutemos una prueba más compleja, en la que tendrás que simular 1 o 2 partes de la función que estás probando.

[En caso de que seas nuevo aquí: mock es como usar un doble en una película. Es una forma de reemplazar una parte complicada de tu código (como llamar a una API) con algo más simple que pretende ser real, para que pueda probar el resto de tu código fácilmente].

MI testing framework elegido es Jest, porque hace que todo sea mucho más fácil:

1. **Configuración cero:** una de las principales ventajas de Jest es su configuración sin configuración. Está diseñado para funcionar desde el primer momento con una configuración mínima, lo que lo hace muy atractivo para proyectos que desean implementar pruebas de manera rápida y eficiente.
2. **Prueba de instantáneas:** Jest introdujo el concepto de Snapshot Testing, que es particularmente útil para probar componentes de la interfaz de usuario. Toma una instantánea de la salida renderizada de un componente y garantiza que no cambie inesperadamente en pruebas futuras.
3. **Mocking y Spies Integrados:** Jest viene con soporte integrado para funciones, módulos y temporizadores simulados, lo que facilita la prueba de componentes o funciones de forma aislada sin preocuparse por sus dependencias.
4. **Compatibilidad con pruebas asincrónicas:** Jest admite pruebas asincrónicas listas para usar, lo cual es esencial para las pruebas en aplicaciones JavaScript modernas que a menudo dependen de operaciones asincrónicas como llamadas API o consultas de bases de datos.

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/au3m8kw0rtsrclm6s8fo.jpg)

De todos modos, entremos en las pruebas:

### Paso 1: configurar tu proyecto

1. Cree un nuevo directorio de proyecto y navegue hasta él
2. Inicialice un nuevo proyecto npm: `npm init -y`
3. Instale Jest: `npm install --save-dev jest`
4. Instale axios para realizar solicitudes HTTP: `npm install axios`

Estos son los requisitos básicos. Nada nuevo o sofisticado aquí. Vamonos.

### Paso 2: escribir una función con una llamada API

Ahora, digamos que inicia sesión en algún tipo de aplicación. StackOverflow, por ejemplo. Lo más probable es que en la parte superior derecha veas información sobre tu perfil. Tal vez su nombre completo y nombre de usuario, por ejemplo.

Para obtenerlos, normalmente tenemos que realizar una llamada a la API para obtenerlos. Entonces, veamos cómo haríamos eso.

1. Cree un archivo llamado `user.js`
2. Dentro de `user.js`, escriba una función que realice una llamada API. Por ejemplo, usar axios para recuperar datos del usuario:

```javascript
// user.js
import axios from "axios";

export const getUser = async (userId) => {
  const response = await axios.get(`https://api.example.com/users/${userId}`);
  return response.data;
};
```

### Paso 3: crear el archivo de prueba

Bien, ahora que tenemos una función que nos trae el usuario según la identificación que solicitamos, veamos cómo podemos probarla.

Recuerde, queremos algo que funcione siempre y para todos los desarrolladores.

Lo que significa que no queremos depender de si el servidor se está ejecutando o no (ya que esto no es lo que estamos probando).

Y no queremos depender de los usuarios que tenemos en la base de datos.

Porque en mi base de datos, el ID1 podría pertenecer a mi usuario administrador, mientras que en su base de datos, el ID1 podría pertenecer a SU usuario administrador.

Esto significa que la misma función nos daría resultados diferentes. Lo que haría que la prueba fallara, aunque la función funcione correctamente.

Siga leyendo para ver cómo abordamos este problema mediante los mocks.

1. Cree un archivo llamado `user.test.js` en el mismo directorio.
2. Dentro de este archivo, importe la función que desea probar:

```javascript
import axios from "axios";
jest.mock("axios");

import { getUser } from "./user";
```

3. Escriba su caso de prueba, simule la llamada y recupere datos simulados.

```javascript
test("should fetch user data", async () => {
  // Mock data to be returned by the Axios request
  const mockUserData = { id: "1", name: "John Doe" };
  axios.get.mockResolvedValue({ data: mockUserData });

  // Call the function
  const result = await getUser("1");

  // Assert that the Axios get method was called correctly
  expect(axios.get).toHaveBeenCalledWith("https://api.example.com/users/1");

  // Assert that the function returned the correct data
  expect(result).toEqual(mockUserData);
});
```

### Paso 4: ejecutar la prueba

1. Agregue un script de prueba a su `package.json`:

```json
"scripts": {
  "test": "jest"
}
```

2. Ejecute sus pruebas con `npm test`.

#### Paso 5: revise los resultados

Jest mostrará el resultado de su prueba en la terminal. La prueba debería pasar, lo que indica que `getUser` está devolviendo los datos simulados como se esperaba.

Felicitaciones, ahora tienes una prueba funcional con Jest y Mocking.

¡Espero que esto haya sido útil y/o te haya hecho aprender algo nuevo!

![Profile](https://res.cloudinary.com/khriztianmoreno/image/upload/c_scale,w_148/v1591324337/KM-brand/stickers/sticker-3_2x.png)

@khriztianmoreno
