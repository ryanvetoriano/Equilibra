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
    async function loadUserTasks() {
      if (!user.idUsuario) return;

      try {
        const res = await fetch(
          `http://localhost:8080/tarefas/usuario/${user.idUsuario}`
        );
        const data = await res.json();
        setTarefas(data);
      } catch (err) {
        console.error("Erro ao carregar tarefas", err);
      }
    }

    loadUserTasks();
  }, [user.idUsuario]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  async function deleteAccount() {
    try {
      const response = await fetch(
        `http://localhost:8080/usuarios/${user.idUsuario}`,
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
      const resUsers = await fetch("http://localhost:8080/usuarios");
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
        `http://localhost:8080/usuarios/${user.idUsuario}`,
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
  const tarefasHoje = tarefas.filter(
    (t) => new Date(t.dataTarefa).toDateString() === new Date().toDateString()
  ).length;

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

      <main className="p-6 flex flex-col gap-8 text-[#02353C]">
        <h1 className="text-3xl font-bold">Meu Perfil</h1>

        <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6">

          <div
            className="w-28 h-28 rounded-full bg-gradient-to-br from-[#2EAF7D] to-[#3FD0C9]
            flex items-center justify-center text-white text-4xl font-bold"
          >
            {user.nome?.charAt(0) || "U"}
          </div>

          <div className="flex-1">

            {!editMode ? (
              <>
                <p className="text-xl font-semibold">{user.nome}</p>
                <p className="opacity-70">{user.email}</p>
                <p className="opacity-70 mt-1">ID: {user.idUsuario}</p>

                <button
                  onClick={() => setEditMode(true)}
                  className="mt-4 px-5 py-2 rounded-full text-white 
                  bg-gradient-to-r from-[#2EAF7D] to-[#3FD0C9] 
                  hover:opacity-90 transition"
                >
                  Editar Perfil
                </button>

                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="mt-4 ml-2 px-5 py-2 rounded-full bg-red-500 text-white 
                  hover:bg-red-600 transition"
                >
                  Excluir Conta
                </button>

              </>
            ) : (
              <>
                <div className="flex flex-col gap-4">

                  <div className="flex flex-col">
                    <label className="text-sm font-semibold mb-1">Nome completo</label>
                    <input
                      name="nome"
                      value={form.nome}
                      onChange={handleChange}
                      className="p-3 rounded-xl bg-[#C1F6ED] border border-[#3FD0C9]
                      focus:outline-none focus:ring-2 focus:ring-[#2EAF7D]"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-sm font-semibold mb-1">E-mail</label>
                    <input
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className="p-3 rounded-xl bg-[#C1F6ED] border border-[#3FD0C9]
                      focus:outline-none focus:ring-2 focus:ring-[#2EAF7D]"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-sm font-semibold mb-1">Senha</label>
                    <input
                      type="password"
                      name="senha"
                      value={form.senha}
                      onChange={handleChange}
                      className="p-3 rounded-xl bg-[#C1F6ED] border border-[#3FD0C9]
                      focus:outline-none focus:ring-2 focus:ring-[#2EAF7D]"
                    />
                  </div>

                </div>

                <div className="mt-4 flex gap-3">
                  <button
                    onClick={saveChanges}
                    disabled={saving}
                    className="px-5 py-2 rounded-full text-white bg-gradient-to-r 
                    from-[#2EAF7D] to-[#3FD0C9] hover:opacity-90 transition 
                    disabled:opacity-50"
                  >
                    {saving ? "Salvando..." : "Salvar"}
                  </button>

                  <button
                    onClick={() => setEditMode(false)}
                    className="px-5 py-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
                  >
                    Cancelar
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Resumo da Atividade</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div className="bg-white rounded-2xl shadow-md p-6">
              <p className="text-lg font-semibold">Tarefas Hoje</p>
              <p className="text-4xl font-bold mt-2 text-[#2EAF7D]">
                {tarefasHoje}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6">
              <p className="text-lg font-semibold">Tarefas Totais</p>
              <p className="text-4xl font-bold mt-2 text-[#2EAF7D]">
                {totalTarefas}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6">
              <p className="text-lg font-semibold">Total de Minutos</p>
              <p className="text-3xl font-bold mt-2 text-[#2EAF7D]">
                {totalMinutos} min
              </p>
            </div>

          </div>
        </section>
      </main>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white w-[90%] max-w-md p-6 rounded-2xl shadow-xl border border-[#3FD0C9]/40 animate-fade">

            <h2 className="text-xl font-bold text-[#02353C] text-center">
              Tem certeza que deseja excluir sua conta?
            </h2>

            <p className="text-center text-[#02353C]/70 mt-2 text-sm">
              Esta ação é <strong>permanente</strong> e não poderá ser desfeita.
            </p>

            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-5 py-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
              >
                Cancelar
              </button>

              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  deleteAccount();
                }}
                className="px-5 py-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition"
              >
                Sim, excluir
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
