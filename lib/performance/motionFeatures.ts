/**
 * Async feature bundle for LazyMotion. Importing this module dynamically lets
 * Next split Framer Motion's DOM feature set (animations + gestures + drag +
 * layout, ~40KB) into its own chunk that loads *after* hydration instead of
 * sitting in the route's First Load JS.
 *
 * `domMax` (not `domAnimation`) because the project uses `layout` animations
 * (Projects grid / ProjectCard) and `drag` (the interactive card stack).
 */
export { domMax as default } from 'framer-motion'
