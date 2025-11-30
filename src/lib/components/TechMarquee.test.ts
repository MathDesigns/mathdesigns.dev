import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import TechMarquee from './TechMarquee.svelte';

describe('TechMarquee', () => {
	it('renders the marquee content', () => {
		render(TechMarquee);
		expect(screen.getAllByAltText('Svelte')[0]).toBeInTheDocument();
	});
});