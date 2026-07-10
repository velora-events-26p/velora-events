import { useState } from "react";
import { MapPin, Phone, Clock, Mail,Send } from "lucide-react";

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
 <div
      className="min-h-screen flex flex-col bg-white text-stone-800"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap"
      />
 
      {/* Main */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-6 md:px-12 py-12 md:py-20 space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-stone-800">
            Connect With <span className="text-amber-600 italic">Velora Events</span>
          </h1>
          <p className="max-w-xl mx-auto text-stone-600 text-sm md:text-base leading-relaxed">
            Have an inquiry about ticketing, venue partnerships, sponsorships,
            or planning your own event with us? Drop us a line.
          </p>
        </div>
 
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start pt-4">
          {/* Contact form */}
          <div className="bg-white border border-amber-100 p-6 md:p-8 rounded-2xl shadow-sm space-y-6">
            <h2 className="text-xl font-bold text-stone-800 border-b border-amber-100 pb-3">
              Send Us A Message
            </h2>
 
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-500 mb-1">Your Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full  border border-amber-100 rounded-lg p-2.5 text-sm focus:ring-1 focus:ring-amber-600 focus:border-amber-600 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-500 mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full  border border-amber-100 rounded-lg p-2.5 text-sm focus:ring-1 focus:ring-amber-600 focus:border-amber-600 outline-none"
                  />
                </div>
              </div>
 
              <div>
                <label className="block text-xs font-semibold text-stone-500 mb-1">Subject</label>
                <input
                  type="text"
                  name="subject"
                  placeholder="What's this about?"
                  value={form.subject}
                  onChange={handleChange}
                  className="w-full  border border-amber-100 rounded-lg p-2.5 text-sm focus:ring-1 focus:ring-amber-600 focus:border-amber-600 outline-none"
                />
              </div>
 
              <div>
                <label className="block text-xs font-semibold text-stone-500 mb-1">Message</label>
                <textarea
                  rows={5}
                  name="message"
                  placeholder="Share your thoughts here..."
                  value={form.message}
                  onChange={handleChange}
                  className="w-full  border border-amber-100 rounded-lg p-2.5 text-sm focus:ring-1 focus:ring-amber-600 focus:border-amber-600 outline-none resize-none"
                />
              </div>
 
              <button
                onClick={handleSubmit}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 rounded-lg transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <Send size={14} /> Send Message
              </button>
 
              {submitted && (
                <p className="text-xs text-center text-amber-700 bg-amber-50 border border-amber-100 rounded-lg py-2">
                  Thanks — your message has been sent.
                </p>
              )}
            </div>
          </div>
 
          {/* Offices - seamless panel */}
          <div className="space-y-6 lg:pl-6">
            <h2 className="text-xl font-bold text-stone-800 border-b border-amber-100 pb-3">
              Our Offices
            </h2>
 
            <div className="bg-white border border-amber-100 rounded-2xl shadow-sm divide-y divide-amber-100 overflow-hidden">
              <div className="p-5 flex items-start gap-4">
                <div className="text-amber-600 w-9 h-9 flex items-center justify-center  rounded-full shrink-0">
                  <MapPin size={16} strokeWidth={2} />
                </div>
                <div className="space-y-1 text-sm">
                  <h4 className="font-bold text-stone-800">Our Office</h4>
                  <p className="text-stone-500 leading-relaxed">
                    Cotton Avenue, Kilimani<br />
                    Nairobi, Kenya
                  </p>
                </div>
              </div>
 
              <div className="p-5 flex items-start gap-4">
                <div className="text-amber-600 w-9 h-9 flex items-center justify-center  rounded-full shrink-0">
                  <Phone size={16} strokeWidth={2} />
                </div>
                <div className="space-y-1 text-sm">
                  <h4 className="font-bold text-stone-800">Direct Contact</h4>
                  <p className="text-stone-500 leading-relaxed">
                    hello@velora-events.co.ke<br />
                    +254 715 959 012
                  </p>
                </div>
              </div>
 
              <div className="p-5 flex items-start gap-4">
                <div className="text-amber-600 w-9 h-9 flex items-center justify-center  rounded-full shrink-0">
                  <Clock size={16} strokeWidth={2} />
                </div>
                <div className="space-y-1 text-sm w-full">
                  <h4 className="font-bold text-stone-800">Working Hours</h4>
                  <div className="grid grid-cols-2 gap-2 pt-1 text-stone-500 text-xs font-medium">
                    <div>Mon - Fri:</div>
                    <div className="text-right text-stone-700">07:00 AM - 04:00 PM</div>
                    <div>Sat - Sun:</div>
                    <div className="text-right text-stone-700">08:00 AM - 02:00 PM</div>
                  </div>
                </div>
              </div>
 
              <div className="p-5 flex items-start gap-4">
                <div className="text-amber-600 w-9 h-9 flex items-center justify-center  rounded-full shrink-0">
                  <Mail size={16} strokeWidth={2} />
                </div>
                <div className="space-y-1 text-sm">
                  <h4 className="font-bold text-stone-800">Support</h4>
                  <p className="text-stone-500 leading-relaxed">support@velora-events.co.ke</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>

    )
}
