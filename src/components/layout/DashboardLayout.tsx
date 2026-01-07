import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  BarChart3,
  Users,
  Settings,
  LogOut,
  Menu,
  Bell,
  Search,
} from "lucide-react";

/* ---------------- TYPES ---------------- */

interface DashboardLayoutProps {
  children: any;
}

interface NavItem {
  label: string;
  href: string;
  icon: any;
  adminOnly?: boolean;
}

/* ---------------- DATA ---------------- */

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Products", href: "/dashboard/products", icon: Package },
  { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { label: "Admins", href: "/dashboard/admins", icon: Users, adminOnly: true },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

/* ---------------- COMPONENT ---------------- */

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const user = {
    name: "Admin User",
    role: "SUPER_ADMIN",
  };

  const isSuperAdmin = user.role === "SUPER_ADMIN";

  const handleLogout = () => {
    navigate("/login");
  };

  const isActive = (href: string) => {
    if (href === "/dashboard") return location.pathname === href;
    return location.pathname.startsWith(href);
  };

  const filteredNavItems = navItems.filter(
    (item) => !item.adminOnly || isSuperAdmin
  );

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`hidden lg:flex fixed inset-y-0 left-0 flex-col bg-white border-r transition-all ${
          sidebarOpen ? "w-64" : "w-20"
        }`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b">
          <Link to="/dashboard" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Package className="w-4 h-4 text-white" />
            </div>
            {sidebarOpen && <span className="font-semibold">AdminPanel</span>}
          </Link>

          <button onClick={() => setSidebarOpen(!sidebarOpen)}>
            <Menu className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {filteredNavItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm ${
                isActive(item.href)
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {sidebarOpen && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>

        {/* User */}
        <div className="p-4 border-t">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-600 rounded-full text-white flex items-center justify-center">
              {user.name[0]}
            </div>

            {sidebarOpen && (
              <>
                <div className="flex-1">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.role}</p>
                </div>
                <button onClick={handleLogout}>
                  <LogOut className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/40"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Main */}
      <div
        className={`flex-1 flex flex-col ${
          sidebarOpen ? "lg:pl-64" : "lg:pl-20"
        }`}
      >
        {/* Top Bar */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-4">
          <button
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="hidden sm:flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg">
            <Search className="w-4 h-4 text-gray-500" />
            <input
              placeholder="Search..."
              className="bg-transparent outline-none text-sm"
            />
          </div>

          <button className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>
        </header>

        {/* Content */}
        <main className="flex-1 p-4">{children}</main>
      </div>
    </div>
  );
}
