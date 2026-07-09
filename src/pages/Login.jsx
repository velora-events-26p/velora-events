import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, CalendarDays } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear the field error as soon as the user starts fixing it
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    // TODO(auth): hook this up to the real login logic once it's ready,
    // e.g. await login(formData.email, formData.password) then navigate
    // on success and show a real error on failure.
    console.log("Login form submitted:", formData, { rememberMe });
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-stone-50 px-4 py-12"
      style={{ "--font-sans": "'Poppins', sans-serif" }}
    >
      <div className="w-full max-w-md">
        {/* Brand mark */}
        <div className="mb-8 flex flex-col items-center gap-2 text-center">
          <div className="flex size-11 items-center justify-center rounded-xl bg-amber-500 text-white shadow-sm shadow-amber-500/30">
            <CalendarDays className="size-5" />
          </div>
          <span className="font-heading text-lg font-semibold text-stone-900">
            Velora Events
          </span>
        </div>

        <Card className="border-stone-200 shadow-lg shadow-stone-900/5">
          <CardHeader className="px-6 pt-6 text-center">
            <CardTitle className="text-2xl text-stone-900">
              Welcome back
            </CardTitle>
            <CardDescription className="text-stone-500">
              Log in to book events and manage your tickets
            </CardDescription>
          </CardHeader>

          <CardContent className="px-6">
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="email" className="text-stone-700">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  aria-invalid={!!errors.email}
                  className="border-stone-300 focus-visible:border-amber-500 focus-visible:ring-amber-500/30"
                />
                {errors.email && (
                  <p className="text-xs text-red-600">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-stone-700">
                    Password
                  </Label>
                  <Link
                    to="/forgot-password"
                    className="text-xs font-medium text-amber-600 hover:text-amber-700 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    aria-invalid={!!errors.password}
                    className="border-stone-300 pr-9 focus-visible:border-amber-500 focus-visible:ring-amber-500/30"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute inset-y-0 right-0 flex items-center px-2.5 text-stone-400 hover:text-stone-600"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-red-600">{errors.password}</p>
                )}
              </div>

              {/* Remember me */}
              <label className="flex items-center gap-2 text-sm text-stone-600 select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="size-4 rounded border-stone-300 text-amber-500 focus:ring-amber-500/40"
                />
                Remember me
              </label>

              <Button
                type="submit"
                className="mt-1 h-10 w-full bg-amber-500 text-white hover:bg-amber-600"
              >
                Log In
              </Button>
            </form>
          </CardContent>

          <CardFooter className="justify-center bg-stone-50/60 px-6 py-4 text-sm text-stone-600">
            Don&apos;t have an account?{" "}
            <Link
              to="/signup"
              className="ml-1 font-medium text-amber-600 hover:text-amber-700 hover:underline"
            >
              Sign up
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}