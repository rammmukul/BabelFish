/** @type {import('tailwindcss').Config} */
import daisy from "daisyui"

export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {},
		borderRadius:{
			lg: "3rem"
		}
	},
	plugins: [daisy],
	daisyui: {
	  themes: ["cupcake"],
	},
}
