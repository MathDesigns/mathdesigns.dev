<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { cmd } from '$lib/stores/commandPaletteStore';
	
	import { Search, CornerDownLeft } from 'lucide-svelte';
	import * as Dialog from '$lib/components/ui/dialog';
	

	let storeOpen = false;
	let searchTerm = '';
	let filteredCommands: App.Command[] = [];
	let selectedIndex = 0;

	const unsubscribeOpen = cmd.subscribeOpen(value => storeOpen = value);
	const unsubscribeSearchTerm = cmd.subscribeSearchTerm(value => searchTerm = value);
	const unsubscribeFilteredCommands = cmd.subscribeFilteredCommands(value => {
        filteredCommands = value;
        
        if (selectedIndex >= value.length) {
            cmd.setSelectedIndex(Math.max(0, value.length - 1));
        }
    });
	const unsubscribeSelectedIndex = cmd.subscribeSelectedIndex(value => selectedIndex = value);

	let inputElement: HTMLInputElement;
    let commandListElement: HTMLDivElement; 

	function handleKeydown(event: KeyboardEvent) {
		if (!storeOpen) return;

		
		

		if (event.key === 'ArrowDown') {
			event.preventDefault();
			cmd.setSelectedIndex(Math.min(selectedIndex + 1, filteredCommands.length - 1));
            scrollToSelected();
		}
		if (event.key === 'ArrowUp') {
			event.preventDefault();
			cmd.setSelectedIndex(Math.max(selectedIndex - 1, 0));
            scrollToSelected();
		}
		if (event.key === 'Enter') {
			event.preventDefault();
			if (filteredCommands[selectedIndex]) {
				filteredCommands[selectedIndex].action();
				
			}
		}
	}
	
	onMount(() => {
		if (browser) {
			
			window.addEventListener('keydown', handleKeydown);
		}
	});

	onDestroy(() => {
		unsubscribeOpen();
		unsubscribeSearchTerm();
		unsubscribeFilteredCommands();
		unsubscribeSelectedIndex();
		if (browser) {
			window.removeEventListener('keydown', handleKeydown);
		}
	});

	
	$: if (browser && storeOpen && inputElement) {
		setTimeout(() => {
            if (inputElement) inputElement.focus();
        }, 50); 
	}

	function handleOpenChange(openStatus: boolean) {
        
        
        
		if (!openStatus && storeOpen) { 
			cmd.close(); 
		}
	}

    function scrollToSelected() {
        if (!commandListElement || !filteredCommands[selectedIndex]) return;
        const selectedElement = commandListElement.children[selectedIndex] as HTMLElement;
        if (selectedElement) {
            selectedElement.scrollIntoView({ block: 'nearest' });
        }
    }

    
    $: if (browser && storeOpen && selectedIndex >= 0 && commandListElement) {
        scrollToSelected();
    }

</script>

<Dialog.Root 
    bind:open={storeOpen} 
    onOpenChange={handleOpenChange}
    preventScroll={false} >
	<Dialog.Content 
        class="p-0 flex flex-col max-h-[70vh]" aria-label="Command Palette"
        >
		<div class="flex items-center p-3 border-b border-border shrink-0">
			<Search class="w-5 h-5 text-muted-foreground mr-3 shrink-0" />
			<input
				bind:this={inputElement}
				type="text"
				placeholder="Type a command or search..."
				class="w-full bg-transparent text-foreground placeholder-muted-foreground focus:outline-none text-sm"
				bind:value={searchTerm}
				on:input={(e) => cmd.setSearchTerm(e.currentTarget.value)}
			/>
		</div>

		<div bind:this={commandListElement} class="overflow-y-auto p-2 flex-grow">
			{#if filteredCommands.length > 0}
				{#each filteredCommands as command, i (command.id)}
					<button
						id={`cmd-${command.id}`}
						role="option"
						aria-selected={selectedIndex === i}
						class="w-full flex items-center justify-between p-2.5 text-sm rounded-md text-left
                               {selectedIndex === i ? 'bg-primary text-primary-foreground' : 'hover:bg-accent hover:text-accent-foreground'}"
						on:click={command.action}
						on:mouseenter={() => cmd.setSelectedIndex(i)}
					>
						<div class="flex items-center">
							{#if command.icon}
								<svelte:component this={command.icon} class="w-4 h-4 mr-2.5 text-muted-foreground {selectedIndex === i ? 'text-primary-foreground': ''}" />
							{/if}
							<span class="flex-grow {selectedIndex === i ? 'text-primary-foreground': 'text-foreground'}">{command.label}</span>
						</div>
						{#if command.category && searchTerm.length === 0}
							<span class="text-xs text-muted-foreground px-1.5 py-0.5 rounded bg-muted/50">{command.category}</span>
						{/if}
						{#if selectedIndex === i}
                            <CornerDownLeft class="w-4 h-4 ml-2 text-muted-foreground {selectedIndex === i ? 'text-primary-foreground': ''} shrink-0" />
                        {/if}
					</button>
				{/each}
			{:else if searchTerm.trim() !== ''}
				 <p class="text-center text-muted-foreground p-6 text-sm">No commands found for "{searchTerm}".</p>
            {:else}
                 <p class="text-center text-muted-foreground p-6 text-sm">Type to search commands.</p> {/if}
		</div>

        <div class="p-2 border-t border-border text-xs text-muted-foreground flex justify-between shrink-0">
            <span>Use <kbd class="px-1.5 py-0.5 border border-border rounded bg-muted font-mono text-xs">↑</kbd> <kbd class="px-1.5 py-0.5 border border-border rounded bg-muted font-mono text-xs">↓</kbd> to navigate</span>
            <span><kbd class="px-1.5 py-0.5 border border-border rounded bg-muted font-mono text-xs">Enter</kbd> to select</span>
            <span><kbd class="px-1.5 py-0.5 border border-border rounded bg-muted font-mono text-xs">Esc</kbd> to close</span>
        </div>
	</Dialog.Content>
</Dialog.Root>
