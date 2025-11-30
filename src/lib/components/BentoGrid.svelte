<script lang="ts">
	import { Github, ExternalLink } from '@lucide/svelte';

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
</script>

<div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[220px] md:auto-rows-[280px]">
	{#each projects as project}
		<a 
			href={project.href}
			class="group relative overflow-hidden rounded-3xl border border-white/5 bg-zinc-900/40 p-6 md:p-8 transition-all duration-500 hover:border-white/10 hover:shadow-2xl hover:shadow-black/50 {project.class}"
		>
			<div class="absolute inset-0 opacity-[0.03] pointer-events-none z-0 mix-blend-overlay" 
				 style="background-image: url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E');">
			</div>

			<div class="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0"></div>

			<div class="absolute -top-20 -right-20 h-64 w-64 rounded-full {project.glow}/20 blur-3xl transition-all duration-700 group-hover:scale-125 group-hover:opacity-40"></div>

			<div class="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10 group-hover:ring-white/20 transition-all pointer-events-none"></div>

			<div class="relative z-10 flex h-full flex-col justify-between">
				<div>
					<div class="flex items-start justify-between mb-4">
						<div class="p-2 rounded-xl bg-white/5 border border-white/5 backdrop-blur-sm group-hover:bg-white/10 transition-colors">
							<Github class="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
						</div>
						
						<div class="rounded-full p-2 text-muted-foreground opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 bg-white/5">
							<ExternalLink class="h-4 w-4" />
						</div>
					</div>
					
					<h3 class="text-xl md:text-2xl font-bold tracking-tight text-foreground mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
					<p class="text-muted-foreground/80 leading-relaxed text-sm line-clamp-2 md:line-clamp-3">{project.desc}</p>
				</div>
				
				<div class="flex flex-wrap gap-2 mt-4">
					{#each project.tags as tag}
						<span class="inline-flex items-center rounded-md bg-white/5 px-2 py-1 text-[10px] md:text-xs font-medium text-muted-foreground ring-1 ring-inset ring-white/10 transition-colors group-hover:bg-white/10 group-hover:text-foreground">
							{tag}
						</span>
					{/each}
				</div>
			</div>
		</a>
	{/each}
</div>