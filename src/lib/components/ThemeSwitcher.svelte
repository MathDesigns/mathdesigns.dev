<script lang="ts">
	import activeTheme, { cycleTheme, themes, setTheme, type Theme} from '$lib/stores/themeStore';
	import { Button } from '$lib/components/ui/button';
	import { 
        Sun, Moon, MonitorSmartphone, Trees, Layers, Terminal, 
        Settings2, Gamepad2, DraftingCompass, CircleDot, Palette, 
		Cat, type Icon as IconType

    } from '@lucide/svelte';
	import { onMount, type ComponentType } from 'svelte';

	let currentTheme: Theme | undefined = $state();
	activeTheme.subscribe(value => {
		currentTheme = value;
	});

	const themeDetails: Record<Theme, { icon: typeof IconType; name: string }> = {
        pureblack: { icon: Moon, name: 'Pure Black' }, 
        classiclight: { icon: Sun, name: 'Classic Light' }, 
        catpuccin: { icon: Cat, name: 'Catppuccin' }, 
        cyberpunk: { icon: MonitorSmartphone, name: 'Cyber' },
        forest: { icon: Trees, name: 'Forest' },
        nord: { icon: Layers, name: 'Nord' },
        terminalgreen: { icon: Terminal, name: 'Trmnl Green' },
        terminalamber: { icon: Terminal, name: 'Trmnl Amber' },
        archlinux: { icon: Settings2, name: 'Arch' },
        eightsunset: { icon: Gamepad2, name: '8-Bit Sunset' },
        blueprint: { icon: DraftingCompass, name: 'Blueprint' }
    };

	let mounted = $state(false);
    onMount(() => {
        mounted = true;
    });

	function getNextThemeDetails(): { icon: typeof IconType; name: string } {
        const currentIndex = currentTheme ? themes.indexOf(currentTheme) : 0;
        const nextIndex = (currentIndex + 1) % themes.length;
		return themeDetails[themes[nextIndex] || themes[0]];
	}
</script>

{#if mounted && currentTheme && themeDetails[currentTheme]}
	<Button
		variant="outline" 
		size="icon"
		onclick={cycleTheme}
		aria-label={`Switch to ${getNextThemeDetails()?.name || 'next'} theme`}
		class="relative w-10 h-10 rounded-full p-0 text-foreground hover:bg-accent" 
        >
        {@const SvelteComponent = themeDetails[currentTheme].icon}
        <SvelteComponent 
            class="h-[1.2rem] w-[1.2rem] transition-all duration-300 ease-in-out transform scale-100" 
        />
		<span class="sr-only">Switch Theme to {getNextThemeDetails()?.name}</span>
	</Button>
{/if}