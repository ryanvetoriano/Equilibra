import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { User } from "../../types/TipoUser";
import type { TipoTarefa } from "../../types/TipoTarefa";

export default function Perfil() {
  const navigate = useNavigate();

  const [user, setUser] = useState<User>(() => {
    return JSON.parse(localStorage.getItem("user") || "{}");
  });

  const [tarefas, setTarefas] = useState<TipoTarefa[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [form, setForm] = useState({
    nome: user.nome,
    email: user.email,
    senha: user.senha,
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadUserData() {
      if (!user.idUsuario) return;

      try {
        const resTasks = await fetch(
          `https://equilibra-8yr9.onrender.com/tarefas/usuario/${user.idUsuario}`
        );
        const dataTasks = await resTasks.json();
        setTarefas(dataTasks);

      } catch (err) {
        console.error("Erro ao carregar dados do usuário", err);
      }
    }

    loadUserData();
  }, [user.idUsuario]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function deleteAllTasks() {
    if (!user.idUsuario || tarefas.length === 0) return;

    try {
      await Promise.all(
        tarefas.map((t) =>
          fetch(`https://equilibra-8yr9.onrender.com/tarefas/${t.idTarefa}`, { method: "DELETE" })
        )
      );

      setTarefas([]);
      setAlertMsg("Todas as tarefas foram excluídas!");
      setTimeout(() => setAlertMsg(""), 3000);
    } catch (err) {
      console.error(err);
      setAlertMsg("Erro ao excluir tarefas.");
      setTimeout(() => setAlertMsg(""), 3000);
    }
  }

  async function deleteAccount() {
    if (tarefas.length > 0) {
      setAlertMsg("Você precisa excluir todas as tarefas antes de excluir a conta.");
      setTimeout(() => setAlertMsg(""), 4000);
      return;
    }

    try {
      const response = await fetch(
        `https://equilibra-8yr9.onrender.com/usuarios/${user.idUsuario}`,
        { method: "DELETE" }
      );

      if (!response.ok) throw new Error("Erro ao excluir conta.");

      localStorage.removeItem("user");

      setAlertMsg("Conta excluída com sucesso!");
      setTimeout(() => {
        setAlertMsg("");
        navigate("/");
      }, 1500);
    } catch (err) {
      console.error(err);
      setAlertMsg("Erro ao excluir conta.");
      setTimeout(() => setAlertMsg(""), 2500);
    }
  }

  async function saveChanges() {
    if (!user.idUsuario) return;
    setSaving(true);

    try {
      const resUsers = await fetch("https://equilibra-8yr9.onrender.com/usuarios");
      const allUsers: User[] = await resUsers.json();

      const emailDuplicado = allUsers.find(
        (u) => u.email === form.email && u.idUsuario !== user.idUsuario
      );
      if (emailDuplicado) {
        setAlertMsg("Este e-mail já está sendo usado por outro usuário.");
        setTimeout(() => setAlertMsg(""), 3000);
        setSaving(false);
        return;
      }

      const nomeDuplicado = allUsers.find(
        (u) => u.nome === form.nome && u.idUsuario !== user.idUsuario
      );
      if (nomeDuplicado) {
        setAlertMsg("Este nome já está sendo usado.");
        setTimeout(() => setAlertMsg(""), 3000);
        setSaving(false);
        return;
      }

      const updatedUser: User = { ...user, ...form };

      const response = await fetch(
        `https://equilibra-8yr9.onrender.com/usuarios/${user.idUsuario}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedUser),
        }
      );

      if (!response.ok)
        throw new Error("Erro ao atualizar usuário no servidor");

      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setEditMode(false);

      setAlertMsg("Informações atualizadas com sucesso!");
      setTimeout(() => setAlertMsg(""), 3000);
    } catch (err) {
      console.error("Erro ao salvar alterações:", err);
      setAlertMsg("Erro ao atualizar. Tente novamente.");
      setTimeout(() => setAlertMsg(""), 3000);
    } finally {
      setSaving(false);
    }
  }

  const totalTarefas = tarefas.length;
  const totalMinutos = tarefas.reduce((sum, t) => sum + t.duracaoMin, 0);
  const hoje = new Date();
  const hojeStr = hoje.toISOString().split("T")[0];
  const tarefasHoje = tarefas.filter((t) => t.dataTarefa.split("T")[0] === hojeStr).length;

  return (
    <>
      {alertMsg && (
        <div
          className="fixed top-6 left-1/2 -translate-x-1/2 
          bg-white/80 backdrop-blur-md border border-[#3FD0C9]
          px-6 py-3 rounded-xl text-[#02353C] font-semibold shadow-xl
          animate-fade z-[60]"
        >
          {alertMsg}
        </div>
      )}

      <main className="p-6 max-w-5xl mx-auto flex flex-col gap-8">
        <h1 className="text-3xl font-bold text-center md:text-left text-[var(--text-primary)]">
          Meu Perfil
        </h1>

        <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col md:flex-row md:items-center gap-6 text-[var(--equilibra-dark)]">

          <div
            className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-[#2EAF7D] to-[#3FD0C9]
            flex items-center justify-center text-white text-3xl md:text-4xl font-bold mx-auto md:mx-0"
          >
            {user.nome?.charAt(0) || "U"}
          </div>

          <div className="flex-1 w-full">
            {!editMode ? (
              <>
                <p className="text-xl font-semibold text-center md:text-left">{user.nome}</p>
                <p className="opacity-70 text-center md:text-left">{user.email}</p>
                <p className="opacity-70 mt-1 text-center md:text-left">ID: {user.idUsuario}</p>

                <div className="flex flex-col sm:flex-row sm:justify-start gap-3 mt-4">
                  <button
                    onClick={() => setEditMode(true)}
                    className="px-5 py-2 rounded-full text-white 
                    bg-gradient-to-r from-[#2EAF7D] to-[#3FD0C9]
                    hover:opacity-90 transition w-full sm:w-auto"
                  >
                    Editar Perfil
                  </button>

                  <button
                    onClick={() => setShowDeleteModal(true)}
                    className="px-5 py-2 rounded-full bg-red-500 text-white 
                    hover:bg-red-600 transition w-full sm:w-auto"
                  >
                    Excluir Conta
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col gap-4 w-full">
                  <div className="flex flex-col w-full">
                    <label className="text-sm font-semibold mb-1">Nome completo</label>
                    <input
                      name="nome"
                      value={form.nome}
                      onChange={handleChange}
                      className="p-3 rounded-xl bg-[#C1F6ED] border border-[#3FD0C9] w-full focus:outline-none focus:ring-2 focus:ring-[#2EAF7D]"
                    />
                  </div>

                  <div className="flex flex-col w-full">
                    <label className="text-sm font-semibold mb-1">E-mail</label>
                    <input
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className="p-3 rounded-xl bg-[#C1F6ED] border border-[#3FD0C9] w-full focus:outline-none focus:ring-2 focus:ring-[#2EAF7D]"
                    />
                  </div>

                  <div className="flex flex-col w-full">
                    <label className="text-sm font-semibold mb-1">Senha</label>
                    <input
                      type="password"
                      name="senha"
                      value={form.senha}
                      onChange={handleChange}
                      className="p-3 rounded-xl bg-[#C1F6ED] border border-[#3FD0C9] w-full focus:outline-none focus:ring-2 focus:ring-[#2EAF7D]"
                    />
                  </div>
                </div>

                <div className="mt-4 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={saveChanges}
                    disabled={saving}
                    className="px-5 py-2 rounded-full text-white bg-gradient-to-r from-[#2EAF7D] to-[#3FD0C9] hover:opacity-90 transition disabled:opacity-50 w-full sm:w-auto"
                  >
                    {saving ? "Salvando..." : "Salvar"}
                  </button>

                  <button
                    onClick={() => setEditMode(false)}
                    className="px-5 py-2 rounded-full bg-gray-200 hover:bg-gray-300 transition w-full sm:w-auto"
                  >
                    Cancelar
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-center md:text-left text-[var(--text-primary)]">
            Resumo da Atividade
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-[var(--equilibra-dark)]">
            <div className="bg-white rounded-2xl shadow-md p-6 text-center">
              <p className="text-lg font-semibold">Tarefas Hoje</p>
              <p className="text-4xl font-bold mt-2 text-[#2EAF7D]">{tarefasHoje}</p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6 text-center">
              <p className="text-lg font-semibold">Tarefas Totais</p>
              <p className="text-4xl font-bold mt-2 text-[#2EAF7D]">{totalTarefas}</p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6 text-center">
              <p className="text-lg font-semibold">Total de Minutos</p>
              <p className="text-3xl font-bold mt-2 text-[#2EAF7D]">{totalMinutos} min</p>
            </div>
          </div>
        </section>
      </main>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-xl border border-[#3FD0C9]/40 animate-fade">
            <h2 className="text-xl font-bold text-[#02353C] text-center">
              {tarefas.length > 0
                ? "Você precisa excluir todas as tarefas primeiro"
                : "Tem certeza que deseja excluir sua conta?"}
            </h2>

            {tarefas.length > 0 && (
              <p className="text-center text-[#02353C]/70 mt-2 text-sm">
                Você ainda possui {tarefas.length} tarefa(s). Pode excluí-las todas agora.
              </p>
            )}

            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-5 py-2 rounded-full bg-gradient-to-r from-[#2EAF7D] to-[#3FD0C9] transition w-full sm:w-auto"
              >
                Cancelar
              </button>

              {tarefas.length > 0 ? (
                <button
                  onClick={() => {
                    deleteAllTasks();
                    setShowDeleteModal(false);
                  }}
                  className="px-5 py-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition w-full sm:w-auto"
                >
                  Excluir todas as tarefas
                </button>
              ) : (
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    deleteAccount();
                  }}
                  className="px-5 py-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition w-full sm:w-auto"
                >
                  Sim, excluir
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
