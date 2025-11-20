<script lang="ts">
	import { Avatar, AvatarImage, AvatarFallback } from '$lib/components/ui/avatar';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import {
		GitCommit,
		GitPullRequest,
		Terminal,
		Cpu,
		Server,
		Shield,
		Zap,
		Coffee,
		ArrowRight,
		CheckCircle2,
		Network
	} from '@lucide/svelte';
	import { animateOnScroll } from '$lib/actions/animateOnScroll';

	const yourName = 'Math';
	const yourInitials = 'MD'; // MathDesigns
	const profileImageUrl = 'https://github.com/MathDesigns.png';

	// Pipeline Steps (formerly Timeline)
	const pipelineSteps = [
		{
			stage: 'SOURCE',
			label: 'Education',
			date: '2022 - 2026',
			icon: GitCommit,
			title: 'Commit: CS Degree',
			desc: 'Initializing knowledge base. Focusing on Java architecture and software patterns.',
			status: 'success'
		},
		{
			stage: 'BUILD',
			label: 'Learning',
			date: 'Ongoing',
			icon: Terminal,
			title: 'Compiling Skills',
			desc: 'Integrating SvelteKit and modern web stacks. Resolving dependencies in real-time.',
			status: 'active'
		},
		{
			stage: 'TEST',
			label: 'Experimentation',
			date: 'Present',
			icon: Zap,
			title: 'Unit Testing',
			desc: ' experimenting with Go (Golang) and distributed systems. Running chaos engineering on personal projects.',
			status: 'active'
		},
		{
			stage: 'DEPLOY',
			label: 'Professional',
			date: 'Future',
			icon: GitPullRequest,
			title: 'Production Release',
			desc: 'Ready to deploy into a Junior Developer role. 99.9% Uptime guaranteed.',
			status: 'pending'
		}
	];

    // Toolkit as "Dependencies"
	const dependencies = [
		{ name: 'Java (OpenJDK)', version: '21.0', type: 'Core', icon: Coffee },
		{ name: 'SvelteKit', version: '5.0', type: 'Frontend', icon: Zap },
		{ name: 'TailwindCSS', version: '4.0', type: 'Style', icon: Terminal },
		{ name: 'Docker', version: 'Latest', type: 'Infra', icon: Server },
		{ name: 'Linux', version: 'Arch/Debian', type: 'OS', icon: Cpu },
		{ name: 'Go', version: '1.22', type: 'Learning', icon: Network }
	];

    // Home Lab / Infrastructure
    const infrastructure = [
        { name: 'Proxmox Cluster', status: 'Online', specs: '3 Nodes, 64GB RAM' },
        { name: 'Kubernetes (K3s)', status: 'Degraded', specs: 'Raspberry Pi Stack' }, // Fun detail
        { name: 'NAS Storage', status: 'Online', specs: 'TrueNAS Scale, 20TB' },
        { name: 'Network Core', status: 'Online', specs: 'UniFi Dream Machine' }
    ];
</script>

<svelte:head>
	<title>SysAdmin Profile | {yourName}</title>
	<meta
		name="description"
		content="System diagnostics and architecture overview for MathDesigns."
	/>
</svelte:head>

