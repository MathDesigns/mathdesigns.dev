<script lang="ts">
	import { Home, User, Briefcase, Mail, Command, Sun, Moon } from '@lucide/svelte';
	import { cn } from '$lib/utils';
	import { onMount } from 'svelte';

	let navItems = [
		{ href: '#hero', icon: Home, label: 'Home' },
		{ href: '#projects', icon: Briefcase, label: 'Work' },
		{ href: '#about', icon: User, label: 'About' },
		{ href: '#contact', icon: Mail, label: 'Contact' }
	];

	let activeSection = $state('#hero');
	let isDark = $state(true);

	function setActive(href: string) {
		activeSection = href;
	}

	function toggleTheme() {
		isDark = !isDark;
		if (isDark) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}

	onMount(() => {
		isDark = document.documentElement.classList.contains('dark');
	});
</script>

<div
	class="fixed bottom-6 left-1/2 z-50 w-[95%] max-w-md -translate-x-1/2 transform md:w-auto md:max-w-none"
>
	<nav
		class="hover:shadow-primary/20 hover:ring-primary/50 hidden items-center gap-1 rounded-full border border-white/10 bg-black/50 p-2 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:bg-black/70 hover:ring-1 md:flex"
	>
		{#each navItems as item}
			<a
				href={item.href}
				onclick={() => setActive(item.href)}
				class={cn(
					'focus-visible:ring-primary relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none',
					activeSection === item.href
						? 'bg-primary/20 text-primary'
						: 'text-muted-foreground hover:text-foreground hover:bg-white/5'
				)}
			>
				{#if activeSection === item.href}
					<span
						class="bg-primary/10 absolute inset-0 rounded-full"
						style="view-transition-name: nav-active"
					></span>
				{/if}
				<item.icon class="h-4 w-4" aria-hidden="true" />
				<span>{item.label}</span>
			</a>
		{/each}

		<div class="mx-2 h-4 w-px bg-white/10"></div>

		<button
			onclick={toggleTheme}
			class="text-muted-foreground hover:bg-primary focus-visible:ring-primary flex h-9 w-9 items-center justify-center rounded-full bg-white/5 transition-colors hover:text-white focus-visible:ring-2 focus-visible:outline-none"
			aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
		>
			{#if isDark}
				<Moon class="h-4 w-4" aria-hidden="true" />
			{:else}
				<Sun class="h-4 w-4" aria-hidden="true" />
			{/if}
		</button>
	</nav>

	<nav
		class="flex items-center justify-between gap-1 rounded-3xl border border-white/10 bg-black/80 px-4 py-3 shadow-2xl backdrop-blur-xl md:hidden"
	>
		<div class="flex flex-1 justify-around gap-1">
			{#each navItems as item}
				<a
					href={item.href}
					onclick={() => setActive(item.href)}
					class={cn(
						'focus-visible:ring-primary flex flex-col items-center justify-center gap-1 rounded-xl px-2 py-1 transition-all focus-visible:ring-2 focus-visible:outline-none',
						activeSection === item.href ? 'text-primary bg-white/5' : 'text-muted-foreground'
					)}
				>
					<item.icon class="h-5 w-5" aria-hidden="true" />
					<span class="text-[11px] font-medium">{item.label}</span>
				</a>
			{/each}
		</div>

		<div class="mx-2 h-8 w-px bg-white/10"></div>

		<button
			onclick={toggleTheme}
			class="text-muted-foreground focus-visible:ring-primary flex flex-col items-center justify-center gap-1 rounded-xl bg-white/5 px-3 py-1 transition-colors hover:bg-white/10 focus-visible:ring-2 focus-visible:outline-none active:scale-95"
			aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
		>
			{#if isDark}
				<Moon class="h-5 w-5" aria-hidden="true" />
			{:else}
				<Sun class="h-5 w-5" aria-hidden="true" />
			{/if}
			<span class="text-[11px] font-medium">Theme</span>
		</button>
	</nav>
</div>
