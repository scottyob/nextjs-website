---
title: 'New Website (again)'
date: 2022-11-22
categories:
 - programming
tags:
 - React
 - Next.js
---

So I decided to do a new website (again), this time following [Josh Comeau's Writeup](https://www.joshwcomeau.com/blog/how-i-built-my-blog/), moving my website from Hugo to Next.js.  The biggest reason for the change, is because I found myself fighting a lot with Hugo's templates and taxonomy to get it to do what I want it to do for my flying logbook.  The more I fight with it, the more I wish I had just written this as a react app

The goals here are to build a simple framework around what I had to be able to import most of the content as-is hopefully without too many changes.

### Blog posts

To get this to work, I started putting my posts in a "content/posts" directory.  I'm using [mdx-bundler](https://github.com/kentcdodds/mdx-bundler) to parse my markup files.

I followed [This Guide by Peter Lunch](https://www.peterlunch.com/blog/mdx-bundler-beginners) to generate pages from my md files