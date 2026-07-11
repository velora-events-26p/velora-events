import { Link } from "react-router-dom";
// import { FaArrowLeft, FaHome  } from "react-icons/fa";

const NotFound = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-stone-100 px-6">
      <div className="max-w-lg text-center">

        <h1 className="text-8xl md:text-9xl font-extrabold text-amber-500">
          404
        </h1>

        <h2 className="mt-4 text-3xl font-bold text-stone-900">
          Page Not Found
        </h2>

        <p className="mt-4 text-stone-600 leading-7">
          Oops! The page you're looking for doesn't exist or may have been
          moved. Let's get you back to discovering amazing events.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">

          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-amber-500 px-6 py-3 font-medium text-white transition hover:bg-amber-600"
          >
            {/* <FaHome /> */}
            Back Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-stone-300 bg-white px-6 py-3 font-medium text-stone-700 transition hover:bg-stone-100"
          >
            {/* <FaArrowLeft /> */}
            Go Back
          </button>


        </div>

      </div>
    </section>
  );
};

export default NotFound;