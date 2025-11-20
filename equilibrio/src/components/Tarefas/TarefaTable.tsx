import { useState } from "react";
import type { TipoTarefa } from "../../types/TipoTarefa";
import TarefaViewModal from "./TarefaViewModal";

interface Props {
  tarefas: TipoTarefa[];
  onEdit: (t: TipoTarefa) => void;
  onUpdate: () => void;
}

export default function TarefaTable({ tarefas, onEdit, onUpdate }: Props) {
  const [selected, setSelected] = useState<TipoTarefa | null>(null);

  async function excluir(id: number) {
    if (!confirm("Deseja realmente excluir esta tarefa?")) return;

    await fetch(`http://localhost:8080/tarefas/${id}`, { method: "DELETE" });
    onUpdate();
  }

  return (
    <>
      <div className="overflow-x-auto rounded-xl shadow bg-white">
        <table className="w-full text-left border-collapse text-[#02353C]">
          <thead className="bg-[#02353C] text-white">
            <tr>
              <th className="p-4">Título</th>
              <th className="p-4">Categoria</th>
              <th className="p-4">Data</th>
              <th className="p-4">Duração</th>
              <th className="p-4 text-center">Ações</th>
            </tr>
          </thead>

          <tbody>
            {tarefas.map((t) => (
              <tr
                key={t.idTarefa}
                onClick={() => setSelected(t)}
                className="
            border-b border-gray-200
            hover:bg-[#F0F7F8]
            transition cursor-pointer
            text-[#02353C]
          "
              >
                <td className="p-4">{t.titulo}</td>
                <td className="p-4">{t.categoria.nome}</td>
                <td className="p-4">
                  {new Date(t.dataTarefa).toLocaleDateString("pt-BR")}
                </td>
                <td className="p-4">{t.duracaoMin} min</td>

                <td
                  className="p-4 flex gap-3 justify-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => onEdit(t)}
                    className="
                px-3 py-1 text-sm 
                bg-[#196C84] text-white 
                rounded hover:bg-[#15586B]
              "
                  >
                    Editar
                  </button>

                  <button
                    onClick={() => excluir(t.idTarefa)}
                    className="
                px-3 py-1 text-sm 
                bg-red-600 text-white 
                rounded hover:bg-red-700
              "
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      {selected && (
        <TarefaViewModal tarefa={selected} close={() => setSelected(null)} />
      )}
    </>
  );
}
