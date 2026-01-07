import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Package,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";

interface LoginFormData {
  email: string;
  password: string;
}

export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Partial<LoginFormData>>({});
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const validate = () => {
    const newErrors: Partial<LoginFormData> = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    // Simulated login
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);

    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 from-primary/20 to-purple-500/10 p-12 flex-col justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl from-primary to-purple-500 flex items-center justify-center">
              <Package className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">AdminPanel</span>
          </div>
        </div>

        <div className="space-y-6">
          <h1 className="text-4xl font-bold">
            Manage your products <br />
            with <span className="gradient-text">confidence</span>
          </h1>
          <p className="text-muted-foreground max-w-md">
            A powerful admin dashboard for product management, analytics, and
            collaboration.
          </p>
        </div>

        <p className="text-sm text-muted-foreground">
          © 2024 AdminPanel. All rights reserved.
        </p>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-xl from-primary to-purple-500 flex items-center justify-center">
              <Package className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">AdminPanel</span>
          </div>

          <div className="text-center lg:text-left">
            <h2 className="text-2xl font-bold">Welcome back</h2>
            <p className="text-muted-foreground">
              Sign in to your admin account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="text-sm font-medium">Email</label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="email"
                  placeholder="admin@example.com"
                  className="w-full pl-10 pr-3 py-2 border rounded outline-none focus:ring-2 focus:ring-primary"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between text-sm">
                <label className="font-medium">Password</label>
                <Link
                  to="/forgot-password"
                  className="text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2 border rounded outline-none focus:ring-2 focus:ring-primary"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">{errors.password}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-primary text-primary-foreground rounded flex items-center justify-center gap-2 hover:opacity-90"
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign in
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary font-medium">
              Contact admin
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
