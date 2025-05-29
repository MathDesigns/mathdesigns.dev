// src/lib/actions/animateOnScroll.ts
import { browser } from '$app/environment';

interface AnimateOnScrollOptions {
	animationClass?: string; // Class to add when element is visible
	threshold?: number;      // How much of the element needs to be visible (0.0 to 1.0)
	rootMargin?: string;     // Margin around the root (e.g., "0px 0px -50px 0px" to trigger a bit early)
	once?: boolean;          // Whether to unobserve after the first intersection
}

export function animateOnScroll(node: HTMLElement, options: AnimateOnScrollOptions = {}) {
	if (!browser) return;

	const {
		animationClass = 'is-visible', // Default class to add
		threshold = 0.1,              // Trigger when 10% of the element is visible
		rootMargin = '0px',
		once = true,                  // Default to animate only once
	} = options;

	const observer = new IntersectionObserver(
		(entries, obs) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					node.classList.add(animationClass);
					if (once) {
						obs.unobserve(node); // Stop observing after the first time
					}
				} else if (!once) {
					// Optionally remove class if element scrolls out of view and 'once' is false
					// node.classList.remove(animationClass);
				}
			});
		},
		{
			threshold,
			rootMargin,
		}
	);

	observer.observe(node);

	return {
		destroy() {
			if (browser) {
				observer.unobserve(node);
			}
		}
	};
}