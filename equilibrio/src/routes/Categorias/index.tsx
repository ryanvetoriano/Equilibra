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
      const res = await fetch("http://localhost:8080/categorias");
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
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#02353C]">Categorias</h1>

        <button
          onClick={abrirCriacao}
          className="px-5 py-2 bg-[#196C84] text-white rounded-lg shadow hover:bg-[#15586B] transition"
        >
          + Nova Categoria
        </button>
      </div>

      {loading ? (
        <p>Carregando...</p>
      ) : (
        <CategoriasTable
          categorias={categorias}
          onEdit={abrirEdicao}
          onUpdate={carregarCategorias}
        />
      )}

      {openModal && (
        <CategoriasForm
          close={() => setOpenModal(false)}
          categoria={categoriaEditando}
          onSave={carregarCategorias}
        />
      )}
    </div>
  );
}
