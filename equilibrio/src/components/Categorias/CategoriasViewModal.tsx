import type { TipoCategoria } from "../../types/TipoCategoria";

interface Props {
  categoria: TipoCategoria;
  close: () => void;
}

export default function CategoriaViewModal({ categoria, close }: Props) {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-[380px] shadow-lg border border-gray-200">
        <h2 className="text-2xl font-bold text-[#02353C] mb-4">Categoria</h2>

        <p><strong>Nome:</strong> {categoria.nome}</p>
        <p className="mt-2"><strong>Tipo:</strong> {categoria.tipo}</p>
        <p className="mt-2"><strong>ID:</strong> {categoria.idCategoria}</p>

        <button
          onClick={close}
          className="mt-6 w-full px-4 py-2 bg-[#196C84] text-white rounded hover:bg-[#15586B]"
        >
          Fechar
        </button>
      </div>
    </div>
  );
}
