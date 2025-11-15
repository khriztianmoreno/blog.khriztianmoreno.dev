---
title: El Kit de Desarrollo de Agentes - ADK
tags:
  - ai
  - web-develpoment
  - mcp
date: 2025-10-15T07:58:26.000Z
updated: 2025-10-15T07:58:26.000Z
---

Hoy vamos a meternos de lleno en el **Agent Development Kit**, mejor conocido como **ADK**.
Es un framework que está cambiando las reglas del juego para construir agentes de inteligencia artificial.

Pensemos en esto por un momento.
Para quienes desarrollan software, la idea de crear un agente de IA funcional con una sola línea de código no es solo una pregunta: es el sueño hecho realidad.

Quienes programan conocen bien este dolor de cabeza.
Uno empieza con una idea simple, pero pronto el proyecto se convierte en un laberinto de llamadas a APIs, gestión de estado y código repetitivo.
Todo se vuelve un caos.
Y justo ahí es donde entra **ADK** para poner orden.

Lo interesante es que trae principios sólidos de la ingeniería de software —como modularidad y facilidad para hacer pruebas— aplicados al desarrollo de inteligencia artificial.
Es una solución elegante para un problema complejo.

---

### 🔩 Los seis componentes clave

Para entender cómo funciona ADK, hay que mirar debajo del capó.
El sistema se compone de **seis bloques fundamentales**, que trabajan como una orquesta donde cada instrumento cumple un rol esencial.

1. **El agente:**
   Es el cerebro del sistema. Procesa lo que se le pide, toma decisiones y sabe cuándo debe usar sus herramientas.
2. **El runner:**
   Actúa como el director de orquesta. Se asegura de que todo fluya correctamente: que los mensajes lleguen, las herramientas se activen y las respuestas regresen sin problemas.
3. **La sesión:**
   Es la memoria a corto plazo.
   Permite mantener la coherencia en la conversación, recordar de qué se está hablando y no perder el contexto.
4. **El estado:**
   Es como una pizarra compartida.
   Todos los componentes pueden leer y escribir datos ahí.
   Una herramienta puede dejar información y el agente usarla al instante.
5. **La memoria:**
   Representa el conocimiento a largo plazo.
   Guarda información que persiste entre conversaciones, lo que permite que el agente aprenda y mejore con el tiempo.
6. **Las herramientas:**
   Son las manos del agente.
   Sin ellas, solo podría conversar, pero con ellas puede actuar: buscar en internet, conectarse a APIs, obtener datos.
   Son lo que transforma un chatbot en un asistente verdaderamente útil.

---

### 🎼 Cómo funciona la sinfonía

Cuando llega una petición:

1. La sesión carga el contexto de la conversación.
2. El agente procesa la solicitud.
3. Si es necesario, una herramienta entra en acción.
4. El estado se actualiza con los resultados.
5. El runner orquesta todo para devolver una respuesta coherente.

![Sinfonia completa](/posts/sinfonia.png "Sinfonia completa")

Un ciclo perfecto que da vida a agentes inteligentes.

---

### 🧰 Extender las capacidades con herramientas

Hay dos formas de dotar a los agentes de nuevas habilidades:

1. **Crear herramientas personalizadas:**
   Diseñadas para una lógica de negocio específica.
   Solo requieren cuatro elementos:
   - Un nombre único
   - Una descripción clara
   - Un esquema con los datos necesarios
   - La función que ejecuta la acción
2. **Usar el _Model Context Protocol (MCP)_:**
   Un conector universal que permite integrar servicios existentes (como GitHub, Discord o Slack) sin código de integración a medida.

Además, **ADK es agnóstico**: funciona con OpenAI, Anthropic o cualquier modelo. Total libertad.

---

### ⚙️ Flujos de trabajo y colaboración entre agentes

Cuando una tarea es demasiado grande para un solo agente, entran los **flujos de trabajo**, que permiten orquestar varios agentes para automatizar procesos complejos.

Es clave distinguir entre:

- **Sistemas multiagentes:** pensados para conversaciones dinámicas (como un bot de soporte que deriva a un experto).
- **Flujos de trabajo:** para automatización pura, con pasos fijos y predecibles (por ejemplo, generar un informe mensual).

Los patrones más comunes son:

1. **Secuencial:**
   Un agente recopila datos, otro redacta y otro publica.
   Ideal para procesos paso a paso, como creación de contenido.
2. **Paralelo:**
   Divide una tarea entre varios agentes a la vez (por ejemplo, revisión técnica y revisión de negocio simultánea).
   Gana velocidad y múltiples perspectivas.
3. **Bucle (loop):**
   Un agente genera un resultado, otro evalúa si cumple los criterios, y si no, lo devuelve con feedback para mejorar.
   Perfecto para refinamiento iterativo y mejora continua.

Regla práctica:

- Paso a paso → secuencial
- Velocidad o diversidad → paralelo
- Calidad máxima → bucle

---

### 🔌 Conexión con el mundo exterior: el adaptador universal (MCP)

El **Model Context Protocol (MCP)** actúa como un adaptador de corriente universal.
Permite conectar los agentes con servicios externos sin necesidad de integraciones personalizadas.

Esto separa la lógica del agente de la complejidad técnica de las conexiones externas.

Ejemplos reales:

- Un asistente de **DevOps** que detecta problemas en GitHub y alerta por Discord.
- Un agente de **soporte** que consulta el CRM y notifica al cliente por Telegram.

El potencial de automatización es enorme.

---

🔗 Referencias esenciales

### **Google – Agent Development Kit (ADK)**

Este es el recurso principal.
Aquí está toda la documentación oficial.

**Doc oficial:**
[Agent Development Kit](https://google.github.io/adk-docs/)

**GitHub SDK:**
[Agent Development Kit (ADK) Web](https://github.com/google/adk-web)

---

### 🚀 Conclusión

El **ADK** es mucho más que un conjunto de herramientas.
Representa una **nueva filosofía de desarrollo de IA**, donde los agentes se construyen con la misma rigurosidad que el software profesional.

La pregunta final:

> ¿Cuál será el próximo gran problema que automatizaremos?
