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
            borderWidth: {
                16: "16px",
            },
        },
    },
    purge: ["./components//*.{js,ts,jsx,tsx}", "./pages//*.{js,ts,jsx,tsx}"],
    plugins: [],
};
