<script lang="ts">
	import TechMarquee from '$lib/components/TechMarquee.svelte';
	import BentoGrid from '$lib/components/BentoGrid.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Mail, Terminal, Github } from '@lucide/svelte';

	import { Canvas } from '@threlte/core';
	import BackgroundGrid from '$lib/components/BackgroundGrid.svelte';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	// Default to false so we safely render the CSS fallback first
	let canRender3D = $state(false);

	onMount(() => {
		// Only run this test in the browser
		if (browser) {
			try {
				// Create a phantom canvas to test graphics capabilities
				const testCanvas = document.createElement('canvas');
				const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
				// If gl exists and isn't blocked, we are clear for takeoff
				if (gl && gl instanceof WebGLRenderingContext) {
					canRender3D = true;
				}
			} catch (e) {
				console.warn("WebGL not available, sticking to CSS fallback.");
				canRender3D = false;
			}
		}
	});
</script>

<svelte:head>
	<title>Mathéo S. | Fullstack Developer</title>
	<link rel="preconnect" href="https://cdn.simpleicons.org" />
</svelte:head>

<section 
	id="hero" 
	class="relative flex min-h-dvh flex-col items-center justify-between overflow-hidden pt-20"
>
	<div 
		class="absolute inset-0 z-0 bg-background pointer-events-none" 
		style="mask-image: linear-gradient(to bottom, black 40%, transparent 100%); -webkit-mask-image: linear-gradient(to bottom, black 40%, transparent 100%);"
	>
		{#if canRender3D}
			<Canvas>
				<BackgroundGrid />
			</Canvas>
		{:else}
			<div class="absolute inset-0 bg-[linear-gradient(to_right,rgba(168,85,247,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(168,85,247,0.1)_1px,transparent_1px)] bg-[size:4rem_4rem] perspective-[1000px]">
				<div class="absolute bottom-[-40%] left-[-50%] right-[-50%] h-[200%] origin-center border-t border-primary/20 bg-background/50 backdrop-blur-sm" style="transform: rotateX(70deg) rotateZ(-45deg);"></div>
			</div>
		{/if}
	</div>

	<div class="container relative z-10 flex flex-1 flex-col items-center justify-center px-4 text-center">

		<h1 class="pb-2 text-6xl font-bold tracking-tighter sm:text-8xl md:text-9xl lg:text-[10rem] bg-clip-text text-transparent bg-linear-to-b from-foreground to-muted-foreground drop-shadow-sm animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100 selection:bg-primary selection:text-white">
			Mathéo S.
		</h1>
		
		<div class="h-6 mb-6 overflow-hidden">
			<span class="text-lg font-mono text-foreground bg-[length:200%_auto] bg-clip-text animate-shimmer inline-block">
				Fullstack Developer
			</span>
		</div>

		<p class="max-w-xl mx-auto text-base text-muted-foreground sm:text-lg animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 px-2 leading-relaxed">
			Transforming complex logic into 
			<span class="text-foreground font-medium underline decoration-primary/50 underline-offset-4 decoration-2">minimal</span>, 
			<span class="text-foreground font-medium underline decoration-primary/50 underline-offset-4 decoration-2">high-performance</span> web experiences.
		</p>

		<div class="mt-10 flex flex-col gap-4 w-full max-w-xs sm:flex-row sm:w-auto sm:max-w-none sm:justify-center animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
			<Button href="#projects" size="lg" class="rounded-full h-12 px-8 text-base shadow-[0_0_30px_-5px_var(--primary)] shadow-primary/30 hover:shadow-primary/50 transition-shadow">
				View Work
			</Button>
			<Button href="#contact" variant="outline" size="lg" class="rounded-full h-12 px-8 text-base bg-background/50 border-border hover:bg-muted hover:text-foreground backdrop-blur-sm">
				Contact Me
			</Button>
		</div>
	</div>

	<div class="w-full z-20 mt-12 md:mt-0">
		<TechMarquee />
	</div>
</section>

<section id="projects" class="container py-20 sm:py-32 scroll-mt-20">
	<div class="flex flex-col items-start gap-4 mb-12">
		<h2 class="text-3xl font-bold tracking-tighter sm:text-5xl">Selected Works</h2>
		<p class="text-muted-foreground text-lg">A collection of FOSS projects I made:</p>
	</div>
	<BentoGrid />
</section>

<section id="about" class="container py-20 sm:py-32 scroll-mt-20 border-t border-border/50">
	<div class="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
		<div class="relative order-2 md:order-1 h-[300px] md:h-[400px] w-full rounded-3xl border border-border bg-card/50 overflow-hidden shadow-2xl group">
			<div class="absolute inset-0 bg-linear-to-tr from-primary/10 via-transparent 
to-transparent"></div>
			<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-48 md:h-48 bg-primary rounded-full blur-[60px] md:blur-[90px] opacity-40 animate-pulse-glow"></div>
			
			<div class="absolute bottom-6 left-6 right-6 p-4 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 flex items-center justify-between">
				<div class="flex flex-col">
					<span class="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wider">Location</span>
					<span class="text-xs md:text-sm font-medium text-foreground">Wallonia, Belgium 🇧🇪</span>
				</div>
				<div class="h-8 w-px bg-white/10"></div>
				<div class="flex flex-col text-right">
					<span class="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wider">Focus</span>
					<span class="text-xs md:text-sm font-medium text-foreground">Software Architecture & High-performance</span>
				</div>
			</div>
		</div>

		<div class="order-1 md:order-2 flex flex-col justify-center">
			<div class="inline-flex items-center text-primary font-mono mb-4">
				<span class="text-xl mr-2">01.</span>
				<span class="text-sm tracking-widest uppercase">About Me</span>
			</div>
			
			<h2 class="text-3xl font-bold tracking-tighter sm:text-5xl mb-6">
				More than just <br/> 
				<span class="text-muted-foreground">lines of code.</span>
			</h2>
			
			<p class="text-muted-foreground text-base md:text-lg mb-6 leading-relaxed">
				I'm Mathéo, a junior developer with a passion 
				for building software that feels right. I don't just write code;
				I design systems that are scalable, maintainable, and delightful to use.
			</p>
			
			<div class="flex flex-wrap gap-4 mt-4">
				<div class="flex items-center gap-2 text-sm font-medium bg-secondary/50 px-3 py-1.5 rounded-full">
					<span class="h-2 w-2 rounded-full bg-green-500"></span>
					Open to Work
				</div>
			</div>
		</div>
	</div>
</section>

<section id="contact" class="container py-24 sm:py-32 scroll-mt-20 border-t border-border/50 mb-20 md:mb-0">
	<div class="flex flex-col items-center justify-center text-center max-w-3xl mx-auto">
		<div class="inline-flex items-center text-primary font-mono mb-4">
			<span class="text-xl mr-2">02.</span>
			<span class="text-sm tracking-widest uppercase">What's Next?</span>
		</div>
		
		<h2 class="text-4xl font-bold tracking-tighter sm:text-6xl mb-6">
			Let's work together.
		</h2>
		
		<p class="text-muted-foreground text-lg sm:text-xl mb-10 max-w-xl">
			I'm currently looking for new opportunities to join a creative team.
			Whether you have a question or just want to say hi, my inbox is always open!
		</p>
		
		<div class="flex flex-col gap-3 w-full max-w-xs sm:flex-row sm:w-auto sm:max-w-none sm:justify-center">
			<Button href="mailto:math@mathdesigns.dev" size="lg" class="rounded-full h-14 w-full sm:w-auto px-8 text-base group">
				<Mail class="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
				Say Hello
			</Button>
			<Button href="https://github.com/MathDesigns" target="_blank" variant="outline" size="lg" class="rounded-full h-14 w-full sm:w-auto px-8 text-base bg-transparent">
				<Github class="mr-2 h-5 w-5" />
				GitHub
			</Button>
		</div>

		<footer class="mt-24 pt-8 border-t border-border w-full flex flex-col md:flex-row justify-center items-center text-sm text-muted-foreground gap-4">
			<p>&copy;
				{new Date().getFullYear()} MathDesigns.</p>
		</footer>
	</div>
</section>