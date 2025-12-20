# Bolt's Journal

## 2025-12-20 - [Content Visibility for Off-screen Sections]

**Learning:** For long single-page applications, rendering all sections at once can delay TTI/LCP. Using `content-visibility: auto` allows the browser to skip styling and layout for off-screen content.
**Action:** Apply `content-visibility: auto` with `contain-intrinsic-size` to sections below the fold.
