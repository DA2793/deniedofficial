"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import ScrollReveal from "@/components/ScrollReveal";
import MagneticButton from "@/components/MagneticButton";

export default function AccountPage() {
  const { user, loading, signIn, signUp, signInWithOtp, verifyOtp, signInWithGoogle, signOut } = useAuth();
  const router = useRouter();
  const [mode, setMode] = useState<"signin" | "signup" | "phone">("signup");
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
        const { error } = await signInWithOtp(phoneNum, name);
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
    const displayName = user.user_metadata?.full_name || user.user_metadata?.name || user.email;

    return (
      <section className="min-h-screen pt-32 pb-20 px-6 md:px-12">
        <div className="max-w-[600px] mx-auto text-center">
          <ScrollReveal>
            <p className="text-[10px] uppercase tracking-brutal text-gold mb-4">
              Welcome Back
            </p>
            <h1 className="font-display text-3xl md:text-4xl uppercase mb-6">
              {displayName}
            </h1>
            <p className="text-gray-500 text-xs mb-2">{user.email}</p>
            <p className="text-gray-600 text-[10px] mb-10">Member since {new Date(user.created_at).toLocaleDateString()}</p>

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
          {/* Auth method tabs — only show for sign-in */}
          {mode !== "signup" && (
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
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {mode === "phone" ? (
              <>
                {!otpSent ? (
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

          {/* Google Sign In — divider + button */}
          <div className="mt-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-[0.5px] bg-white/10"></div>
              <span className="text-gray-600 text-[10px] uppercase tracking-brutal">Or</span>
              <div className="flex-1 h-[0.5px] bg-white/10"></div>
            </div>
            <button
              onClick={() => signInWithGoogle()}
              className="w-full flex items-center justify-center gap-3 border border-white/10 rounded-full py-4 text-white text-[11px] uppercase tracking-brutal hover:border-gold hover:text-gold transition-all duration-300"
            >
              <svg width="16" height="16" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>
          </div>

          <div className="mt-10 text-center">
            {mode === "signup" ? (
              <button
                onClick={() => { setMode("signin"); setError(null); setSuccess(null); }}
                className="text-gray-500 text-xs hover:text-gold transition-colors"
              >
                Already have an account? Sign in
              </button>
            ) : (
              <button
                onClick={() => { setMode("signup"); setError(null); setSuccess(null); setOtpSent(false); }}
                className="text-gray-500 text-xs hover:text-gold transition-colors"
              >
                Don&apos;t have an account? Create one
              </button>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
