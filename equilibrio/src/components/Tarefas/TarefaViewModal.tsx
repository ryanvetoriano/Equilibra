import type { TipoTarefa } from "../../types/TipoTarefa";

interface Props {
  tarefa: TipoTarefa;
  close: () => void;
}

export default function TarefaViewModal({ tarefa, close }: Props) {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">

      <div
        className="
          w-full max-w-[420px] 
          p-6 sm:p-8 rounded-xl shadow-lg 
          bg-white text-[#02353C]
          border border-[var(--border-subtle)]
          dark:bg-[var(--surface)] dark:text-white dark:border-[var(--border-subtle)]
        "
      >
        <h2 className="text-xl sm:text-2xl font-bold text-[var(--accent)] mb-4">
          {tarefa.titulo}
        </h2>

        <p className="text-sm mb-1">
          <span className="font-semibold">Categoria:</span> {tarefa.categoria.nome}
        </p>

        <p className="text-sm mb-1">
          <span className="font-semibold">Data:</span>{" "}
          {new Date(tarefa.dataTarefa).toLocaleDateString("pt-BR")}
        </p>

        <p className="text-sm mb-4">
          <span className="font-semibold">Duração:</span> {tarefa.duracaoMin} min
        </p>

        <div
          className="
            p-4 rounded-lg border 
            border-[var(--border-subtle)]
            bg-[var(--background)] 
          "
        >
          <h3 className="font-semibold text-[var(--accent)] mb-2">
            Descrição
          </h3>

          <p className="text-[var(--text-primary)]">
            {tarefa.descricao || "Sem descrição."}
          </p>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={close}
            className="
              px-5 py-2 rounded-md 
              bg-[var(--accent)] 
              text-[var(--text-on-accent)] 
              hover:opacity-90
              transition
            "
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
