/** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/defaultTheme");

function withOpacity(variableName: any) {
    return ({ opacityValue }: { opacityValue: number }) => {
        if (opacityValue !== undefined) {
            return `rgba(var(${variableName}), ${opacityValue})`;
        }
        return `rgb(var(${variableName}))`;
    };
}

module.exports = {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./app/**/*.{ts,tsx}",
        "./src/**/*.{ts,tsx}",
    ],
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            colors: {
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                "theme-primary": {
                    DEFAULT: "var(--theme-primary-500)",
                    foreground: "var(--theme-primary-foreground)",
                    50: "var(--theme-primary-50)",
                    100: "var(--theme-primary-100)",
                    200: "var(--theme-primary-200)",
                    300: "var(--theme-primary-300)",
                    400: "var(--theme-primary-400)",
                    500: "var(--theme-primary-500)",
                    600: "var(--theme-primary-600)",
                    700: "var(--theme-primary-700)",
                    800: "var(--theme-primary-800)",
                    900: "var(--theme-primary-900)",
                },
                "theme-secondary": {
                    DEFAULT: "var(--theme-secondary-500)",
                    foreground: "var(--theme-secondary-foreground)",
                    50: "var(--theme-secondary-50)",
                    100: "var(--theme-secondary-100)",
                    200: "var(--theme-secondary-200)",
                    300: "var(--theme-secondary-300)",
                    400: "var(--theme-secondary-400)",
                    500: "var(--theme-secondary-500)",
                    600: "var(--theme-secondary-600)",
                    700: "var(--theme-secondary-700)",
                    800: "var(--theme-secondary-800)",
                    900: "var(--theme-secondary-900)",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            keyframes: {
                "accordion-down": {
                    from: { height: 0 },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: 0 },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
};
