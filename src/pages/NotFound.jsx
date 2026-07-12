import { Link } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";

const NotFound = () => {
  return (
    <section className="flex min-h-screen items-center justify-center bg-stone-100 px-6 text-stone-900 transition-colors dark:bg-stone-950 dark:text-stone-100">
      <div className="max-w-lg text-center">
        <h1 className="text-8xl font-extrabold text-amber-500 md:text-9xl">
          404
        </h1>

        <h2 className="mt-4 text-3xl font-bold text-stone-900 dark:text-stone-100">
          Page Not Found
        </h2>

        <p className="mt-4 leading-7 text-stone-600 dark:text-stone-400">
          Oops! The page you're looking for doesn't exist or may have been
          moved. Let's get you back to discovering amazing events.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-amber-500 px-6 py-3 font-medium text-stone-950 transition hover:bg-amber-400"
          >
            <Home size={18} />
            Back Home
          </Link>

          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-stone-300 bg-white px-6 py-3 font-medium text-stone-700 transition hover:bg-stone-200 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-200 dark:hover:bg-stone-800"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
        </div>
      </div>
    </section>
  );
};

export default NotFound;