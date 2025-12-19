---
title: "El Futuro Sin Contraseñas: Una Guía de Ingeniería para Reemplazar las Contraseñas"
tags:
  - webauthn
  - passkeys
  - seguridad
  - frontend
  - autenticación
  - google-chrome
date: 2025-12-19 13:15:00
updated: 2025-12-19 13:15:00
---

Las passkeys (llaves de acceso) son una primitiva de autenticación lista para producción y resistente al phishing, integrada en la plataforma web. Esta es una guía profunda a nivel de protocolo para equipos de ingeniería que buscan reemplazar las contraseñas de verdad.

<!--more-->

## Intro: Las contraseñas son el eslabón más débil

Seamos directos: las contraseñas son un modelo de seguridad heredado y están fallando. El phishing sigue siendo uno de los vectores de ataque más efectivos, la reutilización de contraseñas en diferentes servicios es un desastre esperando a ocurrir, y la autenticación multifactor (MFA), aunque es un parche necesario, añade fricción al usuario sin resolver el problema central de los secretos compartidos.

El paradigma está cambiando. El navegador ya no es solo un visor de documentos; está evolucionando hacia un sofisticado dispositivo de autenticación. Las passkeys están en el corazón de esta transformación, moviéndonos de una autenticación basada en el conocimiento a una prueba criptográfica basada en la posesión.

