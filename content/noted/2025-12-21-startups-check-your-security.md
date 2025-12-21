---
title: startups - check your security
author: Commonplace Book Tools Bot
date: '2025-12-21T04:10:45.311611+00:00'
generated: '2025-12-21T16:36:15-05:00'
tags:
- security
isBasedOn:
  type: BlogPosting
  headline: How I Reverse Engineered a Billion-Dollar Legal AI Tool and Found 100k+
    Confidential Files | Alex Schapiro
  url: https://alexschapiro.com/security/vulnerability/2025/12/02/filevine-api-100k
  author: Alex Schapiro
  datePublished: '2025-12-02'
  publisher: alexschapiro.com
guid: 744c2eb7-a3c9-47b4-aabc-b987a762da23
---

>  I saw a snippet in a JS file like POST await fetch(${BOX_SERVICE}/recommend). This piqued my interest – recommend what? And what is the BOX_SERVICE? That variable was not defined in the JS file the fetch would be called from, but (after looking through minified code, which SUCKS to do) I found it in another one: “dxxxxxx9.execute-api.us-west-2.amazonaws.com/prod”. Now I had a new endpoint to test, I just had to figure out the correct payload structure to it. After looking at more minified js to determine the correct structure for this endpoint, I was able to construct a working payload to /prod/recommend:

At the very least secure your test environment

---

<sub>Quote Citation: <cite>Alex Schapiro, "How I Reverse Engineered a Billion-Dollar Legal AI Tool and Found 100k+ Confidential Files | Alex Schapiro", 2025-12-02, <a href="https://alexschapiro.com/security/vulnerability/2025/12/02/filevine-api-100k">https://alexschapiro.com/security/vulnerability/2025/12/02/filevine-api-100k</a></cite></sub>