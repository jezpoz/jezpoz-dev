---
title: 'Getting started with Astro - Part 1'
description: 'Getting started with Astro is simple!'
pubDate: 'April 19 2025'
heroImage: '/images/blog/getting-started-with-astro.jpg'
---

As I have worked a few years as a frontend developer, I've been involved in projects spanning multiple sectors, using different stacks and technologies - there has never been anything as refreshing as the first time I tried out Astro.

There is something about being able to keep some pages as basic as they need to be - a terms of service page doesn't need a framework to be rendered. It does not require any type of interaction and no amazing styling. It's a wall of text, let keep it that way. And when it comes to the interactive pages, the Island architecture got you covered.

So, shall we get started?

## Lets go

First of all, I'd like to link to <a class="underline" href="https://astro.build" target="_blank">Astro</a>'s page - their documentation is really good and I can't stress it enough that when there is anything, check there first.

Now, let's create a Astro project. I am going to assume you have node installed and you use your prefered package manager. For simplicity my examples will use npm, but I personally use pnpm.
```bash
$ npm create astro@latest
```

You will be taken through a quick wizard in your terminal to get started.

## Now what?

Well... Let's create something! I'll make an example out of how I created this blog with Astro. I would recommend you start looking in the `/src/`-folder. Let's start at with the `pages`-folder. Similar to Next.js (if you have worked with Next.js that is), Astro uses a file-based routing, where the `pages`-folder is the root. The `index.astro`-file would be the root page, that's `https://[your-domain]`, and the `about.astro`-file will be located at `https://[your-domain]/about`. Depending on the template you chose when you set up your Astro project, you might also have a folder inside of your pages-folder. I chose the minimal blog structure and I have a folder called `blog`, which contains two files, `[...slug].astro` and `index.astro`.

I think you guessed it, these pages will be located at `https://[your-domain]/blog` - `./src/pages/blog/index.astro`. Maybe you got thrown off by the `[...slug].astro`-file... Don't worry it's natural if you havn't worked with these file-based routing frameworks. There is a great explaination in the <a href="https://docs.astro.build/en/guides/routing/#dynamic-routes" target="_blank">Astro routing documentation</a>:

> An Astro page file can specify dynamic route parameters in its filename to generate multiple, matching pages. For example, src/pages/authors/[author].astro generates a bio page for every author on your blog. author becomes a parameter that you can access from inside the page.

Why the `...` in front then? That is a what is called `rest parameters`. basically this page handles every _every_ route that matches the patteren `https://[your-domain]/blog/...`. And if you are wondering why the term `slug` is used, I'm not so sure why it got that name, but my understanding is that not every string is valid in a URL, and a slug is a URL-friendly string. So for instance an blog post with a title `Getting started with Astro`, would become `getting-started-with-astro`. Why wouldn't you use a unique ID instead? The slug is also more user friendly when thinking of a list of the pages a user has visited. They won't remember what `/blog/192djd92jf` would be about, but by reading the URL they would know that `/blog/getting-started-with-astro` is about.

If you have opened up the `./src/pages/blog/[...slug].astro`-file you might see some code like this:
```astro
---
import { type CollectionEntry, getCollection } from 'astro:content';
import Base from '../../layouts/Base.astro';
import BlogPost from '../../layouts/BlogPost.astro';
import { render } from 'astro:content';

export async function getStaticPaths() {
	const posts = await getCollection('blog');
	return posts.map((post) => ({
		params: { slug: post.id },
		props: post,
	}));
}
type Props = CollectionEntry<'blog'>;

const post = Astro.props;
const { Content } = await render(post);
---
```

To understand where this `getCollection`-function is coming from, we need to move our attention to the `content.config.ts` and `content`-folder. I'll cover that in another blog post, which is probably going to be on my blog in a couple of days. I just need to get this blog finished before I start writing seriously.

Stay tuned! And thanks for reading so far!
