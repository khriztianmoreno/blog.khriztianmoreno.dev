---
title: Pimp my Term - Mac
tags:
  - tutorial
  - bash
  - terminal
date: 2020-05-03 14:18:19
updated: 2020-05-03 14:18:19
---

As a Mac OS user, I enjoy working with the terminal and find it a particularly powerful tool. Therefore, I spent quite a bit of time customizing it and here is my ultimate guide to terminal customization.

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/e9lgxto6c9jqwjee4apj.png)

At first I thought I would just create a short post with some of the settings I like. But I had so many things I wanted to show that this started to turn into a considerably long post. So I've decided to post it now, with as many tips as I can write, and I'll update it with new tips and tricks.

## My terminal

Recommended installations

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

Let's start configuring all the tools we will need.

## Prerequisites

- First, you must install iTerm2.
- Then install brew.
- Now install oh-my-zsh, open iTerm2 and paste the following command:

```shell
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

After we have these couple of things installed let's get more into it.

## Patched fonts

I want to start talking about patched fonts, since many of the customizations I will explain later may depend on them. Patched fonts consist of regular fonts to which some additional symbols have been added. That way, you can display special icons (like your operating system icon) or add new shapes to your prompt.

The most successful project is nerd-fonts, which includes many of the most commonly used fonts and a favorite of this project is [Hack Bold](https://github.com/ryanoasis/nerd-fonts/blob/master/patched-fonts/Hack/Bold/complete/Hack%20Bold%20Nerd%20Font%20Complete.ttf)

### [Nerd fonts](https://www.nerdfonts.com/)

Nerd Fonts is a project that patches developer-driven fonts with a large number of glyphs (icons). Specifically to add a large number of additional glyphs from popular 'iconic fonts' such as Font Awesome, Devicons, Octicons and others.

![Nerd fonts](https://www.nerdfonts.com/assets/img/sankey-glyphs-combined-diagram.png)

Then to install these fonts on your Mac OS you can use brew:

```shell
brew tap homebrew/cask-fonts
brew cask install font-hack-nerd-font
```

I have seen that sometimes it does not install the fonts with cask, here is another option:

```shell
brew install --cask font-hack-nerd-font
```

Now, if you look in the folder where you just installed it, you will see that it appears there: `ls ~/Library/Fonts`.

### Configure your terminal

Once you have downloaded Nerd Fonts, you can configure your terminal to use it. Configure iTerm2 to use the font by going to:

```shell
iTerm2 -> Preferences -> Profiles -> Text -> Font -> Change Font
```

Select the **Hack Regular Nerd Font** and adjust the size if desired. Also check the Use a different font for non-ASCII text box and select the font again. It should display the new font and icons in the application.

![iTerm2 Text nerd fonts](https://media2.dev.to/dynamic/image/width=1600,height=900,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fi%2Fd1uit75oj2d94czxaufh.png)

Don't worry if you don't see a significant change in your terminal, this will set the stage for the next steps.

## Colorize the terminal

On the road to the ultimate terminal, there is nothing that will improve its appearance more than customizing its color scheme, so this will be our starting point. By searching the Internet, you will be able to find many themes, but the easiest way to apply them is to use [Gogh](https://gogh-co.github.io/Gogh/).

This tool requires no installation and allows you to choose your favorite colors from a long list of different pre-built schemes.

Simply copy and paste the command:

```shell
 bash -c  "$(curl -sLo- https://git.io/vQgMr)"
