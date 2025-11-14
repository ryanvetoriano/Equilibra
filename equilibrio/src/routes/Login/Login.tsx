import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
      navigate("/home");
    } catch (err) {
      console.error(err);
      setError("Erro ao conectar ao servidor!");
    }
  }

  return (
    <main className="h-screen flex justify-center items-center 
       bg-gradient-to-br from-[#02353C] via-[#2EAF7D] to-[#3FD0C9]">

      <form
        onSubmit={handleLogin}
        className="bg-white/20 backdrop-blur-md p-8 rounded-2xl w-80 
        flex flex-col gap-4 shadow-xl border border-white/30"
      >
        <h1 className="text-3xl font-bold text-white text-center">
          Equilibra
        </h1>

        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-3 rounded-xl bg-[#C1F6ED] border border-[#3FD0C9] text-[#02353C]"
          required
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="p-3 rounded-xl bg-[#C1F6ED] border border-[#3FD0C9] text-[#02353C]"
          required
        />

        {error && <p className="text-red-200 text-sm text-center">{error}</p>}

        <button
          type="submit"
          className="rounded-full text-white font-semibold py-3 
          bg-gradient-to-r from-[#2EAF7D] to-[#3FD0C9]"
        >
          Entrar
        </button>

        <p className="text-white text-sm text-center">
          Não tem conta?{" "}
          <span
            onClick={() => navigate("/register")}
            className="underline cursor-pointer"
          >
            Cadastre-se
          </span>
        </p>
      </form>
    </main>
  );
}
