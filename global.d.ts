// Allow side-effect imports of stylesheets (e.g. `import '@/styles/globals.css'`)
// without a per-import `@ts-expect-error`. Keeps both the IDE TS server and the
// Next.js production build in agreement about CSS module resolution.
declare module '*.css'
