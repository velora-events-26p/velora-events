import { useState } from "react";
import { Send } from "lucide-react";

export default function Contact({ onSubmit = () => { } }) {
    const [form, setForm] = useState({ name: "", email: "", subject: "", message: "", });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form);
        setSubmitted(true);
    };

    return (
        <div className="space-y-6 rounded-2xl border border-stone-200 bg-stone-900 p-6 shadow-sm md:p-8 font-['Poppins']">
            <h2 className="border-b border-stone-100 pb-3 text-xl font-bold text-amber-400">
                Send Us A Message
            </h2>

            {submitted ? (
                <div className="rounded-xl bg-stone-50/60 border border-amber-200 p-4 text-sm font-medium text-amber-900 transition-all">
                    Thanks for reaching out — our team will get back to you shortly.
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                            <label className="mb-1.5 block text-xs font-semibold text-white">
                                Your Full Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                required
                                value={form.name}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-stone-200 bg-amber-50 p-2.5 text-sm outline-none transition-all text-amber-900"
                            />
                        </div>
                        <div>
                            <label className="mb-1.5 block text-xs font-semibold text-white">
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                required
                                value={form.email}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-stone-200 bg-amber-50 p-2.5 text-sm outline-none transition-all  text-amber-900"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="mb-1.5 block text-xs font-semibold text-white">
                            Subject
                        </label>
                        <input
                            type="text"
                            name="subject"
                            placeholder="What's this about?"
                            required
                            value={form.subject}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-stone-200 bg-amber-50 p-2.5 text-sm outline-none transition-all  text-amber-900"
                        />
                    </div>

                    <div>
                        <label className="mb-1.5 block text-xs font-semibold text-white">
                            Message
                        </label>
                        <textarea
                            name="message"
                            rows={5}
                            required
                            placeholder="Share your thoughts here..."
                            value={form.message}
                            onChange={handleChange}
                            className="w-full resize-none rounded-lg border border-stone-200 bg-stone-50 p-2.5 text-sm outline-none transition-all text-stone-900"
                        />
                    </div>

                    <button
                        type="submit"
                        className="flex w-full items-center justify-center gap-2 rounded-lg bg-amber-500 py-3 font-semibold text-stone-950 shadow-sm transition-all hover:bg-amber-400 active:scale-[0.99]"
                    >
                        <Send size={14} className="stroke-[2.5]" />
                        Send Message
                    </button>
                </form>
            )}
        </div>
    )
}
