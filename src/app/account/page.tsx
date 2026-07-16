"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase/client";

type AuthMode = "signin" | "signup" | "phone" | "forgot";

interface OrderSummary {
  id: string;
  created_at: string;
  status: string;
  total: number;
}

function getRedirectTarget() {
  if (typeof window === "undefined") return "/account";
  const next = new URLSearchParams(window.location.search).get("next");
  return next?.startsWith("/") && !next.startsWith("//") ? next : "/account";
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function AccountPage() {
  const { user, loading, signIn, signUp, signInWithOtp, verifyOtp, signInWithGoogle, requestPasswordReset, signOut } = useAuth();
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [orders, setOrders] = useState<OrderSummary[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [ordersError, setOrdersError] = useState<string | null>(null);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      setOrders([]);
      setOrdersLoading(false);
      return;
    }

    const next = getRedirectTarget();
    if (next !== "/account") {
      router.replace(next);
      return;
    }

    let cancelled = false;
    setOrdersLoading(true);
    setOrdersError(null);
    supabase
      .from("orders")
      .select("id, created_at, status, total")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .then(({ data, error: orderError }) => {
        if (cancelled) return;
        if (orderError) {
          setOrdersError("We couldn't load your orders. Please try again.");
          setOrders([]);
        } else {
          setOrders((data as OrderSummary[] | null) ?? []);
        }
        setOrdersLoading(false);
      });

    return () => { cancelled = true; };
  }, [loading, router, user]);

  const resetMessages = () => {
    setError(null);
    setSuccess(null);
  };

  const changeMode = (nextMode: AuthMode) => {
    setMode(nextMode);
    setOtpSent(false);
    setOtp("");
    resetMessages();
  };

  const completeAuth = (message?: string) => {
    if (message) setSuccess(message);
    const next = getRedirectTarget();
    if (next !== "/account") router.replace(next);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    resetMessages();
    setSubmitting(true);

    try {
      if (mode === "forgot") {
        const result = await requestPasswordReset(email);
        if (result.error) setError(result.error);
        else setSuccess("If an account exists for that email, a password reset link has been sent.");
        return;
      }

      if (mode === "phone") {
        const phoneNumber = phone.startsWith("+") ? phone : `+91${phone.replace(/\D/g, "")}`;
        if (!otpSent) {
          const result = await signInWithOtp(phoneNumber, name);
          if (result.error) setError(result.error);
          else {
            setOtpSent(true);
            setSuccess(`OTP sent to ${phoneNumber}`);
          }
        } else {
          const result = await verifyOtp(phoneNumber, otp);
          if (result.error) setError(result.error);
          else completeAuth();
        }
        return;
      }

      if (mode === "signup") {
        const result = await signUp(email, password, name, phone);
        if (result.error) setError(result.error);
        else completeAuth("Account created successfully.");
        return;
      }

      const result = await signIn(email, password);
      if (result.error) setError(result.error);
      else completeAuth();
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogle = async () => {
    resetMessages();
    const result = await signInWithGoogle(getRedirectTarget());
    if (result.error) setError(result.error);
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><div className="w-6 h-6 border border-gold border-t-transparent rounded-full animate-spin" /></div>;
  }

  if (user) {
    const displayName = user.user_metadata?.full_name || user.user_metadata?.name || user.email;
    return (
      <section className="min-h-screen pt-32 pb-20 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[10px] uppercase tracking-brutal text-gold mb-4">Welcome Back</p>
            <h1 className="font-display text-3xl md:text-4xl uppercase mb-4">{displayName}</h1>
            <p className="text-gray-500 text-xs mb-2">{user.email || user.phone}</p>
            <p className="text-gray-600 text-[10px] mb-8">Member since {new Date(user.created_at).toLocaleDateString("en-IN")}</p>
            <button onClick={() => void signOut()} className="border border-white/10 text-white text-[11px] uppercase tracking-brutal px-10 py-4 rounded-full hover:border-gold hover:text-gold transition-all">Sign Out</button>
          </div>

          <div className="border-t border-white/10 pt-10">
            <div className="flex items-end justify-between gap-4 mb-6">
              <div>
                <p className="text-[10px] uppercase tracking-brutal text-gold mb-2">Your Purchases</p>
                <h2 className="font-display text-3xl uppercase">Order History</h2>
              </div>
            </div>

            {ordersLoading ? (
              <div className="py-16 flex justify-center"><div className="w-5 h-5 border border-gold border-t-transparent rounded-full animate-spin" /></div>
            ) : ordersError ? (
              <div className="border border-red-400/20 bg-red-400/5 rounded-2xl p-6 text-center"><p className="text-red-300 text-sm">{ordersError}</p></div>
            ) : orders.length === 0 ? (
              <div className="border border-white/10 rounded-2xl p-8 text-center">
                <p className="text-gray-400 text-sm mb-5">You haven&apos;t placed any orders yet.</p>
                <Link href="/collection" className="text-gold text-[11px] uppercase tracking-brutal hover:text-white">Explore the collection</Link>
              </div>
            ) : (
              <div className="space-y-3">
                {orders.map((order) => (
                  <article key={order.id} className="border border-white/10 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                    <div>
                      <p className="text-white text-sm font-medium">Order #{order.id.slice(0, 8).toUpperCase()}</p>
                      <p className="text-gray-500 text-xs mt-1">{new Date(order.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                      <span className="text-[10px] uppercase tracking-wider text-gold border border-gold/30 rounded-full px-3 py-1.5">{order.status}</span>
                      <span className="text-sm text-white min-w-20 sm:text-right">{formatCurrency(order.total)}</span>
                      <Link href={`/invoice/${order.id}`} className="text-[10px] uppercase tracking-brutal text-gray-400 hover:text-gold">Invoice →</Link>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  const title = mode === "signin" ? "Sign In" : mode === "signup" ? "Create Account" : mode === "forgot" ? "Reset Password" : "Phone Sign In";
  return (
    <section className="min-h-screen pt-32 pb-20 px-6 md:px-12">
      <div className="max-w-[420px] mx-auto">
        <div className="text-center mb-10">
          <p className="text-[10px] uppercase tracking-brutal text-gold mb-4">{mode === "signup" ? "Join the Selected" : "Welcome Back"}</p>
          <h1 className="font-display text-5xl md:text-6xl uppercase mb-4">{title}</h1>
          <p className="text-gray-500 text-sm">{mode === "forgot" ? "Enter your email and we'll send you a secure reset link." : "Access order tracking and your account."}</p>
        </div>

        {mode !== "signup" && mode !== "forgot" && (
          <div className="flex justify-center gap-2 mb-8">
            <button type="button" onClick={() => changeMode("signin")} className={`text-[10px] uppercase tracking-brutal px-5 py-2.5 rounded-full ${mode === "signin" ? "bg-white text-black" : "border border-white/10 text-gray-400"}`}>Email</button>
            <button type="button" onClick={() => changeMode("phone")} className={`text-[10px] uppercase tracking-brutal px-5 py-2.5 rounded-full ${mode === "phone" ? "bg-white text-black" : "border border-white/10 text-gray-400"}`}>Phone OTP</button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {mode === "phone" ? (
            otpSent ? (
              <label className="block"><span className="field-label">Enter OTP</span><input type="text" inputMode="numeric" value={otp} onChange={(event) => setOtp(event.target.value)} required maxLength={6} className="auth-input text-center tracking-[8px] text-lg" placeholder="------" /></label>
            ) : (
              <><label className="block"><span className="field-label">Full Name</span><input type="text" value={name} onChange={(event) => setName(event.target.value)} required className="auth-input" placeholder="Your full name" /></label><label className="block"><span className="field-label">Phone Number</span><input type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} required className="auth-input" placeholder="+91 XXXXX XXXXX" /></label></>
            )
          ) : (
            <>
              {mode === "signup" && <><label className="block"><span className="field-label">Full Name</span><input type="text" value={name} onChange={(event) => setName(event.target.value)} required className="auth-input" placeholder="Your full name" /></label><label className="block"><span className="field-label">Phone Number</span><input type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} required className="auth-input" placeholder="+91 XXXXX XXXXX" /></label></>}
              <label className="block"><span className="field-label">Email</span><input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required className="auth-input" placeholder="your@email.com" /></label>
              {mode !== "forgot" && <label className="block"><span className="field-label">Password</span><input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required minLength={6} className="auth-input" placeholder={mode === "signup" ? "Min 6 characters" : "••••••••"} /></label>}
            </>
          )}

          {mode === "signin" && <div className="text-right"><button type="button" onClick={() => changeMode("forgot")} className="text-xs text-gray-500 hover:text-gold">Forgot password?</button></div>}
          {error && <p className="text-red-400 text-xs text-center">{error}</p>}
          {success && <p className="text-green-400 text-xs text-center">{success}</p>}
          <button type="submit" disabled={submitting} className="w-full bg-white text-black text-[11px] uppercase tracking-brutal py-4 rounded-full hover:bg-gold disabled:opacity-50">{submitting ? "..." : mode === "phone" ? (otpSent ? "Verify OTP" : "Send OTP") : mode === "signin" ? "Sign In" : mode === "signup" ? "Create Account" : "Send Reset Link"}</button>
        </form>

        {mode === "phone" && otpSent && <button type="button" onClick={() => { setOtpSent(false); setOtp(""); resetMessages(); }} className="mt-4 w-full text-gray-500 text-xs hover:text-gold">Didn&apos;t receive it? Send again</button>}

        {mode !== "forgot" && <div className="mt-8"><div className="flex items-center gap-4 mb-6"><div className="flex-1 h-px bg-white/10" /><span className="text-gray-600 text-[10px] uppercase tracking-brutal">Or</span><div className="flex-1 h-px bg-white/10" /></div><button type="button" onClick={() => void handleGoogle()} className="w-full border border-white/10 rounded-full py-4 text-white text-[11px] uppercase tracking-brutal hover:border-gold hover:text-gold">Continue with Google</button></div>}

        <div className="mt-10 text-center">
          {mode === "signup" ? <button onClick={() => changeMode("signin")} className="text-gray-500 text-xs hover:text-gold">Already have an account? Sign in</button> : mode === "forgot" ? <button onClick={() => changeMode("signin")} className="text-gray-500 text-xs hover:text-gold">Back to sign in</button> : <button onClick={() => changeMode("signup")} className="text-gray-500 text-xs hover:text-gold">Don&apos;t have an account? Create one</button>}
        </div>
      </div>
      <style jsx>{`
        .field-label { display: block; margin-bottom: 0.5rem; color: rgb(107 114 128); font-size: 10px; text-transform: uppercase; letter-spacing: 0.18em; }
        .auth-input { width: 100%; border: 1px solid rgba(255,255,255,.1); border-radius: 9999px; background: rgba(255,255,255,.03); padding: 1rem 1.5rem; color: white; font-size: .875rem; outline: none; }
        .auth-input:focus { border-color: var(--gold, #c5a46d); }
      `}</style>
    </section>
  );
}
