export interface Project {
	id: string; 
	title: string;
	description: string;
	imageUrl?: string; 
	status?: 'Completed' | 'In Progress' | 'Archived' | string; 
	technologies: string[];
	liveLink?: string;   
	sourceLink?: string; 
}
