// src/lib/data/projects.ts
import type { Project } from '$lib/types/project';

export const projects: Project[] = [
	{
		id: '1',
		title: 'E-commerce Platform',
		slug: 'ecommerce-platform',
		description: 'A full-featured online store with SvelteKit and Stripe.',
		longDescription: 'Developed a responsive e-commerce platform with user authentication, product listings, shopping cart functionality, and Stripe integration for payments. Focused on performance and a smooth user experience.',
		imageUrl: 'https://picsum.photos/seed/project1/600/400', // Placeholder image
		technologies: ['SvelteKit', 'TailwindCSS', 'TypeScript', 'Stripe', 'Prisma'],
		liveLink: '#', // Replace with actual link
		sourceLink: '#', // Replace with actual link
		status: 'Completed'
	},
	{
		id: '2',
		title: 'Task Management App',
		slug: 'task-management-app',
		description: 'A collaborative task manager with real-time updates.',
		longDescription: 'Built a Kanban-style task management application allowing users to create, assign, and track tasks. Implemented real-time collaboration features using WebSockets.',
		imageUrl: 'https://picsum.photos/seed/project2/600/400', // Placeholder image
		technologies: ['Svelte', 'Firebase', 'TailwindCSS', 'Drag & Drop API'],
		liveLink: '#',
		status: 'In Progress'
	},
	{
		id: '3',
		title: 'Personal Portfolio V1',
		slug: 'personal-portfolio-v1',
		description: 'The previous version of this portfolio website.',
		longDescription: 'My first iteration of a personal portfolio, built to showcase initial projects and learn the fundamentals of web development and Svelte.',
		imageUrl: 'https://picsum.photos/seed/project3/600/400', // Placeholder image
		technologies: ['Svelte', 'JavaScript', 'CSS'],
		sourceLink: '#',
		status: 'Archived'
	}
	// Add more projects here
];