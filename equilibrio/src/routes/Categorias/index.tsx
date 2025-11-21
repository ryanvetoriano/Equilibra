import { useEffect, useState } from "react";
import type { TipoCategoria } from "../../types/TipoCategoria";
import CategoriasTable from "../../components/Categorias/CategoriasTable";
import CategoriasForm from "../../components/Categorias/CategoriasForm";

export default function Categorias() {
  const [categorias, setCategorias] = useState<TipoCategoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [categoriaEditando, setCategoriaEditando] = useState<TipoCategoria | null>(null);

  async function carregarCategorias() {
    try {
      const res = await fetch("https://equilibra-8yr9.onrender.com/categorias");
      const data = await res.json();
      setCategorias(data);
    } catch (e) {
      console.error("Erro ao carregar categorias", e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarCategorias();
  }, []);

  function abrirCriacao() {
    setCategoriaEditando(null);
    setOpenModal(true);
  }

  function abrirEdicao(categoria: TipoCategoria) {
    setCategoriaEditando(categoria);
    setOpenModal(true);
  }

  return (
    <main className="w-full min-w-0">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6 text-[var(--text-primary)]">
        <h1 className="text-2xl sm:text-3xl font-bold">
          Categorias
        </h1>

        <button
          onClick={abrirCriacao}
          className="
            w-full sm:w-auto px-5 py-2 
            bg-[var(--surface)] text-white 
            rounded-lg shadow hover:opacity-90 
            transition font-medium
          "
        >
          + Nova Categoria
        </button>
      </div>

      {loading ? (
        <p className="text-sm opacity-70">Carregando...</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-sm">
          <CategoriasTable
            categorias={categorias}
            onEdit={abrirEdicao}
            onUpdate={carregarCategorias}
          />
        </div>
      )}

      {openModal && (
        <CategoriasForm
          close={() => setOpenModal(false)}
          categoria={categoriaEditando}
          onSave={carregarCategorias}
        />
      )}
    </main>
  );
}