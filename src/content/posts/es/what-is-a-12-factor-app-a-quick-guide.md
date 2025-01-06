---
title: ¿Qué es "12 factor app"? Guía rápida
tags:
  - web-development
  - fullstack
  - backend
date: 2025-01-08T10:54:27.000Z
updated: 2025-01-08T10:54:27.000Z
---

Si te tomas en serio la construcción de aplicaciones escalables y mantenibles como desarrollador fullstack, necesitas conocer la metodología "The twelve-factor app". Esto no es solo una palabra de moda; es un conjunto de principios rectores que han moldeado la forma en que se construyen y despliegan las aplicaciones modernas. Y créeme, una vez que lo entiendas, tu perspectiva sobre el diseño de software nunca será la misma.

![12 factor app](/posts/12-fact.png)

## ¿Qué es "The twelve-factor app"?

La "The twelve-factor app" es una metodología para diseñar y ejecutar aplicaciones de software como servicio (SaaS). Fue creada por desarrolladores en Heroku para compartir su enfoque sobre la construcción de aplicaciones que sean portátiles, confiables y fáciles de escalar. Cubre todo, desde cómo gestionas las configuraciones hasta cómo manejas el registro de eventos. El término fue acuñado en 2011 por Adam Wiggins en su [libro del mismo nombre](https://12factor.net/).

Los "12 factores" son esencialmente mejores prácticas divididas en áreas como el código base, las dependencias, los entornos y los procesos. Cada factor ayuda a garantizar que tu aplicación pueda prosperar en entornos dinámicos en la nube.

La "The twelve-factor app" es un conjunto de principios de diseño para desarrollar aplicaciones que puedan escalar rápidamente y de manera segura, y comportarse de manera consistente para todos los usuarios.

Esto no es el fin de todas las filosofías de desarrollo; como todas las filosofías de diseño, tiene sus detractores y advertencias situacionales. Pero es útil que la mayoría de los desarrolladores estén al tanto de ella.

Aquí está mi (breve) resumen de los 12 principios.

#### Código Base

Un código base rastreado en control de versiones, muchos despliegues: todos los activos relacionados con una aplicación se almacenan en un repositorio de código fuente. Este repositorio también es accesado por scripts de automatización esenciales para la tubería CI/CD. El principal beneficio aquí es la consistencia entre entornos y el impulso que le da a la escalabilidad de tu aplicación.

#### Dependencias

Declarar y aislar explícitamente las dependencias: solo el código que es único y relevante para el propósito de la aplicación se almacena en el control de versiones. Los artefactos externos se referencian en un manifiesto de dependencias cargado en memoria en el desarrollo, pruebas y tiempo de ejecución en producción.

#### Configuración

Almacenar la configuración en el entorno: esto significa que todas las configuraciones locales deben pasarse a través de variables de entorno o archivos de configuración independientes en tiempo de ejecución. En resumen, debes construir tu código para que sea lo más agnóstico posible para escalar en nuevos entornos y permitir cambios de modalidad fáciles (es decir, entornos de prueba y desarrollo claramente delineados y útiles).

#### Servicios de Apoyo

Tratar los servicios de apoyo como recursos adjuntos: eso significa tus bases de datos, tus herramientas de cumplimiento de terceros, tus servidores web. ¿Qué significa esto realmente? Significa que estos servicios externos solo están **ligeramente acoplados** con tu código, manteniendo tu código base flexible y capaz de trabajar con nuevos servicios rápidamente si se necesita un cambio, por ejemplo, reemplazar MySQL con PostgreSQL. Evidentemente, esto mantiene tu aplicación portátil y adaptable a cambios infraestructurales.

#### Construcción, Lanzamiento, Ejecución

Separar estrictamente las etapas de construcción y ejecución: esto es básicamente lo que dice en la lata. En principio, una "The twelve-factor app" debe tener tres etapas distintas y replicables en su despliegue que pueden instanciarse en cualquier momento.

- **_Construcción_**: Código recuperado y compilado, artefactos almacenados
- **_Lanzamiento_**: Configuración aplicada
- **_Ejecución_**: Entorno de ejecución provisionado

La clave de **Construcción, Lanzamiento y Ejecución** es que el proceso es completamente efímero. Si algo en la tubería se destruye, todos los artefactos y entornos pueden reconstituirse desde cero utilizando los activos almacenados en el repositorio de código fuente.

#### Procesos

Ejecutar la aplicación como uno o más procesos sin estado: esto significa que ningún proceso individual lleva un seguimiento del estado de otros procesos. Cuando un proceso no tiene estado, las instancias pueden agregarse o eliminarse según las necesidades de la aplicación o del usuario. Los datos de estado que necesitan existir perpetuamente deben ser manejados por un servicio de apoyo.

#### Vinculación de Puertos

Exportar servicios a través de la vinculación de puertos: los servicios deben ser identificables para la red por número de puerto en lugar de por nombre de dominio. Los nombres de dominio y las direcciones IP pueden manipularse sobre la marcha y, por lo tanto, son menos confiables y seguros que los números de puerto. Es por eso que tantos protocolos comunes usan puertos predeterminados (por ejemplo, SSH siendo el puerto 22).

#### Concurrencia

Escalar a través del modelo de procesos: es decir, organizar tus procesos según el propósito y permitir que se escalen hacia arriba o hacia abajo según sea necesario. Por ejemplo, tener balanceadores de carga operando en tus servidores web para permitir que los procesos se escalen hacia arriba o hacia abajo de manera aislada para satisfacer la demanda. Esto previene el desperdicio (sin procesos innecesarios escalados) y te hace más flexible para cumplir con los requisitos de la lógica empresarial.

#### Descartabilidad

Maximizar la robustez con un inicio rápido y un apagado elegante: esto significa que no debes escatimar en las cosas de mantenimiento para tu lógica de arranque/apagado. Validar que las conexiones funcionen al configurar, terminar las conexiones que ya no se necesitan al escalar hacia abajo, etc. Debería ser bastante evidente que esto va de la mano con la concurrencia (ya que estarás escalando nuevos procesos con frecuencia).

#### Paridad Dev/Prod

Mantener el desarrollo, la puesta en escena y la producción lo más similares posible: es decir, todas tus rutas de despliegue deben ser similares pero independientes. El principio de Construcción, Lanzamiento, Ejecución ya significa que ambos entornos pasan por el mismo conjunto general de pasos para alcanzar un entorno de ejecución funcional. Por supuesto, los entornos deben diferir en algunos aspectos.

#### Registros

Tratar los registros como flujos de eventos: los registros son flujos de eventos ordenados en el tiempo que capturan el comportamiento de una aplicación. La información registrada debe enviarse a la salida estándar (en lugar de como artefactos estáticos o archivos) y capturada por el entorno de ejecución, permitiendo una separación de preocupaciones cuando se trata de registros. Además, los registros deben estar claramente etiquetados, permitiendo a las partes interesadas acceder a los datos que necesitan (por ejemplo, datos de solicitudes/respuestas marcados como tales).

#### Procesos de Administración

Las tareas de administración/gestión (por ejemplo, migraciones de bases de datos, ejecución de scripts o limpieza de cachés) deben ejecutarse en el mismo entorno que la aplicación. Estas tareas deben ejecutarse como procesos únicos, lo que significa que se ejecutan manualmente o bajo demanda, en lugar de ser parte de los procesos regulares de tiempo de ejecución de la aplicación. Los procesos de administración deben usar el mismo código base, dependencias y configuración que la aplicación para garantizar la consistencia.

## ¿Por qué es útil?

Aquí está la cosa: en 2025, el desarrollo de software es más rápido, más competitivo y más global que nunca. Para mantenerse a la vanguardia, tus aplicaciones deben ser robustas y adaptables. Los principios de la "The twelve-factor app" te dan un plano para lograr eso.

Por ejemplo:

- **Portabilidad:** ¿Quieres moverte de AWS a Google Cloud o desplegar en la infraestructura de un cliente? Las aplicaciones de 12 factores lo hacen fácil.
- **Escalabilidad:** Si tu aplicación se vuelve viral mañana, puedes escalarla horizontalmente sin sudar.
- **Mantenibilidad:** Ya sea que estés depurando o agregando nuevas funciones, seguir estos principios hace tu vida mucho más fácil.

## Cómo lo he visto funcionar

Como desarrollador fullstack trabajando en aplicaciones web modernas, estos principios me han ahorrado innumerables dolores de cabeza. Gestionar configuraciones con variables de entorno (Factor III) evita sorpresas desagradables al moverse entre local y producción. Externalizar el estado a servicios de apoyo (Factor VI) asegura que las aplicaciones no se desmoronen bajo cargas pesadas. Y seguir la regla de "un código base por aplicación" (Factor I) mantiene los repositorios limpios y el versionado sensato.

No se trata solo de lo que estos principios hacen por tu aplicación; se trata de lo que hacen por ti. Te obligan a construir con disciplina, y esa disciplina da sus frutos cuando tu aplicación crece o cuando un nuevo desarrollador se une a tu equipo y se pone al día rápidamente.

## Por qué deberías aprenderlo

Dominar la "The twelve-factor app" no es solo una casilla en tu currículum. Es un cambio de mentalidad que te prepara para construir aplicaciones que cumplan con las demandas modernas. Al adoptar estos principios:

- Preparas tu código para el caos de la infraestructura cambiante.
- Reduces el dolor de la incorporación y la colaboración.
- Te destacas como un desarrollador que entiende no solo cómo construir aplicaciones, sino cómo diseñarlas para el éxito en el mundo real.

Entonces, si aún no has explorado "The twelve-factor app", ahora es el momento perfecto para sumergirte. Estos principios te ayudarán a convertirte en el tipo de desarrollador que los equipos buscan en 2025: alguien que no solo escribe buen código, sino que también entiende cómo hacerlo prosperar en producción.

¡Espero que esto haya sido útil y/o te haya enseñado algo nuevo!

![Profile](https://res.cloudinary.com/khriztianmoreno/image/upload/c_scale,w_148/v1591324337/KM-brand/stickers/sticker-3_2x.png)

#### @khriztianmoreno 🚀
