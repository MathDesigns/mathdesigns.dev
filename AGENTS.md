# AGENTS.md

## Project Context
This is a **SvelteKit** project using **Svelte 5** and **TypeScript**. 
It uses **Tailwind CSS v4** for styling and **Shadcn-Svelte** for UI components.

## Tech Stack
- **Framework:** SvelteKit (Node Adapter)
- **Core:** Svelte 5 (Runes)
- **Styling:** Tailwind CSS v4
- **Components:** Shadcn-Svelte, Bits UI
- **Testing:** Vitest
- **Runtime:** Node.js (via Docker)

## Development Guidelines

### 1. Svelte 5 Conventions
* **Strictly use Runes:** Do not use legacy Svelte 4 syntax.
    * ❌ **Avoid:** `export let data;`, `$: double = count * 2;`
    * ✅ **Use:** `let { data } = $props();`, `let double = $derived(count * 2);`
* **State:** Use `$state()` for local reactivity.
* **Events:** Use standard HTML attributes (e.g., `onclick`) rather than `on:click`.

### 2. Styling (Tailwind v4)
* Use standard utility classes.
* Use the `cn()` utility from `$lib/utils` when merging classes or accepting a `class` prop.
* **Dark Mode:** The app supports class-based dark mode. Ensure all custom colors handle `dark:` variants.

### 3. Component Architecture
* **UI Primitives:** Reusable, dumb components live in `src/lib/components/ui`.
* **Feature Components:** Complex logic lives in `src/lib/components` (e.g., `BentoGrid.svelte`).
* **Imports:** Always use the `$lib` alias.
    * `import { Button } from '$lib/components/ui/button';`

## Commands
* **Dev Server:** `npm run dev`
* **Type Check:** `npm run check` (Run this to verify Svelte types)
* **Unit Tests:** `npm run test:unit`
* **Build:** `npm run build`

## Key Files
* `src/app.css`: Global Tailwind imports and theme variables.
* `src/lib/utils.ts`: Contains the `cn` helper for Tailwind class merging.
* `Dockerfile`: Multi-stage build for production (Port 3000).
