"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import ScrollReveal from "@/components/ScrollReveal";
import MagneticButton from "@/components/MagneticButton";

export default function AccountPage() {
  const { user, loading, signIn, signUp, signInWithOtp, verifyOtp, signOut } = useAuth();
  const router = useRouter();
  const [mode, setMode] = useState<"signin" | "signup" | "phone">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setSubmitting(true);

    if (mode === "phone") {
      if (!otpSent) {
        // Send OTP
        const phoneNum = phone.startsWith("+") ? phone : `+91${phone.replace(/\D/g, "")}`;
        const { error } = await signInWithOtp(phoneNum);
        if (error) {
          setError(error);
        } else {
          setOtpSent(true);
          setSuccess("OTP sent to " + phoneNum);
        }
      } else {
        // Verify OTP
        const phoneNum = phone.startsWith("+") ? phone : `+91${phone.replace(/\D/g, "")}`;
        const { error } = await verifyOtp(phoneNum, otp);
        if (error) {
          setError(error);
        } else {
          router.push("/");
        }
      }
    } else if (mode === "signup") {
      const { error } = await signUp(email, password, name, phone);
      if (error) {
        setError(error);
      } else {
        setSuccess("Account created. Check your email to confirm.");
        setEmail("");
        setPassword("");
        setName("");
        setPhone("");
      }
    } else {
      const { error } = await signIn(email, password);
      if (error) {
        setError(error);
      } else {
        router.push("/");
      }
    }

    setSubmitting(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-6 h-6 border border-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Signed in state
  if (user) {
    return (
      <section className="min-h-screen pt-32 pb-20 px-6 md:px-12">
        <div className="max-w-[600px] mx-auto text-center">
          <ScrollReveal>
            <p className="text-[10px] uppercase tracking-brutal text-gold mb-4">
              Welcome Back
            </p>
            <h1 className="font-display text-5xl md:text-7xl uppercase mb-8">
              Account
            </h1>
            <p className="text-gray-400 text-sm mb-4">{user.email}</p>
            <p className="text-gray-600 text-xs mb-12">Member since {new Date(user.created_at).toLocaleDateString()}</p>

            <MagneticButton strength={0.15} className="inline-block">
              <button
                onClick={signOut}
                className="border border-white/10 text-white text-[11px] uppercase tracking-brutal px-10 py-4 rounded-full hover:border-gold hover:text-gold transition-all duration-300"
              >
                Sign Out
              </button>
            </MagneticButton>
          </ScrollReveal>
        </div>
      </section>
    );
  }

  // Sign in / Sign up form
  return (
    <section className="min-h-screen pt-32 pb-20 px-6 md:px-12">
      <div className="max-w-[420px] mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12">
            <p className="text-[10px] uppercase tracking-brutal text-gold mb-4">
              {mode === "signin" ? "Welcome Back" : "Join the Selected"}
            </p>
            <h1 className="font-display text-5xl md:text-6xl uppercase mb-4">
              {mode === "signin" ? "Sign In" : "Create Account"}
            </h1>
            <p className="text-gray-500 text-sm">
              {mode === "signin"
                ? "Sign in to track orders and access your wishlist."
                : "Create an account for early access to drops and order tracking."}
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          {/* Auth method tabs */}
          <div className="flex justify-center gap-2 mb-10">
            <button
              onClick={() => { setMode("signin"); setError(null); setSuccess(null); setOtpSent(false); }}
              className={`text-[10px] uppercase tracking-brutal px-5 py-2.5 rounded-full transition-all ${mode === "signin" ? "bg-white text-black" : "border border-white/10 text-gray-400 hover:text-white"}`}
            >
              Email
            </button>
            <button
              onClick={() => { setMode("phone"); setError(null); setSuccess(null); setOtpSent(false); }}
              className={`text-[10px] uppercase tracking-brutal px-5 py-2.5 rounded-full transition-all ${mode === "phone" ? "bg-white text-black" : "border border-white/10 text-gray-400 hover:text-white"}`}
            >
              Phone OTP
            </button>
            <button
              onClick={() => { setMode("signup"); setError(null); setSuccess(null); setOtpSent(false); }}
              className={`text-[10px] uppercase tracking-brutal px-5 py-2.5 rounded-full transition-all ${mode === "signup" ? "bg-white text-black" : "border border-white/10 text-gray-400 hover:text-white"}`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {mode === "phone" ? (
              <>
                {!otpSent ? (
                  <div>
                    <label className="text-[10px] uppercase tracking-brutal text-gray-500 block mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="w-full bg-white/[0.03] border border-white/10 rounded-full px-6 py-4 text-white text-sm outline-none focus:border-gold transition-colors"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="text-[10px] uppercase tracking-brutal text-gray-500 block mb-2">
                      Enter OTP
                    </label>
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      required
                      maxLength={6}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-full px-6 py-4 text-white text-sm outline-none focus:border-gold transition-colors text-center tracking-[8px] text-lg"
                      placeholder="------"
                    />
                  </div>
                )}
              </>
            ) : (
              <>
                {mode === "signup" && (
                  <>
                    <div>
                      <label className="text-[10px] uppercase tracking-brutal text-gray-500 block mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full bg-white/[0.03] border border-white/10 rounded-full px-6 py-4 text-white text-sm outline-none focus:border-gold transition-colors"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-brutal text-gray-500 block mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        className="w-full bg-white/[0.03] border border-white/10 rounded-full px-6 py-4 text-white text-sm outline-none focus:border-gold transition-colors"
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>
                  </>
                )}
                <div>
                  <label className="text-[10px] uppercase tracking-brutal text-gray-500 block mb-2">
                    Email
                  </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-white/[0.03] border border-white/10 rounded-full px-6 py-4 text-white text-sm outline-none focus:border-gold transition-colors"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="text-[10px] uppercase tracking-brutal text-gray-500 block mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full bg-white/[0.03] border border-white/10 rounded-full px-6 py-4 text-white text-sm outline-none focus:border-gold transition-colors"
                placeholder={mode === "signup" ? "Min 6 characters" : "••••••••"}
              />
            </div>
              </>
            )}

            {error && (
              <p className="text-red-400 text-xs text-center">{error}</p>
            )}

            {success && (
              <p className="text-green-400 text-xs text-center">{success}</p>
            )}

            <MagneticButton strength={0.15} className="w-full pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-white text-black text-[11px] uppercase tracking-brutal py-4 rounded-full hover:bg-gold transition-colors duration-300 disabled:opacity-50"
              >
                {submitting
                  ? "..."
                  : mode === "phone"
                  ? otpSent ? "Verify OTP" : "Send OTP"
                  : mode === "signin"
                  ? "Sign In"
                  : "Create Account"}
              </button>
            </MagneticButton>
          </form>

          {mode === "phone" && otpSent && (
            <div className="mt-4 text-center">
              <button
                onClick={() => { setOtpSent(false); setOtp(""); setError(null); setSuccess(null); }}
                className="text-gray-500 text-xs hover:text-gold transition-colors"
              >
                Didn&apos;t receive? Send again
              </button>
            </div>
          )}
        </ScrollReveal>
      </div>
    </section>
  );
}
