import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  future: {
    // Compiles every `hover:` utility inside `@media (hover: hover)`. Without
    // it, touch browsers emulate :hover on tap and the hover state sticks to
    // the last-tapped card until you tap elsewhere — which reads as lag.
    hoverOnlyWhenSupported: true,
  },
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        royal: {
          50: "#eef3ff",
          100: "#dbe6fe",
          200: "#bfd2fe",
          300: "#93b4fd",
          400: "#5f8bf9",
          500: "#3866f2",
          600: "#2447e6",
          700: "#1e40af",
          800: "#1c3690",
          900: "#1b2f73",
          950: "#0c1636",
        },
        navy: {
          DEFAULT: "#0a1233",
          light: "#101c4d",
        },
        sky: {
          DEFAULT: "#38bdf8",
          light: "#7dd3fc",
        },
        ink: {
          DEFAULT: "#1f2937",
          soft: "#4b5563",
        },
        mist: "#f8fafc",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      backgroundImage: {
        "royal-gradient": "linear-gradient(135deg, #0a1233 0%, #1e40af 55%, #2447e6 100%)",
        "sky-gradient": "linear-gradient(135deg, #1e40af 0%, #38bdf8 100%)",
        "mesh": "radial-gradient(at 20% 20%, rgba(56,189,248,0.14) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(30,64,175,0.18) 0px, transparent 50%), radial-gradient(at 50% 100%, rgba(10,18,51,0.12) 0px, transparent 50%)",
      },
      boxShadow: {
        premium: "0 20px 60px -15px rgba(10,18,51,0.25)",
        glass: "0 8px 32px 0 rgba(10,18,51,0.12)",
        "glow-sky": "0 0 40px rgba(56,189,248,0.35)",
      },
      borderRadius: {
        "3xl": "1.75rem",
        "4xl": "2.25rem",
      },
      // No keyframes here. The only continuous animation on the site is the
      // hero logo float, and it lives in globals.css because it needs a
      // custom property for the reduced mobile travel distance — something
      // Tailwind's keyframe config can't express. The old float / spin-slow /
      // marquee / shimmer entries had no `animate-*` utility anywhere in the
      // codebase, so Tailwind never emitted them — dead config, removed.
    },
  },
  plugins: [],
};

export default config;
