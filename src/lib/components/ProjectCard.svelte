<script lang="ts">
	import type { Project } from '$lib/types/project';
	import {
		Card,
		CardContent,
		CardDescription,
		CardFooter,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card'; 
	import { Badge } from '$lib/components/ui/badge'; 
	import { Button } from '$lib/components/ui/button'; 
	import { ExternalLink, Github, Construction } from 'lucide-svelte';

	interface Props {
		project: Project;
	}

	let { project }: Props = $props();
</script>

<Card class="flex flex-col h-full group overflow-hidden transform transition-all duration-300 ease-in-out 
             hover:shadow-xl hover:-translate-y-1 
             active:scale-[0.98] active:shadow-sm cursor-pointer">
	{#if project.imageUrl}
		<div class="overflow-hidden aspect-[16/9]">
			<img
				src={project.imageUrl}
				alt={project.title}
				class="object-cover w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-105"
			/>
		</div>
	{/if}
	<CardHeader>
		<CardTitle class="text-lg md:text-xl">{project.title}</CardTitle>
		{#if project.status}
			<Badge variant={project.status === 'Completed' ? 'default' : project.status === 'In Progress' ? 'secondary' : 'outline'} class="w-fit mt-1 text-xs">
                {#if project.status === 'In Progress'} <Construction class="w-3 h-3 mr-1" /> {/if}
                {project.status}
            </Badge>
		{/if}
		<CardDescription class="text-sm pt-1 h-16 overflow-hidden text-ellipsis">
			{project.description}
		</CardDescription>
	</CardHeader>
	<CardContent class="flex-grow">
		<div class="mb-2">
			<h4 class="text-xs font-semibold uppercase text-muted-foreground mb-1">Technologies:</h4>
			<div class="flex flex-wrap gap-1">
				{#each project.technologies as tech}
					<Badge variant="secondary" class="text-xs">{tech}</Badge>
				{/each}
			</div>
		</div>
	</CardContent>
	<CardFooter class="mt-auto flex flex-wrap gap-2 justify-start pt-2">
		{#if project.liveLink}
			<Button href={project.liveLink} target="_blank" rel="noopener noreferrer" variant="outline" size="sm" class="text-xs">
				<ExternalLink class="w-3 h-3 mr-1.5" />
				Live Demo
			</Button>
		{/if}
		{#if project.sourceLink}
			<Button href={project.sourceLink} target="_blank" rel="noopener noreferrer" variant="ghost" size="sm" class="text-xs">
				<Github class="w-3 h-3 mr-1.5" />
				Source
			</Button>
		{/if}
	</CardFooter>
</Card>