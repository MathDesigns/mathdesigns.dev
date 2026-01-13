<script lang="ts">
	import { Github, ExternalLink } from '@lucide/svelte';
	import { onMount } from 'svelte';

	const projects = [
		{
			title: 'GoTrics Server',
			desc: '⚡ High-performance orchestration engine for the GoTrics monitoring ecosystem. Built with Go (Gin).',
			tags: ['Go', 'Gin', 'Websocket'],
			href: 'https://github.com/MathDesigns/gotrics-server',
			class: 'md:col-span-2 md:row-span-2',
			glow: 'bg-purple-500'
		},
		{
			title: 'Gotrics Front',
			desc: '📊 Real-time observability dashboard for GoTrics. Built with Svelte 5, TypeScript, and Tailwind CSS.',
			tags: ['SvelteKit', 'TailwindCSS', 'Typescript'],
			href: 'https://github.com/MathDesigns/gotrics-front',
			class: 'md:col-span-1 md:row-span-1',
			glow: 'bg-blue-500'
		},
		{
			title: 'Gotrics Node',
			desc: '🕵️‍♂️ Lightweight, zero-dependency telemetry agent. Collects CPU, RAM, and Disk metrics in real-time. Written in Go.',
			tags: ['Go', 'Websocket'],
			href: 'https://github.com/MathDesigns/gotrics-node',
			class: 'md:col-span-1 md:row-span-1',
			glow: 'bg-emerald-500'
		},
		{
			title: 'MathDesigns.dev',
			desc: 'This portfolio. Minimal, accessible, and fast.',
			tags: ['Svelte 5', 'TailwindCSS'],
			href: 'https://github.com/MathDesigns/mathdesigns.dev',
			class: 'md:col-span-3 md:row-span-1',
			glow: 'bg-orange-500'
		}
	];

	let mouseX = 0;
	let mouseY = 0;
	let gridElement: HTMLElement;
	let isVisible = false;

	function handleMouseMove(e: MouseEvent) {
		if (!gridElement) return;
		const rect = gridElement.getBoundingClientRect();
		mouseX = e.clientX - rect.left;
		mouseY = e.clientY - rect.top;
	}

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					isVisible = true;
					observer.disconnect(); // Animate only once
				}
			},
			{ threshold: 0.1 } // Trigger when 10% of the grid is visible
		);

		if (gridElement) {
			observer.observe(gridElement);
		}

		return () => observer.disconnect();
	});
</script>

<div
	bind:this={gridElement}
	onmousemove={handleMouseMove}
	class="group/bento relative grid auto-rows-[220px] grid-cols-1 gap-4 md:auto-rows-[280px] md:grid-cols-3 md:gap-6"
>
	<div
		class="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover/bento:opacity-100"
		style="background: radial-gradient(600px circle at {mouseX}px {mouseY}px, rgba(124, 58, 237, 0.1), transparent 40%);"
	></div>

	{#each projects as project, i}
		<a
			href={project.href}
			target="_blank"
			rel="noopener noreferrer"
			style="transition-delay: {i * 100}ms"
			class="group focus-visible:ring-primary focus-visible:ring-offset-background relative overflow-hidden rounded-3xl border border-zinc-200 bg-white/60 p-6 transition-all duration-700 ease-out hover:border-zinc-300 hover:shadow-xl hover:shadow-zinc-200/50 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none dark:border-white/5 dark:bg-zinc-900/40 dark:hover:border-white/10 dark:hover:shadow-black/50 md:p-8 {project.class} 
            {isVisible
				? 'translate-y-0 opacity-100'
				: 'translate-y-12 opacity-0'}"
		>
			<div
				class="pointer-events-none absolute inset-0 z-0 opacity-[0.03] mix-blend-overlay"
				style="background-image: url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E');"
			></div>

			<div
				class="bg-size-[24px_24px] pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
			></div>

			<div
				class="absolute -right-20 -top-20 h-64 w-64 rounded-full {project.glow}/20 blur-3xl transition-all duration-700 group-hover:scale-125 group-hover:opacity-40"
			></div>

			<div
				class="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-zinc-900/5 transition-all ring-inset group-hover:ring-zinc-900/10 dark:ring-white/10 dark:group-hover:ring-white/20"
			></div>

			<div class="relative z-10 flex h-full flex-col justify-between">
				<div>
					<div class="mb-4 flex items-start justify-between">
						<div
							class="text-muted-foreground rounded-xl border border-zinc-200 bg-zinc-100 p-2 backdrop-blur-sm transition-colors group-hover:bg-zinc-200 dark:border-white/5 dark:bg-white/5 dark:group-hover:bg-white/10"
						>
							<Github
								class="text-muted-foreground group-hover:text-foreground h-5 w-5 transition-colors"
								aria-hidden="true"
							/>
						</div>

						<div
							class="text-muted-foreground -translate-y-2 rounded-full bg-zinc-100 p-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 dark:bg-white/5"
						>
							<ExternalLink class="h-4 w-4" aria-hidden="true" />
						</div>
					</div>

					<h3
						class="text-foreground group-hover:text-primary mb-2 text-xl font-bold tracking-tight transition-colors md:text-2xl"
					>
						{project.title}
						<span class="sr-only">(opens in a new tab)</span>
					</h3>
					<p class="text-muted-foreground/80 line-clamp-2 text-sm leading-relaxed md:line-clamp-3">
						{project.desc}
					</p>
				</div>

				<div class="mt-4 flex flex-wrap gap-2">
					{#each project.tags as tag}
						<span
							class="text-muted-foreground group-hover:text-foreground inline-flex items-center rounded-md bg-zinc-100 px-2 py-1 text-[10px] font-medium ring-1 ring-zinc-200 transition-colors ring-inset group-hover:bg-zinc-200 dark:bg-white/5 dark:ring-white/10 dark:group-hover:bg-white/10 md:text-xs"
						>
							{tag}
						</span>
					{/each}
				</div>
			</div>
		</a>
	{/each}
</div>