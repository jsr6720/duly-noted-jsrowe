---
title: tight review on building sub-agents (agent workflow)
author: Commonplace Book Tools Bot
date: '2025-11-27T04:11:46.974550+00:00'
generated: '2025-11-29T12:46:43-05:00'
tags:
- ai
- architecture
isBasedOn:
  type: BlogPosting
  headline: Agent Design Is Still Hard | Armin Ronacher's Thoughts and Writings
  url: https://lucumr.pocoo.org/2025/11/21/agents-are-hard/
  author: Armin Ronacher
  datePublished: November 21, 2025
  publisher: lucumr.pocoo.org
guid: 21d610a7-9da0-4bb3-b517-dc5e3d7def2f
---

> As I mentioned a couple of times on this blog already, most of our agents are based on code execution and code generation. That really requires a common place for the agent to store data. Our choice is a file system—in our case a virtual file system—but that requires different tools to access it. This is particularly important if you have something like a subagent or subinference.

Really dense focus on some lessons learned building ai workflows. Filesystem was an aha moment as was some reality check that "older" models do "just" fine. Fits in with when does the music stop on the ai bubble.

---

<sub>Quote Citation: <cite>Armin Ronacher, "Agent Design Is Still Hard | Armin Ronacher's Thoughts and Writings", November 21, 2025, <a href="https://lucumr.pocoo.org/2025/11/21/agents-are-hard/">https://lucumr.pocoo.org/2025/11/21/agents-are-hard/</a></cite></sub>