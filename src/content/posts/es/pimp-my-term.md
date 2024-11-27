---
title: Enchulame la terminal - Mac
tags:
  - tutorial
  - bash
  - terminal
date: 2020-05-03T14:18:19.000Z
updated: 2020-05-03T14:18:19.000Z
---

Como usuario de Mac OS, disfruto trabajar con la terminal y me parece una herramienta especialmente poderosa. Por lo tanto, pasé bastante tiempo personalizándolo y aquí está mi guía definitiva para la personalización de terminales.

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/e9lgxto6c9jqwjee4apj.png)

Primero pensé que solo crearía una publicación corta con algunos de los ajustes que me gustan. Pero tenía tantas cosas que quería mostrar que esto comenzó a convertirse en una publicación considerablemente larga. Así que he decidido publicarlo ahora, con tantos consejos como pueda escribir, y lo actualizaré con nuevos consejos y trucos.

## Mi terminal

Instalaciones recomendadas

- [iTerm2](https://www.iterm2.com/)
- [Nerd fonts](https://www.nerdfonts.com/) - [Hack Bold](https://github.com/ryanoasis/nerd-fonts/blob/master/patched-fonts/Hack/Bold/complete/Hack%20Bold%20Nerd%20Font%20Complete.ttf)
- [zsh](https://ohmyz.sh/)
- zsh extensions:
  - [autosuggestions](https://github.com/zsh-users/zsh-autosuggestions)
  - [syntax-highlighting](https://github.com/zsh-users/zsh-syntax-highlighting)
- [Powerlevel10k](https://github.com/romkatv/powerlevel10k)
- [lsd: The next gen ls command](https://github.com/Peltoche/lsd)
- [ccat: Colorizing `cat`](https://github.com/jingweno/ccat)
- [lolcat](https://github.com/busyloop/lolcat)
- [Neofetch: A command-line system information tool written in bash 3.2+](https://github.com/dylanaraps/neofetch)

Comencemos entonces a configurar todas las herramientas que vamos a necesitar.

## Prerrequsitos

- En primer lugar, debe instalar iTerm2.
- Luego instalar brew.
- Ahora instale oh-my-zsh, abra iTerm2 y pegue el siguiente comando:

```shell
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

Luego de tener este par de cosas instaladas entremos mas en materia.

## Fuentes parcheadas

Quiero comenzar a hablar sobre las fuentes parcheadas, ya que muchas de las personalizaciones que explicaré más adelante pueden depender de ellas. Las fuentes parcheadas consisten en fuentes regulares a las que se han agregado algunos símbolos adicionales. De esa manera, puede mostrar iconos especiales (como el icono de su sistema operativo) o agregar nuevas formas a tu prompt.

El proyecto más exitoso es nerd-fonts, que incluye muchas de las fuentes más utilizadas y favorita de este proyecto es [Hack Bold](https://github.com/ryanoasis/nerd-fonts/blob/master/patched-fonts/Hack/Bold/complete/Hack%20Bold%20Nerd%20Font%20Complete.ttf)

### [Nerd fonts](https://www.nerdfonts.com/)

Nerd Fonts es un proyecto que parchea fuentes dirigidas por desarrolladores con una gran cantidad de glifos (iconos). Específicamente para agregar una gran cantidad de glifos adicionales de 'fuentes icónicas' populares como Font Awesome, Devicons, Octicons y otras.

![Nerd fonts](https://www.nerdfonts.com/assets/img/sankey-glyphs-combined-diagram.png)

Entonces para instalar estas fuentes en tu Mac OS puedes usar brew:

```shell
brew tap homebrew/cask-fonts
brew cask install font-hack-nerd-font
```

He visto que algunas veces no instala las fuentes con cask, aqui hay otra opcion:

```shell
brew install --cask font-hack-nerd-font
```

Ahora, si busca en la carpeta en la que acaba de instalarlo, verá que aparece allí. `ls ~/Library/Fonts`

### Configura tu terminal

Una vez que haya descargado Nerd Fonts, puede configurar su terminal para usarlo. Configure iTerm2 para usar la fuente yendo a:

```shell
iTerm2 -> Preferences -> Profiles -> Text -> Font -> Change Font
```

Seleccione la fuente **Hack Regular Nerd Font** y ajuste el tamaño si lo desea. También marque la casilla Usar una fuente diferente para texto que no sea ASCII y seleccione la fuente nuevamente. Debería mostrar la nueva fuente e iconos en la solicitud.

![iTerm2 Text nerd fonts](https://media2.dev.to/dynamic/image/width=1600,height=900,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fi%2Fd1uit75oj2d94czxaufh.png)

No te preocupes si no vez un cambio significativo en tu terminal, esto nos va a dar la partida para los siguientes pasos.

## Colorear el terminal

En el camino hacia la terminal definitiva, no hay nada que mejore su aspecto más que personalizar su esquema de color, por lo que este será nuestro punto de partida. Al buscar en Internet, podrá encontrar muchos temas, pero la forma más fácil de aplicarlos es usar [Gogh](https://gogh-co.github.io/Gogh/)

Esta herramienta no requiere instalación y le permite elegir sus colores favoritos de una larga lista de diferentes esquemas preconstruidos.

Simplemente copie y pegue el comando:

```shell
 bash -c  "$(curl -sLo- https://git.io/vQgMr)"
```

Luego de seleccionar algun tema, este se instalara y estará disponible para seleccionarlo en tu terminal.

```shell
iTerm2 -> Preferences -> Profiles -> Colors -> Color Presets
```

### LSD, LOLcat y ccat

_Algunas de las siguientes herramientas para lograr que se vean mejor necesita que tu iterm2 tenga un contraste minimo._

**[lsd](https://github.com/Peltoche/lsd)** está muy inspirado en el proyecto de súper colores pero con algunas pequeñas diferencias. Por ejemplo, está escrito en RUST y no en ruby, lo que lo hace mucho más rápido.

![LSD](https://raw.githubusercontent.com/Peltoche/lsd/assets/screen_lsd.png)

_Es necesario instalar las fuentes parcheadas de powerline nerd-font y/o font-awesome_.

Para instalar LSD solo debes usar brew y ejecutar esta linea en tu terminal:

```shell
brew install lsd
```

**[lolcat](https://github.com/busyloop/lolcat)** 🤣️ ¡Obtiene arcoiris y unicornios en todas partes! Esta herramienta aparece comúnmente utilizada junto con Neofetch, agregando un efecto de arco iris impresionante a tu prompt.

![LOLcat](https://github.com/busyloop/lolcat/raw/master/ass/screenshot.png)

Para instalar LOLcat solo debes usar brew y ejecutar esta linea en tu terminal:

```shell
brew install lolcat
```

Para verificar que te instalo y funciona correctamente puedes correr en la terminal

```shell
ls | lolcat
```

**[ccat](https://github.com/jingweno/ccat)**
Es el `cat` colorante. Funciona de manera similar a cat pero muestra contenido con resaltado de sintaxis.

[![asciicast](https://asciinema.org/a/21858.svg)](https://asciinema.org/a/21858)

Para instalar ccat solo debes usar brew y ejecutar esta linea en tu terminal:

```shell
brew install ccat
```

## Personalizar el bash prompt

En caso de que haya instalado una fuente parcheada como se describió anteriormente, ahora podrá usar cualquier tipo de símbolos para construir su prompt. Estas fuentes incluyen muchos símbolos powerline que le permitiran personalizar completamente su terminal sin tener que instalar ningún complemento externo.

### Powerlevel10k

Es una rápida reimplementación de POWERLEVEL9K con incluso algunas características adicionales. Incluso mantiene los mismos nombres de variables, por lo que no necesitará cambiar su configuración si viene de POWERLEVEL9k.

Una cosa que me encanta de POWERLEVEL10K es que, si aún no tiene configuración, cuando la inicie por primera vez, le mostrará una guía que le preguntará sus preferencias. Durante este proceso, muestra varios ejemplos, por lo que es mucho más fácil de personalizar.

![Powerlevel10k](https://raw.githubusercontent.com/romkatv/powerlevel10k-media/master/prompt-styles-high-contrast.png)

Para instalarlo en Mac tenemos dos caminos, el primero puede ser usando brew o el segundo que sera el que usaremos es con `Oh My Zsh`, pega la siguente linea en tu terminal.

```shell
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/themes/powerlevel10k
```

Ahora deberas indicarle a zsh cual sera el tema a usar, para eso edita el archivo `~/.zshrc`, puedes usar cualquier editor de tu preferencia y buscar la propiedad del tema y cambiarlo por `ZSH_THEME="powerlevel10k/powerlevel10k`

Debemos recargar este archivo para ver los cambios en nuestra terminal.

```shell
source ~/.zshrc
```

#### Asistente de configuración

Escribe `p10k configure` para acceder al asistente de configuración incorporado directamente desde tu terminal.

![Powerlevel10k wizard](https://raw.githubusercontent.com/romkatv/powerlevel10k-media/master/configuration-wizard.gif)

Al final del wizard tendras una terminal mas personalizada y te sentiras muy feliz :)

Vamos ahora a continuar agregando mas detalles de alto glamour a nuestra terminal.

### Algunas alias

Algunos de los comandos que ya ha instalado, de hecho, admiten resaltado de color, por ejemplo: ls, grep y diff. En caso de que desee que estos comandos tengan siempre la opción de color habilitada, puede escribir alias en su archivo de configuración de terminal (`.bashrc` `/.zshrc`) para forzarlos.

```shell
alias l='ls -l'
alias la='ls -a'
alias lla='ls -la'
alias lt='ls --tree'
alias cat=ccat
```

## Personalizaciones de Zsh

Zsh es un shell mucho más configurable con toneladas de complementos y temas que harán que su terminal se vea increíble e incluso mejorará su flujo de trabajo. Para este shell, las posibilidades de personalización son casi ilimitadas, por lo que ahora simplemente explicaré la configuración que uso.

Una diferencia clave de Zsh es que no viene con configuraciones preconfiguradas como otras conchas como bash o fish, por lo que sugeriría copiar algunas de mis configuraciones como punto de partida, particularmente si lo está instalando por primera vez.

### Configurar combinaciones de teclas - keybindings

Una de las primeras cosas que noté rápidamente al usar Zsh es que muchas de las teclas y atajos a los que estaba acostumbrado, viniendo de bash, no funcionarían en absoluto o provocarían comportamientos inesperados. Incluso las teclas `HOME` y `END` no funcionaron. Así que aquí tienes toda la configuración de combinación de teclas que uso:

```shell
    bindkey '^[[2~' overwrite-mode
    bindkey '^[[3~' delete-char
    bindkey '^[[H' beginning-of-line
    bindkey '^[[1~' beginning-of-line
    bindkey '^[[F' end-of-line
    bindkey '^[[4~' end-of-line
    bindkey '^[[1;5C' forward-word
    bindkey '^[[1;5D' backward-word
    bindkey '^[[3;5~' kill-word
    bindkey '^[[5~' beginning-of-buffer-or-history
    bindkey '^[[6~' end-of-buffer-or-history
```

### Complementos útiles

1. [Autosuggestions](https://github.com/zsh-users/zsh-autosuggestions)
   Sugiere comandos a medida que escribe según el historial y las finalizaciones.
2. [Syntax highlighting](https://github.com/zsh-users/zsh-syntax-highlighting)
   Este paquete proporciona resaltado de sintaxis para el shell Zsh. Permite resaltar comandos mientras se escriben en un indicador de Zsh en un terminal interactivo. Esto ayuda a revisar los comandos antes de ejecutarlos, particularmente para detectar errores de sintaxis.

Con esto hemos terminado de enchular nuestra terminal. ¡Espero que esto haya sido útil y/o te haya hecho aprender algo nuevo!

![Profile](https://res.cloudinary.com/khriztianmoreno/image/upload/c_scale,w_148/v1591324337/KM-brand/stickers/sticker-3_2x.png)

#### @khriztianmoreno
