"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client/react";
import { LOGIN_MUTATION, REGISTER_MUTATION } from "src/lib/queries";
import { useRouter } from "next/navigation";

interface AuthFormData {
  email: string;
  username?: string;
  password: string;
}

interface AuthResponse {
  login?: {
    token: string;
    user: { id: string; username: string; email: string };
  };
  register?: {
    token: string;
    user: { id: string; username: string; email: string };
  };
}

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const router = useRouter();

  const [login, { loading: loginLoading }] =
    useMutation<AuthResponse>(LOGIN_MUTATION);
  const [register_, { loading: registerLoading }] =
    useMutation<AuthResponse>(REGISTER_MUTATION);

  const loading = loginLoading || registerLoading;

  const { register, handleSubmit, reset } = useForm<AuthFormData>();

  const toggleMode = () => {
    setMode(mode === "login" ? "register" : "login");
    setAuthError(null);
    setSuccessMessage(null);
    reset();
  };

  const onSubmit = async (data: AuthFormData) => {
    setAuthError(null);
    setSuccessMessage(null);
    try {
      if (mode === "login") {
        const result = await login({
          variables: { email: data.email, password: data.password },
        });
        const token = result.data?.login?.token;
        if (token) {
          localStorage.setItem("auth_token", token);
          router.push("/");
          router.refresh();
        }
      } else {
        if (!data.username) return;
        const result = await register_({
          variables: {
            email: data.email,
            username: data.username,
            password: data.password,
          },
        });
        const token = result.data?.register?.token;
        if (token) {
          localStorage.setItem("auth_token", token);
          setSuccessMessage("Account created successfully! Please log in.");
          setMode("login");
          reset();
        }
      }
    } catch (err) {
      if (err instanceof Error) {
        setAuthError(err.message);
      }
    }
  };

  return (
    <div className="w-full h-full min-h-screen flex items-center justify-center p-6 bg-navy">
      <div className="w-full max-w-md p-8 rounded-2xl bg-gray-800 border border-gray-700 shadow-xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            {mode === "login" ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="text-gray-400 mt-2 font-light">
            {mode === "login"
              ? "Enter your credentials to access your polls"
              : "Join the community and start creating polls"}
          </p>
        </div>

        {authError && (
          <div className="mb-6 px-4 py-3 rounded-xl bg-red-400/10 border border-red-400/20 text-red-400 text-sm text-center">
            {authError}
          </div>
        )}

        {successMessage && (
          <div className="mb-6 px-4 py-3 rounded-xl bg-btn/10 border border-btn/20 text-btn text-sm text-center">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {mode === "register" && (
            <div className="animate-in fade-in slide-in-from-left-2 duration-300">
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Username
              </label>
              <input
                {...register("username", { required: mode === "register" })}
                className="w-full px-4 py-3 rounded-xl bg-gray-900/50 border border-gray-700 text-white focus:border-btn focus:outline-none transition-all"
                placeholder="johndoe"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Email Address
            </label>
            <input
              {...register("email", { required: true })}
              type="email"
              className="w-full px-4 py-3 rounded-xl bg-gray-900/50 border border-gray-700 text-white focus:border-btn focus:outline-none transition-all"
              placeholder="name@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                {...register("password", { required: true })}
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-3 rounded-xl bg-gray-900/50 border border-gray-700 text-white focus:border-btn focus:outline-none transition-all pr-12"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-btn transition-colors"
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-btn text-navy font-bold py-4 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all uppercase tracking-wider text-sm shadow-lg shadow-teal-500/10 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
          >
            {loading
              ? "Please wait..."
              : mode === "login"
              ? "Login"
              : "Sign Up"}
          </button>
        </form>

        <div className="mt-8 text-center border-t border-gray-700 pt-6">
          <p className="text-gray-400 text-sm">
            {mode === "login"
              ? "Don't have an account?"
              : "Already have an account?"}
            <button
              onClick={toggleMode}
              className="text-btn font-bold ml-2 hover:underline focus:outline-none"
            >
              {mode === "login" ? "Register now" : "Login here"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
