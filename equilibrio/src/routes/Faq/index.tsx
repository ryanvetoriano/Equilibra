import { useState } from "react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      pergunta: "O que é o Equilibra?",
      resposta:
        "O Equilibra é um aplicativo de organização pessoal focado em produtividade, equilíbrio e gestão de tarefas diárias.",
    },
    {
      pergunta: "Como funcionam as tarefas?",
      resposta:
        "Você pode criar, editar, concluir e remover tarefas. Todas são armazenadas no seu perfil e usadas para gerar estatísticas.",
    },
    {
      pergunta: "Minhas informações ficam salvas?",
      resposta:
        "Sim! Suas informações são salvas no banco de dados e associadas ao seu usuário.",
    },
    {
      pergunta: "Posso editar meu perfil?",
      resposta:
        "Sim, na página 'Perfil' você pode alterar nome, e-mail e senha, além de ver seu resumo de produtividade.",
    },
    {
      pergunta: "O tema escuro está disponível?",
      resposta:
        "Sim! O projeto conta com um tema escuro moderno e acessível para aqueles que preferem utilizá-lo.",
    },
  ];

  function toggle(index: number) {
    setOpenIndex(openIndex === index ? null : index);
  }

  return (
    <main className="px-4 py-8 md:px-8 text-[#02353C] max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center md:text-left text-[var(--text-primary)]">
        FAQ — Perguntas Frequentes
      </h1>

      <div className="flex flex-col gap-4 w-full">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={index}
              className="bg-white shadow-md rounded-xl border border-[#3FD0C9]/40"
            >
              <button
                onClick={() => toggle(index)}
                className="flex items-center justify-between w-full p-4 text-left cursor-pointer"
              >
                <span className="font-semibold text-lg leading-snug">
                  {faq.pergunta}
                </span>

                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  className={`transition-transform duration-300 shrink-0 ${
                    isOpen ? "rotate-180" : "rotate-0"
                  }`}
                  fill="#2EAF7D"
                >
                  <path d="M12 15.5L5 8.5L6.4 7.1L12 12.7L17.6 7.1L19 8.5L12 15.5Z" />
                </svg>
              </button>

              {isOpen && (
                <div className="px-4 pb-4 text-[#02353C]/80 animate-fade">
                  {faq.resposta}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
}
