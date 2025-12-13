## 2025-12-12 - [Security Headers Implementation]
**Vulnerability:** Missing security headers (X-Frame-Options, X-Content-Type-Options, etc.)
**Learning:** Even static-heavy SvelteKit apps served via `adapter-node` need explicit header configuration in `hooks.server.ts` as the adapter doesn't set defaults.
**Prevention:** Always verify headers on new SvelteKit projects using `curl -I`.
