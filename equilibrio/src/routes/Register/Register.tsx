import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import type { User } from "../../types/TipoUser";

export default function Register() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:8080/usuarios");
      if (!res.ok) throw new Error("Erro ao verificar usuários existentes.");
      const usuarios: User[] = await res.json();

      if (usuarios.some((u) => u.email === email)) {
        setError("Este e-mail já está cadastrado!");
        return;
      }
      if (usuarios.some((u) => u.nome === nome)) {
        setError("Este nome de usuário já está em uso!");
        return;
      }

      const novoUsuario: User = { nome, email, senha };

      const response = await fetch("http://localhost:8080/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoUsuario),
      });

      if (!response.ok) throw new Error("Erro ao cadastrar o usuário.");

      const user: User = await response.json();

      localStorage.setItem("user", JSON.stringify(user));
      alert("Cadastro realizado com sucesso!");
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Erro ao conectar ao servidor. Tente novamente.");
    }
  }

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-white text-gray-900">
      <section className="bg-gray-100 border border-gray-300 p-8 rounded-xl w-80 shadow-lg flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-6">Cadastro</h1>

        <form
          onSubmit={handleRegister}
          className="w-full flex flex-col gap-4"
        >
          <input
            type="text"
            placeholder="Nome completo"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="p-3 rounded border border-gray-300 bg-white text-gray-900"
            required
          />

          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded border border-gray-300 bg-white text-gray-900"
            required
          />

          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="p-3 rounded border border-gray-300 bg-white text-gray-900"
            required
          />

          {error && (
            <p className="text-red-600 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white rounded p-3 font-semibold transition"
          >
            Cadastrar
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-600">
          Já tem uma conta?{" "}
          <Link to="/" className="text-blue-500 hover:underline">
            Fazer login
          </Link>
        </p>
      </section>
    </main>
  );
}
