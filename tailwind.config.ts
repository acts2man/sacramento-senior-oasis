
import type { Config } from "tailwindcss";

/**
 * ElderCare brand color scales. These are the source of truth for the
 * `bg-teal-*`, `text-coral-*`, `bg-sage-*`, `text-neutral-*` utilities and
 * for the semantic shadcn tokens declared as HSL triplets in src/index.css.
 *
 * `teal` and `neutral` shadow Tailwind's defaults of the same name; that's
 * intentional — every neutral/teal in the UI should resolve to our brand
 * scales, not to Tailwind stock.
 */
const teal = {
  50:  '#EAF3F2',
  100: '#CDE5E3',
  200: '#A3D0CD',
  300: '#6DB4B0',
  400: '#3E9692',
  500: '#16847F',
  600: '#0F6E6A',
  700: '#0A5C5C',
  800: '#084A4A',
  900: '#063838',
};

const coral = {
  50:  '#FDEFE8',
  100: '#FBDBCB',
  200: '#F8C0A4',
  300: '#F79A6A',
  400: '#F2855C',
  500: '#EE7048',
  600: '#D95E37',
  700: '#B84B2A',
};

const neutral = {
  50:  '#F7FAFA',
  100: '#EEF2F2',
  200: '#DDE4E4',
  300: '#C3CDCD',
  400: '#97A4A4',
  500: '#6B7A7A',
  600: '#5E7077',
  700: '#3D4C50',
  800: '#1F3540',
  900: '#122026',
};

const sage = {
  50:  '#DCEAE4',
  100: '#C6DDD3',
};

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				/* Brand scales — explicit hex so future palette changes touch
				   only this file. shadcn semantic tokens flow through index.css. */
				teal,
				coral,
				neutral,
				sage,

				/* Single-token convenience for the brand mark colour. */
				'brand-coral': 'hsl(var(--brand-coral))',

				/* shadcn semantic tokens (light + dark themes live in index.css) */
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},

				/*
				 * Legacy `senior-*` namespace. Hundreds of existing className
				 * references use `bg-senior-blue` / `text-senior-slate` / etc.;
				 * remapping the namespace to brand colours migrates the whole
				 * app in one place without a sweeping find-replace.
				 *
				 * Prefer the named scales (teal/coral/neutral) for NEW code.
				 */
				senior: {
					blue: teal[700],   // primary brand color
					slate: neutral[800], // body/heading text
					light: teal[50],   // soft surfaces, chip backgrounds
					sand: coral[300],  // legacy accent — used in a few places
					teal: teal[500],   // explicit mid-teal accent
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out'
			},
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
				serif: ['Merriweather', 'serif']
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
