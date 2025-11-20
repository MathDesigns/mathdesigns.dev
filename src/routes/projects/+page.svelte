<script lang="ts">
    import { run } from 'svelte/legacy';
	import { onMount } from 'svelte';
	import type { Project } from '$lib/types/project';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Terminal, Loader2, Search, AlertCircle } from '@lucide/svelte';
	import { animateOnScroll } from '$lib/actions/animateOnScroll';

	let allProjects: Project[] = $state([]);
	let filteredProjects: Project[] = $state([]);
	let isLoading = $state(true);
	let error: string | null = $state(null);
	let currentFilter = $state('All');
    
	const statuses: ('Completed' | 'In Progress' | 'Archived')[] = ['Completed', 'In Progress', 'Archived'];
	let availableFilters: string[] = $state(['All', ...statuses]);

	async function fetchProjects() {
		isLoading = true;
		error = null;
		try {
			const githubResponse = await fetch('https://api.github.com/users/MathDesigns/repos?sort=pushed&per_page=50');
			
            if (!githubResponse.ok) {
				throw new Error(`GitHub API request failed: ${githubResponse.status}`);
			}
            
			const githubData = await githubResponse.json();
			
			const initialProjects: Project[] = githubData
				.filter((repo: any) => !repo.fork && repo.description)
				.map((repo: any): Project => {
					const technologies = [];
					if (repo.language) technologies.push(repo.language);
					if (repo.topics && Array.isArray(repo.topics)) technologies.push(...repo.topics);

					let status: Project['status'] = 'Completed';
					if (repo.archived) {
						status = 'Archived';
					} else {
						const lastPush = new Date(repo.pushed_at);
						const threeMonthsAgo = new Date();
						threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
						if (lastPush > threeMonthsAgo) {
							status = 'In Progress';
						}
					}

					return {
						id: repo.id.toString(),
						title: repo.name,
						description: repo.description || 'No description available.',
						technologies: [...new Set(technologies)],
						liveLink: repo.homepage || undefined,
						sourceLink: repo.html_url,
						status: status
					};
				});

			allProjects = initialProjects;
			
			// Extract languages for filters
			const mainLanguages = [
				...new Set(
					allProjects
						.map(p => (p.technologies && p.technologies.length > 0 ? p.technologies[0] : null))
						.filter((lang): lang is string => typeof lang === 'string' && lang.trim() !== '')
				)
			];
            
			availableFilters = ['All', ...statuses, ...mainLanguages].sort((a, b) => {
				if (a === 'All') return -1;
				if (b === 'All') return 1;
				const aIsStatus = statuses.includes(a as any);
				const bIsStatus = statuses.includes(b as any);
				if (aIsStatus && !bIsStatus) return -1;
				if (!aIsStatus && bIsStatus) return 1;
				return a.localeCompare(b);
			});

			isLoading = false;
		} catch (e: any) {
			console.error("Failed to fetch projects:", e);
			error = e.message || 'Connection to GitHub Registry failed.';
			allProjects = [];
			isLoading = false;
		}
	}

	onMount(() => {
		fetchProjects();
	});

	run(() => {
		if (currentFilter === 'All') {
			filteredProjects = allProjects;
		} else if (statuses.includes(currentFilter as 'Completed' | 'In Progress' | 'Archived')) {
			filteredProjects = allProjects.filter(p => p.status === currentFilter);
		} else {
			filteredProjects = allProjects.filter(p => 
				p.technologies && 
				p.technologies.length > 0 && 
				p.technologies[0]?.toLowerCase() === currentFilter.toLowerCase()
			);
		}
	});
</script>

<svelte:head>
	<title>Registry | MathDesigns</title>
	<meta name="description" content="Project Container Registry - MathDesigns" />
</svelte:head>

<div class="min-h-screen p-4 md:p-8 font-mono">
	<div class="mx-auto max-w-7xl">
		<div class="mb-8 flex flex-col gap-4 border-b border-border pb-6 md:flex-row md:items-end md:justify-between">
			<div>
				<h1 class="flex items-center text-2xl font-bold tracking-tight md:text-3xl">
					<Terminal class="mr-3 h-8 w-8 text-primary" />
					Container Registry
				</h1>
				<p class="mt-2 text-muted-foreground">
					> Indexing public repositories from <span class="text-foreground">github.com/MathDesigns</span>...
				</p>
			</div>
            
            {#if !isLoading && !error}
                <div class="flex gap-4 text-xs text-muted-foreground">
                    <div>
                        <span class="block font-bold text-foreground">{allProjects.length}</span>
                        IMAGES
                    </div>
                    <div>
                        <span class="block font-bold text-green-500">{allProjects.filter(p => p.status === 'Completed' || p.status === 'In Progress').length}</span>
                        ACTIVE
                    </div>
                    <div>
                        <span class="block font-bold text-red-500">{allProjects.filter(p => p.status === 'Archived').length}</span>
                        STOPPED
                    </div>
                </div>
            {/if}
		</div>

		<div class="mb-8 rounded-sm border border-border bg-card/30 p-2">
			<div class="flex items-center gap-2 px-2">
				<span class="text-green-500">root@registry:~#</span>
				<span class="text-primary">kubectl get projects</span>
				<span class="text-muted-foreground">--filter</span>
			</div>
            
			<div class="mt-3 flex flex-wrap gap-2 border-t border-border/50 pt-3">
				{#each availableFilters as filterName}
					<button
						class="group relative px-3 py-1 text-xs font-medium transition-all hover:text-primary
                               {currentFilter === filterName ? 'text-primary' : 'text-muted-foreground'}"
						onclick={() => (currentFilter = filterName)}
					>
                        {#if currentFilter === filterName}
                            <span class="absolute inset-0 bg-primary/10 border border-primary/20 rounded-sm"></span>
                        {/if}
						<span class="relative z-10">{filterName}</span>
					</button>
				{/each}
			</div>
		</div>

		{#if isLoading}
			<div class="flex h-64 flex-col items-center justify-center gap-4 rounded-sm border border-dashed border-border/50 bg-muted/10">
				<Loader2 class="h-8 w-8 animate-spin text-primary" />
				<div class="text-sm text-muted-foreground animate-pulse">
					> Pulling container images...
				</div>
			</div>
		{:else if error}
			<div class="flex h-64 flex-col items-center justify-center gap-4 rounded-sm border border-red-900/50 bg-red-900/10 p-8 text-center">
				<AlertCircle class="h-10 w-10 text-red-500" />
				<h3 class="text-lg font-bold text-red-500">Connection Refused</h3>
				<p class="text-sm text-red-400">{error}</p>
				<Button onclick={fetchProjects} variant="outline" class="border-red-500/50 hover:bg-red-900/20 text-red-400">
					Retry Connection
				</Button>
			</div>
		{:else if filteredProjects.length > 0}
			<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{#each filteredProjects as project, i (project.id)}
					<div
						class="animate-initial-scale-down is-visible"
						use:animateOnScroll={{ threshold: 0.1, once: true }}
						style="transition-delay: {i * 50}ms;"
					>
						<ProjectCard {project} />
					</div>
				{/each}
			</div>
		{:else}
			<div class="flex h-64 flex-col items-center justify-center text-muted-foreground">
				<Search class="mb-4 h-10 w-10 opacity-20" />
				<p>> No matching containers found for query "{currentFilter}"</p>
			</div>
		{/if}
	</div>
</div>