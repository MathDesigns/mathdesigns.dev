<script lang="ts">
	import '../app.css';
	import Navigation from '$lib/components/Navigation.svelte';
	
	let { children } = $props();
</script>

<div class="min-h-screen bg-background text-foreground antialiased selection:bg-primary selection:text-white">
	<main class="relative z-10">
		{@render children()}
	</main>
	
	<Navigation />
</div>