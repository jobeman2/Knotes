// register page
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axiosInstance from "@/lib/axios";
import { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";

const registerSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true);
    setMessage("");
    try {
      const res = await axiosInstance.post("/auth/register", data);
      if (res.data.success) {
        setMessage("Registration successful! User ID: " + res.data.uid);
      } else {
        setMessage("Error: " + res.data.error);
      }
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.error || err.message || "Something went wrong";
      setMessage("Error: " + errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setLoading(true);
    setMessage("");
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setMessage("Google registration successful! User ID: " + result.user.uid);
    } catch (err: any) {
      console.error("Google Sign-up error:", err);
      setMessage("Google Error: " + (err.message || "Failed to sign up"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4 transition-colors">
      <div className="bg-surface p-8 rounded-2xl shadow-xl w-full max-w-md border border-border/40">
        <h1 className="text-2xl font-bold mb-6 text-center text-foreground">
          Register
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-foreground/80 font-medium text-sm">
              Email
            </label>
            <input
              type="email"
              {...register("email")}
              className="w-full mt-1.5 p-2.5 border rounded-xl bg-muted/30 border-border/60 text-foreground focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-foreground/80 font-medium text-sm">
              Password
            </label>
            <input
              type="password"
              {...register("password")}
              className="w-full mt-1.5 p-2.5 border rounded-xl bg-muted/30 border-border/60 text-foreground focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:opacity-90 text-primary-foreground p-3 rounded-xl mt-4 font-bold transition-all active:scale-[0.98]"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="px-2 bg-surface text-muted-foreground text-xs uppercase tracking-wider font-bold">
                Or continue with
              </span>
            </div>
          </div>

          <button
            onClick={handleGoogleSignUp}
            disabled={loading}
            className="w-full mt-4 flex items-center justify-center gap-2 bg-surface border border-border/60 text-foreground p-3 rounded-xl hover:bg-muted/50 transition-all font-medium active:scale-[0.98]"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1 .67-2.28 1.07-3.71 1.07-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.67-.35-1.39-.35-2.09s.13-1.42.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.63l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Google
          </button>
        </div>

        {message && (
          <p className="mt-4 text-center text-gray-700 dark:text-gray-200">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
