<script lang="ts">
	import { Avatar, AvatarImage, AvatarFallback } from '$lib/components/ui/avatar';
	import { Badge } from '$lib/components/ui/badge'; 
	import { Briefcase, GraduationCap, Lightbulb, Code, Zap, Coffee, Palette, CheckCircle2, ArrowRight } from 'lucide-svelte';
	import { animateOnScroll } from '$lib/actions/animateOnScroll';
    import { Button } from '$lib/components/ui/button';


	const timelineEvents = [
		{
			icon: GraduationCap,
			date: '2022 - 2026',
			title: 'Studies in Computer Science',
			description: 'Completing my degree by 2026, focusing on software development and web technologies. Primarily Java-focused.',
			color: 'text-primary'
		},
		{
			icon: Code,
			date: 'Ongoing Since 2022',
			title: 'Tinkering with Svelte & Web Technologies',
			description: 'Started diving into Svelte, JavaScript, and the modern web stack. Currently building several personal projects to solidify my skills.',
			color: 'text-orange-500'
		},
		{
			icon: Lightbulb,
			date: 'Present',
			title: 'Exploring New Technologies',
			description: 'Continuously learning and experimenting with new tools, frameworks, and design patterns to stay updated and broaden my skillset. Giving a shot at Go (golang) right now !',
			color: 'text-green-500'
		},
		{
			icon: Briefcase,
			date: 'Future',
			title: 'Seeking Junior Developer Role',
			description: 'Eager to apply my skills and passion in a professional environment, contributing to exciting projects and growing as a developer.',
			color: 'text-purple-500'
		}
	];

	const interestsAndTools = [
		{ name: 'Java', icon: Coffee, description: 'Where most of my skillset resides. Old-fashioned but still as good.' },
		{ name: 'SvelteKit', icon: Zap, description: 'Modern web framework for building high-performance apps.' },
		{ name: 'TailwindCSS', icon: Palette, description: 'Utility-first CSS framework for rapid UI development.' },
		{ name: 'Clean Code', icon: CheckCircle2, description: 'Advocate for readable and maintainable code, using reliable design patterns.' },
	];

	const yourName = "Math";
	const yourInitials = yourName.substring(0, 2).toUpperCase();
	const profileImageUrl = "https://github.com/MathDesigns.png";

</script>

<svelte:head>
	<title>About Me | {yourName}</title>
	<meta name="description" content="Learn more about {yourName}, a junior web developer from Belgium with a passion for programming and creating innovative web solutions." />
</svelte:head>

<div class="container mx-auto py-12 md:py-20 px-4">
	<section 
        class="mb-20 md:mb-28 grid md:grid-cols-3 gap-8 md:gap-12 items-center animate-initial-hidden-नीचे transition-default"
        use:animateOnScroll={{ threshold: 0.1 }}
    >
		<div class="md:col-span-1 flex justify-center md:justify-start">
			<Avatar class="w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 border-4 border-primary/30 shadow-xl rounded-full hover:scale-105 transition-transform duration-300">
				<AvatarImage src={profileImageUrl} alt="Profile picture of {yourName}" />
				<AvatarFallback class="text-5xl md:text-6xl">{yourInitials}</AvatarFallback>
			</Avatar>
		</div>
		<div class="md:col-span-2 text-center md:text-left">
			<h1 class="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-foreground">
				Hello, I'm <span class="text-primary whitespace-nowrap">{yourName}</span>!
			</h1>
			<p class="text-lg md:text-xl text-muted-foreground mb-6 leading-relaxed">
				A passionate Junior Developer from Belgium, transforming ideas into engaging web experiences. I thrive on learning, crafting elegant solutions, and bringing a creative spark with a special love for the Svelte ecosystem.
			</p>
            <Button href="/contact" size="lg" class="font-semibold group mt-2">
                Let's Connect <ArrowRight class="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1"/>
            </Button>
		</div>
	</section>

	<section 
        class="mb-20 md:mb-28 animate-initial-hidden transition-default"
        use:animateOnScroll={{ threshold: 0.05, rootMargin: "0px 0px -50px 0px" }}
    >
		<h2 class="text-3xl md:text-4xl font-bold mb-12 text-center text-foreground">
            My <span class="text-primary">Developer</span> Journey
        </h2>
		<div class="max-w-3xl mx-auto space-y-8">
			{#each timelineEvents as event, i}
				<div 
                    class="flex items-start space-x-4 md:space-x-6 p-6 bg-card border border-border/70 rounded-xl shadow-lg hover:shadow-xl hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1 animate-initial-scale-down transition-default"
                    use:animateOnScroll={{ threshold: 0.2, rootMargin: "0px 0px -50px 0px" }}
                    style="transition-delay: {i * 100}ms;"
                >
					<div class="flex-shrink-0 mt-1 p-3 rounded-full bg-primary/10 {event.color}">
						<svelte:component this={event.icon} class="w-6 h-6" />
					</div>
					<div>
						<h3 class="text-xl md:text-2xl font-semibold text-foreground mb-1">{event.title}</h3>
						<time class="block mb-2 text-sm font-medium text-muted-foreground">{event.date}</time>
						<p class="text-base text-muted-foreground leading-relaxed">{event.description}</p>
					</div>
				</div>
			{/each}
		</div>
	</section>

	<section 
        class="animate-initial-hidden transition-default"
        use:animateOnScroll={{ threshold: 0.05, rootMargin: "0px 0px -50px 0px" }}
    >
		<h2 class="text-3xl md:text-4xl font-bold mb-12 text-center text-foreground">
            Toolkit & <span class="text-primary">Interests</span>
        </h2>
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
			{#each interestsAndTools as item, i}
				<div
                    class="group bg-card border border-border/70 rounded-xl p-6 shadow-lg hover:shadow-xl hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1 animate-initial-scale-down transition-default"
                    use:animateOnScroll={{ threshold: 0.1, rootMargin: "0px 0px -20px 0px" }}
                    style="transition-delay: {i * 75}ms;"
                >
					<div class="flex items-center mb-3">
						<div class="p-2.5 rounded-full bg-primary/10 text-primary mr-4">
							<svelte:component this={item.icon} class="w-6 h-6" />
						</div>
						<h3 class="text-xl font-semibold text-foreground">{item.name}</h3>
					</div>
                    <p class="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
				</div>
			{/each}
		</div>
	</section>
</div>
