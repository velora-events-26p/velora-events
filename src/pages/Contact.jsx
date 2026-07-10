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
        setForm({ name: "", email: "", subject: "", message: "" });
    };

    return (
        <div className="flex min-h-[80vh] items-center justify-center p-4 sm:p-6 lg:p-8">
            <div className="space-y-6 rounded-2xl border border-stone-200  p-6 shadow-sm md:p-8 font-['Poppins']">

            {submitted ? (
                <div className="rounded-xl bg-stone-50/60 border border-amber-200 p-4 text-sm font-medium text-amber-900 transition-all">
                    Thanks for reaching out — our team will get back to you shortly.
                    
                    <button
                    type="button"
                    onClick={() => setSubmitted(false)} 
                    className="mt-2 block text-xs font-semibold underline"
                    >
                    Send another message
                    </button>

                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                            <label className="mb-1.5 block text-xs font-semibold text-stone-500">
                                Your Full Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                required
                                value={form.name}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-stone-200  p-2.5 text-sm outline-none transition-all"
                            />
                        </div>
                        <div>
                            <label className="mb-1.5 block text-xs font-semibold text-stone-500">
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                required
                                value={form.email}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-stone-200  p-2.5 text-sm outline-none transition-all "
                            />
                        </div>
                    </div>

                    <div>
                        <label className="mb-1.5 block text-xs font-semibold text-stone-500">
                            Subject
                        </label>
                        <input
                            type="text"
                            name="subject"
                            placeholder="What's this about?"
                            required
                            value={form.subject}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-stone-200  p-2.5 text-sm outline-none transition-all "
                        />
                    </div>

                    <div>
                        <label className="mb-1.5 block text-xs font-semibold text-stone-500">
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
                        className="flex w-full items-center justify-center gap-2 rounded-lg bg-amber-500 py-3 font-semibold text-stone-950 shadow-sm transition-all hover:bg-amber-300 active:scale-[0.99]"
                    >
                        <Send size={14} className="stroke-[2.5]" />
                        Send Message
                    </button>
                </form>
            )}
        </div>
        </div>

    )
}
