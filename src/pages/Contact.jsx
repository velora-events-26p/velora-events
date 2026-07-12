import { useState } from "react";
import {
  Clock,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";

export default function Contact({ onSubmit = () => {} }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));

    if (submitted) {
      setSubmitted(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit(form);
    setSubmitted(true);

    setForm({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  const inputClasses =
    "w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100 dark:placeholder:text-stone-500 dark:focus:border-amber-500";

  const contactItems = [
    {
      icon: MapPin,
      title: "Our Office",
      content: (
        <p className="leading-relaxed text-stone-600 dark:text-stone-400">
          Cotton Avenue, Kilimani
          <br />
          Nairobi, Kenya
        </p>
      ),
    },
    {
      icon: Phone,
      title: "Direct Contact",
      content: (
        <div className="space-y-1">
          <a
            href="mailto:hello@velora-events.co.ke"
            className="block text-stone-600 transition hover:text-amber-600 dark:text-stone-400 dark:hover:text-amber-400"
          >
            hello@velora-events.co.ke
          </a>

          <a
            href="tel:+254715959012"
            className="block text-stone-600 transition hover:text-amber-600 dark:text-stone-400 dark:hover:text-amber-400"
          >
            +254 715 959 012
          </a>
        </div>
      ),
    },
    {
      icon: Clock,
      title: "Working Hours",
      content: (
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs font-medium sm:text-sm">
          <span className="text-stone-500 dark:text-stone-400">
            Mon - Fri:
          </span>

          <span className="text-right text-stone-700 dark:text-stone-300">
            07:00 AM - 04:00 PM
          </span>

          <span className="text-stone-500 dark:text-stone-400">
            Sat - Sun:
          </span>

          <span className="text-right text-stone-700 dark:text-stone-300">
            08:00 AM - 02:00 PM
          </span>
        </div>
      ),
    },
    {
      icon: Mail,
      title: "Support",
      content: (
        <a
          href="mailto:support@velora-events.co.ke"
          className="text-stone-600 transition hover:text-amber-600 dark:text-stone-400 dark:hover:text-amber-400"
        >
          support@velora-events.co.ke
        </a>
      ),
    },
  ];

  return (
    <section className="min-h-screen bg-stone-50 py-16 text-stone-900 dark:bg-stone-950 dark:text-stone-100">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Page heading */}
        <div className="mx-auto max-w-3xl space-y-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400">
            Get in touch
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-100 md:text-5xl">
            Connect With{" "}
            <span className="italic text-amber-600 dark:text-amber-400">
              Velora Events
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-sm leading-7 text-stone-600 dark:text-stone-400 md:text-base">
            Have an inquiry about ticketing, venue partnerships, sponsorships,
            or planning your own event with us? Send us a message and our team
            will get back to you.
          </p>
        </div>

        <div className="mt-14 grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Contact form */}
          <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm dark:border-stone-800 dark:bg-stone-900 md:p-8">
            <h2 className="border-b border-stone-200 pb-4 text-xl font-bold text-stone-900 dark:border-stone-800 dark:text-stone-100">
              Send Us a Message
            </h2>

            <form
              onSubmit={handleSubmit}
              className="mt-6 space-y-5"
            >
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-stone-700 dark:text-stone-300"
                  >
                    Your Full Name
                  </label>

                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                    className={inputClasses}
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-stone-700 dark:text-stone-300"
                  >
                    Email Address
                  </label>

                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                    className={inputClasses}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-medium text-stone-700 dark:text-stone-300"
                >
                  Subject
                </label>

                <input
                  id="subject"
                  type="text"
                  name="subject"
                  placeholder="What's this about?"
                  value={form.subject}
                  onChange={handleChange}
                  required
                  className={inputClasses}
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-stone-700 dark:text-stone-300"
                >
                  Message
                </label>

                <textarea
                  id="message"
                  rows={6}
                  name="message"
                  placeholder="Share your thoughts here..."
                  value={form.message}
                  onChange={handleChange}
                  required
                  className={`${inputClasses} resize-none`}
                />
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 px-6 py-3 font-semibold text-stone-950 shadow-sm transition hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 dark:focus:ring-offset-stone-900"
              >
                <Send size={18} />
                Send Message
              </button>

              {submitted && (
                <p
                  role="status"
                  className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-center text-sm text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300"
                >
                  Thanks — your message has been sent.
                </p>
              )}
            </form>
          </div>

          {/* Office information */}
          <div>
            <h2 className="border-b border-stone-200 pb-4 text-xl font-bold text-stone-900 dark:border-stone-800 dark:text-stone-100">
              Our Offices
            </h2>

            <div className="mt-6 overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm divide-y divide-stone-200 dark:divide-stone-800 dark:border-stone-800 dark:bg-stone-900">
              {contactItems.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="flex items-start gap-4 p-5 transition hover:bg-stone-50 dark:hover:bg-stone-800/60 sm:p-6"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400">
                      <Icon size={20} strokeWidth={2} />
                    </div>

                    <div className="min-w-0 flex-1 text-sm">
                      <h3 className="mb-2 font-bold text-stone-900 dark:text-stone-100">
                        {item.title}
                      </h3>

                      {item.content}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}