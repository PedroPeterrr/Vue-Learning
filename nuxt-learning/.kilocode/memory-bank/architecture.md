System architecture: Full-stack Nuxt.js application with client-side pages, reusable Vue components, composables for business logic, and server-side API endpoints.

Source code paths:
- app/pages/: Page components (index.vue, DestinationList.vue, Users.vue, about.vue)
- app/components/: Reusable UI components (BookCard.vue, DestinationCard.vue, StatsCard.vue, etc.)
- app/composables/: Logic hooks (useBooks.ts, useDestination.ts, useStats.ts, etc.)
- server/api/: API endpoints (site-stats.get.ts, etc.)
- tests/unit/: Unit tests with Vitest

Key technical decisions:
- Nuxt 3/4 for SSR and routing
- Vue 3 Composition API with TypeScript
- TailwindCSS for utility-first styling
- Capacitor for mobile app wrapping

Design patterns:
- Composables for state management and API calls
- Component-based architecture with props and emits
- Server API with RESTful endpoints

Component relationships:
- Pages import and use components and composables
- Components emit events to parent pages
- Composables handle data fetching and state

Critical implementation paths:
- Data flow: Composables -> Components -> Pages
- API integration: Server endpoints consumed by composables