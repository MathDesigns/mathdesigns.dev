## 2024-05-23 - Clipboard Interaction & Testing
**Learning:** `navigator.clipboard.writeText` requires explicit permissions in automated tests (Playwright) and returns a Promise that must be handled to avoid false positive UI states.
**Action:** Always wrap clipboard logic in try-catch/promise handling and grant `clipboard-write` in Playwright context.

## 2024-05-23 - Vitest & IntersectionObserver
**Learning:** `IntersectionObserver` must be mocked as a constructible class (not just a function) in Vitest when using Svelte 5 logic that instantiates it.
**Action:** Use `class IntersectionObserverMock { ... }` in `vitest-setup.ts`.
