import autoprefixer from 'autoprefixer';

/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: [
    '@tailwindcss/postcss',
    // Next.js 16 docs note that Lightning CSS only prefixes during production builds.
    // Explicitly run Autoprefixer during development so Safari renders glassmorphism utilities consistently.
    autoprefixer({
      flexbox: 'no-2009',
    }),
  ],
};

export default config;
