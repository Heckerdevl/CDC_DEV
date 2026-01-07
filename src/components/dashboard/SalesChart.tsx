import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", sales: 4000, orders: 240 },
  { name: "Feb", sales: 3000, orders: 198 },
  { name: "Mar", sales: 5000, orders: 300 },
  { name: "Apr", sales: 4500, orders: 278 },
  { name: "May", sales: 6000, orders: 389 },
  { name: "Jun", sales: 5500, orders: 349 },
  { name: "Jul", sales: 7000, orders: 430 },
  { name: "Aug", sales: 6500, orders: 401 },
  { name: "Sep", sales: 8000, orders: 500 },
  { name: "Oct", sales: 7500, orders: 478 },
  { name: "Nov", sales: 9000, orders: 560 },
  { name: "Dec", sales: 10000, orders: 620 },
];

export function SalesChart() {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="mb-5">
        <h3 className="text-lg font-semibold text-foreground">Sales Overview</h3>
        <p className="text-sm text-muted-foreground">Monthly revenue performance</p>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0.3} />
                <stop offset="100%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="hsl(222, 47%, 18%)"
              vertical={false}
            />
            <XAxis
              dataKey="name"
              stroke="hsl(215, 20%, 55%)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="hsl(215, 20%, 55%)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value / 1000}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(222, 47%, 8%)",
                border: "1px solid hsl(222, 47%, 18%)",
                borderRadius: "8px",
                boxShadow: "0 4px 24px -4px rgba(0,0,0,0.5)",
              }}
              labelStyle={{ color: "hsl(210, 40%, 98%)" }}
              itemStyle={{ color: "hsl(217, 91%, 60%)" }}
              formatter={(value) => [`$${Number(value).toLocaleString()}`, "Revenue"]}
            />
            <Area
              type="monotone"
              dataKey="sales"
              stroke="hsl(217, 91%, 60%)"
              strokeWidth={2}
              fill="url(#salesGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
