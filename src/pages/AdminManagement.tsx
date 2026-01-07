import { useState } from "react";
import { DashboardLayout } from "../components/layout/DashboardLayout";
import {
  UserPlus,
  MoreHorizontal,
  Shield,
  ShieldCheck,
  Ban,
  Mail,
  Check,
} from "lucide-react";
import { z } from "zod";

interface Admin {
  id: string;
  name: string;
  email: string;
  role: "SUPER_ADMIN" | "ADMIN";
  status: "active" | "disabled";
  createdAt: string;
  lastLogin: string;
}

const mockAdmins: Admin[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "SUPER_ADMIN",
    status: "active",
    createdAt: "2024-01-01",
    lastLogin: "2024-01-15",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "ADMIN",
    status: "active",
    createdAt: "2024-01-05",
    lastLogin: "2024-01-14",
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "ADMIN",
    status: "disabled",
    createdAt: "2024-01-08",
    lastLogin: "2024-01-10",
  },
];

const inviteSchema = z.object({
  email: z.string().email(),
  role: z.enum(["ADMIN", "SUPER_ADMIN"]),
});

export default function AdminManagement() {
  const [admins] = useState(mockAdmins);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"ADMIN" | "SUPER_ADMIN">("ADMIN");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleInvite = async () => {
    setErrors({});
    const result = inviteSchema.safeParse({ email, role });

    if (!result.success) {
      const err: Record<string, string> = {};
      result.error.errors.forEach(e => {
        err[e.path[0] as string] = e.message;
      });
      setErrors(err);
      return;
    }

    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);
    setOpen(false);
    setEmail("");
    setRole("ADMIN");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Admin Management</h1>
            <p className="text-gray-500">Manage admin accounts</p>
          </div>
          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded"
          >
            <UserPlus className="w-4 h-4" />
            Invite Admin
          </button>
        </div>

        {/* Modal */}
        {open && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-md rounded-lg p-6 space-y-4">
              <h2 className="text-lg font-semibold">Invite New Admin</h2>

              <div>
                <label className="text-sm font-medium">Email</label>
                <input
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full mt-1 border rounded px-3 py-2"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium">Role</label>
                <select
                  value={role}
                  onChange={e => setRole(e.target.value as any)}
                  className="w-full mt-1 border rounded px-3 py-2"
                >
                  <option value="ADMIN">Admin</option>
                  <option value="SUPER_ADMIN">Super Admin</option>
                </select>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleInvite}
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  {loading ? "Sending..." : "Send Invite"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Stat label="Total" value={admins.length} icon={Shield} />
          <Stat
            label="Active"
            value={admins.filter(a => a.status === "active").length}
            icon={Check}
          />
          <Stat
            label="Disabled"
            value={admins.filter(a => a.status === "disabled").length}
            icon={Ban}
          />
        </div>

        {/* Table */}
        <div className="border rounded overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Admin</th>
                <th>Role</th>
                <th>Status</th>
                <th>Created</th>
                <th>Last Login</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {admins.map(admin => (
                <tr key={admin.id} className="border-t">
                  <td className="p-3">
                    <p className="font-medium">{admin.name}</p>
                    <p className="text-xs text-gray-500">{admin.email}</p>
                  </td>
                  <td>
                    {admin.role === "SUPER_ADMIN" ? (
                      <ShieldCheck className="w-4 h-4 text-blue-600" />
                    ) : (
                      <Shield className="w-4 h-4 text-gray-500" />
                    )}
                  </td>
                  <td>
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        admin.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {admin.status}
                    </span>
                  </td>
                  <td>{admin.createdAt}</td>
                  <td>{admin.lastLogin}</td>
                  <td>
                    <button className="p-2 hover:bg-gray-100 rounded">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}

function Stat({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: number;
  icon: any;
}) {
  return (
    <div className="border rounded p-4 flex items-center gap-3">
      <div className="p-2 bg-gray-100 rounded">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-xl font-bold">{value}</p>
      </div>
    </div>
  );
}
