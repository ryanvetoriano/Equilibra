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

        // 🔍 Buscar todas categorias
        const res = await fetch("http://localhost:8080/categorias");
        const todas: TipoCategoria[] = await res.json();

        // ❗ Verificar duplicação
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
                className="bg-white p-8 rounded-xl w-[380px] shadow-lg flex flex-col gap-4 border border-gray-200"
            >
                <h2 className="text-xl font-semibold text-[#02353C]">
                    {categoria ? "Editar Categoria" : "Nova Categoria"}
                </h2>

                {error && (
                    <div className="p-3 bg-red-200 text-red-800 rounded-md text-sm text-center">
                        {error}
                    </div>
                )}

                <label className="text-sm font-medium text-[#02353C]">Nome</label>
                <input
                    type="text"
                    placeholder="Ex: Reunião"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className="p-3 border rounded"
                    required
                />

                <label className="text-sm font-medium text-[#02353C]">Tipo</label>
                <input
                    type="text"
                    placeholder="Ex: TRABALHO / PESSOAL"
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value)}
                    className="p-3 border rounded"
                    required
                />

                <div className="flex justify-end gap-3 mt-4">
                    <button
                        type="button"
                        onClick={close}
                        className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                    >
                        Cancelar
                    </button>

                    <button
                        type="submit"
                        className="px-4 py-2 rounded bg-[#196C84] text-white hover:bg-[#15586B]"
                    >
                        Salvar
                    </button>
                </div>
            </form>
        </div>
    );
}
