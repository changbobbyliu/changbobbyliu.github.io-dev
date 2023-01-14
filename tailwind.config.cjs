/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	darkMode: "class",
	theme: {
		extend: {
			colors: {
				primary: {
					DEFAULT: "#202225",
					100: "#2f3136",
				},
				secondary: "#5865f2",
				accent: "#17c3b2", // Tiffany Blue
			},
		},
	},
	plugins: [],
};
