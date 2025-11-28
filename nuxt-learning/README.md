# Nuxt Learning

## Product

Nuxt Learning is an educational project aimed at mastering Nuxt.js for full-stack web development. Its main objectives include demonstrating modern Vue.js patterns, API integration, and responsive UI design.

Key features encompass a stats dashboard for managing series and lessons, a destination listing system with search functionality and detailed modals, a book catalog with interactive cards, user data management, and server-side API endpoints for data operations.

The project utilizes Nuxt 3/4, Vue 3, TypeScript, TailwindCSS for styling, Vitest for unit testing, and Capacitor for mobile app deployment.

Its significance lies in serving as a comprehensive learning resource for developers exploring Vue ecosystem technologies, showcasing best practices in component-based architecture, state management, and cross-platform development.

## Architecture

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

## Technologies

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

Tool usage patterns:
- Composables for shared logic
- Components for UI reusability
- Server API for data operations
- Unit tests for critical functions

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Testing

Run unit tests with Vitest:

```bash
# npm
npm run test

# pnpm
pnpm test

# yarn
yarn test

# bun
bun test
```

To run tests once:

```bash
# npm
npm run test:run

# pnpm
pnpm test:run

# yarn
yarn test:run

# bun
bun test:run
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
