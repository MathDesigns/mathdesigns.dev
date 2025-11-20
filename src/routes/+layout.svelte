<script lang="ts">
	import '../app.css';
	import ThemeSwitcher from '$lib/components/ThemeSwitcher.svelte';
	import CommandPaletteComponent from '$lib/components/CommandPalette.svelte';
	import { cmd as commandPalette } from '$lib/stores/commandPaletteStore';
	import { browser } from '$app/environment';
	import { Menu, X, Command as CommandIcon, ArrowDown, Terminal, Activity, Wifi } from '@lucide/svelte';
	import { Button } from '$lib/components/ui/button';
	import { page } from '$app/stores';
	import { fly } from 'svelte/transition';
	
	let { children } = $props();
	let mobileMenuOpen = $state(false);
	let showBackToTop = $state(false);
	let scrollY = $state(0);
    let currentTime = $state(new Date().toLocaleTimeString());

	const navLinks = [
		{ href: '/projects', text: '~/projects' },
		{ href: '/about', text: '~/about' },
		{ href: '/contact', text: '~/contact' }
	];

    // Update time for the status bar
    $effect(() => {
        const interval = setInterval(() => {
            currentTime = new Date().toLocaleTimeString();
        }, 1000);
        return () => clearInterval(interval);
    });

	// Close mobile menu on navigation
	$effect(() => {
		const path = $page.url.pathname;
		mobileMenuOpen = false;
	});

	// Handle Body Scroll Lock
	$effect(() => {
		if (!browser) return;
		if (mobileMenuOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
		return () => { document.body.style.overflow = ''; };
	});

	// Handle Scroll Position for Back to Top
	function handleScroll() {
		if (!browser) return;
		scrollY = window.scrollY;
		showBackToTop = scrollY > 300;
	}

	// Global Keydown (Cmd+K)
	function handleGlobalKeydown(event: KeyboardEvent) {
		if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
			event.preventDefault();
			commandPalette.toggle();
		}
	}
</script>

<svelte:window onkeydown={handleGlobalKeydown} onscroll={handleScroll} />

<div class="min-h-screen flex flex-col font-mono">
	<header
		class="sticky top-0 z-50 w-full border-b border-border/60 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80"
	>
		<div class="max-w-(--breakpoint-2xl) container flex h-14 items-center px-4">
            <a href="/" class="mr-8 flex items-center space-x-2 group" onclick={() => (mobileMenuOpen = false)}>
                <div class="bg-primary/10 p-1.5 rounded-sm group-hover:bg-primary/20 transition-colors">
                    <Terminal class="h-5 w-5 text-primary" />
                </div>
				<span class="text-lg font-bold tracking-wider">MathDesigns<span class="text-primary animate-pulse">_</span></span>
			</a>

            <nav class="hidden flex-1 items-center space-x-1 md:flex">
				{#each navLinks as link}
					<a
						href={link.href}
						class="px-4 py-1.5 text-sm font-medium transition-colors rounded-sm relative
                            {$page.url.pathname === link.href
							? 'text-primary bg-primary/5'
							: 'text-muted-foreground hover:text-primary hover:bg-white/5'}"
						data-sveltekit-preload-data="hover"
						data-sveltekit-preload-code="hover"
					>
                        {link.text}
                        {#if $page.url.pathname === link.href}
                            <span class="absolute bottom-0 left-0 w-full h-[2px] bg-primary shadow-[0_0_8px_rgba(var(--primary),0.5)]"></span>
                        {/if}
					</a>
				{/each}
			</nav>

            <div class="ml-auto flex items-center gap-4">
                <div class="hidden lg:flex items-center space-x-3 text-xs text-muted-foreground border-r border-border/50 pr-4 mr-1">
                    <div class="flex items-center gap-1.5">
                        <Wifi class="h-3 w-3" />
                        <span>CONN: ESTABLISHED</span>
                    </div>
                    <div class="flex items-center gap-1.5">
                        <span class="relative flex h-2 w-2">
                          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span class="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <span class="text-green-500">SYSTEM ONLINE</span>
                    </div>
                </div>

				<Button
					onclick={commandPalette.open}
					variant="outline"
					size="sm"
                    class="hidden sm:flex gap-2 text-muted-foreground border-dashed border-border"
				>
					<span class="text-xs">Search...</span>
					<kbd class="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
						<span class="text-xs">⌘</span>K
					</kbd>
				</Button>
				
                <div class="md:hidden">
					<Button
						onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
						variant="ghost"
						size="icon"
                        class="text-primary"
					>
						{#if mobileMenuOpen}
							<X class="h-5 w-5" />
						{:else}
							<Menu class="h-5 w-5" />
						{/if}
					</Button>
				</div>
			</div>
		</div>

		{#if mobileMenuOpen}
			<div
				class="bg-background/95 absolute left-0 right-0 top-full border-b border-border shadow-2xl backdrop-blur-md md:hidden min-h-screen"
				transition:fly={{ y: -10, duration: 200 }}
			>
				<nav class="flex flex-col p-4 space-y-2">
					{#each navLinks as link}
						<a
							href={link.href}
							class="flex items-center px-4 py-3 text-base font-medium rounded-md border border-transparent
                                {$page.url.pathname === link.href
								? 'text-primary bg-primary/10 border-primary/20'
								: 'text-foreground hover:bg-muted'}"
							onclick={() => (mobileMenuOpen = false)}
						>
                            <span class="text-primary mr-2">></span> {link.text}
						</a>
					{/each}
                    <div class="h-px bg-border my-2"></div>
					<button
						onclick={() => {
							commandPalette.open();
							mobileMenuOpen = false;
						}}
                        class="flex w-full items-center px-4 py-3 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md"
					>
						<CommandIcon class="mr-2 h-4 w-4" /> Command Palette
					</button>
				</nav>
			</div>
		{/if}
	</header>

	<main class="flex-1">
		{@render children()}
	</main>

    <footer class="border-t border-border/40 bg-card/50 py-2 px-4 text-xs font-mono text-muted-foreground backdrop-blur-sm">
        <div class="container flex flex-col md:flex-row justify-between items-center gap-2">
            <div class="flex items-center gap-4">
                <span>MathDesigns © {new Date().getFullYear()}</span>
                <span class="hidden md:inline text-border">|</span>
                <span class="flex items-center gap-1">
                    <Activity class="h-3 w-3" />
                    <span>v2.0.0-alpha</span>
                </span>
            </div>
            
            <div class="flex items-center gap-4">
                 <span>Ln 1, Col 1</span>
                 <span class="hidden md:inline text-border">|</span>
                 <span>UTF-8</span>
                 <span class="hidden md:inline text-border">|</span>
                 <span class="text-primary">{currentTime}</span>
            </div>
        </div>
	</footer>
</div>

<button
	class="bg-primary text-primary-foreground fixed bottom-6 right-6 z-40 rounded-none border border-primary shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] {showBackToTop
		? 'translate-y-0 opacity-100'
		: 'translate-y-10 opacity-0 pointer-events-none'}"
	onclick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
	aria-label="Return to top"
>
    <div class="p-3 flex items-center gap-2 font-bold font-mono text-xs">
        <ArrowDown class="h-4 w-4 rotate-180" /> TOP
    </div>
</button>

<CommandPaletteComponent />