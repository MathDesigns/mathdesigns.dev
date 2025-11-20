import type { ComponentType } from 'svelte';
import type { LucideIcon } from '@lucide/svelte';

declare global {
	namespace App {

		interface Command {
			id: string;
			label: string;
			action: () => void;
			icon?: typeof IconType;
			category?: string;
			keywords?: string[];
		}
	}
}

export {};
