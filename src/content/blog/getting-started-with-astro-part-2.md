---
title: 'Getting started with Astro - Content'
description: 'Getting started with Astro is simple!'
pubDate: 'April 24 2025'
heroImage: '/images/blog/getting-started-with-astro.jpg'
---

Let's pick things up from the <a href="https://jezpoz.dev/blog/getting-started-with-astro-part-1">last post</a>. We've done the following:
* Set up an Astro project
* Got an understanding of the file-based routing

So without further ado: Lets look at how Astro handles content.

## Content config

You might have noticed it, but there is a file in your Astro project `./src/content.config.ts` with the content

```typescript
import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
	}),
});

export const collections = { blog };
```

Or atleast that is how it was defined when I scaffolded my new Astro project. What this file does is that it defines a collection named blog, and makes is accessible throught the application. When defining the collection, we use the `glob` function from Astro where we give the path to the folder containing the markdown files, and the glob that matches all the files within that folder. We can see that the glob matches all `.md`(markdown) and `.mdx`(markdown with components) files within the `./content/blog`-folder and subfolders.

## Consume the content

Consuming the content is done through the `getCollection`-function exported by `astro:content`. For instance in the `./src/pages/blog/[...slug].astro`-file.

Your file is likely not look like this, since I have done some changes to the blog pages. But nothing too big.

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
<Base title={post.data.title} description={post.data.description}>
	<BlogPost {...post.data}>
		<Content />
	</BlogPost>
</Base>
```
The `render`-function from `astro:content` takes markdown-content and renderes it as HTML. 

### What is this `getStaticPaths`-function?

Since these pages are SSG (server side generated), they will be built when the application is built and served as static content. This maintains super fast loadtimes, the downside is that changes to the content requires a new build and deploy. There are other ways of rendering content which we will cover in another post.

Basically what is happening here is that when the application is built, this function will run and output an array with valid paths - done by fetching all posts in the blog-collection, and defining the parameters (`params: { slug: post.id }`) - the `post.id` is the filename minus the filetype ending. So this page is for instance named `./src/content/blog/getting-started-with-astro-part-2.md`). The array also spesifies what props will be passed down to the Astro.props variable.

I will write another blog post about the different rendering strategies, stay tuned!
