---
title: "About Duly Noted"
description: "A digital commonplace book for encountered ideas"
date: "2025-03-15"
menu:
  main:
    weight: 10
  footer:
    weight: 10
# Theme-Defined params
lead: "A microblog of ideas worth remembering" 
auto_generated: false
---
## About Duly Noted

This site merges three distinct concepts into one execution:

1. **Microblog**  
   First and foremost, this is a [microblog](https://en.wikipedia.org/wiki/Microblogging) - a collection of snippets I find across the interwebs.

2. **Personal Knowledge Management**  
   It is also my public [personal knowledge management](https://en.wikipedia.org/wiki/Personal_knowledge_management) system. It's more dynamic than republishing links on an RSS feed, and is loosely inspired by [StumbleUpon](https://en.wikipedia.org/wiki/StumbleUpon) and [del.icio.us](https://en.wikipedia.org/wiki/Delicious_(website)).

3. **Commonplace Book**  
   Finally, it's a digital version of a [commonplace book](https://en.wikipedia.org/wiki/Commonplace_book) where I digitally "snip" articles and thoughts and include them in this microblog.

## How It Works
I created a `common-place-book` API that allows me to send URLs I read, plus some personal commentary to an S3 bucket as JSON. I then process those JSON files into markdown files for this site.

### Inspiration
[Simon Willison's TIL](https://til.simonwillison.net)