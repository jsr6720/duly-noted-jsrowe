---
title: another micro service -> monolith story (2018)
author: Commonplace Book Tools Bot
date: '2025-12-21T18:07:40.053489+00:00'
generated: '2025-12-21T16:36:41-05:00'
tags:
- architecture
isBasedOn:
  type: TechArticle
  headline: Goodbye Microservices | Twilio
  url: https://www.twilio.com/en-us/blog/developers/best-practices/goodbye-microservices
  author: Twilio
  datePublished: July 10, 2018
  publisher: www.twilio.com
guid: fca0144d-6fd9-4102-a938-933ae849dbda
---

> However, a new problem began to arise. Testing and deploying changes to these shared libraries impacted all of our destinations. It began to require considerable time and effort to maintain. Making changes to improve our libraries, knowing we’d have to test and deploy dozens of services, was a risky proposition. When pressed for time, engineers would only include the updated versions of these libraries on a single destination’s codebase.
> Over time, the versions of these shared libraries began to diverge across the different destination codebases. The great benefit we once had of reduced customization between each destination codebase started to reverse. Eventually, all of them were using different versions of these shared libraries. We could’ve built tools to automate rolling out changes, but at this point, not only was developer productivity suffering but we began to encounter other issues with the microservice architecture.

7 years ago! I wonder what they're doing now. but this passage caught my eye. Too often I see micro services just turn into pinned version shrines. Sure the rest of the app evolved and moved on but now you have traded the small expense of keeping thing up to date with decay and rot.

---

<sub>Quote Citation: <cite>Twilio, "Goodbye Microservices | Twilio", July 10, 2018, <a href="https://www.twilio.com/en-us/blog/developers/best-practices/goodbye-microservices">https://www.twilio.com/en-us/blog/developers/best-practices/goodbye-microservices</a></cite></sub>