<script lang="ts">
	import { onMount } from 'svelte';
	import { Button } from '$lib/components/ui/button';
	import { Cpu, Server, Terminal, ExternalLink } from '@lucide/svelte';
	import { fade, fly } from 'svelte/transition';
	import { animateOnScroll } from '$lib/actions/animateOnScroll';

	// Boot sequence state
	let bootLines = $state<{ text: string; type: 'cmd' | 'out' | 'success' }[]>([]);
	let showContent = $state(false);

	onMount(async () => {
		const sequence = [
			{ text: 'initializing core_systems...', delay: 200, type: 'cmd' },
			{ text: 'loading kernel modules... [OK]', delay: 400, type: 'success' },
			{ text: 'mounting user_profile... [OK]', delay: 600, type: 'success' },
			{ text: './greet_visitor.sh --verbose', delay: 1000, type: 'cmd' }
		];

		for (const step of sequence) {
			await new Promise((r) => setTimeout(r, step.delay));
			bootLines = [...bootLines, { text: step.text, type: step.type as any }];
		}

		await new Promise((r) => setTimeout(r, 500));
		showContent = true;
	});
</script>

<svelte:head>
	<title>MathDesigns | System Online</title>
	<meta
		name="description"
		content="MathDesigns - Fullstack Junior Developer & Infrastructure Enthusiast. Exploring Java, Svelte, and DevOps."
	/>
</svelte:head>

<section
	class="container mx-auto flex min-h-[calc(100vh-80px)] flex-col items-center justify-center px-4 py-12 font-mono"
>
	<div
		class="bg-card border-border animate-initial-hidden is-visible w-full max-w-3xl overflow-hidden rounded-sm border shadow-2xl"
		use:animateOnScroll={{ threshold: 0.1, once: true }}
	>
		<div class="bg-muted/50 border-border flex items-center gap-2 border-b p-2">
			<div class="ml-2 flex gap-1.5">
				<div class="h-3 w-3 rounded-full bg-red-500/50"></div>
				<div class="h-3 w-3 rounded-full bg-yellow-500/50"></div>
				<div class="h-3 w-3 rounded-full bg-green-500/50"></div>
			</div>
			<div class="text-muted-foreground flex-1 text-center text-xs">math@mathdesigns:~</div>
		</div>

		<div
			class="bg-background/50 flex min-h-[450px] flex-col p-6 text-sm md:text-base"
		>
			{#each bootLines as line}
				<div class="mb-1">
					{#if line.type === 'cmd'}
						<span class="mr-2 text-green-500">➜</span>
						<span class="text-foreground">{line.text}</span>
					{:else if line.type === 'success'}
						<span class="text-muted-foreground/60 text-xs uppercase tracking-widest"
							>{line.text}</span
						>
					{/if}
				</div>
			{/each}

			{#if showContent}
				<div class="mt-6" in:fly={{ y: 10, duration: 800 }}>
					<h1 class="text-primary mb-2 text-4xl font-bold tracking-tighter md:text-6xl">
						Hi, I'm Math<span class="animate-pulse text-green-500">_</span>
					</h1>
					<div class="text-muted-foreground mb-8 max-w-xl space-y-2 text-lg">
						<p>> Fullstack Junior Developer</p>
						<p>> Transforming ideas into scalable infrastructure.</p>
					</div>

					<div class="flex flex-wrap gap-4">
						<Button
							href="/projects"
							class="bg-primary/10 text-primary hover:bg-primary hover:text-background border-primary border transition-all duration-300"
						>
							[ EXEC_PROJECTS ]
						</Button>
						<Button
							href="/contact"
							variant="outline"
							class="border-dashed hover:bg-white/5"
						>
							[ OPEN_CHANNEL ]
						</Button>
					</div>
				</div>
			{/if}

			{#if showContent}
				<div class="mt-auto pt-8">
					<span class="mr-2 text-green-500">➜</span>
					<span class="bg-primary/50 inline-block h-5 w-2.5 align-middle animate-pulse"></span>
				</div>
			{/if}
		</div>
	</div>

	{#if showContent}
		<div
			class="mt-16 grid w-full max-w-4xl grid-cols-1 gap-4 md:grid-cols-3"
			in:fade={{ duration: 1000, delay: 400 }}
		>
			<div
				class="bg-card/30 border-border hover:border-primary/50 group rounded-sm border p-4 transition-colors"
			>
				<div class="text-primary mb-3 flex items-center gap-2">
					<Cpu class="h-5 w-5" />
					<h3 class="font-bold tracking-wider">KERNEL</h3>
				</div>
				<ul class="text-muted-foreground space-y-1.5 text-sm">
					<li class="group-hover:text-foreground transition-colors">
						<span class="text-primary/50 mr-1">></span>Java (Core)
					</li>
					<li class="group-hover:text-foreground transition-colors">
						<span class="text-primary/50 mr-1">></span>Spring Boot
					</li>
					<li class="group-hover:text-foreground transition-colors">
						<span class="text-primary/50 mr-1">></span>Algorithms
					</li>
				</ul>
			</div>

			<div
				class="bg-card/30 border-border hover:border-primary/50 group rounded-sm border p-4 transition-colors"
			>
				<div class="text-primary mb-3 flex items-center gap-2">
					<Terminal class="h-5 w-5" />
					<h3 class="font-bold tracking-wider">INTERFACE</h3>
				</div>
				<ul class="text-muted-foreground space-y-1.5 text-sm">
					<li class="group-hover:text-foreground transition-colors">
						<span class="text-primary/50 mr-1">></span>Svelte 5 / SvelteKit
					</li>
					<li class="group-hover:text-foreground transition-colors">
						<span class="text-primary/50 mr-1">></span>TailwindCSS v4
					</li>
					<li class="group-hover:text-foreground transition-colors">
						<span class="text-primary/50 mr-1">></span>TypeScript
					</li>
				</ul>
			</div>

			<div
				class="bg-card/30 border-border hover:border-primary/50 group rounded-sm border p-4 transition-colors"
			>
				<div class="text-primary mb-3 flex items-center gap-2">
					<Server class="h-5 w-5" />
					<h3 class="font-bold tracking-wider">DEPLOY</h3>
				</div>
				<ul class="text-muted-foreground space-y-1.5 text-sm">
					<li class="group-hover:text-foreground transition-colors">
						<span class="text-primary/50 mr-1">></span>Docker / Compose
					</li>
					<li class="group-hover:text-foreground transition-colors">
						<span class="text-primary/50 mr-1">></span>Linux (Arch/Debian)
					</li>
					<li class="group-hover:text-foreground transition-colors">
						<span class="text-primary/50 mr-1">></span>Git / CI/CD
					</li>
				</ul>
			</div>
		</div>
	{/if}
</section>