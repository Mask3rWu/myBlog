# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server on http://localhost:3000
npm run build    # Static export to out/ (NODE_ENV=production applies basePath /myBlog)
npm run lint     # Run ESLint
```

## Architecture

This is a **Next.js 14 App Router** blog with **static export** (`output: 'export'`), deployed to GitHub Pages at `https://mask3rwu.github.io/myBlog/`. The production `basePath` is `/myBlog` — all internal links must not hardcode `/myBlog`; use Next.js `<Link>` and relative paths instead.

### Content system (the blog core)

```
content/posts/<category>/<post>.md    →  /posts/<category>/<post>
```

- `src/lib/posts.ts` reads all `.md` files from `content/posts/` at build time (Node `fs`).
- Each file must have frontmatter: `title`, `date`, `excerpt`, `tags` (required); `cover` and `draft` (optional). Posts with `draft: true` are excluded.
- Categories are derived from the first subdirectory; files directly in `content/posts/` get category `uncategorized`.
- `gray-matter` parses frontmatter, `marked` renders Markdown to HTML.
- Reading time: estimated at 200 Chinese chars/min.
- Post pages use `generateStaticParams()` for SSG — slugs are catch-all `[...slug]`.

### Supabase integration

- **Client**: `src/lib/supabase/client.ts` — `createBrowserClient` from `@supabase/ssr`, used in `'use client'` components.
- **Server**: `src/lib/supabase/server.ts` — `createServerClient` with Next.js cookie store.
- **Types**: `src/lib/supabase/types.ts` — `Task`, `TaskWithChildren`, `NewTask`, `UpdateTask`.
- **Database helpers**: `src/lib/supabase/database.ts` — thin CRUD wrappers (getTasks, createTask, updateTask, deleteTask, etc.). Uses the browser client.
- **Auth**: `src/contexts/auth-context.tsx` wraps the entire app via root layout. Provides `user`, `session`, `isLoading`, `signIn(email, password)`, `signOut()`. Uses Supabase email/password auth.
- The login page is at `/login`, reachable by triple-clicking the pen icon in the navbar (a hidden easter egg).

### Component patterns

- **shadcn/ui** components live in `src/components/ui/` (button, badge, card). The `cn()` helper in `src/lib/utils.ts` merges Tailwind classes with `clsx` + `tailwind-merge`.
- The blog uses a consistent card aesthetic: `rounded-[2rem]`, `border-white/60`, `bg-white/85`, `backdrop-blur`, `shadow-xl shadow-slate-200/60`.
- `PostsExplorer` (`src/components/posts-explorer.tsx`) is the client-side post browser with tag filtering, sort (newest/oldest/title), and title search — used on `/posts`.

### Routes

| Path | File | Type |
|------|------|------|
| `/` | `src/app/page.tsx` | Server (lists all posts) |
| `/posts` | `src/app/posts/page.tsx` | Server (delegates to PostsExplorer) |
| `/posts/[...slug]` | `src/app/posts/[...slug]/page.tsx` | Server (SSG, renders post HTML) |
| `/tasks` | `src/app/tasks/page.tsx` | Client (task management with Supabase) |
| `/roadmap` | `src/app/roadmap/page.tsx` | Server (hardcoded plans) |
| `/about` | `src/app/about/page.tsx` | Server (static) |
| `/login` | `src/app/login/page.tsx` | Client (Supabase email auth) |

### Key constraints

- **Static export**: No `cookies()`, `headers()`, `searchParams` on server — those only work at build/request time with a runtime server. Calls to `cookies()` in `server.ts` are only safe in middleware/API routes, which don't exist in this static-export setup. In practice, Supabase operations all happen client-side.
- Path alias `@/*` → `./src/*`.

### Database schema changes

When adding or modifying columns in Supabase tables, always output the corresponding ALTER TABLE SQL for the user to run manually in the Supabase Dashboard. The migration files in `supabase/migrations/` are reference DDL for initial table creation; incremental changes require ALTER statements for already-created tables.

### Git commits

- **Group by module**: When developing multiple independent features or modules, split commits by functional scope (e.g., `feat(auth): ...` separate from `feat(portfolio): ...`).
- **Single commit for single module**: When all changes belong to one feature module, a single commit is sufficient. Do not over-split.
- **Exclude unrelated changes**: Before committing, check `git status` and `git diff` to ensure only files relevant to the current module are staged. Do not include unrelated modifications.
- **Commit format**: Follow conventional commits — `feat(scope): description`, `fix(scope): description`, `refactor(scope): description`.
- **Push after commit**: Always `git push` after committing.
