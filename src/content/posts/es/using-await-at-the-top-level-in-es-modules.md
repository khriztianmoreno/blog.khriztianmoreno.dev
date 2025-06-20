---
title: Uso de await en el nivel superior en módulos ES
tags:
  - javascript
  - web-development
date: 2025-06-20T13:39:26.000Z
updated: 2025-06-20T13:39:26.000Z
---

# Uso de await en el nivel superior en módulos ES

Mientras refactorizaba uno de mis proyectos en React la semana pasada, me di cuenta de cuánto ha evolucionado JavaScript desde que comencé a programar. ¿Recuerdas cuando teníamos que envolver todo en callbacks? Luego llegaron las Promesas, seguidas de async/await. Y ahora, en 2025, me encuentro usando regularmente una característica que cambió silenciosamente las reglas del juego para los desarrolladores de JavaScript: await en el nivel superior en módulos ES.

## La Evolución de JavaScript Asíncrono

A través de mi trayectoria como desarrollador, he sido testigo de la transformación de JavaScript asíncrono. En los primeros días, manejar operaciones asíncronas significaba el infierno de los callbacks—funciones anidadas que se volvían cada vez más difíciles de leer y mantener. Luego llegaron las Promesas, ofreciendo un enfoque más estructurado, pero aún requiriendo cadenas de `.then()`.

Cuando apareció async/await, fue una revelación. ¡De repente nuestro código asíncrono podía verse sincrónico! Pero todavía había una limitación que me frustraba diariamente: solo podíamos usar `await` dentro de funciones async. Esto significaba envolver nuestro código de inicialización de módulos en código repetitivo innecesario:

```javascript
// La forma antigua de hacer las cosas
(async () => {
  const data = await fetchImportantData();
  initializeApp(data);
})();
```

ES2022 lo cambió todo al introducir top-level await. Después de usarlo extensivamente en mis proyectos durante los últimos años, puedo decir con confianza que es una de esas características que, una vez que comienzas a usarla, nunca quieres volver atrás.

## ¿Qué es exactamente Top-Level await?

Top-level await es exactamente lo que parece—la capacidad de usar la palabra clave `await` directamente en el nivel superior de tus módulos ES, fuera de las funciones async:

```javascript
// Esto ahora funciona en módulos ES
const data = await fetchImportantData();
initializeApp(data);
```

Se acabaron los envoltorios en IIFE async (Expresiones de Función Inmediatamente Invocadas). No más anidación innecesaria. Solo código limpio y directo que expresa tu intención claramente.

## Casos de Uso Reales De Mis Proyectos

Durante el último año, me he encontrado utilizando top-level await en varios escenarios comunes:

### 1. Carga de Configuración

En mi última aplicación web, necesitaba obtener la configuración antes de inicializar la aplicación. Top-level await lo hizo hermosamente simple:

```javascript
// config.js
const config = await fetch("/api/configuration").then((res) => res.json());
export default config;

// Otros módulos pueden ahora importar esta configuración
```

### 2. Carga Dinámica de Módulos

Recientemente construí un dashboard donde las características necesitaban cargarse según los permisos del usuario. Top-level await se combinó perfectamente con las importaciones dinámicas:

```javascript
let analyticsModule;

if (userPermissions.includes("analytics")) {
  analyticsModule = await import("./features/analytics.js");
}

export const enabledFeatures = {
  analytics: analyticsModule?.default,
  // otras características...
};
```

### 3. Inicialización de Conexión a Base de Datos

Para un servicio backend de Node.js en el que trabajé, establecer la conexión a la base de datos antes de exportar el módulo era crucial:

```javascript
// db.js
const connection = await createDatabaseConnection();

export async function query(sql) {
  return connection.query(sql);
}
```

## Obstáculos que Aprendí por las Malas

Después de usar top-level await en varios proyectos, he encontrado algunas dificultades que vale la pena compartir:

### La Ejecución del Módulo No Es Lo Que Podrías Esperar

Una vez pasé horas depurando un misterioso problema de orden de carga antes de entender un comportamiento clave: cuando un módulo usa top-level await, cualquier módulo que lo importe pausará su ejecución hasta que esas promesas en espera se resuelvan.

En una sesión de depuración particularmente dolorosa, descubrí que tener una cadena de módulos con top-level await creaba un efecto de retraso en cascada que ralentizaba significativamente el inicio de mi aplicación.

### Cuidado con las Dependencias Circulares

En una aplicación compleja de React que estaba desarrollando, creé sin querer una dependencia circular entre dos módulos que usaban top-level await. ¿El resultado? Un error en tiempo de ejecución mucho más difícil de depurar que los problemas habituales de dependencias circulares.

```javascript
// Evita patrones como este:
// moduleA.js
export const dataA = await fetchDataA();
import { dataB } from "./moduleB.js";

// moduleB.js
export const dataB = await fetchDataB();
import { dataA } from "./moduleA.js";
```

## Compatibilidad en 2025

La buena noticia es que en 2025, top-level await está bien soportado en todo el ecosistema JavaScript:

- Todos los navegadores modernos lo soportan completamente
- Node.js v16+ tiene soporte estable
- Los principales frameworks como React, Vue y Angular lo han adoptado
- Empaquetadores como Vite, Webpack y Rollup lo manejan con elegancia

Solo recuerda que top-level await solo funciona en módulos ES (no en CommonJS), así que necesitarás usar:

- Archivos con la extensión `.mjs`, o
- Archivos `.js` con `"type": "module"` en tu package.json

## Por Qué Deberías Adoptar Top-Level await Hoy

Cuando miro mi código JavaScript de hace apenas unos años, me sorprende lo mucho más elegante y mantenible que se ha vuelto gracias a características como top-level await. No es solo azúcar sintáctico—cambia fundamentalmente la forma en que estructuramos nuestros módulos.

Al eliminar los envoltorios async innecesarios, nuestro código se vuelve:

- Más legible
- Más mantenible
- Más expresivo de nuestra intención

¿La mejor parte? Esta ya no es una característica experimental de la que debamos ser cautelosos. Es una parte estable del lenguaje que puedes usar con confianza en código de producción hoy mismo.

## Cómo Empezar

Si todavía no estás usando top-level await en tus proyectos, ¡comienza hoy mismo! Actualiza tu versión de Node.js si es necesario, asegúrate de estar usando módulos ES, y comienza a refactorizar esos IIFEs async en operaciones asíncronas limpias de nivel superior.

En mi experiencia, este pequeño cambio marcará una diferencia notable en la calidad de tu código y en la felicidad del desarrollador. A medida que avanzamos más allá de 2025, espero que top-level await se vuelva tan estándar en nuestros módulos JavaScript como los propios imports.

¿Ya has comenzado a usar top-level await en tus proyectos? ¡Me encantaría conocer tus experiencias en los comentarios a continuación!
