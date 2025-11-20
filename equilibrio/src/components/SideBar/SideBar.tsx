import { NavLink, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("user");
    navigate("/");
  }

  return (
    <aside 
      className="
        w-64 min-h-screen flex flex-col py-8 px-6 shadow-2xl
        transition-colors duration-300
      "
      style={{ 
        backgroundColor: "var(--surface)", 
        color: "var(--text-primary)"
      }}
    >
      <h1 
        className="text-3xl font-bold mb-10 transition-colors duration-300"
      >
        Equilibra
      </h1>

      <nav className="flex flex-col gap-3 text-lg font-medium flex-1">
        <NavItem to="/home" label="Dashboard" />
        <NavItem to="/tarefas" label="Tarefas" />
        <NavItem to="/categorias" label="Categorias" />
        <NavItem to="/perfil" label="Perfil" />
        <NavItem to="/integrantes" label="Integrantes"/>
        <NavItem to="/faq" label="FAQ"/>
        <NavItem to="/about" label="Sobre"/>
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

function NavItem({ to, label }: { to: string; label: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `
        px-4 py-3 rounded-lg transition-all duration-300
        /* Lógica de Hover: Fundo e Cor do Texto mudam para Accent */
        hover:bg-[var(--accent)] hover:text-[var(--text-on-accent)]
        ${isActive 
          ? "font-bold shadow-md scale-105" 
          : ""
        }
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