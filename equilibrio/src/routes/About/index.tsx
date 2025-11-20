export default function About() {
  return (
    <main className="p-8 text-[#02353C] max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-10">Sobre o Equilibra</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        <div className="flex flex-col gap-10">

          <section className="bg-white p-8 rounded-3xl shadow-xl border border-[#3FD0C9]/40 leading-relaxed">
            <h2 className="text-2xl font-semibold mb-3">O que é o Equilibra?</h2>
            <p className="text-lg text-[#02353C]/80">
              O <strong>Equilibra</strong> é uma aplicação desenvolvida para ajudar pessoas
              a organizarem suas tarefas, gerenciar produtividade e alcançar equilíbrio entre vida pessoal e profissional.
            </p>
            <p className="text-lg text-[#02353C]/80 mt-3">
              Possui interface moderna, leve e intuitiva, tornando o acompanhamento das atividades uma experiência agradável.
            </p>
          </section>

          <section className="bg-white p-8 rounded-3xl shadow-xl border border-[#3FD0C9]/40 leading-relaxed">
            <h2 className="text-2xl font-semibold mb-3">Objetivo da Aplicação</h2>
            <p className="text-lg text-[#02353C]/80">
              Este sistema foi desenvolvido como parte da <strong>Global Solution</strong>, integrando conhecimentos de Front-end,
              Back-end, banco de dados e experiência do usuário.
            </p>
            <p className="text-lg text-[#02353C]/80 mt-3">
              O propósito é criar um ambiente funcional, com boas práticas, arquitetura limpa e
              design consistente — simulando um produto real.
            </p>
          </section>
        </div>

        <div className="flex flex-col gap-10">

          <section className="bg-white p-8 rounded-3xl shadow-xl border border-[#3FD0C9]/40">
            <h2 className="text-2xl font-semibold mb-4">Funcionalidades</h2>

            <ul className="flex flex-col gap-3 text-lg text-[#02353C]/80">
              <li>Gerenciamento de tarefas (CRUD completo)</li>
              <li>Sistema de categorias personalizadas</li>
              <li>Dashboard com métricas e gráficos</li>
              <li>Página de perfil com estatísticas</li>
              <li>Login e autenticação completa</li>
              <li>Alertas estilizados e feedback imediato</li>
              <li>Design moderno seguindo a identidade do Equilibra</li>
              <li>Preparado para tema escuro e responsividade</li>
            </ul>
          </section>

          <section className="bg-white p-8 rounded-3xl shadow-xl border border-[#3FD0C9]/40">
            <h2 className="text-2xl font-semibold mb-4">Tecnologias Utilizadas</h2>

            <div className="grid grid-cols-2 gap-4 text-lg text-[#02353C]/80">

              <div>
                <h3 className="font-semibold text-[#2EAF7D] mb-2">Frontend</h3>
                <ul className="list-disc ml-6">
                  <li>React + TypeScript</li>
                  <li>Vite</li>
                  <li>TailwindCSS</li>
                  <li>Recharts</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-[#2EAF7D] mb-2">Backend</h3>
                <ul className="list-disc ml-6">
                  <li>Java</li>
                  <li>Quarkus</li>
                  <li>REST</li>
                  <li>OracleSql</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>

    </main>
  );
}