- **Referencia:** [Seguridad de Google](https://safety.google/intl/safety/authentication/)
- **Referencia:** [Resumen de Passkeys en web.dev](https://web.dev/articles/passkey-registration)

## ¿Qué son realmente las passkeys? (una visión técnica)

Olvida las definiciones de marketing. Desde una perspectiva de ingeniería, una passkey es un par de claves asimétricas gestionado por el sistema operativo o el navegador, vinculado a un servicio en línea específico (un "origen").

- **Clave Privada:** Se almacena de forma segura en el dispositivo del usuario en un enclave seguro respaldado por hardware (como un TPM o Secure Enclave). Nunca abandona el dispositivo.
- **Clave Pública:** Se envía y almacena en tu servidor durante el registro. Está matemáticamente vinculada a la clave privada, pero no se puede usar para derivarla.

La autenticación se realiza a través del estándar **WebAuthn** del W3C, donde el servidor le pide al dispositivo que firme un desafío, demostrando así la posesión de la clave privada.

Propiedades clave que hacen de esto una mejora fundamental en seguridad:

- **Resistente al phishing:** Las claves están **vinculadas al origen**. Una passkey creada para `tu-app.com` no puede usarse para firmar un desafío de `phisher-malvado.com`. Esto elimina el phishing de credenciales.
- **Sin secretos compartidos:** El servidor nunca ve la clave privada. Una brecha en la base de datos solo expone claves públicas, que son inútiles sin sus contrapartes privadas.
- **Sin credential stuffing:** Dado que cada passkey es única para un servicio, las credenciales robadas de un sitio no pueden ser reutilizadas en otro.

- **Referencia:** [Especificación de WebAuthn Nivel 2](https://www.w3.org/TR/webauthn-2/)
- **Referencia:** [Documentación de WebAuthn en Chrome](https://developer.chrome.com/docs/identity/webauthn)

## Arquitectura de WebAuthn

El flujo de WebAuthn implica dos ceremonias principales: registro y autenticación.

**Registro (Creación de una Passkey):**

1.  **El Servidor Crea un Desafío:** El servidor genera un desafío único y aleatorio, junto con las opciones de registro.
2.  **El Navegador Llama al Autenticador:** El navegador recibe estas opciones e invoca al autenticador de la plataforma (ej. Windows Hello, Face ID, bloqueo de pantalla de Android).
3.  **El Usuario Verifica:** El usuario aprueba la creación con un gesto biométrico o el PIN del dispositivo. Este es el paso de "verificación de usuario".
4.  **Se Devuelve la Clave Pública:** El autenticador genera un nuevo par de claves, firma el desafío con la nueva clave privada y devuelve la clave pública al navegador, que la envía al servidor.
5.  **El Servidor Almacena la Credencial:** El servidor valida la firma y almacena la clave pública y el ID de la credencial, asociándolos con la cuenta del usuario.

**Autenticación (Inicio de Sesión):**

1.  **El Servidor Emite un Desafío:** El servidor envía un nuevo y único desafío al navegador.
2.  **El Navegador Firma con la Clave Privada:** El autenticador del navegador encuentra la passkey apropiada para el servicio, solicita la verificación del usuario y luego firma el desafío con la clave privada almacenada.
3.  **El Servidor Verifica la Firma:** El servidor recibe el desafío firmado y verifica la firma usando la clave pública que tiene registrada para ese usuario. Si es válida, el usuario es autenticado.

## Creando una passkey (registro)

**Lado del Servidor: Generar Opciones de Registro**
Tu servidor debe generar un conjunto de opciones para la llamada `navigator.credentials.create()`.

```javascript
const options = {
  // Un desafío único, aleatorio y generado por el servidor
  challenge: crypto.randomUUID(),
  // Información sobre tu servicio (Relying Party)
  rp: {
    name: "Example App",
    id: "example.com", // El dominio donde se usarán las passkeys
  },
  // Información sobre el usuario
  user: {
    id: userIdBuffer, // Un ID de usuario estable y único
    name: user.email,
    displayName: user.name,
  },
  // Algoritmos criptográficos que soportas (ES256 es el estándar)
  pubKeyCredParams: [
    { type: "public-key", alg: -7 }, // ES256 (ECDSA con P-256)
  ],
  // Instrucciones para el autenticador
  authenticatorSelection: {
    residentKey: "required",
    userVerification: "required",
  },
  timeout: 60000,
};
```

- `residentKey: 'required'` (ahora `discoverableCredential` en WebAuthn L3) es la clave para una experiencia "sin contraseña". Instruye al autenticador para que almacene la credencial en el propio dispositivo, permitiendo el inicio de sesión sin un prompt de nombre de usuario.
- `userVerification: 'required'` obliga a que el usuario deba realizar una verificación biométrica o con PIN, demostrando que está presente.

**Lado del Cliente: Crear la Credencial**
El navegador toma estas opciones y maneja la compleja interacción con el hardware seguro.

```javascript
const credential = await navigator.credentials.create({
  publicKey: options,
});
```

Esta única línea desencadena la interfaz de usuario nativa del sistema operativo para la generación de claves y la verificación biométrica.

- **Referencia:** [MDN WebAuthn: `credentials.create()`](https://developer.mozilla.org/en-US/docs/Web/API/CredentialsContainer/create)
- **Referencia:** [Documentación de Passkeys en Chrome](https://developer.chrome.com/docs/identity/passkeys)

## Autenticando con una passkey

**Lado del Cliente: Obtener Aserción**
Para iniciar sesión, el servidor proporciona un desafío y el cliente le pide al navegador que obtenga una "aserción" que pruebe la propiedad de la passkey.

```javascript
const assertion = await navigator.credentials.get({
  publicKey: {
    challenge, // Un nuevo y único desafío del servidor
    timeout: 60000,
    userVerification: "required",
  },
});
```

Este es el momento sin contraseña. El navegador, no tu aplicación, se encarga de seleccionar la credencial correcta. La experiencia de usuario es nativa de su sistema operativo, rápida y segura.

**Lado del Servidor: Verificar Aserción**
Tu servidor debe realizar varias comprobaciones críticas:

1.  Verificar que el desafío coincida con el que enviaste.
2.  Verificar la firma en los datos de la aserción usando la clave pública almacenada.
3.  Validar que el origen y el ID de la RP en la aserción coincidan con el dominio de tu servicio.

**Crucialmente: utiliza una librería de lado del servidor auditada y bien mantenida para esto.** No intentes implementar la verificación de firmas de WebAuthn manualmente.

## Diseñando el inicio de sesión con passkeys (UX + navegador)

Aquí es donde la teoría se encuentra con la práctica, y donde muchas implementaciones fallan. No construyas un botón de "Iniciar sesión con Passkey".

**Inicio de Sesión con Passkey Impulsado por Autocompletar**
La experiencia de usuario más potente para las passkeys se integra directamente con el autocompletado del navegador. Al agregar `autocomplete="username webauthn"` a un campo de entrada, le indicas al navegador que este formulario admite passkeys.

```html
<input type="text" name="username" autocomplete="username webauthn" />
```

Cuando este campo de entrada tiene el foco, el navegador sugiere automáticamente cualquier passkey disponible para tu servicio, justo al lado de las contraseñas guardadas. Esto crea un flujo intuitivo y sin interrupciones que funciona en todos los dispositivos a través de la cuenta de Google del usuario, iCloud Keychain o un gestor de contraseñas.

- **Referencia:** [web.dev: Iniciar sesión con una passkey a través de autocompletar](https://web.dev/articles/passkey-form-autofill)

**UI Condicional (Recomendado)**
Para una experiencia aún mejor, utiliza la "mediación condicional" para verificar silenciosamente si hay passkeys disponibles sin bloquear la interfaz de usuario.

```javascript
// Verificar si hay passkeys tan pronto como la página se carga
if (
  window.PublicKeyCredential &&
  PublicKeyCredential.isConditionalMediationAvailable
) {
  const assertion = await navigator.credentials.get({
    mediation: "conditional",
    publicKey: options, // Opciones generadas por el servidor
  });
  // Si tiene éxito, inicia la sesión del usuario
}
```

Esta API permite que el navegador muestre un aviso no intrusivo (por ejemplo, en el menú desplegable de autocompletar) si se encuentra una passkey, lo que lleva a las tasas de conversión más altas.

## Gestionando passkeys a escala

- **Múltiples Dispositivos:** Los usuarios esperan que sus passkeys se sincronicen en todos sus dispositivos. Esto es manejado por la plataforma (Google, Apple). Tu trabajo es permitir que un usuario registre múltiples passkeys para su única cuenta.
- **Revocación de Credenciales:** En la interfaz de configuración de la cuenta, los usuarios deben poder ver sus passkeys registradas (ej. "Chrome en Windows 11", "iPhone 15 Pro") y revocarlas.
- **Recuperación de Cuenta:** Esto no es negociable. Antes de siquiera considerar eliminar las contraseñas, debes tener un flujo de recuperación de cuenta robusto (ej. a través de un correo electrónico o número de teléfono verificado). Nunca dejes a un usuario bloqueado.

- **Referencia:** [UX de Passkeys en Cuentas de Google](https://myaccount.google.com/signinoptions/passkeys)

## Propiedades de seguridad vs. contraseñas

| Propiedad               | Contraseñas | Passkeys  |
| ----------------------- | :---------: | :-------: |
| Resistente al Phishing  |     ❌      |    ✅     |
| Credencial Reutilizable |     ✅      |    ❌     |
| Fricción del Usuario    |    Alta     |   Baja    |
| MFA Requerido           |     Sí      | Integrado |

Las passkeys no solo mejoran las contraseñas; son un reemplazo fundamental para el modelo de secreto compartido.

## Lista de verificación para el despliegue

- **Backend:**
  - HTTPS es obligatorio en todas partes.
  - Establece un ID de Relying Party (RP) estable y correcto.
  - Usa una librería de WebAuthn de lado del servidor de confianza.
  - Implementa un registro de auditoría completo para el registro y la revocación de credenciales.
- **Frontend:**
  - Usa una UI condicional para la mejor experiencia de inicio de sesión.
  - Soporta el autocompletado con el token `webauthn`.
  - Evita los flujos de passkey personalizados basados en botones.
- **UX:**
  - Educa a los usuarios sobre las passkeys de forma gradual.
  - No fuerces la migración; permite que los usuarios agreguen una passkey a su propio ritmo.
  - Asegúrate de que las rutas de respaldo (contraseñas, enlaces mágicos) y la recuperación de la cuenta sean sólidas.

## Errores comunes a evitar

- **Deshabilitar el autocompletado:** Esto rompe la experiencia de usuario más fluida de las passkeys.
- **Forzar las passkeys demasiado pronto:** Deja que los usuarios opten por ellas cuando se sientan cómodos.
- **Tratar WebAuthn como un flujo modal:** Intégralo en tus formularios existentes.
- **Ignorar la sincronización entre dispositivos:** Los usuarios esperan que su passkey funcione en su nuevo teléfono. Diseña para esto permitiendo múltiples passkeys por cuenta.

## Alineación con el ecosistema de Google

Google está totalmente comprometido con las passkeys porque resuelven problemas de seguridad y UX a nivel de plataforma.

- **Chrome:** Soporte nativo para WebAuthn, autocompletado y UI condicional.
- **Android & ChromeOS:** Las passkeys son un ciudadano de primera clase, profundamente integrado en el sistema operativo.
- **Cuentas de Google:** Google es una de las mayores Relying Parties, usando passkeys para su propia base de usuarios, lo que indica un profundo compromiso.

- **Referencia:** [Documentación de Identidad para Desarrolladores de Chrome](https://developer.chrome.com/docs/identity)

## Conclusión

La era de la contraseña como el principal autenticador digital está terminando. Las contraseñas son un transporte heredado para la identidad; las passkeys son una capacidad nativa de la plataforma. Al adoptar WebAuthn y diseñar para el navegador, podemos construir flujos de autenticación que no solo son más fuertes, sino también más simples.

El futuro de la autenticación no es algo que los usuarios recuerdan. Es algo que sus dispositivos demuestran.

¡Espero que esto haya sido útil y/o te haya enseñado algo nuevo!

![Profile](https://res.cloudinary.com/khriztianmoreno/image/upload/c_scale,w_148/v1591324337/KM-brand/stickers/sticker-3_2x.png)

### @khriztianmoreno

Hasta la próxima.
