---
title: WebContainers al máximo - Bolt.new combina IA y desarrollo full-stack en el navegador
tags:
  - javascript
  - ai
  - web-development
date: 2024-10-08T16:07:39.000Z
updated: 2024-10-08T16:07:39.000Z
---

¿Recuerdas los WebContainers? Es el "microsistema operativo" basado en WebAssembly que puede ejecutar las operaciones de Vite y todo el ecosistema Node.js en el navegador. El equipo de StackBlitz creó WebContainers para potenciar su IDE en el navegador, pero a menudo parecía que la tecnología todavía estaba buscando un caso de uso decisivo, hasta ahora.Esto se debe a que StackBlitz acaba de lanzar [bolt.new](https://bolt.new/) , un sandbox de desarrollo impulsado por IA que Eric Simons describió durante ViteConf como "como si Claude o ChatGPT hubieran tenido un bebé con StackBlitz".

![Bolt.new](https://bolt.new/social_preview_index.jpg)

Intentaré no imaginarlo demasiado vívidamente, pero en base a las críticas abrumadoramente positivas hasta el momento, supongo que está funcionando: docenas de desarrolladores [lo describen](https://www.youtube.com/watch?v=B1b3ZkNTSq4&ab_channel=RasMic) como una combinación de v0, Claude, Cursor y Replit.En qué se diferencia Bolt: las herramientas de código de IA existentes a menudo pueden ejecutar algo de JavaScript/HTML/CSS básico en el navegador, pero para proyectos más complejos, es necesario copiar y pegar el código en un entorno local.Pero Bolt no. Al utilizar WebContainers, puede solicitar, ejecutar, editar e implementar aplicaciones web completas , todo desde el navegador.Así es como se ve:

- Puedes solicitarle a [bolt.new](https://bolt.new/) que cree una aplicación de varias páginas lista para producción con un backend y una base de datos específicos, usando cualquier stack tecnológico que desees (por ejemplo: “Construye un blog personal usando Astro, Tailwind y shadcn”).
- A diferencia de otras herramientas, Bolt puede instalar y ejecutar paquetes y bibliotecas npm relevantes, interactuar con API de terceros y ejecutar servidores Node.
- Puede editar manualmente el código que genera a través de un editor en el navegador o hacer que Bolt [resuelva los errores por usted](https://x.com/stackblitz/status/1841873255961153804) . Esto es exclusivo de Bolt, porque integra IA en todos los niveles de WebContainers (no solo en el paso CodeGen).
- Puedes implementar en producción desde el chat a través de Netlify, sin necesidad de iniciar sesión.

Hay mucho más que podríamos analizar aquí, pero [la demostración de Eric](https://www.youtube.com/watch?v=knLe8zzwNRA&t=694s&ab_channel=ViteConf) es bastante salvaje.Para cerrar: desde fuera, no siempre estuvo claro si StackBlitz alguna vez obtendría un retorno significativo de la inversión durante los más de 5 años que han pasado desarrollando WebContainers. Pero, de repente, parece que podrían estar en una posición única para ayudar a los desarrolladores a aprovechar la IA para crear aplicaciones legítimas FullStack.

<iframe width="560" height="315" src="https://www.youtube.com/embed/knLe8zzwNRA?si=7R7-1HxzwuyzL0EZ&amp;start=700" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

¡Espero que esto haya sido útil y/o te haya hecho aprender algo nuevo!

![Profile](https://res.cloudinary.com/khriztianmoreno/image/upload/c_scale,w_148/v1591324337/KM-brand/stickers/sticker-3_2x.png)

@khriztianmoreno 🚀
