<script lang="ts">
	import Typewriter from '$lib/components/Typewriter.svelte';
	import { Button } from '$lib/components/ui/button';
	import { ArrowDown, CodeXml, Sparkles } from '@lucide/svelte';
	import { animateOnScroll } from '$lib/actions/animateOnScroll';

	const typewriterTexts = [
		"Fullstack",
		"Junior",
		"Java",
		"Svelte"
	];
</script>

<svelte:head>
	<title>MathDesigns | Junior Developer Portfolio</title>
	<meta name="description" content="Welcome to the portfolio of MathDesigns, a passionate junior web developer specializing in Svelte and modern web technologies." />
</svelte:head>

<section
	id="hero"
	class="relative flex flex-col items-center justify-center min-h-[calc(100vh-20rem)] text-center px-4 sm:px-6 lg:px-8 overflow-hidden"
	style="--hero-bg-pattern: url('data:image/svg+xml,%3Csvg width=\'52\' height=\'26\' viewBox=\'0 0 52 26\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill-rule=\'evenodd\'%3E%3Cg fill=\'%239C92AC\' fill-opacity=\'0.1\'%3E%3Cpath d=\'M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6zM26 26c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6zM39 0c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6h-2c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zM52 13c0 2.21-1.79 4-4 4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E');"
>
	<div class="absolute inset-0 -z-10 opacity-10 dark:opacity-5">
		<div class="absolute inset-0 bg-(--hero-bg-pattern)"></div>
	</div>

	<div 
        class="max-w-3xl animate-initial-hidden transition-default" 
        use:animateOnScroll={{ threshold: 0.1, once: true }}
    >
		<h1 class="flex flex-col sm:flex-row items-center justify-center text-5xl font-bold tracking-tight sm:text-6xl md:text-6xl lg:text-7xl xl:text-8xl">
			<span class="mr-2 sm:mr-3">Hi, I'm Math</span>
		</h1>
        <div class="mt-1 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-primary">
            <Typewriter texts={typewriterTexts} typingSpeed={180} deletingSpeed={50} delayBetweenTexts={1000} />
        </div>

		<p class="mt-6 text-lg leading-8 text-muted-foreground sm:text-xl md:text-2xl max-w-xl mx-auto">
			A passionate Junior Developer, transforming ideas into engaging web experiences.
		</p>

		<div class="mt-10 flex flex-col sm:flex-row items-center justify-center gap-y-5 sm:gap-y-0 sm:gap-x-6">
    <Button href="/projects" size="lg" class="font-semibold w-full sm:w-auto">
        <CodeXml class="mr-2 h-5 w-5"/> View My Work
    </Button>
    <Button href="/contact" variant="outline" size="lg" class="font-semibold w-full sm:w-auto">
        Get In Touch
    </Button>
</div>
	</div>
</section>
