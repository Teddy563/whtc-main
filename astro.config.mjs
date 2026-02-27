// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

import icon from 'astro-icon';

import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  // or another appropriate URL if known, I'll use the domain from email office@safetyacademy.ro
  site: 'https://www.whtc.ro',
  output: 'hybrid',

  integrations: [tailwind(), sitemap(), icon()],

  image: {
    domains: ["images.unsplash.com"],
  },

  adapter: vercel(),
});