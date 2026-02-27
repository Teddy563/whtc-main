// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.whtc.ro', // or another appropriate URL if known, I'll use the domain from email office@safetyacademy.ro
  integrations: [tailwind(), sitemap(), icon()],
  image: {
    domains: ["images.unsplash.com"],
  },
});