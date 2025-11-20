<script lang="ts">
	import '../app.css';
	import ThemeSwitcher from '$lib/components/ThemeSwitcher.svelte';
	import CommandPaletteComponent from '$lib/components/CommandPalette.svelte';
	import { cmd as commandPalette } from '$lib/stores/commandPaletteStore';
	import activeTheme from '$lib/stores/themeStore';
	import { browser } from '$app/environment';
	import { Menu, X, Command as CommandIcon, ArrowDown } from '@lucide/svelte';
	import { Button } from '$lib/components/ui/button';
	import { page } from '$app/stores';
	import { fly } from 'svelte/transition';
	
	let { children } = $props();

	let mobileMenuOpen = $state(false);
	let showBackToTop = $state(false);
	let scrollY = $state(0);

	const navLinks = [
		{ href: '/projects', text: 'Projects' },
		{ href: '/about', text: 'About' },
		{ href: '/contact', text: 'Contact' }
	];

	
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
		
		return () => {
			document.body.style.overflow = '';
		};
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

<div class="min-h-screen flex flex-col">
	<header
		data-layout-fixed
		class="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 p-4 backdrop-blur supports-backdrop-filter:bg-background/60"
	>
		<div class="max-w-(--breakpoint-2xl) container flex h-14 items-center">
			<a href="/" class="mr-6 flex items-center space-x-2" onclick={() => (mobileMenuOpen = false)}>
				<img
					src="/logo.png"
					alt="MathDesigns Home"
					width="28"
					height="28"
					class="text-primary h-7 w-7 transition-transform hover:rotate-[-15deg]"
				/>

				<span class="hover:text-primary text-xl font-semibold transition-colors">MathDesigns</span>
			</a>

			<nav class="hidden flex-1 items-center space-x-2 md:flex">
				{#each navLinks as link}
					<Button
						variant="link"
						href={link.href}
						class="px-3 py-2 text-sm font-medium {$page.url.pathname === link.href
							? 'text-primary underline underline-offset-4'
							: 'text-muted-foreground hover:text-foreground hover:no-underline'}"
						data-sveltekit-preload-data="hover"
						data-sveltekit-preload-code="hover"
					>
						{link.text}
					</Button>
				{/each}
			</nav>

			<div class="ml-auto flex items-center gap-2 md:ml-4">
				<Button
					onclick={commandPalette.open}
					variant="outline"
					size="icon"
					aria-label="Open command palette"
					class="hidden h-9 w-9 sm:flex"
				>
					<CommandIcon class="h-4 w-4" />
				</Button>
				<ThemeSwitcher />
				
				<div class="md:hidden">
					<Button
						onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
						variant="ghost"
						size="icon"
						aria-label="Toggle menu"
						class="h-9 w-9"
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
				class="bg-background/95 absolute left-0 right-0 top-full max-h-[calc(100vh-3.5rem)] overflow-y-auto border-b border-border pb-4 shadow-lg backdrop-blur-md md:hidden"
				transition:fly={{ y: -10, duration: 200 }}
			>
				<nav class="flex flex-col items-stretch gap-1 p-2">
					{#each navLinks as link}
						<Button
							variant="ghost"
							href={link.href}
							class="w-full justify-start px-3 py-3 text-base {$page.url.pathname === link.href
								? 'text-black bg-white'
								: 'text-foreground hover:bg-accent/50'}"
							onclick={() => (mobileMenuOpen = false)}
							data-sveltekit-preload-data="hover"
							data-sveltekit-preload-code="hover"
						>
							{link.text}
						</Button>
					{/each}
					<Button
						onclick={() => {
							commandPalette.open();
							mobileMenuOpen = false;
						}}
						variant="ghost"
						class="text-foreground hover:bg-accent/50 w-full justify-start px-3 py-3 text-base"
					>
						<CommandIcon class="mr-2 h-5 w-5" /> Command Palette
					</Button>
				</nav>
			</div>
		{/if}
	</header>

	<main class="flex-1 pt-[88px]">
		{@render children()}
	</main>

	<footer class="text-muted-foreground p-4 text-center text-sm">
		© {new Date().getFullYear()} MathDesigns | Writing FOSS with ❤️
		<span class="hidden md:inline">(Cmd/Win + K for commands)</span>
	</footer>
</div>

<button
	class="bg-primary text-primary-foreground fixed bottom-6 right-6 z-40 rounded-full p-3 shadow-lg transition-all duration-300 {showBackToTop
		? 'translate-y-0 opacity-100'
		: 'translate-y-10 opacity-0 pointer-events-none'}"
	onclick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
	aria-label="Back to top"
>
	<ArrowDown class="h-5 w-5 rotate-180" />
</button>

<CommandPaletteComponent />