---
title: The Agent Development Kit - ADK
tags:
  - ai
  - web-develpoment
  - mcp
date: 2025-10-15 07:58:26
updated: 2025-10-15 07:58:26
---

Today we’re going to dive into the **Agent Development Kit**, better known as **ADK**.
It’s a framework that is changing the game for building artificial intelligence agents.

Think about this for a moment.
For those who build software, the idea of creating a functional AI agent with a single line of code isn’t just a question—it’s the dream come true.

Developers know this headache well.
You start with a simple idea, but soon the project turns into a maze of API calls, state management, and repetitive code.
Everything becomes chaos.
And that’s exactly where **ADK** steps in to bring order.

What’s interesting is that it brings solid software engineering principles—like modularity and testability—to AI development.
It’s an elegant solution to a complex problem.

---

### 🔩 The six key components

To understand how ADK works, you have to look under the hood.
The system is made up of **six fundamental building blocks**, working like an orchestra where each instrument plays an essential role.

1. **The agent:**
   It’s the brain of the system. It processes requests, makes decisions, and knows when to use its tools.
2. **The runner:**
   It acts as the conductor. It ensures everything flows correctly: messages are delivered, tools are triggered, and responses return smoothly.
3. **The session:**
   It’s the short-term memory.
   It keeps conversations coherent, remembers what’s being discussed, and maintains context.
4. **The state:**
   It’s like a shared whiteboard.
   All components can read and write data there.
   A tool can leave information and the agent can use it instantly.
5. **The memory:**
   It represents long-term knowledge.
   It stores information that persists across conversations, allowing the agent to learn and improve over time.
6. **The tools:**
   They are the agent’s hands.
   Without them, it could only chat—but with them, it can act: search the web, connect to APIs, fetch data.
   They are what turns a chatbot into a truly useful assistant.

---

### 🎼 How the symphony works

When a request comes in:

1. The session loads conversation context.
2. The agent processes the request.
3. If necessary, a tool steps in.
4. The state is updated with the results.
5. The runner orchestrates everything to return a coherent response.

A perfect loop that brings intelligent agents to life.

---

### 🧰 Extend capabilities with tools

There are two ways to give agents new skills:

1. **Build custom tools:**
   Designed for specific business logic.
   They only require four elements:

   - A unique name
   - A clear description
   - A schema with the required input data
   - The function that performs the action

2. **Use the Model Context Protocol (MCP):**
   A universal connector that lets you integrate existing services (like GitHub, Discord, or Slack) without bespoke integration code.

Additionally, **ADK is model-agnostic**: it works with OpenAI, Anthropic, or any model. Total freedom.

---

### ⚙️ Workflows and collaboration between agents

When a task is too large for a single agent, **workflows** come into play, allowing you to orchestrate multiple agents to automate complex processes.

It’s key to distinguish between:

- **Multi-agent systems:** designed for dynamic conversations (like a support bot that escalates to a specialist).
- **Workflows:** for pure automation, with fixed, predictable steps (for example, generating a monthly report).

The most common patterns are:

1. **Sequential:**
   One agent gathers data, another drafts, and another publishes.
   Ideal for step-by-step processes, like content creation.
2. **Parallel:**
   Splits a task across multiple agents at once (for example, technical review and business review simultaneously).
   You gain speed and multiple perspectives.
3. **Loop:**
   One agent generates a result, another evaluates whether it meets the criteria, and if not, it returns it with feedback to improve.
   Perfect for iterative refinement and continuous improvement.

Rule of thumb:

- Step-by-step → sequential
- Speed or diversity → parallel
- Maximum quality → loop

---

### 🔌 Connecting to the outside world: the universal adapter (MCP)

The **Model Context Protocol (MCP)** acts like a universal power adapter.
It connects agents to external services without the need for custom integrations.

This separates the agent’s logic from the technical complexity of external connections.

Real-world examples:

- A **DevOps** assistant that detects issues in GitHub and alerts via Discord.
- A **support** agent that queries the CRM and notifies the customer via Telegram.

The automation potential is enormous.

---

🔗 Referencias esenciales

### **Google – Kit de Desarrollo de Agentes (ADK)**

This is the main resource.
All official documentation can be found here.

**Doc oficial:**
[Agent Development Kit](https://google.github.io/adk-docs/)

**GitHub SDK:**
[Agent Development Kit (ADK) Web](https://github.com/google/adk-web)

---

### 🚀 Conclusion

**ADK** is much more than a set of tools.
It represents a **new philosophy for AI development**, where agents are built with the same rigor as professional software.

The final question:

> What will be the next big problem we automate?
