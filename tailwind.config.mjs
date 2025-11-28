/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				anton: ['Anton', 'sans-serif'],
				inter: ['Inter', 'sans-serif'],
			},
			colors: {
				brand: {
					orange: '#f16215',
					black: '#111111',
				}
			},
			transitionTimingFunction: {
				'luxury': 'cubic-bezier(0.25, 1, 0.5, 1)',
			}
		},
	},
	plugins: [],
}