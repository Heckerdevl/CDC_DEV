import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Check,
  X,
  ImagePlus,
} from "lucide-react";
import { DashboardLayout } from "../components/layout/DashboardLayout";

/* ---------------- TYPES ---------------- */

interface ProductFormData {
  name: string;
  description: string;
  category: string;
  sku: string;
  price: number;
  discount: number;
  stock: number;
  status: "active" | "draft" | "archived";
  images: string[];
}

/* ---------------- CONSTANTS ---------------- */

const initialFormData: ProductFormData = {
  name: "",
  description: "",
  category: "",
  sku: "",
  price: 0,
  discount: 0,
  stock: 0,
  status: "draft",
  images: [],
};

const steps = [
  { id: 1, title: "Basic Info" },
  { id: 2, title: "Pricing & Stock" },
  { id: 3, title: "Images" },
  { id: 4, title: "Review" },
];

const categories = [
  "Electronics",
  "Furniture",
  "Fashion",
  "Home",
  "Sports",
  "Books",
  "Other",
];

/* ---------------- COMPONENT ---------------- */

export default function ProductForm() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<ProductFormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  /* -------- VALIDATION -------- */

  const validateStep = (step: number) => {
    const e: Record<string, string> = {};

    if (step === 1) {
      if (!formData.name) e.name = "Product name is required";
      if (formData.description.length < 10)
        e.description = "Description must be at least 10 characters";
      if (!formData.category) e.category = "Category is required";
      if (!formData.sku) e.sku = "SKU is required";
    }

    if (step === 2) {
      if (formData.price <= 0) e.price = "Price must be greater than 0";
      if (formData.discount < 0 || formData.discount > 100)
        e.discount = "Discount must be 0–100";
      if (formData.stock < 0) e.stock = "Stock cannot be negative";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  /* -------- HANDLERS -------- */

  const next = () => validateStep(currentStep) && setCurrentStep(s => s + 1);
  const back = () => setCurrentStep(s => s - 1);

  const submit = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    navigate("/dashboard/products");
  };

  const addImage = () => {
    setFormData(p => ({
      ...p,
      images: [...p.images, `https://picsum.photos/400?${p.images.length}`],
    }));
  };

  const removeImage = (i: number) => {
    setFormData(p => ({
      ...p,
      images: p.images.filter((_, idx) => idx !== i),
    }));
  };

  /* ---------------- UI ---------------- */

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/dashboard/products")}
            className="p-2 rounded hover:bg-gray-100"
          >
            <ArrowLeft />
          </button>
          <div>
            <h1 className="text-2xl font-bold">Add New Product</h1>
            <p className="text-gray-500">Create a new product listing</p>
          </div>
        </div>

        {/* Steps */}
        <div className="flex items-center justify-between">
          {steps.map((s, i) => (
            <div key={s.id} className="flex items-center">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium
                  ${
                    currentStep > s.id
                      ? "bg-green-500 text-white"
                      : currentStep === s.id
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200"
                  }`}
              >
                {currentStep > s.id ? <Check className="w-4 h-4" /> : s.id}
              </div>
              {i < steps.length - 1 && (
                <div className="w-16 h-0.5 bg-gray-300 mx-2" />
              )}
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="border rounded-xl p-6 bg-white">
          {/* STEP 1 */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <Field label="Product Name" error={errors.name}>
                <input
                  className="input"
                  value={formData.name}
                  onChange={e =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </Field>

              <Field label="Description" error={errors.description}>
                <textarea
                  className="input"
                  rows={4}
                  value={formData.description}
                  onChange={e =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </Field>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Category" error={errors.category}>
                  <select
                    className="input"
                    value={formData.category}
                    onChange={e =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                  >
                    <option value="">Select</option>
                    {categories.map(c => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </Field>

                <Field label="SKU" error={errors.sku}>
                  <input
                    className="input"
                    value={formData.sku}
                    onChange={e =>
                      setFormData({ ...formData, sku: e.target.value })
                    }
                  />
                </Field>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {currentStep === 2 && (
            <div className="grid grid-cols-2 gap-4">
              <Field label="Price" error={errors.price}>
                <input
                  type="number"
                  className="input"
                  value={formData.price}
                  onChange={e =>
                    setFormData({
                      ...formData,
                      price: Number(e.target.value),
                    })
                  }
                />
              </Field>

              <Field label="Discount (%)" error={errors.discount}>
                <input
                  type="number"
                  className="input"
                  value={formData.discount}
                  onChange={e =>
                    setFormData({
                      ...formData,
                      discount: Number(e.target.value),
                    })
                  }
                />
              </Field>

              <Field label="Stock" error={errors.stock}>
                <input
                  type="number"
                  className="input"
                  value={formData.stock}
                  onChange={e =>
                    setFormData({
                      ...formData,
                      stock: Number(e.target.value),
                    })
                  }
                />
              </Field>

              <Field label="Status">
                <select
                  className="input"
                  value={formData.status}
                  onChange={e =>
                    setFormData({
                      ...formData,
                      status: e.target.value as any,
                    })
                  }
                >
                  <option value="draft">Draft</option>
                  <option value="active">Active</option>
                  <option value="archived">Archived</option>
                </select>
              </Field>
            </div>
          )}

          {/* STEP 3 */}
          {currentStep === 3 && (
            <div className="grid grid-cols-3 gap-4">
              {formData.images.map((img, i) => (
                <div key={i} className="relative">
                  <img src={img} className="rounded" />
                  <button
                    onClick={() => removeImage(i)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded p-1"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
              <button
                onClick={addImage}
                className="border-dashed border rounded flex flex-col items-center justify-center text-gray-500"
              >
                <ImagePlus />
                Add Image
              </button>
            </div>
          )}

          {/* STEP 4 */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <h3 className="font-semibold">{formData.name}</h3>
              <p className="text-gray-500">{formData.description}</p>
              <div className="grid grid-cols-4 gap-4">
                <Stat label="Price" value={`$${formData.price}`} />
                <Stat label="Discount" value={`${formData.discount}%`} />
                <Stat label="Stock" value={formData.stock} />
                <Stat label="Status" value={formData.status} />
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={back}
            disabled={currentStep === 1}
            className="px-4 py-2 border rounded"
          >
            Back
          </button>

          {currentStep < 4 ? (
            <button
              onClick={next}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Next
            </button>
          ) : (
            <button
              onClick={submit}
              disabled={loading}
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              {loading ? "Creating..." : "Create Product"}
            </button>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

/* ---------------- SMALL HELPERS ---------------- */

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      {children}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: any }) {
  return (
    <div className="p-3 bg-gray-100 rounded">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  );
}
