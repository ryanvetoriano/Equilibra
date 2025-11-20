import { useEffect, useState } from "react";
import DashboardCard from "../../components/DashBoardCard/DashBoardCard";
import ProductivityChart from "../../components/ProductivityChart/ProductivityChart";
import CategoryPieChart from "../../components/CategoryPieChart/CategoryPieChart";
import TasksTimelineChart from "../../components/TasksTimeLineChart/TasksTimeLineChart";

import type { TipoTarefa } from "../../types/TipoTarefa";
import type { TipoCategoria } from "../../types/TipoCategoria";

export default function Home() {
  const [tarefas, setTarefas] = useState<TipoTarefa[]>([]);
  const [categorias, setCategorias] = useState<TipoCategoria[]>([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    async function fetchData() {
      try {
        const resTasks = await fetch(
          `http://localhost:8080/tarefas/usuario/${user.idUsuario}`
        );
        const resCats = await fetch("http://localhost:8080/categorias");

        const tasks = await resTasks.json();
        const cats = await resCats.json();

        setTarefas(tasks);
        setCategorias(cats);
      } catch (err) {
        console.error("Erro ao buscar dados", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading)
    return (
      <p className="text-center text-xl text-[var(--text-primary)]">
        Carregando dashboard...
      </p>
    );

  const totalTarefas = tarefas.length;
  const totalMinutos = tarefas.reduce((sum, t) => sum + t.duracaoMin, 0);

  const hoje = new Date();

  const hojeStr = hoje.toISOString().split("T")[0]; // "2025-11-20"
  const tarefasHoje = tarefas.filter(
    t => t.dataTarefa.split("T")[0] === hojeStr
  ).length;

  const dias = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  const produtividadeSemanal = dias.map((dia, i) => ({
    dia,
    minutos: tarefas
      .filter((t) => new Date(t.dataTarefa).getDay() === i)
      .reduce((sum, t) => sum + t.duracaoMin, 0),
  }));

  const categoriasUsadas = categorias.map((cat) => ({
    categoria: cat.nome,
    total: tarefas.filter(
      (t) => t.categoria.idCategoria === cat.idCategoria
    ).length,
  }));

  const timeline = tarefas.map((t) => ({
    data: new Date(t.dataTarefa).toLocaleDateString("pt-BR"),
    minutos: t.duracaoMin,
  }));

  return (
    <div className="flex flex-col gap-8 text-[var(--text-primary)]">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard title="Tarefas hoje" value={tarefasHoje} />
        <DashboardCard title="Total de tarefas" value={totalTarefas} />
        <DashboardCard title="Minutos totais" value={`${totalMinutos} min`} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProductivityChart data={produtividadeSemanal} />
        <CategoryPieChart data={categoriasUsadas} />
      </div>

      <TasksTimelineChart data={timeline} />
    </div>
  );
}
