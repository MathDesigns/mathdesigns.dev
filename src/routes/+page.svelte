<script lang="ts">
	import TechMarquee from '$lib/components/TechMarquee.svelte';
	import BentoGrid from '$lib/components/BentoGrid.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Mail, Terminal, Github } from '@lucide/svelte';

	// Spotlight Effect State
	let mouseX = 0;
	let mouseY = 0;
	let heroElement: HTMLElement;

	function handleMouseMove(e: MouseEvent) {
		if (!heroElement) return;
		const rect = heroElement.getBoundingClientRect();
		mouseX = e.clientX - rect.left;
		mouseY = e.clientY - rect.top;
	}
</script>

<svelte:head>
	<title>Mathéo S. | Fullstack Developer</title>
	<link rel="preconnect" href="https://cdn.simpleicons.org" />
</svelte:head>

<section 
	id="hero" 
	bind:this={heroElement}
	onmousemove={handleMouseMove}
	class="relative flex min-h-dvh flex-col items-center justify-between overflow-hidden pt-20 group/hero"
>
	
	<div class="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"></div>

	<div 
		class="absolute inset-0 z-0 bg-[linear-gradient(to_right,rgba(168,85,247,1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(168,85,247,1)_1px,transparent_1px)] bg-size-[40px_40px] pointer-events-none animate-hero-ripple"
		style="mask-image: radial-gradient(closest-side, black, transparent); mask-position: center; mask-repeat: no-repeat;"
	></div>

	<div 
		class="absolute inset-0 z-0 bg-[linear-gradient(to_right,rgba(168,85,247,0.4)_1px,transparent_1px),linear-gradient(to_bottom,rgba(168,85,247,0.4)_1px,transparent_1px)] bg-size-[40px_40px] pointer-events-none transition-opacity duration-300 opacity-0 group-hover/hero:opacity-100 will-change-[mask-image]"
		style="-webkit-mask-image: radial-gradient(350px circle at {mouseX}px {mouseY}px, black, transparent); mask-image: radial-gradient(350px circle at {mouseX}px {mouseY}px, black, transparent);"
	></div>

	<div 
		class="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover/hero:opacity-100 z-0"
		style="background: radial-gradient(600px circle at {mouseX}px {mouseY}px, rgba(168, 85, 247, 0.15), transparent 40%);"
	></div>

	<div class="container relative z-10 flex flex-1 flex-col items-center justify-center px-4 text-center">
		
		<div class="inline-flex items-center gap-2 rounded-full border border-white/5 bg-white/5 p-1 pr-4 backdrop-blur-sm mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 ring-1 ring-white/10 hover:ring-primary/50 transition-all">
			<div class="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary flex items-center gap-1.5">
				<span class="relative flex h-1.5 w-1.5">
				  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
				  <span class="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary"></span>
				</span>
				Available
			</div>
			<span class="text-sm text-muted-foreground flex items-center gap-2">
				<Terminal class="h-3 w-3" />
				MathDesigns
			</span>
		</div>

		<h1 class="pb-2 text-6xl font-bold tracking-tighter sm:text-8xl md:text-9xl lg:text-[10rem] bg-clip-text text-transparent bg-linear-to-b from-white to-white/50 drop-shadow-sm animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100 selection:bg-primary selection:text-white">
			Mathéo S.
		</h1>
		
		<div class="h-6 mb-6 overflow-hidden">
			<span class="text-lg font-mono bg-linear-to-r from-muted-foreground/50 via-primary to-muted-foreground/50 
bg-[length:200%_auto] bg-clip-text text-transparent animate-shimmer inline-block">
				Fullstack Developer
			</span>
		</div>

		<p class="max-w-xl mx-auto text-base text-muted-foreground/80 sm:text-lg animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 px-2 leading-relaxed">
			Transforming complex logic into 
			<span class="text-foreground font-medium underline decoration-primary/50 underline-offset-4 decoration-2">minimal</span>, 
			<span class="text-foreground font-medium underline decoration-primary/50 underline-offset-4 decoration-2">high-performance</span> web experiences.
		</p>

		<div class="mt-10 flex flex-col gap-4 w-full max-w-xs sm:flex-row sm:w-auto sm:max-w-none sm:justify-center animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
			<Button href="#projects" size="lg" class="rounded-full h-12 px-8 text-base shadow-[0_0_30px_-5px_var(--primary)] shadow-primary/30 hover:shadow-primary/50 transition-shadow">
				View Work
			</Button>
			<Button href="#contact" variant="outline" size="lg" class="rounded-full h-12 px-8 text-base bg-white/5 border-white/10 hover:bg-white/10 hover:text-white backdrop-blur-sm">
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