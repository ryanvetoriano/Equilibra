import { NavLink, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("user");
    navigate("/");
  }

  return (
    <aside className="w-64 bg-[#02353C] text-white flex flex-col py-8 px-6 shadow-xl">
      <h1 className="text-3xl font-bold mb-10 text-[#3FD0C9]">Equilibra</h1>

      <nav className="flex flex-col gap-4 text-lg font-medium">
        <NavItem to="/home" label="Dashboard" />
        <NavItem to="/tarefas" label="Tarefas" />
        <NavItem to="/categorias" label="Categorias" />
        <NavItem to="/perfil" label="Perfil" />
        <NavItem to="/integrantes" label="Integrantes"/>
      </nav>

      <button
        onClick={handleLogout}
        className="mt-auto bg-[#2EAF7D] py-3 rounded-lg font-semibold hover:bg-[#3FD0C9] transition"
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
        `p-3 rounded-lg transition ${
          isActive
            ? "bg-[#2EAF7D] text-black font-bold"
            : "hover:bg-[#3FD0C9] hover:text-black"
        }`
      }
    >
      {label}
    </NavLink>
  );
}
