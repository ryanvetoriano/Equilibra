import { useState } from "react";
import type { TipoCategoria } from "../../types/TipoCategoria";
import CategoriasViewModal from "./CategoriasViewModal";

const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
  </svg>
);

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
  </svg>
);

interface Props {
  categorias: TipoCategoria[];
  onEdit: (c: TipoCategoria) => void;
  onUpdate: () => void;
}

export default function CategoriasTable({ categorias, onEdit, onUpdate }: Props) {
  const [selected, setSelected] = useState<TipoCategoria | null>(null);

  async function excluir(id: number) {
    if (!confirm("Deseja realmente excluir esta categoria?")) return;
    
    try {
      await fetch(`https://equilibra-8yr9.onrender.com/categorias/${id}`, { method: "DELETE" });
      onUpdate();
    } catch (error) {
      console.error("Erro ao excluir:", error);
    }
  }

  return (
    <>
      <div className="w-full">
        <div className="overflow-hidden rounded-2xl shadow-lg bg-[var(--surface)] border border-[var(--border-subtle)]">
          <table className="w-full text-left border-collapse">
            
            <thead className="hidden md:table-header-group bg-[var(--equilibra-dark)] text-white">
              <tr>
                <th className="p-5 text-xs font-semibold uppercase tracking-wider opacity-90">Nome</th>
                <th className="p-5 text-xs font-semibold uppercase tracking-wider opacity-90">Tipo</th>
                <th className="p-5 text-xs font-semibold uppercase tracking-wider opacity-90">ID</th>
                <th className="p-5 text-xs font-semibold uppercase tracking-wider opacity-90 text-center">Ações</th>
              </tr>
            </thead>

            <tbody className="block md:table-row-group p-4 md:p-0">
              {categorias.map((c) => (
                <tr
                  key={c.idCategoria}
                  onClick={() => setSelected(c)}
                  className="
                    group
                    /* Mobile: Card Style */
                    block md:table-row
                    bg-[var(--background)]
                    mb-4 md:mb-0 rounded-xl md:rounded-none
                    border border-[var(--border-subtle)] md:border-b md:border-x-0 md:border-t-0
                    shadow-sm md:shadow-none
                    
                    /* Interação */
                    hover:bg-[var(--surface)] md:hover:bg-[rgba(0,0,0,0.02)] dark:md:hover:bg-[rgba(255,255,255,0.05)]
                    transition-all duration-200 cursor-pointer
                  "
                >
                  <td className="p-4 md:p-5 block md:table-cell">
                    <div className="flex flex-col md:block">
                      <span className="md:hidden text-[var(--text-secondary)] text-xs font-bold uppercase mb-1">
                        Nome
                      </span>
                      <span className="font-semibold text-[var(--text-primary)] text-base">
                        {c.nome}
                      </span>
                    </div>
                  </td>

                  <td className="p-4 md:p-5 block md:table-cell">
                    <div className="flex items-center justify-between md:justify-start">
                      <span className="md:hidden text-[var(--text-secondary)] text-xs font-bold uppercase">
                        Tipo
                      </span>
                      <span className="
                        inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        bg-[var(--surface)] border border-[var(--border-subtle)]
                        text-[var(--text-primary)] uppercase tracking-wide
                      ">
                        {c.tipo}
                      </span>
                    </div>
                  </td>

                  <td className="p-4 md:p-5 block md:table-cell">
                    <div className="flex items-center justify-between md:justify-start">
                      <span className="md:hidden text-[var(--text-secondary)] text-xs font-bold uppercase">
                        ID
                      </span>
                      <span className="text-[var(--text-secondary)] font-mono text-xs">
                        #{c.idCategoria}
                      </span>
                    </div>
                  </td>

                  <td
                    className="p-4 md:p-5 block md:table-cell border-t border-[var(--border-subtle)] md:border-0 mt-2 md:mt-0"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex justify-end md:justify-center gap-3">
                      <button
                        onClick={() => onEdit(c)}
                        title="Editar"
                        className="
                          p-2 rounded-full
                          text-[var(--equilibra-dark2)] dark:text-[var(--equilibra-light1)]
                          hover:bg-[var(--equilibra-light1)] hover:bg-opacity-20
                          transition-colors
                        "
                      >
                        <EditIcon />
                      </button>

                      <button
                        onClick={() => excluir(c.idCategoria)}
                        title="Excluir"
                        className="
                          p-2 rounded-full
                          text-red-500 hover:text-red-600
                          hover:bg-red-100 dark:hover:bg-red-900/30
                          transition-colors
                        "
                      >
                        <TrashIcon />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selected && (
        <CategoriasViewModal categoria={selected} close={() => setSelected(null)} />
      )}
    </>
  );
}