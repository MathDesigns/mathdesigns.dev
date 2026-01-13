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

<div
	class="bg-background/50 border-border/40 w-full overflow-hidden border-y py-6 backdrop-blur-sm select-none"
>
	<div class="group mask-linear-fade flex overflow-hidden py-4">
		<div
			class="animate-marquee flex min-w-full shrink-0 items-center justify-around gap-12 px-12 will-change-transform motion-reduce:animate-none group-hover:[animation-play-state:paused]"
			aria-hidden="true"
		>
			{#each techs as tech (tech.slug)}
				<div class="group/icon flex flex-col items-center justify-center gap-2 cursor-default">
					<img
						src="https://cdn.simpleicons.org/{tech.slug}"
						alt="{tech.name} logo"
						width="48"
						height="48"
						loading="lazy"
						decoding="async"
						class="h-12 w-12 object-contain opacity-40 grayscale filter transition-all duration-300 group-hover/icon:scale-110 group-hover/icon:opacity-100 group-hover/icon:grayscale-0"
					/>
					<span
						class="text-primary -translate-y-2 font-mono text-xs opacity-0 transition-all duration-300 group-hover/icon:translate-y-0 group-hover/icon:opacity-100"
					>
						{tech.name}
					</span>
				</div>
			{/each}
		</div>

		<div
			class="animate-marquee flex min-w-full shrink-0 items-center justify-around gap-12 px-12 will-change-transform motion-reduce:animate-none group-hover:[animation-play-state:paused]"
		>
			{#each techs as tech (tech.slug)}
				<div class="group/icon flex flex-col items-center justify-center gap-2 cursor-default">
					<img
						src="https://cdn.simpleicons.org/{tech.slug}"
						alt="{tech.name} logo"
						width="48"
						height="48"
						loading="lazy"
						decoding="async"
						class="h-12 w-12 object-contain opacity-40 grayscale filter transition-all duration-300 group-hover/icon:scale-110 group-hover/icon:opacity-100 group-hover/icon:grayscale-0"
					/>
					<span
						class="text-primary -translate-y-2 font-mono text-xs opacity-0 transition-all duration-300 group-hover/icon:translate-y-0 group-hover/icon:opacity-100"
					>
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