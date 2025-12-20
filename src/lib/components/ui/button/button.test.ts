import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import { Button } from './index.js';

describe('Button', () => {
	it('adds rel="noopener noreferrer" when target="_blank"', () => {
		render(Button, { props: { href: 'https://example.com', target: '_blank' } });
		const link = screen.getByRole('link');
		expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'));
		expect(link).toHaveAttribute('rel', expect.stringContaining('noreferrer'));
	});

	it('does not override existing rel attribute', () => {
		render(Button, { props: { href: 'https://example.com', target: '_blank', rel: 'nofollow' } });
		const link = screen.getByRole('link');
		expect(link).toHaveAttribute('rel', expect.stringContaining('nofollow'));
		expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'));
		expect(link).toHaveAttribute('rel', expect.stringContaining('noreferrer'));
	});

	it('does not add rel when target is not _blank', () => {
		render(Button, { props: { href: 'https://example.com' } });
		const link = screen.getByRole('link');
		expect(link).not.toHaveAttribute('rel');
	});
});
