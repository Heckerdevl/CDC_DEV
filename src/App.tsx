import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import ProductForm from "./pages/ProductForm";
import Analytics from "./pages/Analytics";
import AdminManagement from "./pages/AdminManagement";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/products" element={<Products />} />
        <Route path="/dashboard/products/new" element={<ProductForm />} />
        <Route path="/dashboard/products/:id/edit" element={<ProductForm />} />
        <Route path="/dashboard/analytics" element={<Analytics />} />
        <Route path="/dashboard/admins" element={<AdminManagement />} />

        {/* Catch-all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
