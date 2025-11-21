import { NavLink, useNavigate } from "react-router-dom";
import { FiX } from "react-icons/fi";

interface SidebarProps {
  isMobile?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isMobile = false, onClose }: SidebarProps) {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("user");
    navigate("/");
    if (onClose) onClose();
  }

  return (
    <aside 
      className={`
        w-64 min-h-screen flex flex-col py-8 px-6 shadow-2xl
        transition-colors duration-300
        ${isMobile ? "block" : "hidden md:flex"}
        relative
      `}
      style={{ 
        backgroundColor: "var(--surface)", 
        color: "var(--text-primary)"
      }}
    >
      {isMobile && onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl"
        >
          <FiX />
        </button>
      )}

      <h1 className="text-3xl font-bold mb-10">
        Equilibra
      </h1>

      <nav className="flex flex-col gap-3 text-lg font-medium flex-1">
        <NavItem to="/home" label="Dashboard" onClick={onClose} />
        <NavItem to="/tarefas" label="Tarefas" onClick={onClose} />
        <NavItem to="/categorias" label="Categorias" onClick={onClose} />
        <NavItem to="/perfil" label="Perfil" onClick={onClose} />
        <NavItem to="/integrantes" label="Integrantes" onClick={onClose} />
        <NavItem to="/faq" label="FAQ" onClick={onClose} />
        <NavItem to="/about" label="Sobre" onClick={onClose} />
      </nav>

      <button
        onClick={handleLogout}
        className="
          mt-auto py-3 rounded-lg font-bold shadow-md
          transition-all duration-300
          hover:opacity-90 active:scale-95
        "
        style={{
          backgroundColor: "var(--accent)",
          color: "var(--text-on-accent)"
        }}
      >
        Sair
      </button>
    </aside>
  );
}

function NavItem({ to, label, onClick }: { to: string; label: string; onClick?: () => void }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `
        px-4 py-3 rounded-lg transition-all duration-300
        hover:bg-[var(--accent)] hover:text-[var(--text-on-accent)]
        ${isActive ? "font-bold shadow-md scale-105" : ""}
        `
      }
      style={({ isActive }) => isActive ? {
        backgroundColor: "var(--accent)",
        color: "var(--text-on-accent)"
      } : undefined}
    >
      {label}
    </NavLink>
  );
}
