/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
        extend: {
            screens: {
                xs: "475px",
            },
            colors: {
                primary: {
                    DEFAULT: "#80CBC4",
                },
                secondary: {
                    DEFAULT: "#212121"
                },
                black: {
                    DEFAULT: "#000000",
                },
                white: {
                    DEFAULT: "#FFFFFF",
                },
                dark: {
                  DEFAULT: "#16404D"
                }
            },
            fontFamily: {
                sans: ["Open Sans", 'sans-serif'],
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            boxShadow: {
                100: "2px 2px 0px 0px rgb(0, 0, 0)",
                200: "2px 2px 0px 2px rgb(0, 0, 0)",
                300: "2px 2px 0px 2px rgb(238, 43, 105)",
            },
        },
    },
  plugins: [require('@tailwindcss/typography')],
}
