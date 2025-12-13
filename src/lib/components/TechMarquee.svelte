<script lang="ts">
	const techs = [
		{ name: 'Svelte', slug: 'svelte' },
		{ name: 'Tailwind', slug: 'tailwindcss' },
		{ name: 'TypeScript', slug: 'typescript' },
		{ name: 'Node.js', slug: 'nodedotjs' },
		{ name: 'PostgreSQL', slug: 'postgresql' },
		{ name: 'Redis', slug: 'redis' },
		{ name: 'Docker', slug: 'docker' },
		{ name: 'Go', slug: 'go' },
		{ name: 'C#', slug: 'dotnet' },
		{ name: 'Java', slug: 'openjdk' },
		{ name: 'Python', slug: 'python' },
		{ name: 'Linux', slug: 'linux' },
		{ name: 'Git', slug: 'git' },
		{ name: 'Caddy', slug: 'caddy' },
		{ name: 'Cloudflare', slug: 'cloudflare' }
	];
</script>

<div class="w-full overflow-hidden bg-background/50 border-y border-border/40 py-6 backdrop-blur-sm select-none">
	<div class="flex overflow-hidden group mask-linear-fade py-4">
		
		<div class="flex min-w-full shrink-0 items-center justify-around gap-12 animate-marquee motion-reduce:animate-none px-12" aria-hidden="true">
			{#each techs as tech}
				<div class="group/icon flex flex-col items-center justify-center gap-2">
					<img 
						src="https://cdn.simpleicons.org/{tech.slug}" 
						alt="{tech.name} logo"
						width="48"
						height="48"
						loading="lazy"
						decoding="async"
						class="h-12 w-12 object-contain transition-all duration-300 filter grayscale opacity-40 group-hover/icon:grayscale-0 group-hover/icon:opacity-100 group-hover/icon:scale-110"
					/>
					<span class="text-xs font-mono text-primary opacity-0 -translate-y-2 transition-all duration-300 group-hover/icon:opacity-100 group-hover/icon:translate-y-0">
						{tech.name}
					</span>
				</div>
			{/each}
		</div>
		
		<div class="flex min-w-full shrink-0 items-center justify-around gap-12 animate-marquee motion-reduce:animate-none px-12">
			{#each techs as tech}
				<div class="group/icon flex flex-col items-center justify-center gap-2">
					<img 
						src="https://cdn.simpleicons.org/{tech.slug}" 
						alt="{tech.name} logo"
						width="48"
						height="48"
						loading="lazy"
						decoding="async"
						class="h-12 w-12 object-contain transition-all duration-300 filter grayscale opacity-40 group-hover/icon:grayscale-0 group-hover/icon:opacity-100 group-hover/icon:scale-110"
					/>
					<span class="text-xs font-mono text-primary opacity-0 -translate-y-2 transition-all duration-300 group-hover/icon:opacity-100 group-hover/icon:translate-y-0">
						{tech.name}
					</span>
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	.mask-linear-fade {
		mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
	}
</style>