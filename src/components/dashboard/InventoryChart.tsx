import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

const data = [
  { name: "In Stock", value: 65, color: "hsl(142, 76%, 46%)" },
  { name: "Low Stock", value: 20, color: "hsl(38, 92%, 50%)" },
  { name: "Out of Stock", value: 15, color: "hsl(0, 72%, 51%)" },
];

export function InventoryChart() {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="mb-5">
        <h3 className="text-lg font-semibold text-foreground">Inventory Status</h3>
        <p className="text-sm text-muted-foreground">Stock distribution overview</p>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={4}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(222, 47%, 8%)",
                border: "1px solid hsl(222, 47%, 18%)",
                borderRadius: "8px",
              }}
             formatter={(value) => [`${Number(value)}%`, ""]}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              formatter={(value) => (
                <span style={{ color: "hsl(215, 20%, 65%)", fontSize: "12px" }}>
                  {value}
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-border">
        {data.map((item) => (
          <div key={item.name} className="text-center">
            <div
              className="w-3 h-3 rounded-full mx-auto mb-1"
              style={{ backgroundColor: item.color }}
            />
            <p className="text-xs text-muted-foreground">{item.name}</p>
            <p className="text-lg font-semibold text-foreground">{item.value}%</p>
          </div>
        ))}
      </div>
    </div>
  );
}
