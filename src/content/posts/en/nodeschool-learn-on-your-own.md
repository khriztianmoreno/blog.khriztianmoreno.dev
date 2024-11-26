---
title: NodeSchool Learn on your own
tags:
  - javascript
  - nodejs
  - tutorial
date: 2020-01-02 14:18:37
updated: 2020-01-02 14:18:37
---

When it comes to learning a new technology or understanding the features of a language, we always look for tutorials on the internet that teach us its concepts. That's why today I want to talk to you about [NodeSchool.io](http://nodeschool.io/), an initiative that aims to teach these topics through self-guided workshops.

<!--more-->

Node School is a community that helps you gain skills in Node.js and JavaScript in an interactive format. All their tutorials are Open Source and start with simple exercises that gradually increase in difficulty as you progress. To complete the Node School modules, you should have an intermediate knowledge of JavaScript. Otherwise, I recommend reading a couple of tutorials or doing the javascripting workshop that you can find within Node School. When you feel comfortable with the language, you will be ready to start.

## Getting Started with Node School

![Dashboard Learnyounode workshop](https://thepracticaldev.s3.amazonaws.com/i/kkx4z07a5js11yv2g5dc.png)

To start with the workshops provided by Node School, you need to have Node.JS installed on your computer. You can download the installers from their official page and follow the wizard (personally, I like to install Node via [NVM](https://github.com/creationix/nvm)). The lessons run in the terminal and work on Linux, Mac, and Windows. Let's see how to work with these lessons.

## Installing a Lesson or Workshop

It is recommended to create a directory on your computer with the name of the workshop and access it from the terminal. Then we will install the workshop via NPM.

```bash
$ mkdir learnyounode
$ cd learnyounode
$ npm install -g learnyounode
$ learnyounode
```

After running the learnyounode command, we will have a list of exercises to complete in the console. Let's see now how to work on these exercises in the best way.

## Completing an Exercise

When we select an exercise, in this case, "Hello World," we will have a screen similar to the one shown below, where we will see the exercise description and some tips and resources to learn more about the content.

![Exercise ‘Hello World’](https://miro.medium.com/max/1398/0*o7v4hrSMxbqmPNba.png)

The exercise recommends creating a file with a .js extension (I particularly like to name this file with the name of the exercise). In this case, I will create a file called helloworld.js where we will write the solution. To verify that our solution to the exercise is correct, we must run the command learnyounode verify helloworld.js.

```bash
$ touch helloworld.js
$ learnyounode verify helloworld.js
```

If our solution is correct, Node School will indicate it with a similar screen. If it fails, it will tell us where we went wrong.

![learnyounode verify progrma.js](https://miro.medium.com/max/1316/0*orYygx3ZLa1UqfgM.png)

Finally, if we run the learnyounode command again, Node School will indicate that we have completed the previous exercise.

![learnyounode verify progrma.js](https://miro.medium.com/max/1280/0*bC94-yHxUfrIJCnf.png)

I hope this short guide helps you start your self-learning journey. Until next time.

I hope this has been useful and/or taught you something new!

![Profile](https://res.cloudinary.com/khriztianmoreno/image/upload/c_scale,w_148/v1591324337/KM-brand/stickers/sticker-3_2x.png)

#### @khriztianmoreno 🚀
