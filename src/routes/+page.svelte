<script lang="ts">
	import TechMarquee from '$lib/components/TechMarquee.svelte';
	import BentoGrid from '$lib/components/BentoGrid.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Mail, Terminal, Github } from '@lucide/svelte';

	// Spotlight Effect State
	let heroElement: HTMLElement;

	function handleMouseMove(e: MouseEvent) {
		if (!heroElement) return;
		const rect = heroElement.getBoundingClientRect();
		const mouseX = e.clientX - rect.left;
		const mouseY = e.clientY - rect.top;
		heroElement.style.setProperty('--mouse-x', `${mouseX}px`);
		heroElement.style.setProperty('--mouse-y', `${mouseY}px`);
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
	class="group/hero relative flex min-h-dvh flex-col items-center justify-between overflow-hidden pt-20"
>
	<div
		class="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] bg-size-[40px_40px]"
	></div>

	<div
		class="animate-hero-ripple pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(to_right,rgba(168,85,247,1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(168,85,247,1)_1px,transparent_1px)] bg-size-[40px_40px]"
		style="mask-image: radial-gradient(closest-side, black, transparent); mask-position: center; mask-repeat: no-repeat;"
	></div>

	<div
		class="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(to_right,rgba(168,85,247,0.4)_1px,transparent_1px),linear-gradient(to_bottom,rgba(168,85,247,0.4)_1px,transparent_1px)] bg-size-[40px_40px] opacity-0 transition-opacity duration-300 will-change-[mask-image] group-hover/hero:opacity-100"
		style="-webkit-mask-image: radial-gradient(350px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), black, transparent); mask-image: radial-gradient(350px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), black, transparent);"
	></div>

	<div
		class="pointer-events-none absolute -inset-px z-0 opacity-0 transition-opacity duration-300 group-hover/hero:opacity-100"
		style="background: radial-gradient(600px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(168, 85, 247, 0.15), transparent 40%);"
	></div>

	<div
		class="relative z-10 container flex flex-1 flex-col items-center justify-center px-4 text-center"
	>
		<div
			class="animate-in fade-in slide-in-from-bottom-4 hover:ring-primary/50 mb-8 inline-flex items-center gap-2 rounded-full border border-white/5 bg-white/5 p-1 pr-4 ring-1 ring-white/10 backdrop-blur-sm transition-all duration-1000"
		>
			<div
				class="bg-primary/10 text-primary flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-semibold"
			>
				<span class="relative flex h-1.5 w-1.5">
					<span
						class="bg-primary absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
					></span>
					<span class="bg-primary relative inline-flex h-1.5 w-1.5 rounded-full"></span>
				</span>
				Available
			</div>
			<span class="text-muted-foreground flex items-center gap-2 text-sm">
				<Terminal class="h-3 w-3" />
				MathDesigns
			</span>
		</div>

		<h1
			class="animate-in fade-in slide-in-from-bottom-8 selection:bg-primary bg-linear-to-b from-white to-white/50 bg-clip-text pb-2 text-6xl font-bold tracking-tighter text-transparent drop-shadow-sm delay-100 duration-1000 selection:text-white sm:text-8xl md:text-9xl lg:text-[10rem]"
		>
			Mathéo S.
		</h1>

		<div class="mb-6 h-6 overflow-hidden">
			<span
				class="from-muted-foreground/50 via-primary to-muted-foreground/50 animate-shimmer inline-block bg-linear-to-r
bg-[length:200%_auto] bg-clip-text font-mono text-lg text-transparent"
			>
				Fullstack Developer
			</span>
		</div>

		<p
			class="text-muted-foreground/80 animate-in fade-in slide-in-from-bottom-8 mx-auto max-w-xl px-2 text-base leading-relaxed delay-200 duration-1000 sm:text-lg"
		>
			Transforming complex logic into
			<span
				class="text-foreground decoration-primary/50 font-medium underline decoration-2 underline-offset-4"
				>minimal</span
			>,
			<span
				class="text-foreground decoration-primary/50 font-medium underline decoration-2 underline-offset-4"
				>high-performance</span
			> web experiences.
		</p>

		<div
			class="animate-in fade-in slide-in-from-bottom-8 mt-10 flex w-full max-w-xs flex-col gap-4 delay-300 duration-1000 sm:w-auto sm:max-w-none sm:flex-row sm:justify-center"
		>
			<Button
				href="#projects"
				size="lg"
				class="shadow-primary/30 hover:shadow-primary/50 h-12 rounded-full px-8 text-base shadow-[0_0_30px_-5px_var(--primary)] transition-shadow"
			>
				View Work
			</Button>
			<Button
				href="#contact"
				variant="outline"
				size="lg"
				class="h-12 rounded-full border-white/10 bg-white/5 px-8 text-base backdrop-blur-sm hover:bg-white/10 hover:text-white"
			>
				Contact Me
			</Button>
		</div>
	</div>

	<div class="z-20 mt-12 w-full md:mt-0">
		<TechMarquee />
	</div>
</section>

<section id="projects" class="container scroll-mt-20 py-20 sm:py-32">
	<div class="mb-12 flex flex-col items-start gap-4">
		<h2 class="text-3xl font-bold tracking-tighter sm:text-5xl">Selected Works</h2>
		<p class="text-muted-foreground text-lg">A collection of FOSS projects I made:</p>
	</div>
	<BentoGrid />
</section>

<section id="about" class="border-border/50 container scroll-mt-20 border-t py-20 sm:py-32">
	<div class="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
		<div
			class="border-border bg-card/50 group relative order-2 h-[300px] w-full overflow-hidden rounded-3xl border shadow-2xl md:order-1 md:h-[400px]"
		>
			<div
				class="from-primary/10 absolute inset-0 bg-linear-to-tr via-transparent
to-transparent"
			></div>
			<div
				class="bg-primary animate-pulse-glow absolute top-1/2 left-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-[60px] md:h-48 md:w-48 md:blur-[90px]"
			></div>

			<div
				class="absolute right-6 bottom-6 left-6 flex items-center justify-between rounded-2xl border border-white/10 bg-black/40 p-4 backdrop-blur-md"
			>
				<div class="flex flex-col">
					<span class="text-muted-foreground text-[10px] tracking-wider uppercase md:text-xs"
						>Location</span
					>
					<span class="text-foreground text-xs font-medium md:text-sm">Wallonia, Belgium 🇧🇪</span>
				</div>
				<div class="h-8 w-px bg-white/10"></div>
				<div class="flex flex-col text-right">
					<span class="text-muted-foreground text-[10px] tracking-wider uppercase md:text-xs"
						>Focus</span
					>
					<span class="text-foreground text-xs font-medium md:text-sm"
						>Software Architecture & High-performance</span
					>
				</div>
			</div>
		</div>

		<div class="order-1 flex flex-col justify-center md:order-2">
			<div class="text-primary mb-4 inline-flex items-center font-mono">
				<span class="mr-2 text-xl">01.</span>
				<span class="text-sm tracking-widest uppercase">About Me</span>
			</div>

			<h2 class="mb-6 text-3xl font-bold tracking-tighter sm:text-5xl">
				More than just <br />
				<span class="text-muted-foreground">lines of code.</span>
			</h2>

			<p class="text-muted-foreground mb-6 text-base leading-relaxed md:text-lg">
				I'm Mathéo, a junior developer with a passion for building software that feels right. I
				don't just write code; I design systems that are scalable, maintainable, and delightful to
				use.
			</p>

			<div class="mt-4 flex flex-wrap gap-4">
				<div
					class="bg-secondary/50 flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium"
				>
					<span class="h-2 w-2 rounded-full bg-green-500"></span>
					Open to Work
				</div>
			</div>
		</div>
	</div>
</section>

<section
	id="contact"
	class="border-border/50 container mb-20 scroll-mt-20 border-t py-24 sm:py-32 md:mb-0"
>
	<div class="mx-auto flex max-w-3xl flex-col items-center justify-center text-center">
		<div class="text-primary mb-4 inline-flex items-center font-mono">
			<span class="mr-2 text-xl">02.</span>
			<span class="text-sm tracking-widest uppercase">What's Next?</span>
		</div>

		<h2 class="mb-6 text-4xl font-bold tracking-tighter sm:text-6xl">Let's work together.</h2>

		<p class="text-muted-foreground mb-10 max-w-xl text-lg sm:text-xl">
			I'm currently looking for new opportunities to join a creative team. Whether you have a
			question or just want to say hi, my inbox is always open!
		</p>

		<div
			class="flex w-full max-w-xs flex-col gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:justify-center"
		>
			<Button
				href="mailto:math@mathdesigns.dev"
				size="lg"
				class="group h-14 w-full rounded-full px-8 text-base sm:w-auto"
			>
				<Mail class="mr-2 h-5 w-5 transition-transform group-hover:rotate-12" />
				Say Hello
			</Button>
			<Button
				href="https://github.com/MathDesigns"
				target="_blank"
				variant="outline"
				size="lg"
				class="h-14 w-full rounded-full bg-transparent px-8 text-base sm:w-auto"
			>
				<Github class="mr-2 h-5 w-5" />
				GitHub
			</Button>
		</div>

		<footer
			class="border-border text-muted-foreground mt-24 flex w-full flex-col items-center justify-center gap-4 border-t pt-8 text-sm md:flex-row"
		>
			<p>
				&copy;
				{new Date().getFullYear()} MathDesigns.
			</p>
		</footer>
	</div>
</section>
