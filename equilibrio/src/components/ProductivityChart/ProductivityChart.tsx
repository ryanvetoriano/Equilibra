import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Props {
  data: { dia: string; minutos: number }[];
}

export default function ProductivityChart({ data }: Props) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
      <h2 className="text-xl font-semibold mb-4 text-[#02353C]">Produtividade semanal</h2>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="dia" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="minutos" fill="#2EAF7D" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
