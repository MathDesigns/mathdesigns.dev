import { writable, type Writable } from 'svelte/store';
import { browser } from '$app/environment';

export type Theme =
	| 'pureblack'
	| 'classiclight'
	| 'catpuccin'
	| 'cyberpunk'
	| 'forest'
	| 'nord'
	| 'terminalgreen'
	| 'terminalamber'
	| 'archlinux'
	| 'eightsunset'
	| 'blueprint';

export const themes: Theme[] = [
	'pureblack',
	'classiclight',
	'catpuccin',
	'cyberpunk',
	'forest',
	'nord',
	'terminalgreen',
	'terminalamber',
	'archlinux',
	'eightsunset',
	'blueprint'
];

const THEME_STORAGE_KEY = 'selected-theme';

function getInitialTheme(): Theme {
	if (!browser) return 'pureblack';
	const storedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
	if (storedTheme && themes.includes(storedTheme)) {
		return storedTheme;
	}
	return 'pureblack';
}

const activeTheme: Writable<Theme> = writable(getInitialTheme());

function applyTheme(theme: Theme) {
	if (!browser) return;
	const htmlEl = document.documentElement;

	themes.forEach((t) => htmlEl.classList.remove(t));
	htmlEl.classList.remove('dark');

	if (theme !== 'pureblack') {
		htmlEl.classList.add(theme);
	} else {
	}
	const darkBackingThemes: Theme[] = [
		'pureblack',
		'catpuccin',
		'cyberpunk',
		'forest',
		'nord',
		'terminalgreen',
		'terminalamber',
		'archlinux',
		'eightsunset'
	];
	if (darkBackingThemes.includes(theme)) {
		htmlEl.classList.add('dark');
	}
}

activeTheme.subscribe((currentTheme) => {
	if (browser) {
		localStorage.setItem(THEME_STORAGE_KEY, currentTheme);
		applyTheme(currentTheme);
	}
});

export function setTheme(theme: Theme) {
	if (themes.includes(theme)) {
		activeTheme.set(theme);
	} else {
		console.warn(`Theme "${theme}" is not a valid theme.`);
	}
}

export function cycleTheme() {
	activeTheme.update((currentTheme) => {
		const currentIndex = themes.indexOf(currentTheme);
		const nextIndex = (currentIndex + 1) % themes.length;
		return themes[nextIndex];
	});
}

if (browser) {
	const initial = getInitialTheme();
	if (initial === 'pureblack') {
		themes.forEach((t) => {
			if (t !== 'pureblack') document.documentElement.classList.remove(t);
		});
	}
	applyTheme(initial);
}

export default activeTheme;
