---
title: ship the whole app - not the pieces
author: Commonplace Book Tools Bot
date: '2025-12-21T18:15:43.091919+00:00'
generated: '2025-12-21T16:36:04-05:00'
tags:
- architecture
- software
isBasedOn:
  type: TechArticle
  headline: Seeing through the microservices hype – Peter Morris
  url: https://peterlesliemorris.com/seeing-through-the-microservices-hype/
  author: Peter Morris
  datePublished: '2025-12-09'
  publisher: peterlesliemorris.com
guid: 30f01b65-e89d-419f-9c93-205a3a0debed
---

> We are converting nanosecond duration in-process code to millisecond duration out-of-process calls, so thousands of times slower, more complicated to write, more difficult to understand, more difficult to ensure data consistency, and so on.

I agree. Intra-app communication should be a monolith by design. You have a million other optimizations to solve before microservices

---

<sub>Quote Citation: <cite>Peter Morris, "Seeing through the microservices hype – Peter Morris", 2025-12-09, <a href="https://peterlesliemorris.com/seeing-through-the-microservices-hype/">https://peterlesliemorris.com/seeing-through-the-microservices-hype/</a></cite></sub>