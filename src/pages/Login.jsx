import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CalendarDays, Eye, EyeOff } from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const inputClasses =
    "border-stone-300 bg-white text-stone-900 placeholder:text-stone-400 focus-visible:border-amber-500 focus-visible:ring-amber-500/30 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100 dark:placeholder:text-stone-500 dark:focus-visible:border-amber-500";

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((previousErrors) => ({
        ...previousErrors,
        [name]: "",
      }));
    }

    if (formError) {
      setFormError("");
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password =
        "Password must be at least 6 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    setFormError("");

    try {
      await login({
        email: formData.email,
        password: formData.password,
      });

      navigate("/");
    } catch (error) {
      setFormError(
        error.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-stone-100 via-amber-50 to-stone-200 px-4 py-12 text-stone-900 transition-colors dark:from-stone-950 dark:via-stone-900 dark:to-black dark:text-stone-100">
      {/* Background decorations */}
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-amber-300/30 blur-3xl dark:bg-amber-500/10" />

      <div className="pointer-events-none absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-orange-200/30 blur-3xl dark:bg-amber-400/10" />

      <div className="relative z-10 w-full max-w-md">
        {/* Brand mark */}
        <div className="mb-8 flex flex-col items-center gap-2 text-center">
          <div className="flex size-11 items-center justify-center rounded-xl bg-amber-500 text-stone-950 shadow-sm shadow-amber-500/30">
            <CalendarDays className="size-5" />
          </div>

          <span className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Velora Events
          </span>
        </div>

        <Card className="overflow-hidden border-stone-200 bg-white text-stone-900 shadow-lg shadow-stone-900/5 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-100 dark:shadow-black/20">
          <CardHeader className="px-6 pt-6 text-center">
            <CardTitle className="text-2xl text-stone-900 dark:text-stone-100">
              Welcome back
            </CardTitle>

            <CardDescription className="text-stone-500 dark:text-stone-400">
              Log in to book events and manage your tickets
            </CardDescription>
          </CardHeader>

          <CardContent className="px-6">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="flex flex-col gap-4"
            >
              {formError && (
                <p
                  role="alert"
                  className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300"
                >
                  {formError}
                </p>
              )}

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <Label
                  htmlFor="email"
                  className="text-stone-700 dark:text-stone-300"
                >
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
                  aria-invalid={Boolean(errors.email)}
                  className={inputClasses}
                />

                {errors.email && (
                  <p className="text-xs text-red-600 dark:text-red-400">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="password"
                    className="text-stone-700 dark:text-stone-300"
                  >
                    Password
                  </Label>

                  <Link
                    to="/forgot-password"
                    className="text-xs font-medium text-amber-600 transition hover:text-amber-700 hover:underline dark:text-amber-400 dark:hover:text-amber-300"
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
                    aria-invalid={Boolean(errors.password)}
                    className={`${inputClasses} pr-10`}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((currentValue) => !currentValue)
                    }
                    className="absolute inset-y-0 right-0 flex items-center px-3 text-stone-400 transition hover:text-stone-700 dark:text-stone-500 dark:hover:text-stone-200"
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </button>
                </div>

                {errors.password && (
                  <p className="text-xs text-red-600 dark:text-red-400">
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Remember me */}
              <label className="flex select-none items-center gap-2 text-sm text-stone-600 dark:text-stone-400">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(event) =>
                    setRememberMe(event.target.checked)
                  }
                  className="size-4 rounded border-stone-300 bg-white accent-amber-500 focus:ring-amber-500/40 dark:border-stone-600 dark:bg-stone-950"
                />

                Remember me
              </label>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="mt-1 h-11 w-full bg-amber-500 font-semibold text-stone-950 hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? "Logging in..." : "Log In"}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="justify-center border-t border-stone-200 bg-stone-50/70 px-6 py-4 text-sm text-stone-600 dark:border-stone-800 dark:bg-stone-950/50 dark:text-stone-400">
            Don&apos;t have an account?{" "}
            <Link
              to="/signup"
              className="ml-1 font-medium text-amber-600 transition hover:text-amber-700 hover:underline dark:text-amber-400 dark:hover:text-amber-300"
            >
              Sign up
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}