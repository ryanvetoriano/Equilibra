interface Props {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
}

export default function DashboardCard({ title, value, icon }: Props) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md flex items-center gap-4 border border-gray-200 w-full">
      {icon && <div className="text-4xl text-[#2EAF7D]">{icon}</div>}
      <div>
        <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
        <p className="text-2xl font-bold text-[#02353C]">{value}</p>
      </div>
    </div>
  );
}
