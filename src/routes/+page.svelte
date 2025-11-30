<script lang="ts">
	import TechMarquee from '$lib/components/TechMarquee.svelte';
	import BentoGrid from '$lib/components/BentoGrid.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Mail, Terminal, Github } from '@lucide/svelte';
</script>

<svelte:head>
	<title>Mathéo S. | Fullstack Developer</title>
</svelte:head>

<section id="hero" class="relative flex min-h-dvh flex-col items-center justify-between overflow-hidden pt-20">
	
	<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-primary/20 blur-[80px] md:blur-[120px] rounded-full pointer-events-none opacity-50 dark:opacity-100"></div>

	<div class="container relative z-10 flex flex-1 flex-col items-center justify-center px-4">
		
		<div class="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm text-primary mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
			<span class="relative flex h-2 w-2 mr-2">
			  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
			  <span class="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
			</span>
			Available for hire
		</div>
		
		<div class="flex items-center gap-2 text-muted-foreground font-mono text-lg mb-2 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-100">
			<Terminal class="h-4 w-4" />
			<span>MathDesigns</span>
		</div>

		<h1 class="pb-4 text-5xl font-bold tracking-tighter sm:text-8xl md:text-9xl bg-clip-text text-transparent bg-linear-to-b from-foreground to-foreground/70 drop-shadow-sm animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100 text-center">
			Mathéo S.
		</h1>
		
		<p class="mt-4 max-w-2xl mx-auto text-base text-muted-foreground sm:text-xl animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 text-center px-2">
			Junior Fullstack Developer. Transforming complex logic into 
			<span class="text-primary font-medium">minimal</span>, 
			<span class="text-foreground font-medium">high-performance</span> web experiences.
		</p>

		<div class="mt-10 flex flex-col gap-3 w-full max-w-xs sm:flex-row sm:w-auto sm:max-w-none sm:justify-center animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
			<Button href="#projects" size="lg" class="rounded-full h-12 w-full sm:w-auto px-8 text-base shadow-lg shadow-primary/20">
				View Work
			</Button>
			<Button href="#contact" variant="outline" size="lg" class="rounded-full h-12 w-full sm:w-auto px-8 text-base bg-transparent border-primary/20 hover:bg-primary/5">
				Contact Me
			</Button>
		</div>
	</div>

	<div class="w-full z-20 mt-8 md:mt-0">
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
			<div class="absolute inset-0 bg-linear-to-tr from-primary/10 via-transparent to-transparent"></div>
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
				I'm Mathéo, a junior developer with a passion for building software that feels right. I don't just write code; I design systems that are scalable, maintainable, and delightful to use.
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

		<div class="mt-24 pt-8 border-t border-border w-full flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground gap-4">
			<p>&copy; {new Date().getFullYear()} MathDesigns.</p>
		</div>
	</div>
</section>