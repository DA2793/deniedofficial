"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase/client";

type RecoveryState = "checking" | "ready" | "invalid" | "success";

export default function ResetPasswordPage() {
  const [recoveryState, setRecoveryState] = useState<RecoveryState>("checking");
  const [session, setSession] = useState<Session | null>(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let active = true;

    const acceptSession = (nextSession: Session | null) => {
      if (!active) return;
      setSession(nextSession);
      setRecoveryState(nextSession ? "ready" : "invalid");
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, nextSession) => {
      if (event === "PASSWORD_RECOVERY") acceptSession(nextSession);
    });

    supabase.auth.getSession().then(({ data, error: sessionError }) => {
      if (!active) return;
      const hashError = new URLSearchParams(window.location.hash.slice(1)).get("error_description");
      if (sessionError || hashError) {
        setError(hashError?.replace(/\+/g, " ") || sessionError?.message || "This recovery link is no longer valid.");
        acceptSession(null);
        return;
      }
      acceptSession(data.session);
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);

    if (!session) {
      setRecoveryState("invalid");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setSubmitting(true);
    const { error: updateError } = await supabase.auth.updateUser({ password });
    setSubmitting(false);

    if (updateError) {
      if (/session|expired|jwt/i.test(updateError.message)) setRecoveryState("invalid");
      setError(updateError.message);
      return;
    }

    setPassword("");
    setConfirmPassword("");
    setRecoveryState("success");
  };

  if (recoveryState === "checking") {
    return <div className="min-h-screen flex items-center justify-center"><div className="w-6 h-6 border border-gold border-t-transparent rounded-full animate-spin" /></div>;
  }

  if (recoveryState === "invalid") {
    return (
      <section className="min-h-screen flex items-center justify-center px-6 py-28">
        <div className="max-w-md text-center border border-white/10 rounded-3xl p-8 sm:p-10">
          <p className="text-[10px] uppercase tracking-brutal text-gold mb-4">Password Recovery</p>
          <h1 className="font-display text-4xl uppercase mb-4">Link unavailable</h1>
          <p className="text-gray-400 text-sm mb-8">{error || "This password reset link is missing, invalid, or has expired. Request a new one to continue."}</p>
          <Link href="/account" className="inline-block bg-white text-black text-[11px] uppercase tracking-brutal px-8 py-4 rounded-full hover:bg-gold">Request a new link</Link>
        </div>
      </section>
    );
  }

  if (recoveryState === "success") {
    return (
      <section className="min-h-screen flex items-center justify-center px-6 py-28">
        <div className="max-w-md text-center border border-white/10 rounded-3xl p-8 sm:p-10">
          <p className="text-[10px] uppercase tracking-brutal text-gold mb-4">Password Updated</p>
          <h1 className="font-display text-4xl uppercase mb-4">You&apos;re all set</h1>
          <p className="text-gray-400 text-sm mb-8">Your password has been changed successfully.</p>
          <Link href="/account" className="inline-block bg-white text-black text-[11px] uppercase tracking-brutal px-8 py-4 rounded-full hover:bg-gold">Continue to account</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-28">
      <div className="w-full max-w-[420px]">
        <div className="text-center mb-10">
          <p className="text-[10px] uppercase tracking-brutal text-gold mb-4">Password Recovery</p>
          <h1 className="font-display text-5xl uppercase mb-4">Choose a new password</h1>
          <p className="text-gray-500 text-sm">Use at least 6 characters.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <label className="block">
            <span className="text-[10px] uppercase tracking-brutal text-gray-500 block mb-2">New Password</span>
            <input type="password" autoComplete="new-password" value={password} onChange={(event) => setPassword(event.target.value)} required minLength={6} className="w-full bg-white/[0.03] border border-white/10 rounded-full px-6 py-4 text-white text-sm outline-none focus:border-gold" />
          </label>
          <label className="block">
            <span className="text-[10px] uppercase tracking-brutal text-gray-500 block mb-2">Confirm Password</span>
            <input type="password" autoComplete="new-password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} required minLength={6} className="w-full bg-white/[0.03] border border-white/10 rounded-full px-6 py-4 text-white text-sm outline-none focus:border-gold" />
          </label>
          {error && <p className="text-red-400 text-xs text-center">{error}</p>}
          <button type="submit" disabled={submitting} className="w-full bg-white text-black text-[11px] uppercase tracking-brutal py-4 rounded-full hover:bg-gold disabled:opacity-50">{submitting ? "Updating..." : "Update Password"}</button>
        </form>
      </div>
    </section>
  );
}
