import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import type { User } from "../../types/TipoUser";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:8080/usuarios");
      if (!response.ok) throw new Error("Erro ao buscar usuários");

      const usuarios: User[] = await response.json();

      const user = usuarios.find(
        (u) => u.email === email && u.senha === senha
      );

      if (!user) {
        setError("E-mail ou senha incorretos!");
        return;
      }

      localStorage.setItem("user", JSON.stringify(user));
      alert(`Bem-vindo(a), ${user.nome}!`);
      navigate("/home");
    } catch (err) {
      console.error(err);
      setError("Erro ao conectar ao servidor!");
    }
  }

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-white text-gray-900">
      <section className="bg-gray-100 border border-gray-300 p-8 rounded-xl w-80 shadow-lg flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-6">Login</h1>

        <form
          onSubmit={handleLogin}
          className="w-full flex flex-col gap-4"
        >
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
            className="bg-blue-500 hover:bg-blue-600 text-white rounded p-3 font-semibold transition"
          >
            Entrar
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-600">
          Ainda não tem conta?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Cadastre-se
          </Link>
        </p>
      </section>
    </main>
  );
}
