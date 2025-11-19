import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		// Explicitly set the output directory to 'build'
		adapter: adapter({
			out: 'build'
		})
	}
};

export default config;