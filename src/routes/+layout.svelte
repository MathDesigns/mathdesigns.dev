<script lang="ts">
	import '../app.css';
	import Navigation from '$lib/components/Navigation.svelte';

	let { children } = $props();
</script>

<div
	class="bg-background text-foreground selection:bg-primary min-h-screen antialiased selection:text-white"
>
	<a
		href="#main-content"
		class="focus:bg-background focus:text-primary sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4"
	>
		Skip to main content
	</a>
	<main id="main-content" class="relative z-10">
		{@render children()}
	</main>

	<Navigation />
</div>
