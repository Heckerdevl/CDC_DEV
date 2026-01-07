import { Link } from "react-router-dom";
import {
  Package,
  BarChart3,
  Shield,
  ArrowRight,
  Zap,
  Lock,
  Users,
} from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg from-primary to-purple-500 flex items-center justify-center">
                <Package className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-foreground">AdminPanel</span>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="px-4 py-2 text-sm rounded hover:bg-muted transition"
              >
                Sign in
              </Link>
              <Link
                to="/login"
                className="px-4 py-2 bg-primary text-primary-foreground rounded flex items-center gap-2 hover:opacity-90 transition"
              >
                Get Started
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
            <Zap className="w-4 h-4" />
            Powerful Admin Dashboard
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Manage your products
            <br />
            with <span className="gradient-text">confidence</span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            A powerful, secure admin dashboard for product management, real-time
            analytics, and team collaboration.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/login"
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg flex items-center gap-2 justify-center"
            >
              Start Managing
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              to="/dashboard"
              className="px-6 py-3 border rounded-lg hover:bg-muted transition text-center"
            >
              View Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Everything you need</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Tools to manage products, track performance, and grow faster.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Feature
              icon={<Package className="w-6 h-6 text-primary" />}
              title="Product Management"
              text="Full CRUD operations with inventory tracking and uploads."
            />
            <Feature
              icon={<BarChart3 className="w-6 h-6 text-success" />}
              title="Real-time Analytics"
              text="Track sales, revenue, and inventory with charts."
            />
            <Feature
              icon={<Shield className="w-6 h-6 text-warning" />}
              title="Role-based Access"
              text="Secure permissions with Admin and Super Admin roles."
            />
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/10 text-success text-sm mb-6">
              <Lock className="w-4 h-4" />
              Enterprise Security
            </div>

            <h2 className="text-3xl font-bold mb-6">
              Built with security in mind
            </h2>

            <ul className="space-y-4">
              {[
                "Server-side role validation",
                "Secure image uploads",
                "CSRF-safe authentication",
                "Input validation with Zod",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-success rounded-full" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border bg-card p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl from-primary to-purple-500 flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold">Team Access</p>
                <p className="text-sm text-muted-foreground">3 members</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to get started?</h2>
        <Link
          to="/login"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg"
        >
          Start Managing Now
          <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t text-center text-sm text-muted-foreground">
        © 2024 AdminPanel. All rights reserved.
      </footer>
    </div>
  );
}

/* ---------- Helper ---------- */

function Feature({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="border rounded-xl p-8 hover:shadow transition">
      <div className="mb-6">{icon}</div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-muted-foreground">{text}</p>
    </div>
  );
}
