---
title: What is a 12 Factor App - a Quick Guide
tags:
  - web-development
  - fullstack
  - backend
date: 2025-01-08T10:54:27.000Z
updated: 2025-01-08T10:54:27.000Z
---

If you're serious about building scalable, maintainable apps as a fullstack developer, you need to know about the 12-Factor App methodology. This isn’t just a buzzword; it’s a set of guiding principles that have shaped the way modern apps are built and deployed. And trust me, once you understand it, your perspective on software design will never be the same.

![12 factor app](/posts/12-fact.png)

## What is the 12-Factor App?

The 12-Factor App is a methodology for designing and running software-as-a-service (SaaS) applications. It was created by developers at Heroku to share their approach to building apps that are portable, reliable, and easy to scale. It covers everything from how you manage configurations to how you handle logging. The term was coined in 2011 by Adam Wiggins in his [book by the same name](https://12factor.net/).

The "12 factors" are essentially best practices split across areas like codebase, dependencies, environments, and processes. Each factor helps ensure your app can thrive in dynamic cloud environments.

The 12 Factor App a set of design principles for developing apps that can scale quickly and securely, and behave consistently for all users.

This isn’t the be-all and end-all of development philosophies - like all design philosophies it has its detractors and situational caveats. But it’s useful for most developers to be aware of.

Here is my (short) summary of the 12 principles.

#### Codebase

One codebase tracked in revision control, many deploys - all assets related to an application, are stored in a source code repository. This repo is also accessed by automation scripts essential to the CI/CD pipeline. The main benefit here is consistency across environments and the tailwinds it gives you for scaling your app.

#### Dependencies

Explicitly declare and isolate dependencies - only code that is unique and relevant to the purpose of the application is stored in source control. External artifacts are referenced in a dependencies manifest loaded into memory at development, testing, and production runtime.

#### Config

Store config in the environment - this means that all local configurations should be passed via environment variables or independent configuration files at runtime. In short, you should build your code to be as agnostic as possible to scale up in new environments, and allow for easy modality changes (i.e. test and dev environments clearly delineated and useful).

#### Backing Services

Treat backing services as attached resources - that means your databases, your third-party compliance tools, your web servers. What does this actually mean? It means that these external services are only **loosely coupled** with your code, keeping your codebase flexible and able to work with new services quickly if a change is needed e.g., replacing MySQL with PostgreSQL. Evidently, this keeps your app portable and adaptable to infrastructural changes.

#### Build, Release, Run

Strictly separate build and run stages - this one is pretty much what it says on the tin. In principle, a 12 Factor App should have three distinct and replicable stages in their deployment which can be instantiated at any time.

- **_Build_**: Code retrieved and compiled, artifacts stored
- **_Release_**: Configuration settings applied
- **_Run_**: Runtime environment is provisioned

The key to **Build, Release, and Run** is that the process is completely ephemeral. Should anything in the pipeline be destroyed, all artifacts and environments can be reconstituted from scratch using assets stored in the source code repository.

#### Processes

Execute the app as one or more stateless processes - this means that no single process keeps track of the status of other processes. When a process is stateless, instances can be added or removed at will based on the needs of the app or the user. State data that needs to exist in perpetuity should be handled by a backing service.

#### Port Binding

Export services via port binding - services should be identifiable to the network by port number rather than by domain name. Domain names and IP addresses can be manipulated on the fly, and thus are less reliable and secure than port numbers. That’s why so many common protocols use default port (e.g. SSH being port 22).

#### Concurrency

Scale out via the process model - that is to say, organise your processes according to purpose and allow them to be scaled up or down as needed. For example - have load balancers operating on your web servers to enable processes to be scaled up or down in an isolated manner to meet demand. This prevents waste (no unnecessary processes scaled up) make you more flexible in meeting the requirements of the business logic.

#### Disposability

Maximize robustness with fast startup and graceful shutdown - this means that you shouldn’t skimp on the housekeeping stuff for your spin up/tear down logic. Validate connections work when setting up, terminate connections that are no longer needed when scaling down etc. It should be fairly self-evident that this goes hand-in-hand with concurrency (as you'll be spinning up new processes frequently).

#### Dev/Prod Parity

Keep development, staging, and production as similar as possible - i.e. all your deployment paths should be similar but independent. The Build, Release, Run principle already means that both environments go through the same general set of steps to reach a working runtime. Of course, the environments do need to differ in some ways.

#### Logs

Treat logs as event streams - Logs are streams of time-ordered events that capture the behavior of an application. Logged info should be sent to standard output (as opposed to as static artifacts or file) and captured by the execution environment, allowing for a separation of concerns when it comes to logging. Also - logs should be clearly tagged, allowing stakeholders to access the data they need (e.g. requests/response data being marked as such).

#### Admin Processes

Admin/management tasks (e.g., database migrations, running scripts, or clearing caches) should be executed in the same environment as the application. These tasks should be run as one-off processes, meaning they are executed manually or on-demand, rather than being part of the application's regular runtime processes. Admin processes should use the same codebase, dependencies, and configuration as the application to ensure consistency.

## Why is it Useful?

Here’s the thing: in 2025, software development is faster, more competitive, and more global than ever. To stay ahead, your apps need to be robust and adaptable. The 12-Factor App principles give you a blueprint to achieve that.

For example:

- **Portability:** Want to move from AWS to Google Cloud or deploy on a customer’s infrastructure? 12-Factor apps make it easy.
- **Scalability:** If your app goes viral tomorrow, you can scale it horizontally without breaking a sweat.
- **Maintainability:** Whether you’re debugging or adding new features, sticking to these principles makes your life way easier.

## How I’ve Seen It Work

As a fullstack developer working on modern web applications, these principles have saved me countless headaches. Managing configurations with environment variables (Factor III) avoids ugly surprises when moving between local and production. Externalizing state to back services (Factor VI) ensures apps don’t crumble under heavy loads. And following the "one codebase per app" rule (Factor I) keeps repos clean and versioning sane.

It’s not just about what these principles do for your app; it’s what they do for you. They force you to build with discipline, and that discipline pays off when your app grows or when a new developer joins your team and gets up to speed quickly.

## Why You Should Learn It

Mastering the 12-Factor App isn’t just a checkbox for your resume. It’s a mindset shift that prepares you to build apps that meet modern demands. By adopting these principles:

- You future-proof your code against the chaos of changing infrastructure.
- You reduce the pain of onboarding and collaboration.
- You set yourself apart as a developer who understands not just how to build apps but how to design them for real-world success.

So, if you haven’t explored the 12-Factor App yet, now’s the perfect time to dive in. These principles will help you become the kind of developer teams look for in 2025—someone who not only writes great code but also understands how to make it thrive in production.

I hope this has been helpful and/or taught you something new!

![Profile](https://res.cloudinary.com/khriztianmoreno/image/upload/c_scale,w_148/v1591324337/KM-brand/stickers/sticker-3_2x.png)

#### @khriztianmoreno 🚀
