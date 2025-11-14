import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Props {
  data: { data: string; minutos: number }[];
}

export default function TasksTimelineChart({ data }: Props) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
      <h2 className="text-xl font-semibold mb-4 text-[#02353C]">Horas gastas por dia</h2>

      <ResponsiveContainer width="100%" height={240}>
        <LineChart data={data}>
          <XAxis dataKey="data" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="minutos" stroke="#037171" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
