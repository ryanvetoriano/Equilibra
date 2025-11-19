import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer
      className="
        mt-10 w-full 
        bg-gradient-to-r from-[#02353C] to-[#196C84]
        text-white
        py-8 px-6
        rounded-t-3xl
        shadow-lg
      "
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

        <div>
          <h2 className="text-2xl font-bold tracking-wide bg-gradient-to-r from-[#3FD0C9] to-[#2EAF7D] bg-clip-text text-transparent">
            Equilibra
          </h2>
          <p className="mt-2 text-sm text-white/80 leading-relaxed">
            Aplicação feita para ajudar você a organizar tarefas, melhorar produtividade
            e alcançar equilíbrio entre vida pessoal e profissional.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold mb-1 text-[#3FD0C9]">Navegação</h3>

          <Link to="/home" className="hover:text-[#3FD0C9] transition">Dashboard</Link>
          <Link to="/tarefas" className="hover:text-[#3FD0C9] transition">Tarefas</Link>
          <Link to="/categorias" className="hover:text-[#3FD0C9] transition">Categorias</Link>
          <Link to="/perfil" className="hover:text-[#3FD0C9] transition">Meu Perfil</Link>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3 text-[#3FD0C9]">Contato & Redes</h3>

          <div className="flex flex-col gap-4">

            <Link
              to="https://github.com/ryanvetoriano/equilibrio"
              target="_blank"
              className="flex items-center gap-2 hover:opacity-80 transition"
            >
              <svg width="20" height="20" fill="white" viewBox="0 0 24 24">
                <path d="M12 .5a12 12 0 00-3.79 23.4c.6.1.82-.26.82-.58v-2c-3.34.73-4.04-1.61-4.04-1.61a3.18 3.18 0 00-1.34-1.76c-1.1-.75.08-.74.08-.74a2.52 2.52 0 011.84 1.24 2.56 2.56 0 003.47 1 2.54 2.54 0 01.76-1.6c-2.67-.3-5.47-1.34-5.47-5.94a4.66 4.66 0 011.24-3.24 4.3 4.3 0 01.12-3.19s1-.32 3.3 1.23a11.38 11.38 0 016 0c2.28-1.55 3.28-1.23 3.28-1.23a4.3 4.3 0 01.12 3.19 4.66 4.66 0 011.24 3.24c0 4.61-2.8 5.63-5.47 5.93A2.86 2.86 0 0113.5 21v2.79c0 .32.21.69.82.58A12 12 0 0012 .5z"/>
              </svg>
              Github do Projeto
            </Link>

            <Link
              to="https://www.linkedin.com/in/ryanvetoriano/"
              target="_blank"
              className="flex items-center gap-2 hover:opacity-80 transition"
            >
              <svg width="20" height="20" fill="white" viewBox="0 0 24 24">
                <path d="M4.98 3.5A2.5 2.5 0 112.48 6 2.5 2.5 0 014.98 3.5zM3 8.98h4v12H3zM14.5 9c-2.33 0-3.5 1.36-3.5 3.91v8.07h-4v-12h4v1.6a4.88 4.88 0 014.47-2.6c3.1 0 5.03 1.94 5.03 5.74v7.26h-4v-7.26c0-1.87-.7-2.72-2-2.72z"/>
              </svg>
              LinkedIn
            </Link>

            <Link
              to="mailto:vetorianosilva@gmail.com"
              className="flex items-center gap-2 hover:opacity-80 transition"
            >
              <svg width="20" height="20" fill="white" viewBox="0 0 24 24">
                <path d="M20 4H4a2 2 0 00-2 2v1l10 6 10-6V6a2 2 0 00-2-2zm0 4.2l-8.4 5.1a1 1 0 01-1.2 0L4 8.2V18a2 2 0 002 2h12a2 2 0 002-2z"/>
              </svg>
              vetorianosilva@gmail.com
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-white/20 mt-8 pt-4 text-center text-sm text-white/70">
        © {new Date().getFullYear()} Equilibra — Todos os direitos reservados.
      </div>
    </footer>
  );
}
