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
