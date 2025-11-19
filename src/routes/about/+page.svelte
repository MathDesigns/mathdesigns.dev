<script lang="ts">
	import { Avatar, AvatarImage, AvatarFallback } from '$lib/components/ui/avatar';
	import { Badge } from '$lib/components/ui/badge';
	import {
		Briefcase,
		GraduationCap,
		Lightbulb,
		Code,
		Zap,
		Coffee,
		Palette,
		CheckCircle2,
		ArrowRight
	} from 'lucide-svelte';
	import { animateOnScroll } from '$lib/actions/animateOnScroll';
	import { Button } from '$lib/components/ui/button';

	const timelineEvents = [
		{
			icon: GraduationCap,
			date: '2022 - 2026',
			title: 'Studies in Computer Science',
			description:
				'Completing my degree by 2026, focusing on software development and web technologies. Primarily Java-focused.',
			color: 'text-primary'
		},
		{
			icon: Code,
			date: 'Ongoing Since 2022',
			title: 'Tinkering with Svelte & Web Technologies',
			description:
				'Started diving into Svelte, JavaScript, and the modern web stack. Currently building several personal projects to solidify my skills.',
			color: 'text-orange-500'
		},
		{
			icon: Lightbulb,
			date: 'Present',
			title: 'Exploring New Technologies',
			description:
				'Continuously learning and experimenting with new tools, frameworks, and design patterns to stay updated and broaden my skillset. Giving a shot at Go (golang) right now !',
			color: 'text-green-500'
		},
		{
			icon: Briefcase,
			date: 'Future',
			title: 'Seeking Junior Developer Role',
			description:
				'Eager to apply my skills and passion in a professional environment, contributing to exciting projects and growing as a developer.',
			color: 'text-purple-500'
		}
	];

	const interestsAndTools = [
		{
			name: 'Java',
			icon: Coffee,
			description: 'Where most of my skillset resides. Old-fashioned but still as good.'
		},
		{
			name: 'SvelteKit',
			icon: Zap,
			description: 'Modern web framework for building high-performance apps.'
		},
		{
			name: 'TailwindCSS',
			icon: Palette,
			description: 'Utility-first CSS framework for rapid UI development.'
		},
		{
			name: 'Clean Code',
			icon: CheckCircle2,
			description: 'Advocate for readable and maintainable code, using reliable design patterns.'
		}
	];

	const yourName = 'Math';
	const yourInitials = yourName.substring(0, 2).toUpperCase();
	const profileImageUrl = 'https://github.com/MathDesigns.png';
</script>

<svelte:head>
	<title>About Me | {yourName}</title>
	<meta
		name="description"
		content="Learn more about {yourName}, a junior web developer from Belgium with a passion for programming and creating innovative web solutions."
	/>
</svelte:head>

<div class="container mx-auto px-4 py-12 md:py-20">
	<section
		class="animate-initial-hidden-नीचे transition-default mb-20 grid items-center gap-8 md:mb-28 md:grid-cols-3 md:gap-12"
		use:animateOnScroll={{ threshold: 0.1 }}
	>
		<div class="flex justify-center md:col-span-1 md:justify-start">
			<Avatar
				class="h-40 w-40 rounded-full border-4 border-primary/30 shadow-xl transition-transform duration-300 hover:scale-105 md:h-48 md:w-48 lg:h-56 lg:w-56"
			>
				<AvatarImage src={profileImageUrl} alt="Profile picture of {yourName}" />
				<AvatarFallback class="text-5xl md:text-6xl">{yourInitials}</AvatarFallback>
			</Avatar>
		</div>
		<div class="text-center md:col-span-2 md:text-left">
			<h1 class="mb-4 text-4xl font-bold text-foreground sm:text-5xl md:text-6xl">
				Hello, I'm <span class="whitespace-nowrap text-primary">{yourName}</span>!
			</h1>
			<p class="mb-6 text-lg leading-relaxed text-muted-foreground md:text-xl">
				A passionate Junior Developer from Belgium, transforming ideas into engaging web
				experiences. I thrive on learning, crafting elegant solutions, and bringing a creative spark
				with a special love for the Svelte ecosystem.
			</p>
			<Button href="/contact" size="lg" class="group mt-2 font-semibold">
				Let's Connect <ArrowRight
					class="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
				/>
			</Button>
		</div>
	</section>

	<section
		class="animate-initial-hidden transition-default mb-20 md:mb-28"
		use:animateOnScroll={{ threshold: 0.05, rootMargin: '0px 0px -50px 0px' }}
	>
		<h2 class="mb-12 text-center text-3xl font-bold text-foreground md:text-4xl">
			My <span class="text-primary">Developer</span> Journey
		</h2>
		<ol class="mx-auto max-w-3xl list-none space-y-8">
			{#each timelineEvents as event, i}
				<li
					class="animate-initial-scale-down transition-default flex transform items-start space-x-4 rounded-xl border border-border/70 bg-card p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl md:space-x-6"
					use:animateOnScroll={{ threshold: 0.2, rootMargin: '0px 0px -50px 0px' }}
					style="transition-delay: {i * 100}ms;"
				>
					<div class="mt-1 flex-shrink-0 rounded-full bg-primary/10 p-3 {event.color}">
						<svelte:component this={event.icon} class="h-6 w-6" />
					</div>
					<div>
						<h3 class="mb-1 text-xl font-semibold text-foreground md:text-2xl">{event.title}</h3>
						<time class="mb-2 block text-sm font-medium text-muted-foreground">{event.date}</time>
						<p class="text-base leading-relaxed text-muted-foreground">{event.description}</p>
					</div>
				</li>
			{/each}
		</ol>
	</section>

	<section
		class="animate-initial-hidden transition-default"
		use:animateOnScroll={{ threshold: 0.05, rootMargin: '0px 0px -50px 0px' }}
	>
		<h2 class="mb-12 text-center text-3xl font-bold text-foreground md:text-4xl">
			Toolkit & <span class="text-primary">Interests</span>
		</h2>
		<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3">
			{#each interestsAndTools as item, i}
				<div
					class="animate-initial-scale-down transition-default group transform rounded-xl border border-border/70 bg-card p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl"
					use:animateOnScroll={{ threshold: 0.1, rootMargin: '0px 0px -20px 0px' }}
					style="transition-delay: {i * 75}ms;"
				>
					<div class="mb-3 flex items-center">
						<div class="mr-4 rounded-full bg-primary/10 p-2.5 text-primary">
							<svelte:component this={item.icon} class="h-6 w-6" />
						</div>
						<h3 class="text-xl font-semibold text-foreground">{item.name}</h3>
					</div>
					<p class="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
				</div>
			{/each}
		</div>
	</section>
</div>
