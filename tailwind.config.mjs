/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				anton: ['Anton', 'sans-serif'],
				inter: ['Inter', 'sans-serif'],
				montserrat: ['Montserrat', 'sans-serif'],
			},
			colors: {
				brand: {
					orange: '#f16215',
					black: '#111111',
					red: '#D32F2F',
					blue: '#1e3a8a',
					'orange-alt': '#FE4D01',
					green: '#16a34a',
					purple: '#7c3aed',
				}
			},
			transitionTimingFunction: {
				'luxury': 'cubic-bezier(0.25, 1, 0.5, 1)',
			}
		},
	},
	plugins: [],
}