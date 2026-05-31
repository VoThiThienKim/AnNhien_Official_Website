import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#FAF8F1",
        primary: "#2F6B4F",
        accent: "#8BC34A",
        mint: "#EAF4E8",
        wood: "#B9824B",
        charcoal: "#2F312D",
        muted: "#6E7469",
        line: "#DDE4D6",
        danger: "#B42318"
      },
      borderRadius: {
        sm: "4px",
        md: "6px",
        lg: "8px"
      },
      boxShadow: {
        soft: "0 18px 50px rgba(47, 49, 45, 0.08)"
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        "float-soft": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" }
        },
        "slow-pan": {
          "0%": { transform: "scale(1.04) translateX(0)" },
          "100%": { transform: "scale(1.08) translateX(-8px)" }
        }
      },
      animation: {
        "fade-up": "fade-up 700ms ease-out both",
        "float-soft": "float-soft 5s ease-in-out infinite",
        "slow-pan": "slow-pan 14s ease-in-out infinite alternate"
      }
    }
  },
  plugins: []
};

export default config;
