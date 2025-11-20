import { writable, derived } from 'svelte/store';
import type { Writable, Readable } from 'svelte/store';

import { goto } from '$app/navigation';
import { setTheme, themes as availableThemes, type Theme } from './themeStore';

import {
	Home,
	Briefcase,
	User,
	Mail,
	Sun,
	Moon,
	MonitorSmartphone,
	Trees,
	Palette,
	Search,
	ExternalLink,
	Layers,
	Terminal,
	Settings2,
	Gamepad2,
	DraftingCompass,
	Cat,
	CircleDot, type Icon as iconType
} from '@lucide/svelte';

const initialCommands: App.Command[] = [
	{
		id: 'nav-home',
		label: 'Go to Home',
		action: () => {
			goto('/');
			cmd.close();
		},
		icon: Home,
		category: 'Navigation',
		keywords: ['home', 'main', 'start', 'landing', 'index']
	},
	{
		id: 'nav-projects',
		label: 'Go to Projects',
		action: () => {
			goto('/projects');
			cmd.close();
		},
		icon: Briefcase,
		category: 'Navigation',
		keywords: ['projects', 'work', 'portfolio', 'case studies', 'examples']
	},
	{
		id: 'nav-about',
		label: 'Go to About',
		action: () => {
			goto('/about');
			cmd.close();
		},
		icon: User,
		category: 'Navigation',
		keywords: ['about', 'me', 'info', 'bio', 'journey']
	},
	{
		id: 'nav-contact',
		label: 'Go to Contact',
		action: () => {
			goto('/contact');
			cmd.close();
		},
		icon: Mail,
		category: 'Navigation',
		keywords: ['contact', 'email', 'message', 'hire', 'reach out']
	},

	...availableThemes.map((themeName: Theme) => {
		let icon;
		switch (themeName) {
			case 'classiclight':
				icon = Sun;
				break;
			case 'catpuccin':
				icon = Cat;
				break;
			case 'pureblack':
				icon = Moon;
				break;
			case 'cyberpunk':
				icon = MonitorSmartphone;
				break;
			case 'forest':
				icon = Trees;
				break;
			case 'nord':
				icon = Layers;
				break;
			case 'terminalgreen':
				icon = Terminal;
				break;
			case 'terminalamber':
				icon = Terminal;
				break;
			case 'archlinux':
				icon = Settings2;
				break;
			case 'eightsunset':
				icon = Gamepad2;
				break;
			case 'blueprint':
				icon = DraftingCompass;
				break;
			default:
				icon = Palette;
		}

		let labelName = themeName.charAt(0).toUpperCase() + themeName.slice(1);
		if (themeName === 'eightsunset') labelName = '8-Bit Sunset';
		if (themeName === 'terminalgreen') labelName = 'Trmnl Green';
		if (themeName === 'terminalamber') labelName = 'Trmnl Amber';
		if (themeName === 'pureblack') labelName = 'Pure Black';
		if (themeName === 'classiclight') labelName = 'Classic Light';

		return {
			id: `theme-${themeName}`,
			label: `Set Theme: ${labelName}`,
			action: () => {
				setTheme(themeName);
				cmd.close();
			},
			icon: icon,
			category: 'Theme',
			keywords: ['theme', 'style', 'appearance', 'ui', 'interface', themeName]
		};
	}),

	{
		id: 'link-github',
		label: 'Open GitHub Profile',
		action: () => {
			window.open('https://github.com/MathDesigns', '_blank');
			cmd.close();
		},
		icon: ExternalLink,
		category: 'Links',
		keywords: ['github', 'code', 'repository', 'profile', 'social', 'mathdesigns']
	}
];

export const commands: Writable<App.Command[]> = writable(initialCommands);
export const isOpen: Writable<boolean> = writable(false);
export const searchTerm: Writable<string> = writable('');
export const selectedIndex: Writable<number> = writable(0);

export const filteredCommands: Readable<App.Command[]> = derived(
	[commands, searchTerm],
	([$commands, $searchTerm]) => {
		if (!$searchTerm.trim()) {
			selectedIndex.set(0);
			return $commands;
		}
		const lowerSearchTerm = $searchTerm.toLowerCase();
		const results = $commands.filter(
			(command) =>
				command.label.toLowerCase().includes(lowerSearchTerm) ||
				(command.category && command.category.toLowerCase().includes(lowerSearchTerm)) ||
				(command.keywords &&
					command.keywords.some((k: string) => k.toLowerCase().includes(lowerSearchTerm)))
		);
		selectedIndex.set(0);
		return results;
	}
);

function open() {
	isOpen.set(true);
	searchTerm.set('');
	selectedIndex.set(0);
}

function close() {
	isOpen.set(false);
}

function toggle() {
	isOpen.update((openState) => {
		const newOpenState = !openState;
		if (newOpenState) {
			searchTerm.set('');
			selectedIndex.set(0);
		}
		return newOpenState;
	});
}

function addCommand(command: App.Command) {
	commands.update((cmds) => {
		if (!cmds.find((c) => c.id === command.id)) {
			return [...cmds, command];
		}
		return cmds;
	});
}

function removeCommand(commandId: string) {
	commands.update((cmds) => cmds.filter((c) => c.id !== commandId));
}

export const cmd = {
	subscribeOpen: isOpen.subscribe,
	subscribeCommands: commands.subscribe,
	subscribeSearchTerm: searchTerm.subscribe,
	subscribeFilteredCommands: filteredCommands.subscribe,
	subscribeSelectedIndex: selectedIndex.subscribe,
	setSearchTerm: searchTerm.set,
	setSelectedIndex: selectedIndex.set,
	open,
	close,
	toggle,
	addCommand,
	removeCommand
};
