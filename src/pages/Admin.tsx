import { Navigate, useNavigate } from "react-router-dom";
import { locations, menu } from "../data/content";
import { isAuthenticated, logout } from "../lib/security";

export default function AdminPage() {
  const navigate = useNavigate();
  if (!isAuthenticated()) return <Navigate to="/admin/login" replace />;

  return (
    <div className="min-h-screen bg-ink px-6 py-24 text-cream">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] tracking-[0.3em] uppercase text-gold">Atelier</p>
            <h1 className="mt-2 font-serif text-4xl">House overview</h1>
          </div>
          <button
            onClick={() => {
              logout();
              navigate("/admin/login", { replace: true });
            }}
            className="rounded-full border border-gold/40 px-5 py-2 text-sm text-gold"
          >
            Sign out
          </button>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 p-6">
            <p className="text-xs uppercase tracking-widest text-cream/40">Houses</p>
            <p className="mt-2 font-serif text-5xl text-gold">{locations.length}</p>
          </div>
          <div className="rounded-3xl border border-white/10 p-6">
            <p className="text-xs uppercase tracking-widest text-cream/40">Menu items</p>
            <p className="mt-2 font-serif text-5xl text-gold">
              {menu.reduce((n, c) => n + c.items.length, 0)}
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 p-6">
            <p className="text-xs uppercase tracking-widest text-cream/40">Session</p>
            <p className="mt-2 font-serif text-3xl text-gold">Live · 1h</p>
          </div>
        </div>

        <div className="mt-10 overflow-hidden rounded-3xl border border-white/10">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 text-cream/50">
              <tr>
                <th className="px-5 py-3 font-medium">House</th>
                <th className="px-5 py-3 font-medium">Phone</th>
                <th className="px-5 py-3 font-medium">Hours</th>
              </tr>
            </thead>
            <tbody>
              {locations.map((l) => (
                <tr key={l.slug} className="border-t border-white/10">
                  <td className="px-5 py-4">{l.name}</td>
                  <td className="px-5 py-4 text-gold">{l.phone}</td>
                  <td className="px-5 py-4 text-cream/70">{l.hours}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
