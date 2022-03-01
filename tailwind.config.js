module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./styles/**/*.{html,js}",
    ],
    theme: {
        extend: {
            screens: {
                xs: "480px",
            },
        },
    },
    plugins: [require("@tailwindcss/ui")],
};
