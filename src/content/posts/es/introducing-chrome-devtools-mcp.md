---
title: Presentando Chrome DevTools MCP
tags:
  - javascript
  - chrome
  - devtools
  - ai
  - mcp
  - debugging
  - performance
date: 2025-09-30 13:10:04
updated: 2025-09-30 13:13:08
---

Participé en el programa de acceso anticipado (Early Access Program) de Chrome DevTools MCP y puse a prueba la funcionalidad en proyectos reales. Me enfoqué en cuatro escenarios: corregir un problema de estilos, ejecutar trazas de rendimiento y extraer insights, depurar una solicitud de red fallida y validar que los assets tengan encabezados de caché óptimos. En este post comparto esa experiencia práctica: qué funcionó, dónde brilla y cómo lo usaría en el día a día.

Chrome DevTools MCP proporciona a los asistentes de codificación con IA visibilidad real en un navegador Chrome activo para que puedan inspeccionar, probar, medir y corregir problemas basados en señales reales, no en suposiciones. En la práctica, esto significa que tu agente puede abrir páginas, hacer clic, leer el DOM, recopilar trazas de rendimiento, analizar peticiones de red y perfeccionar soluciones en un ciclo cerrado.

## Por qué es importante

La mayoría de los agentes de codificación son ciegos. Proponen código, pero no pueden ver la UI renderizada, la consola, las cascadas de red o los problemas de layout thrashing. Chrome DevTools MCP elimina esa venda conectando cualquier cliente AI habilitado para MCP (por ejemplo, Cursor, Claude Code, Gemini CLI) a una instancia local de Chrome con superpoderes a nivel de DevTools. El resultado es un flujo de trabajo donde el agente puede implementar un cambio, ejecutarlo en Chrome, observar el resultado y refinarlo.

## Introducción rápida: ¿Qué es MCP?

MCP (Model Context Protocol) es un estándar abierto (de Anthropic) que define cómo los asistentes de IA se conectan a herramientas y fuentes de datos mediante una interfaz consistente. Un servidor MCP expone "herramientas" (capacidades). Un cliente MCP (tu asistente de IA) llama a esas herramientas. Chrome DevTools MCP es un servidor MCP que conecta un asistente de IA con DevTools de Chrome y su superficie de automatización.

- **Puppeteer para confiabilidad**: El servidor MCP utiliza Puppeteer para manejar la navegación, esperar a selectores, inactividad de red, diálogos, etc. Obtienes un control del navegador robusto y de nivel de producción en lugar de los peligros del CDP puro.
- **Capa de herramientas MCP**: El servidor expone herramientas de alto nivel (por ejemplo, `navigate_page`, `click`, `performance_start_trace`) a través de MCP. Tu AI llama a una herramienta; el servidor traduce eso en automatización de Chrome confiable y devuelve resultados estructurados.
- **Chrome local y aislado**: Se ejecuta localmente con un directorio de datos de usuario separado o perfiles efímeros completamente aislados. Puedes adjuntarte a un Chrome existente o iniciar una nueva instancia, en modo headless o visible.

## Capacidades clave (herramientas seleccionadas)

- **Navegación y ciclo de vida**: `new_page`, `navigate_page`, `wait_for`, avance/retroceso, listar páginas abiertas.
- **Interacción de usuario**: `click`, `fill`, `fill_form`, `hover`, `drag`, `handle_dialog`, `upload_file`.
- **DOM y scripting**: `evaluate_script`, `take_snapshot`, `take_screenshot`, `list_console_messages`.
- **Red**: `list_network_requests`, `get_network_request` para introspección de solicitudes/respuestas.
- **Emulación**: `emulate_cpu`, `emulate_network`, `resize_page` para restricciones de dispositivo/red.
- **Rendimiento**: `performance_start_trace`, `performance_stop_trace`, `performance_analyze_insight` para extraer métricas como LCP y TBT de trazas reales.

Estas son primitivas a nivel de DevTools: puedes reproducir flujos de usuario reales y obtener la misma fidelidad que tendrías al depurar manualmente en Chrome.

## Flujos de trabajo prácticos que utilizaría en proyectos reales

A continuación se presentan flujos probados en batalla que entregaría a un asistente de IA cuando trabajo en aplicaciones frontend a escala.

### 1) Verificar una corrección de UI de extremo a extremo

1. Aplicar el parche (PR del agente o cambio local).
2. `navigate_page` a la URL de vista previa.
3. `click` o `fill` para reproducir la ruta del error.
4. `take_screenshot` del estado roto para la línea base.
5. Aplicar la corrección; recargar; repetir pasos 2–4.
6. Comparar capturas de pantalla y `list_console_messages` para regresiones.

Por qué es útil: reemplaza las pruebas manuales con un bucle determinista que el agente puede ejecutar repetidamente en diferentes páginas y puntos de interrupción.

### 2) Detectar y explicar errores de ejecución rápidamente

