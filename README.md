# TV Show Explorer

## Tech Stack

### 📦 Frontend Framework
- Next.js 15+ (App Router)
- React 18+
- TypeScript 5+
- TSX/JSX

### 🎨 Styling & UI
- Tailwind CSS 3+ (Utility-first CSS)
- CSS Grid & Flexbox
- Responsive Design (Mobile-first)

### 🔄 State Management & Data Fetching
- TanStack React Query (Data fetching & caching)
- React Hooks (useState, useParams, useSearchParams)
- URL Query Params (State passing)

### 📸 Image Handling
- Next.js Image Component
- TVMaze static.tvmaze.com (Remote images)

### 🧭 Routing
- Next.js App Router
- Dynamic Routes [id]
- Link Component

### 🔌 API & External Services
- TVMaze API (https://api.tvmaze.com)
  - GET /shows/{id}
  - GET /shows/{id}/episodes
  - GET /episodes/{id}
- Fetch API (Native browser API)

### 📝 Type Safety
- TypeScript
- Type Interfaces (IEpisode, IShowDetails)
- Strict Mode Enabled

### 📦 Dependencies
```json
{
  "dependencies": {
    "next": "^15.0.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "@tanstack/react-query": "^5.0.0",
    "lucide-react": "*",
    "typescript": "^5.0.0"
  }
}
```

### ⚙️ Build & Development
- Node.js 18+
- npm/yarn/pnpm
- Next.js Dev Server (port 3000)
- Hot Module Replacement (HMR)

## Project Structure
```
tv-show-explorer/
├── app/
│   ├── page.tsx (Home - Show + Episodes)
│   ├── episodes/
│   │   └── [id]/
│   │       └── page.tsx (Episode Details)
│   ├── layout.tsx
│   └── globals.css
├── hooks/
│   └── useShow.ts (Custom React Query hook)
├── domain/types/
│   └── TvShow.ts (TypeScript interfaces)
├── next.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

## Architectural Decisions

### Git Strategy
- Working on main branch only
- Solo development (no collaboration)
- No deployment required

### Server Actions
- Used only when required for server-based operations
- Examples: POST requests, database mutations
- Currently not in use (API is read-only)
- Will be implemented when data persistence is needed

### Data Fetching Strategy
- TanStack React Query for all data fetching
- Powerful caching & optimization capabilities
- Automatic request deduplication
- Stale-while-revalidate pattern support
- Public API consumption (TVMaze)

### Next.js Ecosystem Integration
- **Next.js Image Component**: Optimized image loading, lazy loading, responsive sizes
- **Next.js Link Component**: Client-side navigation, prefetching, performance
- **Dynamic Routes [id]**: Built-in routing without react-router
- **App Router**: Latest Next.js routing paradigm (Server Components)

### Why These Choices
- Next.js components are ecosystem-friendly
- Built-in optimizations by Next.js under the hood
- Reduced boilerplate compared to alternatives
- Better performance out-of-the-box
- Leveraging platform-specific advantages
- Simpler codebase & maintainability
