import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { generateChartData } from "../../utils/home";
import CustomTooltip from "./components/CustomTooltip";

const DetailsCharts = () => {
  const data = generateChartData({
    productsLength: 90,
    usersLength: 200,
    adminsLength: 30,
    ticketsLength: 195,
  });

  return (
    <div className="p-5 space-y-10 bg-white border rounded-xl primary-border-color">
      <p className="text-lg">آمار کلی داشبورد</p>

      <div className="w-full h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} width={150} height={40}>
            <Bar dataKey="value" fill="#8884d8" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip content={CustomTooltip} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DetailsCharts;
