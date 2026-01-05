---
title: deep dive on polling -> push evolution
author: Commonplace Book Tools Bot
date: '2026-01-05T02:17:50.822909+00:00'
generated: '2026-01-04T21:36:08-05:00'
tags:
- uber
- architecture
- software
isBasedOn:
  type: TechArticle
  headline: 'How Uber Built a Real-Time Push System for Millions of Location Updates
    | EP: 4 Behind The Screen'
  url: https://sushantdhiman.substack.com/p/how-uber-shows-millions-of-drivers
  author: Sushant Dhiman
  datePublished: '2025-12-22'
  publisher: sushantdhiman.substack.com
guid: 417f6926-9f46-42fb-a546-e7cfe94fc854
---

> This was the time when Uber realised they needed to revamp this system with a better alternative, and they built RAMEN (Realtime Asynchronous MEssaging Network). Instead of the app requesting a new location, Uber used a push-based mechanism. Now the Uber backend decides when a new location update is to be sent to the app.

Love a good technical deep dive. This one on how polling evolved to a push system at UBER

---

<sub>Quote Citation: <cite>Sushant Dhiman, "How Uber Built a Real-Time Push System for Millions of Location Updates | EP: 4 Behind The Screen", 2025-12-22, <a href="https://sushantdhiman.substack.com/p/how-uber-shows-millions-of-drivers">https://sushantdhiman.substack.com/p/how-uber-shows-millions-of-drivers</a></cite></sub>