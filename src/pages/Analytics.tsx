import { DashboardLayout } from "../components/layout/DashboardLayout";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  DollarSign,
  ShoppingCart,
  TrendingUp,
  Package,
  ArrowUpRight,
} from "lucide-react";

/* -------------------- DATA -------------------- */

const revenueData = [
  { name: "Jan", revenue: 4000, orders: 240 },
  { name: "Feb", revenue: 3000, orders: 198 },
  { name: "Mar", revenue: 5000, orders: 300 },
  { name: "Apr", revenue: 4500, orders: 278 },
  { name: "May", revenue: 6000, orders: 389 },
  { name: "Jun", revenue: 5500, orders: 349 },
  { name: "Jul", revenue: 7000, orders: 430 },
  { name: "Aug", revenue: 6500, orders: 401 },
  { name: "Sep", revenue: 8000, orders: 500 },
  { name: "Oct", revenue: 7500, orders: 478 },
  { name: "Nov", revenue: 9000, orders: 560 },
  { name: "Dec", revenue: 10000, orders: 620 },
];

const categoryData = [
  { name: "Electronics", value: 4500, count: 234 },
  { name: "Furniture", value: 2800, count: 89 },
  { name: "Fashion", value: 3200, count: 156 },
  { name: "Home", value: 1800, count: 98 },
  { name: "Sports", value: 1200, count: 67 },
];

const pieColors = [
  "#3b82f6",
  "#8b5cf6",
  "#22c55e",
  "#f59e0b",
  "#ef4444",
];

const topProducts = [
  { name: "Premium Wireless Headphones", sales: 1234, revenue: 369366 },
  { name: "Ergonomic Office Chair", sales: 856, revenue: 469944 },
  { name: "Smart Watch Pro", sales: 743, revenue: 296857 },
  { name: "Minimalist Desk Lamp", sales: 621, revenue: 55869 },
  { name: "Mechanical Keyboard", sales: 589, revenue: 94202 },
];

/* -------------------- COMPONENT -------------------- */

export default function Analytics() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Analytics</h1>
            <p className="text-gray-500">
              Track your store performance and insights
            </p>
          </div>

          <div className="flex items-center gap-3">
            <select className="border rounded px-3 py-2 text-sm">
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="12m">Last 12 months</option>
            </select>

            <button className="flex items-center gap-2 border px-4 py-2 rounded hover:bg-gray-50">
              Export
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Revenue"
            value="$124,568"
            change="+12.5%"
            icon={DollarSign}
          />
          <StatCard
            title="Total Orders"
            value="3,847"
            change="+8.2%"
            icon={ShoppingCart}
          />
          <StatCard
            title="Active Products"
            value="892"
            change="-2.4%"
            icon={Package}
          />
          <StatCard
            title="Conversion Rate"
            value="3.24%"
            change="+0.8%"
            icon={TrendingUp}
          />
        </div>

        {/* Revenue Chart */}
        <Card title="Revenue Overview" subtitle="Monthly revenue and orders">
          <div className="h-6xl">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Area dataKey="revenue" stroke="#3b82f6" fill="#3b82f633" />
                <Area dataKey="orders" stroke="#8b5cf6" fill="#8b5cf633" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Category + Products */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card title="Sales by Category">
            <div className="h-5xl">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={categoryData}
                    innerRadius={60}
                    outerRadius={100}
                    dataKey="value"
                  >
                    {categoryData.map((_, i) => (
                      <Cell key={i} fill={pieColors[i]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card title="Top Selling Products">
            <div className="space-y-3">
              {topProducts.map((p, i) => (
                <div key={p.name} className="flex items-center gap-4 p-2">
                  <span className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-sm">
                    {i + 1}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{p.name}</p>
                    <p className="text-xs text-gray-500">
                      {p.sales.toLocaleString()} sales
                    </p>
                  </div>
                  <p className="font-semibold">
                    ${(p.revenue / 1000).toFixed(1)}k
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Bar Chart */}
        <Card
          title="Products by Category"
          subtitle="Number of products in each category"
        >
          <div className="h-4xl">
            <ResponsiveContainer>
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}

/* -------------------- SMALL COMPONENTS -------------------- */

function Card({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border rounded-xl p-5 bg-white">
      <div className="mb-4">
        <h3 className="font-semibold">{title}</h3>
        {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}

function StatCard({
  title,
  value,
  change,
  icon: Icon,
}: {
  title: string;
  value: string;
  change: string;
  icon: any;
}) {
  return (
    <div className="border rounded-xl p-4 flex items-center gap-3">
      <div className="p-3 bg-gray-100 rounded">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-xl font-bold">{value}</p>
        <p className="text-xs text-gray-500">{change} from last period</p>
      </div>
    </div>
  );
}
