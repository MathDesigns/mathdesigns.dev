import '@testing-library/jest-dom/vitest';

// Mock IntersectionObserver for vitest environment
global.IntersectionObserver = class IntersectionObserver {
	constructor() {}
	observe() {}
	unobserve() {}
	disconnect() {}
};
