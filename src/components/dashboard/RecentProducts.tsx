import { Link } from "react-router-dom";
import { ArrowRight, Package } from "lucide-react";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: "active" | "draft" | "archived";
  image?: string;
}

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    category: "Electronics",
    price: 299.99,
    stock: 45,
    status: "active",
  },
  {
    id: "2",
    name: "Ergonomic Office Chair",
    category: "Furniture",
    price: 549.0,
    stock: 12,
    status: "active",
  },
  {
    id: "3",
    name: "Smart Watch Pro",
    category: "Electronics",
    price: 399.99,
    stock: 0,
    status: "draft",
  },
  {
    id: "4",
    name: "Minimalist Desk Lamp",
    category: "Home",
    price: 89.99,
    stock: 78,
    status: "active",
  },
  {
    id: "5",
    name: "Vintage Leather Bag",
    category: "Fashion",
    price: 199.0,
    stock: 5,
    status: "archived",
  },
];

const statusStyles: Record<Product["status"], string> = {
  active: "bg-green-100 text-green-700",
  draft: "bg-yellow-100 text-yellow-700",
  archived: "bg-gray-200 text-gray-700",
};

export function RecentProducts() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Recent Products
          </h3>
          <p className="text-sm text-gray-500">
            Latest added products
          </p>
        </div>

        <Link
          to="/dashboard/products"
          className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
        >
          View all <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="space-y-3">
        {mockProducts.map((product) => (
          <Link
            key={product.id}
            to={`/dashboard/products/${product.id}/edit`}
            className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
          >
            <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center group-hover:bg-blue-50">
              <Package className="w-5 h-5 text-gray-500 group-hover:text-blue-600" />
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate group-hover:text-blue-600">
                {product.name}
              </p>
              <p className="text-xs text-gray-500">
                {product.category}
              </p>
            </div>

            <div className="text-right">
              <p className="text-sm font-semibold text-gray-900">
                ${product.price.toFixed(2)}
              </p>
              <span
                className={`inline-block mt-1 px-2 py-0.5 text-[10px] font-medium rounded-full ${statusStyles[product.status]}`}
              >
                {product.status}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
