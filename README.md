# The Curator

The Curator is a modern editorial-style blogging platform built with React, TypeScript, and Vite. It supports role-based experiences for readers, authors, and admins, with a workflow for drafting posts, assigning categories, and submitting content for moderation before publication.

The project focuses on expressive UI, strong visual identity, and a practical content pipeline for real-world publishing teams.

## Table Of Contents

- [Project Idea](#project-idea)
- [Core Features](#core-features)
- [Tech Stack](#tech-stack)
- [Architecture Overview](#architecture-overview)
- [Route Map](#route-map)
- [Getting Started](#getting-started)
- [Environment Configuration](#environment-configuration)
- [Available Scripts](#available-scripts)
- [API Integration Summary](#api-integration-summary)
- [Code Review Summary](#code-review-summary)
- [Recommendations Before Production](#recommendations-before-production)

## Project Idea

The Curator is designed as a digital magazine/blog where:

- readers can browse curated articles,
- authors can write and submit stories,
- admins can moderate pending content and manage categories.

The interface mixes Tailwind-driven layouts with Mantine components and theme toggling, producing a polished editorial experience across pages like Home, Latest Posts, About, Profile, and Admin.

## Core Features

- Authentication and registration with token-based session handling.
- Protected routes for authenticated users.
- Role-based admin routes.
- Post writing flow: save draft, attach image, assign categories, submit for review.
- User profile editing with avatar upload and password change.
- Personal "My Posts" dashboard with status-based stats.
- Admin moderation queue with approve/reject actions.
- Admin category CRUD management.
- Theme toggle (light/dark).
- Animated UI sections (AOS).

## Tech Stack

### Frontend

- React 19
- TypeScript 5
- React Router DOM 7
- Vite 8

### UI And Styling

- Tailwind CSS 4
- Mantine Core + Mantine Hooks
- Tabler Icons React
- clsx
- CSS Modules (for selected layout components)

### Data And Networking

- Axios
- Custom service layer under `src/services/api`

### Tooling

- ESLint 9
- TypeScript ESLint
- PostCSS + postcss-preset-mantine

## Architecture Overview

```text
src/
  components/
    layouts/        # Navbar, Footer, Hero, Home sections, Admin layout/navbar
    sidebar/        # Latest posts page widgets
    ui/             # Reusable post cards
  context/          # Auth and Theme providers
  hooks/            # Data hooks for posts/categories/authors and AOS init
  pages/            # Route-level pages (user and admin)
  routes/           # Route guards (ProtectedRoute/AdminRoute)
  services/api/     # Axios clients + API functions
  types/            # Domain interfaces (Post, Author)
```

### Design Pattern Notes

- Context API is used for global auth and theme state.
- API logic is separated from page components.
- Hooks encapsulate asynchronous fetching for reuse and cleaner UI code.

## Route Map

### Public Routes

- `/login` -> login form
- `/register` -> registration form

### Authenticated User Routes

- `/` -> home page (hero + featured posts)
- `/latest` -> latest posts and category filtering
- `/about` -> publication story and team
- `/profile` -> account/profile settings
- `/my-posts` -> user posts list and publishing stats
- `/publish` -> create draft, category assignment, submit for review

### Admin Routes

- `/admin` -> admin dashboard overview
- `/admin/categories` -> category management
- `/admin/pending-posts` -> moderation queue (approve/reject)

## Getting Started

### 1. Clone And Install

```bash
git clone <your-repository-url>
cd the-curator
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

App runs on Vite default:

- `http://localhost:5173`

### 3. Build For Production

```bash
npm run build
```

### 4. Preview Production Build

```bash
npm run preview
```

## Environment Configuration

The current implementation uses hardcoded API base URLs in the source code. For GitHub and team collaboration, it is strongly recommended to standardize environment variables.

Suggested `.env.example`:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000/api
VITE_APP_NAME=The Curator
```

Expected backend base in development:

- `http://127.0.0.1:8000/api` (or localhost equivalent)

Important backend expectations:

- Token-based authentication endpoints are available.
- CORS allows frontend origin (`http://localhost:5173`).
- File upload endpoints support multipart requests.

## Available Scripts

- `npm run dev` -> starts Vite dev server with HMR.
- `npm run build` -> runs TypeScript build (`tsc -b`) then Vite production build.
- `npm run lint` -> runs ESLint across project files.
- `npm run preview` -> locally serves the production build.

## API Integration Summary

The frontend consumes endpoints for:

- Auth: login, register, logout
- Posts: list all posts, list user posts, category posts, create draft, submit review, attach categories
- Categories: list categories, create category, delete category
- Users: update profile, change password
- Admin: pending posts queue, approve post, reject post
- Authors: list authors

The service layer is located in `src/services/api`.

## Code Review Summary

This project has a strong UI structure and clear separation of concerns, but there are a few high-priority improvements to address before production.

### High Priority Findings

1. API base URL inconsistency:

- `src/services/api/client.ts` uses `127.0.0.1`
- `src/services/api/auth.ts` uses `localhost`

This can create unexpected behavior in mixed environments.

2. Missing environment variable strategy:

- API URLs are hardcoded in source files.
- Configuration should move to `import.meta.env`.

3. Inconsistent backend response shapes:

- Multiple handlers parse either `data`, `posts`, or `categories`.
- Works defensively, but contract should be standardized with backend.

4. Theme preference is not persisted:

- Theme resets on refresh.

### Medium Priority Findings

1. Auth token is stored in localStorage.

- Common in SPAs, but less secure than httpOnly cookie strategies.

2. Some typing gaps remain.

- Example: `AuthProvider` currently accepts `children` as `any`.

3. Naming typo in API function:

- `sumbitPost` exists as misspelled export.

4. Error handling can be improved in some hooks where errors are swallowed.

## Recommendations Before Production

1. Move API base URL to environment variables and use one shared Axios client.
2. Add a `.env.example` file and deployment notes.
3. Persist theme preference in localStorage.
4. Replace `any` with precise TypeScript types.
5. Standardize backend JSON response contracts.
6. Add a lightweight error boundary for route-level crashes.
7. Add tests for auth, route guards, and publishing workflow.

## License

Choose and add a license file (for example MIT) before publishing publicly.

## Author Notes

This README documents the current state of the frontend implementation in this repository. If backend contracts change, update the API sections above to keep onboarding smooth for contributors.
