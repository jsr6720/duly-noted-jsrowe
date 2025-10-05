---
title: "About"
description: "A digital commonplace book for encountered ideas"
date: "2025-03-15"
menu:
  main:
    weight: 10
  footer:
    weight: 10
# Theme-Defined params
lead: "A microblog of encountered ideas worth remembering"
auto_generated: false
---
## About

This site merges three distinct concepts into one execution:

1. **Microblog**  
   First and foremost, this is a [microblog](https://en.wikipedia.org/wiki/Microblogging) - a collection of snippets I find across the interwebs.

2. **Personal Knowledge Management**  
   It is also my public [personal knowledge management](https://en.wikipedia.org/wiki/Personal_knowledge_management) system. It's more dynamic than republishing links on an RSS feed, and is loosely inspired by other link aggregators like [StumbleUpon](https://en.wikipedia.org/wiki/StumbleUpon), [del.icio.us](https://en.wikipedia.org/wiki/Delicious_(website)), and [Pocket](https://en.wikipedia.org/wiki/Pocket_(service)). All of which have shut down, hence this pet project.

3. **Commonplace Book**  
   Finally, it's a digital version of a [commonplace book](https://en.wikipedia.org/wiki/Commonplace_book) where I digitally "snip" articles and thoughts and include them here.

## How It Works

I created a `common-place-book` API that allows me to send URLs I read, plus some personal commentary to an S3 bucket as JSON. I then process those JSON files into markdown files for this site.

### Inspiration

I've created physical journals forever, why not a digital one? Ironically exploring this project with an LLM (Claude) taught me that I'm not alone in my desire to document the world around me.

This site especially borrows heavily from [Simon Willison's TIL](https://til.simonwillison.net) and his [*collected quotations*](https://simonwillison.net/2024/Dec/22/link-blog/) link blog posts.

> A slightly self-involved concern I have is that I like to **prove that I’ve read it**.  
> — Simon Willison, 2024

Same, Simon, Same.

While building this project I found <https://notes.andymatuschak.org/About_these_notes>, and <https://notes.jim-nielsen.com> which I find to be *Chef's Kiss*. Ironically via Simon's [main blog](https://simonwillison.net/2025/Mar/10/building-websites-with-llms/). It truly is [blog posts](https://interconnected.org/home/2025/02/19/reflections) all the way down.
