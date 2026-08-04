/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography'

export default {
	darkMode: 'media',
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			// Theme tokens. Change these to restyle the whole site; see the
			// Theming section of the README.
			colors: {
				accent: {
					// Link and interaction color on light backgrounds.
					DEFAULT: '#1d4ed8',
					// Link and interaction color on dark backgrounds.
					bright: '#3b82f6',
				},
			},
			fontFamily: {
				// The body face for the entire site. Update the @fontsource
				// import in src/layouts/Layout.astro to match.
				body: ['"EB Garamond Variable"', 'serif'],
			},
			maxWidth: {
				// Width of the readable column on every page.
				content: '48rem',
			},
		},
	},
	plugins: [
		typography,
	],
}
