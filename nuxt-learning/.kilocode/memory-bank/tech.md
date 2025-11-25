Technologies used:
- Nuxt 3/4: Full-stack Vue framework
- Vue 3: Progressive JavaScript framework
- TypeScript: Type-safe JavaScript
- TailwindCSS: Utility-first CSS framework
- Vitest: Unit testing framework
- Capacitor: Cross-platform mobile app runtime

Development setup:
- Package managers: npm, pnpm, yarn, bun
- Development server: `nuxt dev` on http://localhost:3000
- Build: `nuxt build`
- Testing: `vitest` for unit tests, `vitest run` for CI

Technical constraints:
- Private project (not for public distribution)
- UTF-16 charset in HTML head
- Viewport configured for mobile responsiveness

Dependencies:
- Core: nuxt, vue, vue-router
- Styling: @tailwindcss/vite, tailwindcss
- Testing: @nuxt/test-utils, @vue/test-utils, jsdom, vitest
- Dev: @vue/test-utils (wait, that's dev)

Tool usage patterns:
- Composables for shared logic
- Components for UI reusability
- Server API for data operations
- Unit tests for critical functions