1. `navigate_page` a la ruta fallida.
2. `list_console_messages` y `evaluate_script` para inspeccionar el estado.
3. `list_network_requests` + `get_network_request` para confirmar el estado del backend, payload, CORS y tiempos.
4. Proponer corrección con contexto (marcos de pila, respuestas erróneas, encabezados mal configurados).

Por qué es útil: tu agente deja de adivinar—los errores están fundamentados en la actividad real de la consola y la red.

### 3) Reproducir recorridos críticos de usuario antes de implementar

1. `new_page` a staging.
2. `fill_form` para iniciar sesión, `click` CTA, navegar por el checkout.
3. `take_screenshot` en cada paso para aceptación visual.
4. `emulate_network` 3G-lento y volver a intentar el flujo para la resiliencia.

Por qué es útil: ejecuciones E2E realistas y repetibles que puedes adjuntar a los PRs.

### 4) Depuración de estilos y layout en la que puedes confiar

1. `take_snapshot` y `evaluate_script` para extraer estilos computados para un componente problemático.
2. Aplicar parche de estilo; `take_screenshot` en múltiples tamaños de viewport mediante `resize_page`.
3. Validar riesgo de CLS y problemas de desbordamiento.

Por qué es útil: previene el "funciona en mi máquina" al basarse en el renderizado real.

### 5) Triaje de rendimiento sin salir de tu editor

2. ` performance_stop_trace` + ` performance_analyze_insight` para extraer señales y bloqueadores de LCP/TBT/CLS.
3. Recomendar optimizaciones específicas (por ejemplo, precarga de imágenes, división de código basada en rutas, eliminar tareas largas, diferir la hidratación no crítica).

Por qué es útil: integra una auditoría estilo Lighthouse en tu ciclo de agente con especificidad basada en trazas.

## Patrones avanzados para equipos senior

- **Arnés de regresión**: Codifica los recorridos principales (inicio de sesión, búsqueda, checkout) como secuencias MCP. Ejecuta en cada PR con capturas de pantalla + registros de consola/red adjuntos a los artefactos de CI.
- **Presupuestos de rendimiento**: Falla CI si ` performance_analyze_insight` excede los presupuestos para LCP/TBT; incluye trazas como evidencia.
- **Contratos de red**: Usa `get_network_request` para validar esquemas y encabezados de caché; marca sorpresas (por ejemplo, falta de `cache-control`, JSON sobredimensionado o sobre-fetching).
- **Verificaciones de accesibilidad**: Combina `evaluate_script` para consultar heurísticas de ARIA y contraste; captura screenshots para diferencias visuales.

## Seguridad y restricciones a tener en cuenta

- Trata al navegador automatizado como un perfil separado. Evita navegar a sesiones de producción sensibles con sesión iniciada.
- Prefiere perfiles efímeros/aislados para ejecuciones reproducibles.
- Sé explícito sobre los datos de prueba y los entornos para prevenir efectos secundarios en sistemas reales.

## Primeros pasos (nivel alto)

El repositorio documenta los detalles de instalación y configuración. A alto nivel:

1. Instala el servidor Chrome DevTools MCP (paquete de Node.js).
2. Configura tu cliente habilitado para MCP (Cursor, Claude Code, Gemini CLI) para registrar el servidor DevTools MCP.
3. Inicia tu cliente; generará/se conectará a una instancia de Chrome cuando se invoquen herramientas.
4. Llama a herramientas desde la interfaz del cliente o mediante prompts (por ejemplo, “abrir página, hacer clic en botón, recopilar traza de rendimiento”).

Ejemplo de llamadas a herramientas MCP que podrías orquestar en una sesión:

```txt
navigate_page -> wait_for(selector) -> click(selector) -> list_console_messages -> take_screenshot -> performance_start_trace -> trigger_interaction -> performance_stop_trace -> performance_analyze_insight
```

Consulta la documentación oficial y el repositorio para obtener la lista más reciente de herramientas, flags y opciones de configuración.

## Cuándo recurrir a esto

Si ya te apoyas en un asistente de IA para cambios de código, agrega DevTools MCP siempre que la corrección deba fundamentarse en el navegador: correcciones visuales/UI, interacciones inestables, depuración de tiempo de ejecución y red, y cualquier cosa relacionada con el rendimiento.

## Referencias

- [Anuncio](https://developer.chrome.com/blog/chrome-devtools-mcp) y [documentación de Chrome DevTools MCP](https://github.com/ChromeDevTools/chrome-devtools-mcp/blob/main/docs/tool-reference.md)
- [Descripción general del Model Context Protocol (MCP)](https://modelcontextprotocol.io/docs/getting-started/intro)
- [Puppeteer y Chrome DevTools Protocol (CDP)](https://developer.chrome.com/docs/puppeteer)

¡Espero que esto haya sido útil y/o te haya enseñado algo nuevo!

![Profile](https://res.cloudinary.com/khriztianmoreno/image/upload/c_scale,w_148/v1591324337/KM-brand/stickers/sticker-3_2x.png)

@khriztianmoreno 🚀
