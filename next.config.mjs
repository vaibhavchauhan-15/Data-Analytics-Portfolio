/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // @splinetool/react-spline ships ESM-only exports (only an `import`
  // condition, no `default`/`require`), so Next's webpack can't resolve the
  // subpath by default. Transpile it and make sure `import` is an active
  // resolve condition.
  transpilePackages: ['@splinetool/react-spline'],
  webpack: (config) => {
    config.resolve = config.resolve || {}
    const existing = config.resolve.conditionNames || ['require', 'node']
    config.resolve.conditionNames = Array.from(new Set(['import', ...existing]))
    return config
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
      { protocol: 'https', hostname: 'opengraph.githubassets.com' },
    ],
  },
}

export default nextConfig
