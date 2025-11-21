import { useState } from "react";
import type { TipoCategoria } from "../../types/TipoCategoria";

interface Props {
  close: () => void;
  categoria?: TipoCategoria | null;
  onSave: () => void;
}

export default function CategoriasForm({ close, categoria, onSave }: Props) {
  const [nome, setNome] = useState(categoria?.nome || "");
  const [tipo, setTipo] = useState(categoria?.tipo || "");
  const [error, setError] = useState("");

  async function salvar(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
      // Mantive sua lógica de verificação de duplicidade
      const res = await fetch("http://localhost:8080/categorias");
      const todas: TipoCategoria[] = await res.json();

      const nomeDuplicado = todas.some(
        (c) =>
          c.nome.toLowerCase() === nome.toLowerCase() &&
          c.idCategoria !== categoria?.idCategoria
      );

      if (nomeDuplicado) {
        setError("Já existe uma categoria com esse nome.");
        return;
      }

      const payload = { nome, tipo };
      const url = categoria
        ? `http://localhost:8080/categorias/${categoria.idCategoria}`
        : `http://localhost:8080/categorias`;
      const method = categoria ? "PUT" : "POST";

      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      onSave();
      close();
    } catch (err) {
      console.error(err);
      setError("Erro ao salvar categoria.");
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <form
        onSubmit={salvar}
        className="
          w-full max-w-[380px]
          bg-[var(--surface)] 
          text-[var(--text-primary)] 
          p-6 sm:p-8 rounded-xl shadow-lg 
          flex flex-col gap-4 
          border border-[var(--border-subtle)]
        "
      >
        <h2 className="text-xl font-semibold text-[var(--accent)]">
          {categoria ? "Editar Categoria" : "Nova Categoria"}
        </h2>

        {error && (
          <div className="p-3 bg-red-100 border border-red-200 text-red-700 rounded-md text-sm text-center">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Nome</label>
          <input
            type="text"
            placeholder="Ex: Reunião"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="p-3 rounded bg-[var(--background)] border border-[var(--border-subtle)] focus:border-[var(--accent)] outline-none transition"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Tipo</label>
          <input
            type="text"
            placeholder="Ex: TRABALHO"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            className="p-3 rounded bg-[var(--background)] border border-[var(--border-subtle)] focus:border-[var(--accent)] outline-none transition"
            required
          />
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <button
            type="button"
            onClick={close}
            className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:opacity-80 transition"
          >
            Cancelar
          </button>

          <button
            type="submit"
            className="px-4 py-2 rounded bg-[var(--accent)] text-[var(--text-on-accent)] hover:opacity-90 transition shadow-sm"
          >
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
}