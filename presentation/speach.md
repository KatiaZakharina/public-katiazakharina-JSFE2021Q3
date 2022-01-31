# Topic: Electron.js

## What is Electron.js?

Electron.js is framework for building desktop applications using JavaScript, HTML, and CSS.
It allows you to use the web technologies you already know to build cross-platform applications.

Electron.js is an open source project started by Cheng Zhao, an engineer at GitHub.
Previously called Atom Shell, it is the foundation for Atom, a cross-platform text editor by GitHub built with web technologies.

## Applications based on electron.js

I think that many people know the desktop versions of these applications. All of them are based on Electron.js.
Slack, Twitch, Visual Studio Code, WhatsApp, Figma, Google Assistant, Discord...

This list can be continued for a very long time, because more than 700 applications are built on the framework, which can be found on the official site

## Advantages and disadvantages

This framework has many strengths

### For business

First of all, Electron.js has a number of advantages over native development for the customer of the application.

- Electron.js is simple way to create cross-platform applications.
  It is capable of integrating one code to all platforms, which significantly speeds up the development process.

- Also, having already a web application, you will not need a lot of time and effort to rewrite it to desktop using Electron.
  Thus, it is possible to ensure the release of the application on the web and desktop platform.

- Application development on electron.js is cheaper and faster than native development
  Since one language for all platforms will speed up the release of the product and reduce the number of people in the team

### For developer

There are a number of advantages in the process of developing applications based on Electron.js .

- building desktop applications for multiple platforms, Electron is a great way to build your product without the hassle
  of managing two or three distinct code bases, squashing related bugs on two or three platforms, or implementing the same feature two or three times

- Besides, no multiple tests are required to ensure that each app contains identical features. Since the whole work is done in a separate code base, QA engineers can fix the issue within, wherever it appears. Therefore, the development time goes down.

- Electron allows you to maintain one JavaScript codebase and create cross-platform apps that work on Windows, macOS, and Linux — no native development experience required.

With Electron, you can use your existing skills as a web developer to build applications that have many of the capabilities of a native desktop application.

Electron is great for individuals or small teams who may want to target more
than one platform without having to learn three or more languages, as well as
each platform’s frameworks.

### Superiority over web applications

There are many reasons why a desktop application is superior to a web application.

- Traditional browser applications can’t access the filesystem.
  Electron applications can access operating system APIs such as application and
  context menus, File Open and Save dialog boxes, battery status and power settings,
  and more.

- Most web applications aren’t available when there isn’t a reliable internet connection.
  Even advanced web applications using any of the popular client-side frameworks
  like React, or Angular typically need to connect to a remote server to download their assets.
  Electron applications have already been downloaded to the user’s computer. Typically, they load a locally stored HTML file. From there, they can request remote data and assets if a connection is available. Electron even provides APIs that allow you to detect if a connection is available.

- Desktop applications enjoy a wider range of abilities and fewer restrictions on what
  they’re allowed to do because the user explicitly went out of their way to download,
  install, and open the application. When you’re browsing the web, however, you don’t
  have the same amount of agency. You’re executing code that you didn’t choose to
  install on your computer. As a result, web applications have many limits on what
  they’re allowed to do.

Unlike traditional web applications, Electron applications aren’t limited to the browser.
You can create applications that live in the menu bar or the system tray.
You can even register global shortcuts to trigger these applications or any of their abilities
with a special keystroke from anywhere in the operating system.
Electron applications have access to system-level information—such as whether the computer is on battery power or plugged into the wall. They can also keep the operating
system awake and prevent it from going into power-saving mode, if necessary.

## Disadvantages

Hybrid and native development are always one of the hottest disputes related to the weaknesses of Electron-based applications.

- The most important disadvantage is the large (compared to other technologies)
  memory consumption: an empty project takes up 100-200 megabytes in memory. For some, this is a reason to stop
  using such applications.

This is because Chromium browser (codebase for web browser) is large software including many code lines. As a result, your app will convert into one large block that takes a tidbit of your hard drive. However, modern PCs submit two terabytes of operating storage, so this issue can easily be solved.

- Besides operative memory, Electron-based products occupy system reserves and utilize plenty of laptops’ battery energy. The reason is that such applications are optimized for different platforms, thus, energy inefficient. In contrast, native applications are made for a particular platform, so their reserves are streamlined effectively.

- Developers have to face difficulties when implementing platform-specific requirements. Best-case scenario, all cross-platform apps should operate identically on all OS. However, if clients want to add unique features for each platform, it will lead to some difficulties concerning product development. Firstly, it will take some time to realize those features. Secondly, increased time leads to additional expenses. Take any Electron-based app like Slack or WhatsUp. It looks the same on any operating system.

This is both an advantage and a disadvantage of Electon.js.
It is worth carefully studying the weaknesses of the framework before you start writing an application on it, in order to avoid trouble.

## How it work?

### Chromium + Node.js

Electron combines the core web browsing component of Chromium Content Module with the low-level system access of Node.

Chromium is the open source version of Google’s Chrome web browser. The Content Module is the core code that allows Chromium to render web pages in independent processes and use web apis.

Chromium and Node are both wildly popular application platforms in their own
right, and both have been used independently to create ambitious applications.

The Node.js project was initially released in 2009 as an open source, cross-platform runtime for developing server-side applications using JavaScript

Electron brings the two platforms together to allow you to use JavaScript to build an entirely new class of application. Anything you can do in the browser, you can do with
Electron. Anything you can do with Node, you can do with Electron.

You can build applications that take advantage of both platforms and build applications that
wouldn’t otherwise be possible on only one.

## How does Electron work?

Electron applications consist of two types of processes: the main process and zero or more renderer processes. Each process plays a different role in the application. The Electron runtime includes different modules to assist you in building your application.
Certain modules, such as the ability to read and write from the system’s clipboard, are available in both types of processes. Others, such as the ability to access an operating
system’s APIs, are limited to the main process.

When Electron starts up, it turns to the start entry in your package.json manifest
included in your project to determine the entry point of your application. This file
can be named anything you’d like, as long as it’s included properly in package.json.
Electron runs this file as your main process.

## About main and render processes

### Main

The main process handles OS integration, manages the lifecycle of the application,
and creates renderer processes.

The main process has a few important responsibilities. It can respond to application lifecycle events such as starting up, quitting, preparing to quit, going to the background,
coming to the foreground, and more. The main process is also responsible for communicating to native operating system APIs. If you

### Renderer

Renderer processes display the UI and respond to user events.

The main process can create and destroy renderer processes using Electron’s Browser-
Window module. Renderer processes can load web pages to display a GUI. Each process
takes advantage of Chromium’s multiprocess architecture and runs on its own thread.
These pages can then load in additional JavaScript files and execute code in this process.
Unlike normal web pages, you have access to all the Node APIs in your renderer
processes, allowing you to use native modules and lower-level system interactions.
Renderer processes are isolated from each other and unable to access operating
system integration APIs. Electron includes the ability to facilitate communication
between processes to allow renderer processes to communicate with the main process
in the event that they need to trigger an Open or Save File dialog box or access any
other OS-level integration.
