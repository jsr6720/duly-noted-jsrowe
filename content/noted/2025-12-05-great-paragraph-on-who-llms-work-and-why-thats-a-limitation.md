---
title: great paragraph on who LLMs work and why thats a limitation
author: Commonplace Book Tools Bot
date: '2025-12-05T00:56:05.927155+00:00'
generated: '2025-12-04T20:08:23-05:00'
tags:
- ai
- predictions
isBasedOn:
  type: BlogPosting
  headline: LLMs are a failure. A new AI winter is coming.
  url: https://taranis.ie/llms-are-a-failure-a-new-ai-winter-is-coming/
  author: Taranis
  datePublished: 01 OCT 2025
  publisher: taranis.ie
guid: 31a9cc64-d9a7-4b02-9fca-89fb71690342
---

> So then came transformers. Seemingly capable of true AI, or, at least, scaling to being good enough to be called true AI, with astonishing capabilities. For the uninitiated, a transformer is basically a big pile of linear algebra that takes a sequence of tokens and computes the likeliest next token. More specifically, they are fed one token at a time, which builds an internal state that ultimately guides the generation of the next token. This sounds bizarre and probably impossible, but the huge research breakthrough was figuring out that, by starting with essentially random coefficients (weights and biases) in the linear algebra, and during training back-propagating errors, these weights and biases could eventually converge on something that worked. Exactly why this works is still somewhat mysterious, though progress has been made.
> ...
>  With transformers, generating wrong output looks exactly like generating correct output, and there is no way to know which is which.

This. this is the key insight into how LLM transformers work. AI works 'good enough' for coding because you have the compiler to catch you. Kind of. But for anything open ended you cannot rely on a model who's sole purpose it is to keep making things up.

---

<sub>Quote Citation: <cite>Taranis, "LLMs are a failure. A new AI winter is coming.", 01 OCT 2025, <a href="https://taranis.ie/llms-are-a-failure-a-new-ai-winter-is-coming/">https://taranis.ie/llms-are-a-failure-a-new-ai-winter-is-coming/</a></cite></sub>