import { useState } from "react";
import type { TipoCategoria } from "../../types/TipoCategoria";
import CategoriasViewModal from "./CategoriasViewModal";

interface Props {
  categorias: TipoCategoria[];
  onEdit: (c: TipoCategoria) => void;
  onUpdate: () => void;
}

export default function CategoriaTable({ categorias, onEdit, onUpdate }: Props) {
  const [selected, setSelected] = useState<TipoCategoria | null>(null);

  async function excluir(id: number) {
    if (!confirm("Deseja realmente excluir esta categoria?")) return;

    await fetch(`http://localhost:8080/categorias/${id}`, { method: "DELETE" });
    onUpdate();
  }

  return (
    <>
      <div className="overflow-x-auto rounded-xl shadow bg-white">
        <table className="w-full text-left border-collapse text-black">
          <thead className="bg-[#02353C] text-white">
            <tr>
              <th className="p-4">Nome</th>
              <th className="p-4">Tipo</th>
              <th className="p-4">ID</th>
              <th className="p-4 text-center">Ações</th>
            </tr>
          </thead>

          <tbody>
            {categorias.map((c) => (
              <tr
                key={c.idCategoria}
                onClick={() => setSelected(c)}
                className="border-b border-gray-200 hover:bg-[#F0F7F8] transition cursor-pointer"
              >
                <td className="p-4 text-black">{c.nome}</td>
                <td className="p-4 text-black">{c.tipo}</td>
                <td className="p-4 text-black">{c.idCategoria}</td>

                <td
                  className="p-4 flex gap-3 justify-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => onEdit(c)}
                    className="px-3 py-1 text-sm bg-[#196C84] text-white rounded hover:bg-[#15586B]"
                  >
                    Editar
                  </button>

                  <button
                    onClick={() => excluir(c.idCategoria)}
                    className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
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
        <CategoriasViewModal categoria={selected} close={() => setSelected(null)} />
      )}
    </>
  );
}
