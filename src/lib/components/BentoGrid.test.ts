import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import BentoGrid from './BentoGrid.svelte';

describe('BentoGrid', () => {
	it('renders project links with correct accessibility attributes', () => {
		render(BentoGrid);

		const links = screen.getAllByRole('link');
		expect(links.length).toBeGreaterThan(0);

		links.forEach((link) => {
			// Check for new tab behavior
			expect(link).toHaveAttribute('target', '_blank');
			// Check for security best practices
			expect(link).toHaveAttribute('rel', 'noopener noreferrer');
			// Check for screen reader warning
			expect(link.textContent).toMatch(/\(opens in a new tab\)/i);
		});
	});
});
