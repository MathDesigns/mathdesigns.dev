import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// Mock IntersectionObserver
class IntersectionObserverMock {
	observe = vi.fn();
	unobserve = vi.fn();
	disconnect = vi.fn();
	takeRecords = vi.fn();
}

vi.stubGlobal('IntersectionObserver', IntersectionObserverMock);
