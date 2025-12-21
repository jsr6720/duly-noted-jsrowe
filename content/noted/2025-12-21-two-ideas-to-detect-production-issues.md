---
title: two ideas to detect production issues
author: Commonplace Book Tools Bot
date: '2025-12-21T18:24:08.136614+00:00'
generated: '2025-12-21T16:36:24-05:00'
tags:
- architecture
isBasedOn:
  type: TechArticle
  headline: How Circular Dependencies Kill Your Microservices
  url: https://systemdr.substack.com/p/how-circular-dependencies-kill-your
  author: System Design Roadmap
  datePublished: '2025-04-28'
  publisher: systemdr.substack.com
guid: a5db2629-50bc-4c43-8b02-fbff0b182079
---

> Add request ID propagation to every service call today. Use OpenTelemetry—it’s 10 lines of code.
> Implement circuit breakers with reasonable timeouts (use Resilience4j for JVM, Polly for .NET, or Opossum for Node.js).

The circuit breakers I was aware of. Passing through IDs has to be as old as `console.log('here '+id)` but I wasn't aware of the open standard. TIL!

---

<sub>Quote Citation: <cite>System Design Roadmap, "How Circular Dependencies Kill Your Microservices", 2025-04-28, <a href="https://systemdr.substack.com/p/how-circular-dependencies-kill-your">https://systemdr.substack.com/p/how-circular-dependencies-kill-your</a></cite></sub>