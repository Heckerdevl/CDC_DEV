import { DashboardLayout } from "../components/layout/DashboardLayout";
import { StatsCard } from "../components/dashboard/StatsCard";
import { SalesChart } from "../components/dashboard/SalesChart";
import { InventoryChart } from "../components/dashboard/InventoryChart";
import { RecentProducts } from "../components/dashboard/RecentProducts";
import { Package, DollarSign, AlertTriangle, TrendingUp } from "lucide-react";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's an overview of your store.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Total Products"
            value="1,234"
            change={12.5}
            changeLabel="from last month"
            icon={<Package className="w-5 h-5" />}
            variant="primary"
          />
          <StatsCard
            title="Total Revenue"
            value="$48,574"
            change={8.2}
            changeLabel="from last month"
            icon={<DollarSign className="w-5 h-5" />}
            variant="success"
          />
          <StatsCard
            title="Active Products"
            value="892"
            change={-2.4}
            changeLabel="from last month"
            icon={<TrendingUp className="w-5 h-5" />}
            variant="default"
          />
          <StatsCard
            title="Out of Stock"
            value="23"
            change={5}
            changeLabel="need attention"
            icon={<AlertTriangle className="w-5 h-5" />}
            variant="warning"
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <SalesChart />
          </div>
          <div>
            <InventoryChart />
          </div>
        </div>

        {/* Recent Products */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentProducts />
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="mb-5">
              <h3 className="text-lg font-semibold text-foreground">
                Quick Actions
              </h3>
              <p className="text-sm text-muted-foreground">Common tasks</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <a
                href="/dashboard/products/new"
                className="p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-all group"
              >
                <Package className="w-6 h-6 text-muted-foreground group-hover:text-primary mb-2" />
                <p className="text-sm font-medium text-foreground">
                  Add Product
                </p>
                <p className="text-xs text-muted-foreground">
                  Create new listing
                </p>
              </a>

              <a
                href="/dashboard/analytics"
                className="p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-all group"
              >
                <TrendingUp className="w-6 h-6 text-muted-foreground group-hover:text-primary mb-2" />
                <p className="text-sm font-medium text-foreground">
                  View Analytics
                </p>
                <p className="text-xs text-muted-foreground">
                  Sales & insights
                </p>
              </a>

              <a
                href="/dashboard/products"
                className="p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-all group"
              >
                <AlertTriangle className="w-6 h-6 text-muted-foreground group-hover:text-warning mb-2" />
                <p className="text-sm font-medium text-foreground">
                  Low Stock
                </p>
                <p className="text-xs text-muted-foreground">
                  23 items need attention
                </p>
              </a>

              <a
                href="/dashboard/settings"
                className="p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-all group"
              >
                <DollarSign className="w-6 h-6 text-muted-foreground group-hover:text-success mb-2" />
                <p className="text-sm font-medium text-foreground">
                  Revenue
                </p>
                <p className="text-xs text-muted-foreground">
                  $48,574 this month
                </p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
