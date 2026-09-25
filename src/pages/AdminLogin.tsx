import { FormEvent, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
  attemptLogin,
  formatMs,
  getLoginStatus,
  isAuthenticated,
} from "../lib/security";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [lockedMs, setLockedMs] = useState(0);
  const [remaining, setRemaining] = useState(5);

  useEffect(() => {
    const s = getLoginStatus();
    setRemaining(s.remainingAttempts);
    setLockedMs(s.remainingMs);
  }, []);

  useEffect(() => {
    if (lockedMs <= 0) return;
    const id = setInterval(() => {
      const s = getLoginStatus();
      setLockedMs(s.remainingMs);
      setRemaining(s.remainingAttempts);
      if (!s.locked) clearInterval(id);
    }, 1000);
    return () => clearInterval(id);
  }, [lockedMs]);

  if (isAuthenticated()) return <Navigate to="/admin" replace />;

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (lockedMs > 0) return;
    setBusy(true);
    setError("");
    const result = await attemptLogin(email, password);
    setBusy(false);
    setRemaining(result.status.remainingAttempts);
    setLockedMs(result.status.remainingMs);
    if (result.ok) {
      navigate("/admin", { replace: true });
      return;
    }
    setError(result.error);
  };

  const locked = lockedMs > 0;

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-ink px-6">
      <div className="pointer-events-none absolute inset-0 opacity-20" style={{ background: "radial-gradient(circle at 30% 20%, #c6a75e55, transparent 40%), radial-gradient(circle at 80% 80%, #c6a75e22, transparent 40%)" }} />
      <form
        onSubmit={submit}
        className="relative w-full max-w-md rounded-[2rem] border border-gold/25 bg-[#14100c]/90 p-8 shadow-2xl shadow-black/40 backdrop-blur md:p-10"
        autoComplete="off"
      >
        <p className="text-center font-serif text-3xl text-gold">Atelier</p>
        <p className="mt-2 text-center text-sm text-cream/50">Staff access · 5 attempts · 15-minute lockout</p>

        <label className="mt-8 block text-xs tracking-wide text-cream/60">
          Email
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
            disabled={locked || busy}
            className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-cream outline-none focus:border-gold disabled:opacity-50"
          />
        </label>
        <label className="mt-4 block text-xs tracking-wide text-cream/60">
          Password
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            disabled={locked || busy}
            className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-cream outline-none focus:border-gold disabled:opacity-50"
          />
        </label>

        {error && <p className="mt-4 text-sm text-gold">{error}</p>}
        {locked && (
          <p className="mt-4 text-sm text-gold">Locked. Try again in {formatMs(lockedMs)}.</p>
        )}
        {!locked && (
          <p className="mt-4 text-xs text-cream/40">{remaining} attempt{remaining === 1 ? "" : "s"} remaining this window.</p>
        )}

        <button
          type="submit"
          disabled={locked || busy}
          className="mt-6 w-full rounded-full bg-gold py-3 text-sm font-medium text-ink disabled:opacity-40"
        >
          {busy ? "Verifying…" : "Enter"}
        </button>
        <p className="mt-6 text-center text-[11px] text-cream/30">
          Passwords hashed with SHA-256 · never stored in plaintext
        </p>
      </form>
    </div>
  );
}
