import defaultTheme from "tailwindcss/defaultTheme";
import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
	darkMode: "class",
	content: ["./src/**/*.{html,js,svelte,ts}"],
	// @ts-ignore - safelist is a valid Tailwind config option
	safelist: ["dark"],
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px"
			}
		},
		extend: {
			colors: {
				border: "hsl(var(--border) / <alpha-value>)",
				input: "hsl(var(--input) / <alpha-value>)",
				ring: "hsl(var(--ring) / <alpha-value>)",
				background: "hsl(var(--background) / <alpha-value>)",
				foreground: "hsl(var(--foreground) / <alpha-value>)",
				primary: {
					DEFAULT: "hsl(var(--primary) / <alpha-value>)",
					foreground: "hsl(var(--primary-foreground) / <alpha-value>)"
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
					foreground: "hsl(var(--secondary-foreground) / <alpha-value>)"
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
					foreground: "hsl(var(--destructive-foreground) / <alpha-value>)"
				},
				muted: {
					DEFAULT: "hsl(var(--muted) / <alpha-value>)",
					foreground: "hsl(var(--muted-foreground) / <alpha-value>)"
				},
				accent: {
					DEFAULT: "hsl(var(--accent) / <alpha-value>)",
					foreground: "hsl(var(--accent-foreground) / <alpha-value>)"
				},
				popover: {
					DEFAULT: "hsl(var(--popover) / <alpha-value>)",
					foreground: "hsl(var(--popover-foreground) / <alpha-value>)"
				},
				card: {
					DEFAULT: "hsl(var(--card) / <alpha-value>)",
					foreground: "hsl(var(--card-foreground) / <alpha-value>)"
				}
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)"
			},
			fontFamily: {
				sans: ["Inter Variable", ...defaultTheme.fontFamily.sans],
				mono: ["JetBrains Mono", ...defaultTheme.fontFamily.mono]
			},
			animation: {
				"marquee": "marquee 25s linear infinite",
				"pulse-glow": "pulse-glow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
				"breathe": "breathe 8s ease-in-out infinite",
				"shimmer": "shimmer 2.5s linear infinite",
				// Faster (3s) and punchier ripple
				"hero-ripple": "hero-ripple 3s ease-out infinite" 
			},
			keyframes: {
				marquee: {
					"0%": { transform: "translateX(0)" },
					"100%": { transform: "translateX(-100%)" }
				},
				"pulse-glow": {
					"0%, 100%": { opacity: "1", transform: "scale(1)" },
					"50%": { opacity: "0.5", transform: "scale(1.05)" }
				},
				"breathe": {
					"0%, 100%": { opacity: "0.5", transform: "scale(1)" },
					"50%": { opacity: "1", transform: "scale(1.1)" }
				},
				"shimmer": {
					"0%": { backgroundPosition: "0% 50%" },
					"100%": { backgroundPosition: "200% 50%" }
				},
				// Punchy shockwave: Explodes instantly, then fades out
				"hero-ripple": {
					"0%": { 
						"mask-size": "0px 0px",
						"opacity": "0.5"
					},
					"5%": { 
						"mask-size": "600px 600px", // Fast initial impact
						"opacity": "1" // Peak brightness
					},
					"100%": { 
						"mask-size": "3000px 3000px", // Expands far beyond screen
						"opacity": "0"
					}
				}
			}
		}
	},
	plugins: [tailwindcssAnimate]
};

export default config;