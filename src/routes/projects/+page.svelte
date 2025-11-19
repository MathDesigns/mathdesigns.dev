<script lang="ts">
    import { run } from 'svelte/legacy';

	import { onMount } from 'svelte';
	import type { Project } from '$lib/types/project';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Filter, Loader2 } from 'lucide-svelte';
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

        // 1. Process GitHub data immediately without images
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
                    imageUrl: undefined, // Load this later
                    technologies: [...new Set(technologies)],
                    liveLink: repo.homepage || undefined,
                    sourceLink: repo.html_url,
                    status: status,
                };
            });

        allProjects = initialProjects;
        
        // Calculate filters immediately
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
             if (aIsStatus && bIsStatus) {
                 return statuses.indexOf(a as any) - statuses.indexOf(b as any);
             }
             return a.localeCompare(b);
        });

        isLoading = false;

        // 2. Lazy load images in the background
        loadProjectImages(initialProjects);

    } catch (e: any) {
        console.error("Failed to fetch projects:", e);
        error = e.message || 'Failed to load projects from GitHub.';
        allProjects = [];
        isLoading = false;
    }
}

// New helper function for lazy loading
async function loadProjectImages(projects: Project[]) {
    // We process them in small batches or one by one to avoid rate limits
    for (let i = 0; i < projects.length; i++) {
        try {
            
            const catResponse = await fetch('https://api.thecatapi.com/v1/images/search?mime_types=gif');
            if (catResponse.ok) {
                const catData = await catResponse.json();
                if (catData && catData.length > 0 && catData[0].url) {
                    // Update the specific project in the array
                    allProjects[i] = { ...allProjects[i], imageUrl: catData[0].url };
                    // Trigger Svelte reactivity
                    allProjects = allProjects; 
                }
            }
        } catch (err) {
            console.warn(`Failed to load image for project ${projects[i].title}`, err);
        }
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
	<title>Projects | MathDesigns Portfolio</title>
	<meta name="description" content="A collection of web development projects by MathDesigns, fetched from GitHub." />
</svelte:head>

<div
	class="animate-initial-hidden transition-default container mx-auto px-4 py-8 md:px-0"
	use:animateOnScroll={{ once: true }}
>
	<h1 class="mb-2 text-center text-3xl font-bold md:text-4xl">My GitHub Projects</h1>
	<p class="mb-8 text-center text-lg text-muted-foreground">
		A selection of my public repositories.
	</p>

	{#if isLoading}
		<div class="flex flex-col items-center justify-center text-center py-20">
			<Loader2 class="h-12 w-12 animate-spin text-primary mb-4" />
			<p class="text-muted-foreground">Fetching projects & cat GIFs 🐱</p>
		</div>
	{:else if error}
		<div class="text-center py-20">
			<p class="text-destructive text-lg mb-2">Oops! Something went wrong.</p>
			<p class="text-muted-foreground mb-4">{error}</p>
			<Button on:click={fetchProjects} variant="outline">
				Try Again
			</Button>
		</div>
	{:else}
		<div class="mb-10 flex flex-wrap justify-center items-center gap-2 px-2">
			<p class="mr-2 flex items-center text-sm text-muted-foreground shrink-0">
				<Filter class="mr-1.5 h-4 w-4" />
				Filter:
			</p>
			{#each availableFilters as filterName (filterName)}
				<Button
					variant={currentFilter === filterName ? 'secondary' : 'ghost'}
					size="sm"
					class="text-xs h-8 px-3 rounded-full transition-all duration-200 ease-in-out
                           {currentFilter === filterName ? 'shadow-md' : 'hover:bg-accent/50'}"
					on:click={() => (currentFilter = filterName)}
				>
					{filterName}
				</Button>
			{/each}
		</div>

		{#if filteredProjects.length > 0}
			<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
				{#each filteredProjects as project, i (project.id)}
					<div
						class="animate-initial-scale-down transition-default"
						use:animateOnScroll={{ threshold: 0.1, rootMargin: '0px 0px -50px 0px', once: true }}
						style="transition-delay: {i * 100}ms;"
					>
						<ProjectCard {project} />
					</div>
				{/each}
			</div>
		{:else}
			<p class="mt-12 text-center text-muted-foreground">
				No projects match the filter "{currentFilter}". Try another one or select "All".
			</p>
		{/if}
	{/if}
</div>
