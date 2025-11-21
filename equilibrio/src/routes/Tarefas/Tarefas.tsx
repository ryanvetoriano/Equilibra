import { useEffect, useState } from "react";
import TarefaTable from "../../components/Tarefas/TarefaTable";
import TarefaForm from "../../components/Tarefas/TarefaForm";
import type { TipoTarefa } from "../../types/TipoTarefa";
import type { TipoCategoria } from "../../types/TipoCategoria";

export default function Tarefas() {
    const [tarefas, setTarefas] = useState<TipoTarefa[]>([]);
    const [categorias, setCategorias] = useState<TipoCategoria[]>([]);
    const [loading, setLoading] = useState(true);
    const [openModal, setOpenModal] = useState(false);
    const [tarefaEditando, setTarefaEditando] = useState<TipoTarefa | null>(null);

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!user.idUsuario) {
        console.error("Usuário não encontrado no localStorage");
    }

    async function carregarDados() {
        try {
            const resTasks = await fetch(`http://localhost:8080/tarefas/usuario/${user.idUsuario}`);
            const resCats = await fetch("http://localhost:8080/categorias");

            const tasks = await resTasks.json();
            const cats = await resCats.json();

            setTarefas(tasks);
            setCategorias(cats);
        } catch (e) {
            console.error("Erro ao carregar tarefas", e);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        carregarDados();
    }, []);

    function abrirCriacao() {
        setTarefaEditando(null);
        setOpenModal(true);
    }

    function abrirEdicao(tarefa: TipoTarefa) {
        setTarefaEditando(tarefa);
        setOpenModal(true);
    }

    return (
        <div className="w-full min-w-0">
            {/* Header Responsivo */}
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-[#02353C]">
                    Tarefas
                </h1>

                <button
                    onClick={abrirCriacao}
                    className="w-full sm:w-auto px-5 py-2 bg-[var(--surface)] text-white rounded-lg shadow hover:opacity-90 transition"
                >
                    + Nova Tarefa
                </button>
            </div>

            {/* Tabela / Loading */}
            {loading ? (
                <p className="text-sm opacity-70">Carregando...</p>
            ) : (
                <div className="overflow-x-auto rounded-lg shadow-sm">
                    <TarefaTable 
                        tarefas={tarefas} 
                        onEdit={abrirEdicao} 
                        onUpdate={carregarDados} 
                    />
                </div>
            )}

            {/* Modal */}
            {openModal && (
                <TarefaForm
                    close={() => setOpenModal(false)}
                    categorias={categorias}
                    usuario={user}
                    tarefa={tarefaEditando}
                    onSave={carregarDados}
                />
            )}
        </div>
    );
}
