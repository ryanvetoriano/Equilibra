import ThemeToggleButton from "../../context/ThemeToggleButton";
import { FiMenu, FiX } from "react-icons/fi";

interface HeaderProps {
  onToggleMobileMenu?: () => void;
  isMobileMenuOpen?: boolean;
}

export default function Header({ onToggleMobileMenu, isMobileMenuOpen }: HeaderProps) {
  return (
    <header
      className="
        min-w-full
        flex justify-between items-center 
        h-auto md:h-[15vh]
        px-8 md:px-12 lg:px-18
        py-4 md:py-0
        bg-[var(--surface)] 
        text-[var(--text-primary)]
        shadow 
        rounded-b-3xl
        transition-colors
      "
    >
      <div className="flex items-center gap-4">
        <button
          className="md:hidden text-2xl"
          onClick={onToggleMobileMenu}
        >
          {isMobileMenuOpen ? <FiX /> : <FiMenu />}
        </button>

        <h1 className="text-2xl md:text-3xl font-bold">
          Equilibra
        </h1>
      </div>

      <ThemeToggleButton />
    </header>
  );
}
