import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

export default function ThemeToggleButton() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="
        px-4 py-2 md:px-5 md:py-2.5
        rounded-full font-semibold
        shadow-md md:shadow-lg
        text-sm md:text-base
        transition-all duration-300
        hover:opacity-90 active:scale-95
        
        bg-[var(--accent)] 
        text-[var(--text-on-accent)]
      "
    >
      {theme === "light" ? "Modo Escuro" : "Modo Claro"}
    </button>
  );
}
