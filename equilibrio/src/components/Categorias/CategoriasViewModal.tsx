import type { TipoCategoria } from "../../types/TipoCategoria";

interface Props {
  categoria: TipoCategoria;
  close: () => void;
}

export default function CategoriasViewModal({ categoria, close }: Props) {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div
        className="
          w-full max-w-[380px] 
          bg-white dark:bg-[var(--surface)] 
          text-[#02353C] dark:text-white 
          p-6 sm:p-8 rounded-xl shadow-lg 
          border border-[var(--border-subtle)]
        "
      >
        <h2 className="text-2xl font-bold text-[var(--accent)] mb-4">
          {categoria.nome}
        </h2>

        <div className="space-y-3">
          <div className="p-4 bg-[var(--background)] rounded-lg border border-[var(--border-subtle)]">
            <p className="text-sm text-[var(--text-secondary)] uppercase font-bold text-xs mb-1">Tipo</p>
            <p className="font-medium text-[var(--text-primary)]">{categoria.tipo}</p>
          </div>

          <div className="flex justify-between items-center px-1">
             <span className="text-sm font-semibold text-[var(--text-secondary)]">ID do Sistema:</span>
             <span className="font-mono text-sm text-[var(--text-primary)]">#{categoria.idCategoria}</span>
          </div>
        </div>

        <button
          onClick={close}
          className="
            mt-6 w-full px-4 py-2 
            bg-[var(--accent)] text-[var(--text-on-accent)] 
            rounded hover:opacity-90 transition font-medium shadow-sm
          "
        >
          Fechar
        </button>
      </div>
    </div>
  );
}