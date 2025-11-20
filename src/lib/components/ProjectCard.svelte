<script lang="ts">
	import type { Project } from '$lib/types/project';
	import { ExternalLink, Github, Box, Activity, Archive, Layers } from '@lucide/svelte';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';

	let { project } = $props<{ project: Project }>();

	// Map status to "System" states
	const statusMap = {
		Completed: { label: 'RUNNING', color: 'text-green-500', bg: 'bg-green-500/10', border: 'border-green-500/20' },
		'In Progress': { label: 'BUILDING', color: 'text-yellow-500', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' },
		Archived: { label: 'STOPPED', color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/20' }
	};

	const currentStatus = statusMap[project.status as keyof typeof statusMap] || statusMap.Completed;
    
    // Generate a fake "Container ID" based on the project ID if needed, or just use the ID
    const containerId = project.id ? project.id.substring(0, 12) : 'unknown';
</script>

<div class="group relative flex h-full flex-col overflow-hidden rounded-sm border border-border bg-card/50 font-mono transition-all hover:border-primary/50 hover:shadow-[0_0_15px_rgba(0,0,0,0.3)]">
	<div class="flex items-center justify-between border-b border-border bg-muted/50 px-3 py-2 text-xs">
		<div class="flex items-center gap-2 text-muted-foreground">
			<Box class="h-3 w-3" />
			<span>ID: {containerId}</span>
		</div>
		<div class={`flex items-center gap-1.5 rounded-sm px-1.5 py-0.5 text-[10px] font-bold tracking-wider border ${currentStatus.bg} ${currentStatus.color} ${currentStatus.border}`}>
			<div class={`h-1.5 w-1.5 rounded-full ${currentStatus.color.replace('text-', 'bg-')} animate-pulse`}></div>
			{currentStatus.label}
		</div>
	</div>

	<div class="flex flex-1 flex-col p-4">
		<div class="mb-3">
			<h3 class="text-lg font-bold tracking-tight text-primary group-hover:underline decoration-primary/30 underline-offset-4">
				{project.title}
			</h3>
		</div>

		<div class="relative mb-4 flex-1 overflow-hidden rounded-sm bg-black/40 p-3 text-xs leading-relaxed text-muted-foreground border border-border/50 font-mono">
            <span class="text-primary/40 select-none mr-2">$</span>{project.description}
		</div>

		<div class="mb-4">
			<div class="mb-1.5 text-[10px] uppercase tracking-widest text-muted-foreground/60">Dependencies</div>
			<div class="flex flex-wrap gap-1.5">
				{#each project.technologies.slice(0, 4) as tech}
					<span class="inline-flex items-center rounded-none border border-border bg-background px-1.5 py-0.5 text-[10px] text-secondary transition-colors hover:border-secondary hover:text-secondary-foreground">
						{tech}
					</span>
				{/each}
                {#if project.technologies.length > 4}
                    <span class="inline-flex items-center px-1 text-[10px] text-muted-foreground">+{project.technologies.length - 4}</span>
                {/if}
			</div>
		</div>

		<div class="mt-auto flex items-center gap-3 border-t border-border/40 pt-3">
			{#if project.liveLink}
				<a
					href={project.liveLink}
					target="_blank"
					rel="noopener noreferrer"
					class="flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary/80 hover:underline"
				>
					<Activity class="h-3.5 w-3.5" />
					HTTP:80
				</a>
			{/if}
			
			{#if project.sourceLink}
				<a
					href={project.sourceLink}
					target="_blank"
					rel="noopener noreferrer"
					class="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
				>
					<Github class="h-3.5 w-3.5" />
					SOURCE
				</a>
			{/if}
		</div>
	</div>
</div>