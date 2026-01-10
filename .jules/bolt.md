# Bolt's Journal

## 2025-02-06 - Marquee Animation Optimization
**Learning:** Adding `will-change-transform` to large, continuously animating elements (like a marquee) significantly improves rendering performance by promoting the element to its own compositor layer.
**Action:** Always check for `will-change` opportunities in CSS animations, especially for infinite loops.
**Learning:** `svelte/require-each-key` is a strict rule that helps Svelte optimize list rendering. Always provide a unique key in `{#each}` blocks, even if the list is static, to help the diffing algorithm.
