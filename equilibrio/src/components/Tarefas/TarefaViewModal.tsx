import type { TipoTarefa } from "../../types/TipoTarefa";

interface Props {
  tarefa: TipoTarefa;
  close: () => void;
}

export default function TarefaViewModal({ tarefa, close }: Props) {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white w-[420px] p-6 rounded-xl shadow-lg border border-gray-200">
        
        <h2 className="text-2xl font-bold text-[#02353C] mb-4">
          {tarefa.titulo}
        </h2>

        <p className="text-sm text-gray-600 mb-1">
          <span className="font-semibold text-[#02353C]">Categoria:</span> {tarefa.categoria.nome}
        </p>

        <p className="text-sm text-gray-600 mb-1">
          <span className="font-semibold text-[#02353C]">Data:</span> {new Date(tarefa.dataTarefa).toLocaleDateString("pt-BR")}
        </p>

        <p className="text-sm text-gray-600 mb-4">
          <span className="font-semibold text-[#02353C]">Duração:</span> {tarefa.duracaoMin} min
        </p>

        <div className="bg-[#F4FAFB] p-4 rounded-lg border text-gray-800">
          <h3 className="font-semibold text-[#02353C] mb-2">Descrição</h3>
          <p className="leading-relaxed">
            {tarefa.descricao || "Sem descrição."}
          </p>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={close}
            className="px-4 py-2 bg-[#196C84] text-white rounded-md hover:bg-[#15586B]"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
