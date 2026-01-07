import { useState } from "react";
import { Link } from "react-router-dom";
import { DashboardLayout } from "../components/layout/DashboardLayout";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Eye,
  Package,
  ArrowUpDown,
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  discount: number;
  stock: number;
  status: "active" | "draft" | "archived";
  createdAt: string;
}

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    sku: "WH-001",
    category: "Electronics",
    price: 299.99,
    discount: 10,
    stock: 45,
    status: "active",
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Ergonomic Office Chair",
    sku: "OC-002",
    category: "Furniture",
    price: 549,
    discount: 0,
    stock: 12,
    status: "active",
    createdAt: "2024-01-14",
  },
  {
    id: "3",
    name: "Smart Watch Pro",
    sku: "SW-003",
    category: "Electronics",
    price: 399.99,
    discount: 15,
    stock: 0,
    status: "draft",
    createdAt: "2024-01-13",
  },
];

export default function Products() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [category, setCategory] = useState("all");

  const categories = [...new Set(mockProducts.map(p => p.category))];

  const filtered = mockProducts.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchStatus = status === "all" || p.status === status;
    const matchCategory = category === "all" || p.category === category;
    return matchSearch && matchStatus && matchCategory;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Products</h1>
            <p className="text-gray-500">Manage your product inventory</p>
          </div>

          <Link
            to="/dashboard/products/new"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded"
          >
            <Plus className="w-4 h-4" />
            Add Product
          </Link>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              className="pl-10 pr-3 py-2 border rounded"
              placeholder="Search products..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          <select
            className="border rounded px-3 py-2"
            value={status}
            onChange={e => setStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>

          <select
            className="border rounded px-3 py-2"
            value={category}
            onChange={e => setCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.map(c => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Table */}
        <div className="border rounded overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">
                  <div className="flex items-center gap-1">
                    Product <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th>SKU</th>
                <th>Category</th>
                <th className="text-right">Price</th>
                <th className="text-right">Stock</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-10 text-center text-gray-500">
                    <Package className="w-10 h-10 mx-auto mb-2 opacity-50" />
                    No products found
                  </td>
                </tr>
              ) : (
                filtered.map(p => (
                  <tr key={p.id} className="border-t">
                    <td className="p-3">
                      <p className="font-medium">{p.name}</p>
                      <p className="text-xs text-gray-500">
                        Added {p.createdAt}
                      </p>
                    </td>
                    <td className="font-mono">{p.sku}</td>
                    <td>{p.category}</td>
                    <td className="text-right">
                      ${p.price.toFixed(2)}
                      {p.discount > 0 && (
                        <span className="ml-1 text-xs text-green-600">
                          -{p.discount}%
                        </span>
                      )}
                    </td>
                    <td
                      className={`text-right ${
                        p.stock === 0
                          ? "text-red-600"
                          : p.stock < 10
                          ? "text-yellow-600"
                          : ""
                      }`}
                    >
                      {p.stock}
                    </td>
                    <td>
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          p.status === "active"
                            ? "bg-green-100 text-green-700"
                            : p.status === "draft"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                    <td>
                      <div className="flex gap-2">
                        <Link to={`/dashboard/products/${p.id}`}>
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link to={`/dashboard/products/${p.id}/edit`}>
                          <Pencil className="w-4 h-4" />
                        </Link>
                        <button className="text-red-600">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex justify-between text-sm text-gray-500">
          <p>
            Showing {filtered.length} of {mockProducts.length} products
          </p>
          <div className="flex gap-2">
            <button disabled className="px-3 py-1 border rounded">
              Previous
            </button>
            <button disabled className="px-3 py-1 border rounded">
              Next
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
