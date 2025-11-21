import { useState } from "react";
import type { TipoCategoria } from "../../types/TipoCategoria";
import type { TipoTarefa } from "../../types/TipoTarefa";

interface Props {
    close: () => void;
    categorias: TipoCategoria[];
    usuario: any;
    tarefa?: TipoTarefa | null;
    onSave: () => void;
}

export default function TarefaForm({ close, categorias, usuario, tarefa, onSave }: Props) {
    const [titulo, setTitulo] = useState(tarefa?.titulo || "");
    const [descricao, setDescricao] = useState(tarefa?.descricao || "");
    const [duracaoMin, setDuracaoMin] = useState(tarefa?.duracaoMin || 0);
    const [dataTarefa, setDataTarefa] = useState(
        tarefa ? tarefa.dataTarefa : new Date().toISOString().split("T")[0]
    );
    const [categoriaId, setCategoriaId] = useState(
        tarefa?.categoria.idCategoria || categorias[0]?.idCategoria || 1
    );

    async function salvar(e: React.FormEvent) {
        e.preventDefault();

        const payload = {
            titulo,
            descricao,
            duracaoMin,
            dataTarefa,
            usuario: { idUsuario: usuario.idUsuario },
            categoria: { idCategoria: categoriaId }
        };

        const url = tarefa
            ? `http://localhost:8080/tarefas/${tarefa.idTarefa}`
            : `http://localhost:8080/tarefas`;

        const method = tarefa ? "PUT" : "POST";

        await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        onSave();
        close();
    }

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <form
                onSubmit={salvar}
                className="
                    w-full max-w-[380px]
                    p-6 sm:p-8 rounded-xl shadow-lg 
                    bg-[var(--surface)]
                    border border-[var(--border-subtle)]
                    text-[var(--text-primary)]
                    flex flex-col gap-4
                "
            >
                <h2 className="text-xl font-semibold text-[var(--accent)]">
                    {tarefa ? "Editar Tarefa" : "Nova Tarefa"}
                </h2>

                <label className="text-sm font-medium">Título da tarefa</label>
                <input
                    type="text"
                    placeholder="Ex: Reunião com equipe"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    className="p-3 rounded bg-[var(--background)] border border-[var(--border-subtle)]"
                    required
                />

                <label className="text-sm font-medium">Descrição</label>
                <textarea
                    placeholder="Descrição opcional..."
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    className="p-3 rounded bg-[var(--background)] border border-[var(--border-subtle)]"
                />

                <label className="text-sm font-medium">Duração (em minutos)</label>
                <input
                    type="number"
                    placeholder="Ex: 45"
                    value={duracaoMin}
                    onChange={(e) => setDuracaoMin(Number(e.target.value))}
                    className="p-3 rounded bg-[var(--background)] border border-[var(--border-subtle)]"
                    required
                />

                <label className="text-sm font-medium">Data da tarefa</label>
                <input
                    type="date"
                    value={dataTarefa}
                    onChange={(e) => setDataTarefa(e.target.value)}
                    className="p-3 rounded bg-[var(--background)] border border-[var(--border-subtle)]"
                    required
                />

                <label className="text-sm font-medium">Categoria</label>
                <select
                    className="p-3 rounded bg-[var(--background)] border border-[var(--border-subtle)]"
                    value={categoriaId}
                    onChange={(e) => setCategoriaId(Number(e.target.value))}
                >
                    {categorias.map((cat) => (
                        <option key={cat.idCategoria} value={cat.idCategoria}>
                            {cat.nome}
                        </option>
                    ))}
                </select>

                <div className="flex justify-end gap-3 mt-4">
                    <button
                        type="button"
                        onClick={close}
                        className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-600 text-black dark:text-white"
                    >
                        Cancelar
                    </button>

                    <button
                        type="submit"
                        className="px-4 py-2 rounded bg-[var(--accent)] text-[var(--text-on-accent)] hover:opacity-90 transition"
                    >
                        Salvar
                    </button>
                </div>
            </form>
        </div>
    );
}
