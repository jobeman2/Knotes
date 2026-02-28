"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axiosInstance from "@/lib/axios";
import { useState } from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { useToast } from "@/app/components/Toast/ToastContext";
import Link from "next/link";
import { Mail, Lock, Chrome, Sparkles, ArrowRight } from "lucide-react";
import { registerSchema, RegisterFormData } from "@/lib/validations/auth";

import Input from "@/app/components/UI/input/input";
import Button from "@/app/components/UI/button/button";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  const passwordValue = watch("password", "");

  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true);

    try {
      const res = await axiosInstance.post("/auth/register", data);

      if (res.data.success) {
        showToast("Registration successful! Welcome aboard.", "success");
        // Redirect logic could go here
      } else {
        showToast(res.data.error || "Registration failed", "error");
      }
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.error ||
        err.response?.data?.details?.[0]?.message ||
        err.message ||
        "Something went wrong";

      showToast(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setLoading(true);

    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result.user) {
        showToast("Successfully signed up with Google!", "success");
      }
    } catch (err: any) {
      // Handle "popup closed by user" specifically
      if (err.code === "auth/popup-closed-by-user") {
        showToast("Sign up cancelled", "info");
      } else {
        showToast(err.message || "Google sign up failed", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl" />
      </div>

      {/* Brand header */}
      <div className="relative mb-8 text-center animate-fade-in">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-light text-foreground/80">Welcome to</h2>
        </div>
        <h1 className="text-4xl font-bold text-primary">Knotes</h1>
      </div>

      <div className="relative w-full max-w-md">
        {/* Card with glass morphism effect */}
        <div className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/10">
          {/* Header */}
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold text-foreground mb-2">
              Create account
            </h3>
            <p className="text-muted-foreground text-sm">
              Join us today and start your journey
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="pl-10"
                  {...register("email")}
                  error={errors.email?.message}
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="password"
                  placeholder="Create a password"
                  className="pl-10"
                  {...register("password")}
                  error={errors.password?.message}
                />
              </div>
            </div>

            {/* Password requirements hint */}
            <div className="text-xs text-muted-foreground space-y-2 bg-muted/30 p-3 rounded-xl">
              <p className="font-medium mb-1">Password requirements:</p>
              <ul className="space-y-1.5">
                {[
                  {
                    label: "At least 6 characters",
                    met: passwordValue.length >= 6,
                  },
                  {
                    label: "One uppercase letter",
                    met: /[A-Z]/.test(passwordValue),
                  },
                  { label: "One number", met: /[0-9]/.test(passwordValue) },
                ].map((req, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 transition-all"
                  >
                    <div
                      className={`w-1.5 h-1.5 rounded-full transition-colors ${
                        req.met ? "bg-emerald-500" : "bg-zinc-400"
                      }`}
                    />
                    <span
                      className={
                        req.met ? "text-emerald-600 dark:text-emerald-400" : ""
                      }
                    >
                      {req.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <Button
              type="submit"
              loading={loading}
              disabled={!isValid}
              className="w-full group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Get Started
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/40"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-surface px-4 text-muted-foreground font-medium">
                Or continue with
              </span>
            </div>
          </div>

          <button
            onClick={handleGoogleSignUp}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 text-foreground p-3.5 rounded-xl transition-all duration-200 disabled:opacity-60 group relative overflow-hidden"
          >
            <Chrome className="w-5 h-5" />
            <span className="font-medium">Sign up with Google</span>
          </button>

          {/* Login link */}
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-primary hover:text-primary/80 font-medium transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-muted-foreground">
          By creating an account, you agree to our{" "}
          <Link
            href="/terms"
            className="underline hover:text-primary transition-colors"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="underline hover:text-primary transition-colors"
          >
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}
