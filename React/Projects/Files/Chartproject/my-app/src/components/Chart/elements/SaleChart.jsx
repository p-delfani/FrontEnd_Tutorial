import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function SaleChart() {
  const data = [
    { name: "فروردین", sale: 6_895_000 },
    { name: "اردیبهشت", sale: 4_895_000 },
    { name: "خرداد", sale: 2_895_000 },
    { name: "تیر", sale: 1_895_000 },
    { name: "مرداد", sale: 8_895_000 },
    { name: "شهریور", sale: 3_895_000 },
    { name: "مهر", sale: 4_895_000 },
  ];

  return (
    <div className="space-y-10">
      <h3 className="section-title">جزئیات درآمد</h3>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />

          <Line
            type="monotone"
            dataKey="sale"
            name="درآمد"
            stroke="#8884d8"
            activeDot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SaleChart;