<div class="container mx-auto px-4 py-12 font-mono text-sm md:text-base">
	
    <section class="mb-16 border-b border-border pb-8">
        <div class="flex items-center gap-2 text-muted-foreground mb-4 text-xs uppercase tracking-widest">
            <div class="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
            System Diagnostics Report
        </div>
        <h1 class="text-3xl md:text-5xl font-bold tracking-tighter mb-2">
            User: <span class="text-primary">{yourName}</span>
        </h1>
        <p class="text-muted-foreground max-w-2xl">
            > Role: Junior Fullstack Developer<br>
            > Location: Wallonia, BE<br>
            > Permissions: <span class="text-yellow-500">sudo</span> access granted
        </p>
    </section>

	<div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        <div class="lg:col-span-1">
			<div
                class="sticky top-24 overflow-hidden rounded-sm border border-border bg-card/30"
                use:animateOnScroll={{ threshold: 0.1 }}
            >
                <div class="bg-muted/50 p-2 border-b border-border flex justify-between items-center">
                    <span class="text-xs text-muted-foreground">user_profile.json</span>
                    <Badge variant="outline" class="text-[10px] h-5 border-green-500/50 text-green-500 bg-green-500/10">Authenticated</Badge>
                </div>
                <div class="p-6 flex flex-col items-center text-center">
                    <Avatar class="h-48 w-48 border-2 border-primary/20 mb-6 rounded-none">
                        <AvatarImage src={profileImageUrl} alt={yourName} />
                        <AvatarFallback class="rounded-none text-4xl bg-muted">{yourInitials}</AvatarFallback>
                    </Avatar>
                    
                    <div class="w-full space-y-4 text-left text-xs font-mono">
                        <div class="flex justify-between border-b border-border/50 pb-2">
                            <span class="text-muted-foreground">Username:</span>
                            <span class="text-primary">mathdesigns</span>
                        </div>
                        <div class="flex justify-between border-b border-border/50 pb-2">
                            <span class="text-muted-foreground">Home Dir:</span>
                            <span>/home/math</span>
                        </div>
                        <div class="flex justify-between border-b border-border/50 pb-2">
                            <span class="text-muted-foreground">Shell:</span>
                            <span>zsh</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-muted-foreground">Bio:</span>
                        </div>
                        <p class="text-muted-foreground leading-relaxed">
                            "Passionate Junior Dev transforming ideas into scalable code. Thriving on complex problems and elegant solutions."
                        </p>
                    </div>

                    <Button href="/contact" class="w-full mt-6 group" variant="outline">
                        <Terminal class="mr-2 h-4 w-4" />
                        Initiate Handshake
                    </Button>
                </div>
			</div>
		</div>

        <div class="lg:col-span-2 space-y-16">
			
            <section>
				<h2 class="flex items-center text-xl font-bold mb-8 border-l-4 border-primary pl-4">
                    <GitPullRequest class="mr-3 h-6 w-6 text-primary" />
                    Build Pipeline
                </h2>
				
                <div class="relative border-l border-border/50 ml-3 md:ml-6 space-y-12">
					{#each pipelineSteps as step, i}
						<div
							class="relative pl-8 md:pl-12"
							use:animateOnScroll={{ threshold: 0.2 }}
						>
                            <div class="absolute -left-[5px] top-1 h-2.5 w-2.5 rounded-full ring-4 ring-background 
                                {step.status === 'success' ? 'bg-green-500' : step.status === 'active' ? 'bg-primary animate-pulse' : 'bg-muted'}">
                            </div>
                            
							<div class="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                                <Badge variant="outline" class="w-fit font-mono text-[10px] rounded-sm mb-1 sm:mb-0">
                                    {step.stage}
                                </Badge>
                                <span class="text-xs text-muted-foreground font-mono">{step.date}</span>
                            </div>

							<h3 class="text-lg font-bold text-foreground mb-2 flex items-center gap-2">
                                {step.title}
                            </h3>
							<p class="text-muted-foreground leading-relaxed border-l-2 border-border/30 pl-4">
                                {step.desc}
                            </p>
						</div>
					{/each}
				</div>
			</section>

            <section>
                <h2 class="flex items-center text-xl font-bold mb-8 border-l-4 border-primary pl-4">
                    <Server class="mr-3 h-6 w-6 text-primary" />
                    Infrastructure Status
                </h2>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {#each infrastructure as item}
                        <div class="bg-card/20 border border-border p-4 rounded-sm flex justify-between items-start hover:border-primary/30 transition-colors">
                            <div>
                                <div class="font-bold mb-1">{item.name}</div>
                                <div class="text-xs text-muted-foreground">{item.specs}</div>
                            </div>
                            <div class="flex items-center gap-1.5">
                                <div class={`h-1.5 w-1.5 rounded-full ${item.status === 'Online' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                                <span class="text-[10px] uppercase">{item.status}</span>
                            </div>
                        </div>
                    {/each}
                </div>
            </section>

            <section>
				<h2 class="flex items-center text-xl font-bold mb-8 border-l-4 border-primary pl-4">
                    <Cpu class="mr-3 h-6 w-6 text-primary" />
                    Package Dependencies
                </h2>
				<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
					{#each dependencies as dep, i}
						<div
							class="group flex items-center gap-4 rounded-sm border border-border bg-card/30 p-4 transition-all hover:border-primary/50 hover:bg-card/50"
							style="transition-delay: {i * 50}ms;"
						>
							<div class="rounded-sm bg-primary/10 p-2 text-primary group-hover:text-foreground group-hover:bg-primary transition-colors">
								<dep.icon class="h-5 w-5" />
							</div>
							<div>
								<h3 class="font-semibold text-foreground">{dep.name}</h3>
								<p class="text-xs text-muted-foreground">v{dep.version} <span class="text-border mx-1">|</span> {dep.type}</p>
							</div>
						</div>
					{/each}
				</div>
			</section>

		</div>
	</div>
</div>