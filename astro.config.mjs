// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
	site: 'https://jezpoz.dev',
	experimental: {
		fonts: [{
			provider: fontProviders.google(),
			name: 'Workbench',
			cssVariable: "--font-workbench",
			fallbacks: ["ui-serif", "Georgia", "Cambria", 'Times New Roman', "Times", "serif"],
		}, {
			provider: fontProviders.google(),
			name: 'Funnel Sans',
			cssVariable: "--font-funnel-sans",
			fallbacks: ["ui-sans-serif", "system-ui", "sans-serif", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"],
		}]
	},
	integrations: [
		mdx(),
		sitemap(),
	],
	vite: {
		plugins: [tailwindcss()],
	},
});