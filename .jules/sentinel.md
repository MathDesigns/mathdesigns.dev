## 2025-12-12 - [Security Headers Implementation]

**Vulnerability:** Missing security headers (X-Frame-Options, X-Content-Type-Options, etc.)
**Learning:** Even static-heavy SvelteKit apps served via `adapter-node` need explicit header configuration in `hooks.server.ts` as the adapter doesn't set defaults.
**Prevention:** Always verify headers on new SvelteKit projects using `curl -I`.

## 2025-12-13 - [Content Security Policy in SvelteKit]

**Vulnerability:** Missing Content-Security-Policy header.
**Learning:** When using `adapter-node` with SvelteKit, CSP can be added via `hooks.server.ts`. For simple retrofitting without using SvelteKit's nonce system, `'unsafe-inline'` for scripts and styles might be necessary initially if the app relies on them, though a stricter policy is preferred.
**Prevention:** Configure `csp` in `svelte.config.js` for new projects to leverage automatic nonce generation.