```

After selecting a theme, it will be installed and available for selection on your terminal.

```shell
iTerm2 -> Preferences -> Profiles -> Colors -> Color Presets
```

### LSD, LOLcat y ccat

_Some of the following tools to make them look better you need your iterm2 to have a minimum contrast._

**[lsd](https://github.com/Peltoche/lsd)** is very much inspired by the supercolor project but with some small differences. For example, it is written in RUST and not in ruby, which makes it much faster.

![LSD](https://raw.githubusercontent.com/Peltoche/lsd/assets/screen_lsd.png)

_It is necessary to install the patched powerline fonts nerd-font and/or font-awesome_.

To install LSD just use brew and execute this line in your terminal:

```shell
brew install lsd
```

**[lolcat](https://github.com/busyloop/lolcat)** 🤣️ It gets rainbows and unicorns everywhere! This tool appears commonly used together with Neofetch, adding a stunning rainbow effect to your prompt.

![LOLcat](https://github.com/busyloop/lolcat/raw/master/ass/screenshot.png)

To install LOLcat just use brew and execute this line in your terminal:

```shell
brew install lolcat
```

To verify that it is installed and working correctly you can run in the terminal

```shell
ls | lolcat
```

**[ccat](https://github.com/jingweno/ccat)**
This is the `cat` coloring. It works similarly to cat but displays content with syntax highlighting.

[![asciicast](https://asciinema.org/a/21858.svg)](https://asciinema.org/a/21858)

To install ccat just use brew and execute this line in your terminal:

```shell
brew install ccat
```

## Customize the bash prompt

In case you have installed a patched font as described above, you can now use any kind of symbols to build your prompt. These sources include many powerline symbols that will allow you to fully customize your terminal without having to install any external plugins.

### Powerlevel10k

This is a fast reimplementation of POWERLEVEL9K with even some additional features. It even keeps the same variable names, so you won't need to change your configuration if you are coming from POWERLEVEL9k.

One thing I love about POWERLEVEL10K is that, if you don't already have settings, when you first start it up, it will show you a guide that asks you for your preferences. During this process, it shows several examples, making it much easier to customize.

![Powerlevel10k](https://raw.githubusercontent.com/romkatv/powerlevel10k-media/master/prompt-styles-high-contrast.png)

To install it on Mac we have two ways, the first one can be using brew or the second one that will be the one we will use is with `Oh My Zsh`, paste the following line in your terminal.

```shell
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/themes/powerlevel10k
```

Now you must tell zsh which will be the theme to use, for that edit the file `~/.zshrc`, you can use any editor of your preference and look for the theme property and change it to `ZSH_THEME="powerlevel10k/powerlevel10k`.

We must reload this file to see the changes in our terminal.

```shell
source ~/.zshrc
```

#### Configuration Wizard

Type `p10k configure` to access the built-in configuration wizard directly from your terminal.

![Powerlevel10k wizard](https://raw.githubusercontent.com/romkatv/powerlevel10k-media/master/configuration-wizard.gif)

At the end of the wizard you will have a more personalized terminal and you will be very happy :)

Now let's continue adding more high glamour details to our terminal.

### Some aliases

Some of the commands you have already installed do, in fact, support color highlighting, for example: ls, grep and diff. In case you want these commands to always have the color option enabled, you can write aliases in your terminal configuration file (`.bashrc` `/.zshrc`) to force them.

```shell
alias l='ls -l'
alias la='ls -a'
alias lla='ls -la'
alias lt='ls --tree'
alias cat=ccat
```

## Zsh customizations

Zsh is a much more configurable shell with tons of plugins and themes that will make your terminal look amazing and even improve your workflow. For this shell, the customization possibilities are almost limitless, so now I will simply explain the configuration I use.

One key difference with Zsh is that it doesn't come with preconfigured settings like other shells such as bash or fish, so I would suggest copying some of my settings as a starting point, particularly if you are installing it for the first time.

### Configuring keybindings - keybindings

One of the first things I quickly noticed when using Zsh is that many of the keybindings and shortcuts I was used to, coming from bash, would not work at all or would cause unexpected behavior. Even the `HOME` and `END` keys didn't work. So here are all the key combination settings I use:

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

### Useful add-ons

1. [Autosuggestions](https://github.com/zsh-users/zsh-autosuggestions)
   Suggests commands as you type based on history and completions.
2. [Syntax highlighting](https://github.com/zsh-users/zsh-syntax-highlighting)
   This package provides syntax highlighting for the Zsh shell. It allows highlighting commands as they are typed at a Zsh prompt in an interactive terminal. This helps to check commands before executing them, particularly for syntax errors.

That's it, we're done with setting up our terminal, I hope this has been useful and/or made you learn something new!

![Profile](https://res.cloudinary.com/khriztianmoreno/image/upload/c_scale,w_148/v1591324337/KM-brand/stickers/sticker-3_2x.png)

#### @khriztianmoreno
