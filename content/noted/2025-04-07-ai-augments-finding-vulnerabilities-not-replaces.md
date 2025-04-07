---
title: "AI Augments Finding Vulnerabilities, Not Replaces"
author: "Commonplace Book Tools Bot"
date: "2025-04-07T00:41:47.317830+00:00"
generated: "2025-04-06T23:02:28-05:00"
tags:
  - ai
  - programming
  - msft
isBasedOn:
  type: "BlogPosting"
  headline: "Analyzing open-source bootloaders: Finding vulnerabilities faster with AI"
  url: "https://www.microsoft.com/en-us/security/blog/2025/03/31/analyzing-open-source-bootloaders-finding-vulnerabilities-faster-with-ai/"
  author: "Microsoft Threat Intelligence"
  datePublished: "March 31, 2025"
  publisher: "www.microsoft.com"
guid: "ab2f5665-37ef-4f61-8515-0267cd1ed0f0"
---

> Through a combination of static code analysis tools (such as CodeQL), fuzzing the GRUB2 emulator (grub-emu) with AFL++, manual code analysis, and using Microsoft Security Copilot, we have uncovered several vulnerabilities. ... Copilot identified multiple security issues, which we refined further by requesting Copilot to identify and provide the five most pressing of these issues. In our manual review of the five identified issues, we found three were false positives, one was not exploitable, and the remaining issue, which warranted our attention and further investigation, was an integer overflow vulnerability.

I do feel like this article reflects my own experience with AI programming. Reading it as AI replaces code scanning is a misnomer. AI generated so many false positives they had to prompt Copilot for the 'most pressing issues'. This in addition to continuing to use static analysis tools and fuzzing. File under, understanding how code work is still critical.

---

<sub>Quote Citation: <cite>Microsoft Threat Intelligence, "Analyzing open-source bootloaders: Finding vulnerabilities faster with AI", March 31, 2025, <a href="https://www.microsoft.com/en-us/security/blog/2025/03/31/analyzing-open-source-bootloaders-finding-vulnerabilities-faster-with-ai/">https://www.microsoft.com/en-us/security/blog/2025/03/31/analyzing-open-source-bootloaders-finding-vulnerabilities-faster-with-ai/</a></cite></sub>