import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
      const usuarios: User[] = await res.json();

      if (usuarios.some((u) => u.email === email)) {
        setError("E-mail já cadastrado!");
        return;
      }

      if (usuarios.some((u) => u.nome === nome)) {
        setError("Nome de usuário já existe!");
        return;
      }

      const novoUsuario: User = {
        idUsuario: 0,
        nome,
        email,
        senha,
      };

      const response = await fetch("http://localhost:8080/usuario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoUsuario),
      });

      if (!response.ok) throw new Error("Erro ao cadastrar.");

      const user = await response.json();

      localStorage.setItem("user", JSON.stringify(user));
      navigate("/");

    } catch (err) {
      console.error(err);
      setError("Erro ao conectar ao servidor.");
    }
  }

  return (
    <main className="h-screen flex justify-center items-center 
       bg-gradient-to-br from-[#02353C] via-[#2EAF7D] to-[#3FD0C9]">

      <form
        onSubmit={handleRegister}
        className="bg-white/20 backdrop-blur-md p-8 rounded-2xl w-80 
        flex flex-col gap-4 shadow-xl border border-white/30"
      >
        <h1 className="text-3xl font-bold text-white text-center">
          Criar conta
        </h1>

        <input
          type="text"
          placeholder="Nome completo"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="p-3 rounded-xl bg-[#C1F6ED] border border-[#3FD0C9] text-[#02353C]"
          required
        />

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
          Cadastrar
        </button>

        <p className="text-white text-sm text-center">
          Já tem conta?{" "}
          <span
            onClick={() => navigate("/")}
            className="underline cursor-pointer"
          >
            Fazer login
          </span>
        </p>
      </form>
    </main>
  );
}
