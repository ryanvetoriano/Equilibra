import { useState } from "react";
import type { TipoCategoria } from "../../types/TipoCategoria";

interface Props {
    close: () => void;
    categoria?: TipoCategoria | null;
    onSave: () => void;
}

export default function CategoriaForm({ close, categoria, onSave }: Props) {
    const [nome, setNome] = useState(categoria?.nome || "");
    const [tipo, setTipo] = useState(categoria?.tipo || "");
    const [error, setError] = useState("");

    async function salvar(e: React.FormEvent) {
        e.preventDefault();
        setError("");

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
    }

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
            <form
                onSubmit={salvar}
                className="bg-white dark:bg-[var(--surface)] text-[#02353C] dark:text-white p-8 rounded-xl w-[380px] shadow-lg flex flex-col gap-4 border border-gray-200 dark:border-[var(--border-subtle)]"
            >
                <h2 className="text-xl font-semibold text-[#02353C] dark:text-[var(--accent)]">
                    {categoria ? "Editar Categoria" : "Nova Categoria"}
                </h2>

                {error && (
                    <div className="p-3 bg-red-200 dark:bg-red-800 text-red-800 dark:text-red-200 rounded-md text-sm text-center">
                        {error}
                    </div>
                )}

                <label className="text-sm font-medium">Nome</label>
                <input
                    type="text"
                    placeholder="Ex: Reunião"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className="p-3 border rounded bg-[var(--background)] text-[var(--text-primary)] border-[var(--border-subtle)]"
                    required
                />

                <label className="text-sm font-medium">Tipo</label>
                <input
                    type="text"
                    placeholder="Ex: TRABALHO / PESSOAL"
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value)}
                    className="p-3 border rounded bg-[var(--background)] text-[var(--text-primary)] border-[var(--border-subtle)]"
                    required
                />

                <div className="flex justify-end gap-3 mt-4">
                    <button
                        type="button"
                        onClick={close}
                        className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-600 text-black dark:text-white hover:bg-gray-400 dark:hover:bg-gray-500"
                    >
                        Cancelar
                    </button>

                    <button
                        type="submit"
                        className="px-4 py-2 rounded bg-[#196C84] dark:bg-[var(--accent)] text-white dark:text-[var(--text-on-accent)] hover:bg-[#15586B] dark:hover:opacity-90"
                    >
                        Salvar
                    </button>
                </div>
            </form>
        </div>

    );
}
