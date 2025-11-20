import ThemeToggleButton from "../../context/ThemeToggleButton";

export default function Header() {
  return (
    <header
      className="
    flex justify-between items-center 
    h-[15vh] px-6 
    bg-[var(--surface)] 
    text-[var(--text-primary)]
    shadow 
    rounded-b-3xl
    transition-colors
  "
    >
      <h1 className="text-3xl font-bold">
        Equilibra
      </h1>

      <ThemeToggleButton />
    </header>
  );
}
