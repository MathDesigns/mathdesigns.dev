<script lang="ts">
	import '../app.css';
	import ThemeSwitcher from '$lib/components/ThemeSwitcher.svelte';
	import CommandPaletteComponent from '$lib/components/CommandPalette.svelte';
	import { cmd as commandPalette } from '$lib/stores/commandPaletteStore';
	import activeTheme from '$lib/stores/themeStore';
	import { browser } from '$app/environment';
	import { Menu, X, Command as CommandIcon } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button'; 
	import { onMount, afterUpdate } from 'svelte'; 
	import { page } from '$app/stores';
	import { fly } from 'svelte/transition';
	import { get } from 'svelte/store';

	let currentThemeFromStore = get(activeTheme); 

	$: if (browser && $activeTheme) {
		
	}

	let mobileMenuOpen = false;
	


	function toggleMobileMenu() {
		
		mobileMenuOpen = !mobileMenuOpen;
		
		if (browser && mobileMenuOpen) {
			
			document.body.style.overflow = 'hidden';
		} else if (browser) {
			
			document.body.style.overflow = '';
		}
	}
	function closeMobileMenu() {
		
		if (mobileMenuOpen) {
			mobileMenuOpen = false;
			
			if (browser) {
				
				document.body.style.overflow = '';
			}
		}
	}

    
	let previousPathname: string | undefined = undefined;

    
	afterUpdate(() => {
		if (browser && mobileMenuOpen) {
			if (previousPathname !== undefined && $page.url.pathname !== previousPathname) {
				
				closeMobileMenu();
			}
		}
		previousPathname = $page.url.pathname; 
	});
    

	const navLinks = [
		{ href: '/', text: 'Home' },
		{ href: '/projects', text: 'Projects' },
		{ href: '/about', text: 'About' },
		{ href: '/contact', text: 'Contact' }
	];

	function handleGlobalKeydown(event: KeyboardEvent) {
		if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
			event.preventDefault();
			commandPalette.toggle();
		}
	}

	onMount(() => {
		
        if (browser) {
            previousPathname = $page.url.pathname; 
			window.addEventListener('keydown', handleGlobalKeydown);
		}
		return () => {
			
			if (browser) {
				window.removeEventListener('keydown', handleGlobalKeydown); 
				document.body.style.overflow = ''; 
			}
		};
	});
</script>

<div class="min-h-screen flex flex-col">
    <header
        data-layout-fixed class="p-4 sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
        <div class="container flex h-14 max-w-screen-2xl items-center">
            <a href="/" class="mr-6 flex items-center space-x-2" on:click={closeMobileMenu}>
                <img src="/logo.png" alt="logo" width="28" height="28"class="h-7 w-7 text-primary transition-transform hover:rotate-[-15deg]">
                <span class="text-xl font-semibold hover:text-primary transition-colors">MathDesigns</span>
            </a>

            <nav class="hidden md:flex items-center space-x-2 flex-1">
                {#each navLinks as link}
                    <Button 
                        variant="link" 
                        href={link.href} 
                        class="px-3 py-2 text-sm font-medium { $page.url.pathname === link.href 
                                   ? 'text-primary underline underline-offset-4' 
                                   : 'text-muted-foreground hover:text-foreground hover:no-underline'}" 
                        data-sveltekit-preload-data="hover"  
                        data-sveltekit-preload-code="hover"
                    >
                        {link.text}
                    </Button>
                {/each}
            </nav>

            <div class="flex items-center gap-2 ml-auto md:ml-4">
                <Button on:click={commandPalette.open} variant="outline" size="icon" aria-label="Open command palette" class="hidden sm:flex w-9 h-9">
                    <CommandIcon class="h-4 w-4" />
                </Button>
                <ThemeSwitcher />
                <div class="md:hidden">
                    <Button on:click={toggleMobileMenu} variant="ghost" size="icon" aria-label="Toggle menu" class="w-9 h-9">
                        {#if mobileMenuOpen} <X class="h-5 w-5" /> {:else} <Menu class="h-5 w-5" /> {/if}
                    </Button>
                </div>
            </div>
        </div>

        {#if mobileMenuOpen}
            <div
                class="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md border-b border-border shadow-lg pb-4"
                transition:fly={{ y: -10, duration: 200 }}
            >
                <nav class="flex flex-col items-stretch gap-1 p-2">
                    {#each navLinks as link}
                        <Button 
                            variant="ghost" 
                            href={link.href} 
                            class="w-full justify-start px-3 py-2 text-base { $page.url.pathname === link.href 
                                       ? 'text-black bg-white' 
                                       : 'text-foreground hover:bg-accent/50'}"
                            on:click={closeMobileMenu} data-sveltekit-preload-data="hover"  
                            data-sveltekit-preload-code="hover"
                        >
                            {link.text}
                        </Button>
                    {/each}
                    <Button 
                        on:click={() => { commandPalette.open(); closeMobileMenu(); }} 
                        variant="ghost" 
                        class="w-full justify-start px-3 py-2 text-base text-foreground hover:bg-accent/50"
                    >
                        <CommandIcon class="h-5 w-5 mr-2" /> Command Palette
                    </Button>
                </nav>
            </div>
        {/if}
    </header>

    <main class="flex-1 pt-[88px]"> 
        <slot />
    </main>

    <footer class="p-4 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} MathDesigns. All Rights Reserved. (Cmd/Win + K for commands)
    </footer>
</div>

<CommandPaletteComponent />
