<script lang="ts">
	import '../app.css';
	import Navigation from '$lib/components/Navigation.svelte';
	
	let { children } = $props();
</script>

<div class="min-h-screen bg-background text-foreground antialiased selection:bg-primary selection:text-white">
	<a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-background focus:text-primary">
		Skip to main content
	</a>
	<main id="main-content" class="relative z-10">
		{@render children()}
	</main>
	
	<Navigation />
</div>