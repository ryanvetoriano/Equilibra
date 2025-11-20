import type { TipoCategoria } from "../../types/TipoCategoria";

interface Props {
  categoria: TipoCategoria;
  close: () => void;
}

export default function CategoriaViewModal({ categoria, close }: Props) {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white dark:bg-[var(--surface)] text-[#02353C] dark:text-white p-6 rounded-xl w-[380px] shadow-lg border border-gray-200 dark:border-[var(--border-subtle)]">
        <h2 className="text-2xl font-bold text-[#02353C] dark:text-[var(--accent)] mb-4">Categoria</h2>

        <p><strong>Nome:</strong> {categoria.nome}</p>
        <p className="mt-2"><strong>Tipo:</strong> {categoria.tipo}</p>
        <p className="mt-2"><strong>ID:</strong> {categoria.idCategoria}</p>

        <button
          onClick={close}
          className="mt-6 w-full px-4 py-2 bg-[#196C84] dark:bg-[var(--accent)] text-white dark:text-[var(--text-on-accent)] rounded hover:bg-[#15586B] dark:hover:opacity-90"
        >
          Fechar
        </button>
      </div>
    </div>

  );
}
