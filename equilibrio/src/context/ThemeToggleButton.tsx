import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

export default function ThemeToggleButton() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="
        px-4 py-2 rounded-full font-semibold shadow-lg
        transform active:scale-95 hover:opacity-90
        transition-all duration-300
      "
      style={{
        backgroundColor: "var(--accent)",
        color: "var(--text-on-accent)" 
      }}
    >
      {theme === "light" ? "Modo Escuro" : "Modo Claro"}
    </button>
  );
}