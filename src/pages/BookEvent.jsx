import { useState, useMemo, useEffect } from "react";
import { Calendar,MapPin,Clock, Minus,Plus,Ticket,CheckCircle2,Smartphone,CreditCard,Lock,Loader2,AlertCircle,} from "lucide-react";
import { useParams } from "react-router-dom";

const fallbackEventsData = [
  {
    id: "1",
    name: "Nairobi Music & Food Festival",
    date: "Saturday, August 22, 2026",
    time: "12:00 PM - 10:00 PM",
    venue: "Uhuru Gardens, Nairobi",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80",
  }
]

const loadEventsData = async () => {
  try {
    const mod = await import("@/data/events.json");
    return mod.default ?? mod;
  } catch (err) {
    console.warn("Data not resolvable here.");
    return fallbackEventsData;
  }
};

const formatEventDate = (isoDate) => {
  if (!isoDate) return "";
  const parsed = new Date(isoDate);
  if (Number.isNaN(parsed.getTime())) return isoDate;
  return parsed.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const normalizeEvent = (raw) => ({
  id: raw.id,
  name: raw.title ?? raw.name,
  date: raw.date ? formatEventDate(raw.date) : raw.date,
  time: raw.time,
  venue: raw.location ?? raw.venue,
  image: raw.image,
});

const fetchEventById = (id) =>
  new Promise((resolve, reject) => {
    setTimeout(async () => {
      const data = await loadEventsData();
      const found = data.find((e) => String(e.id) === String(id));
      if (found) {
        resolve(normalizeEvent(found));
      } else {
        reject(new Error("Event not found"));
      }
    }, 1000);
  });


const TICKETS_STORAGE_KEY = "veloraTickets";

const generateReservationId = () => `VEL-${Math.floor(1000 + Math.random() * 9000)}`;

const saveTicketToLocalStorage = (ticket) => {
  try {
    const existing = JSON.parse(localStorage.getItem(TICKETS_STORAGE_KEY) || "[]");
    const updated = [...existing, ticket];
    localStorage.setItem(TICKETS_STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.warn("There was an error saving your ticket:", err);
  }
};

export default function BookEvent({ eventId: eventIdProp = "1" }) {

    const { id: routeEventId } = useParams();
    const eventId = routeEventId ?? eventIdProp;

  const [event, setEvent] = useState(null);
  const [eventLoading, setEventLoading] = useState(true);
  const [eventError, setEventError] = useState("");

  useEffect(() => {
    setEventLoading(true);
    setEventError("");
    setEvent(null);

    fetchEventById(eventId)
      .then((data) => setEvent(data))
      .catch(() => setEventError("We couldn't load this event. Please try again."))
      .finally(() => setEventLoading(false));
  }, [eventId]);

  const ticketTiers = [
    { id: "regular", name: "Regular", price: 1500, description: "General access to all festival areas" },
    { id: "vip", name: "VIP", price: 4500, description: "Front stage access, VIP lounge, complimentary drink" },
    { id: "group", name: "Group of 5", price: 6500, description: "5 Regular tickets bundled, save 10%" },
  ];

  const [selectedTier, setSelectedTier] = useState("regular");
  const [quantity, setQuantity] = useState(1);
  const [attendee, setAttendee] = useState({ name: "", email: "", phone: "" });
  const [paymentMethod, setPaymentMethod] = useState("mpesa");
  const [mpesaPhone, setMpesaPhone] = useState("");
  const [cardDetails, setCardDetails] = useState({ number: "", expiry: "", cvv: "", name: "" });
  const [paymentStatus, setPaymentStatus] = useState("idle");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const tier = ticketTiers.find((t) => t.id === selectedTier);
  const subtotal = useMemo(() => (tier ? tier.price * quantity : 0), [tier, quantity]);
  const serviceFee = useMemo(() => Math.round(subtotal * 0.05), [subtotal]);
  const total = subtotal + serviceFee;

  const handleAttendeeChange = (e) => {
    setAttendee({ ...attendee, [e.target.name]: e.target.value });
  };

  const handleCardChange = (e) => {
    setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
  };

  const persistReservation = () => {
    if (!event || !tier) return;
    const ticket = {
      id: generateReservationId(),
      eventName: event.name,
      date: event.date,
      time: event.time,
      venue: event.venue,
      image: event.image,
      tier: tier.name,
      quantity,
      total,
      paymentMethod,
      status: "upcoming",
    };
    saveTicketToLocalStorage(ticket);
  };

  const handleConfirm = () => {
    if (!attendee.name || !attendee.email || !attendee.phone) {
      setError("Please fill in all attendee details before reserving.");
      return;
    }

    if (paymentMethod === "mpesa") {
      if (!mpesaPhone) {
        setError("Please enter the M-Pesa number to send the payment request to.");
        return;
      }
      setError("");
      setPaymentStatus("processing");
      setTimeout(() => {
        setPaymentStatus("waiting");
        setTimeout(() => {
          setPaymentStatus("success");
          setTimeout(() => {
            persistReservation();
            setSubmitted(true);
          }, 900);
        }, 2600);
      }, 1200);
    } else {
      if (!cardDetails.name || !cardDetails.number || !cardDetails.expiry || !cardDetails.cvv) {
        setError("Please fill in all card details before reserving.");
        return;
      }
      setError("");
      setPaymentStatus("processing");
      // Simulate card authorization
      setTimeout(() => {
        setPaymentStatus("success");
        setTimeout(() => {
          persistReservation();
          setSubmitted(true);
        }, 700);
      }, 1400);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setAttendee({ name: "", email: "", phone: "" });
    setQuantity(1);
    setSelectedTier("regular");
    setMpesaPhone("");
    setCardDetails({ number: "", expiry: "", cvv: "", name: "" });
    setPaymentStatus("idle");
    setPaymentMethod("mpesa");
  };

  if (eventLoading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center bg-white px-6"
      >
        <link
          rel="stylesheet"
        />
        <div className="flex flex-col items-center gap-3 text-stone-500">
          <Loader2 size={28} className="animate-spin text-amber-600" />
          <p className="text-sm">Loading event details...</p>
        </div>
      </div>
    );
  }

  if (eventError || !event) {
    return (
      <div
        className="min-h-screen flex items-center justify-center bg-white px-6"
      >
        <link
          rel="stylesheet"
        />
        <div className="max-w-sm w-full text-center space-y-4 border border-amber-100 rounded-2xl p-8">
          <div className="w-12 h-12 mx-auto rounded-full bg-red-50 flex items-center justify-center text-red-500">
            <AlertCircle size={22} />
          </div>
          <h2 className="text-lg font-bold text-stone-800">Event Not Found</h2>
          <p className="text-sm text-stone-500 leading-relaxed">
            {eventError || "We couldn't find details for this event."}
          </p>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div
        className="min-h-screen flex items-center justify-center bg-white px-6"
      >
        <link
          rel="stylesheet"
        />
        <div className="max-w-md w-full text-center space-y-5 border border-amber-100 rounded-2xl p-8 shadow-sm">
          <div className="w-14 h-14 mx-auto rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
            <CheckCircle2 size={28} strokeWidth={2} />
          </div>
          <h2 className="text-2xl font-bold text-stone-800">Reservation Confirmed</h2>
          <p className="text-sm text-stone-500 leading-relaxed">
            Your {quantity} x {tier.name} ticket{quantity > 1 ? "s" : ""} for{" "}
            <span className="font-semibold text-stone-700">{event.name}</span> {"has"} been reserved.
            A confirmation has been sent to {attendee.email}.
          </p>
          <div className="text-left bg-amber-50 border border-amber-100 rounded-xl p-4 text-sm space-y-1">
            <div className="flex justify-between text-stone-600">
              <span>Total Paid</span>
              <span className="font-semibold text-stone-800">KSH {total.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-stone-600">
              <span>Payment Method</span>
              <span className="font-semibold text-stone-800 capitalize">{paymentMethod}</span>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 rounded-lg transition-colors"
          >
            Reserve Another Ticket
          </button>
          <a
            href="/tickets"
            className="block text-center text-amber-600 font-semibold text-sm hover:text-amber-700"
          >
            Go to your tickets
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-stone-800" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <link
        rel="stylesheet"
      />

      <main className="max-w-6xl mx-auto px-6 md:px-12 py-12 md:py-16 space-y-10">
        <div className="flex flex-col md:flex-row gap-6 items-start border border-amber-100 rounded-2xl p-5 md:p-6 shadow-sm">
          <img
            src={event.image}
            alt={event.name}
            className="w-full md:w-56 h-40 object-cover rounded-xl"
          />
          <div className="space-y-2">
            <span className="inline-block bg-stone-100 text-stone-700 text-[11px] tracking-widest uppercase font-semibold px-3 py-1 rounded-full">
              Reserve A Ticket
            </span>
            <h1 className="text-2xl md:text-3xl font-bold text-stone-800">{event.name}</h1>
            <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-stone-500">
              <span className="flex items-center gap-1.5">
                <Calendar size={14} className="text-amber-600" /> {event.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} className="text-amber-600" /> {event.time}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin size={14} className="text-amber-600" /> {event.venue}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-stone-800">Select Ticket Type</h2>
              <div className="space-y-3">
                {ticketTiers.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTier(t.id)}
                    className={`w-full text-left p-4 rounded-xl border transition-colors flex items-center justify-between gap-4 ${
                      selectedTier === t.id
                        ? "border-amber-600 bg-amber-50"
                        : "border-amber-100 hover:border-amber-300"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`mt-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                          selectedTier === t.id ? "border-amber-600" : "border-stone-300"
                        }`}
                      >
                        {selectedTier === t.id && <div className="w-2 h-2 rounded-full bg-amber-600" />}
                      </div>
                      <div>
                        <p className="font-semibold text-stone-800 text-sm">{t.name}</p>
                        <p className="text-xs text-stone-500 mt-0.5">{t.description}</p>
                      </div>
                    </div>
                    <p className="font-bold text-amber-600 text-sm whitespace-nowrap">
                      KSH {t.price.toLocaleString()}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="text-lg font-bold text-stone-800">Quantity</h2>
              <div className="flex items-center gap-4 border border-amber-100 rounded-xl p-3 w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-amber-50 text-amber-700 hover:bg-amber-100 transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus size={14} />
                </button>
                <span className="font-semibold text-stone-800 w-6 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(10, quantity + 1))}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-amber-50 text-amber-700 hover:bg-amber-100 transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-bold text-stone-800">Attendee Details</h2>
              <div className="space-y-4 border border-amber-100 rounded-2xl p-5">
                <div>
                  <label className="block text-xs font-semibold text-stone-500 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={attendee.name}
                    onChange={handleAttendeeChange}
                    className="w-full border border-amber-100 rounded-lg p-2.5 text-sm focus:ring-1 focus:ring-amber-600 focus:border-amber-600 outline-none"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-500 mb-1">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={attendee.email}
                      onChange={handleAttendeeChange}
                      className="w-full border border-amber-100 rounded-lg p-2.5 text-sm focus:ring-1 focus:ring-amber-600 focus:border-amber-600 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-500 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+254 7XX XXX XXX"
                      value={attendee.phone}
                      onChange={handleAttendeeChange}
                      className="w-full border border-amber-100 rounded-lg p-2.5 text-sm focus:ring-1 focus:ring-amber-600 focus:border-amber-600 outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="text-lg font-bold text-stone-800">Payment Method</h2>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: "mpesa", label: "M-Pesa" },
                  { id: "card", label: "Card" },
                ].map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      setPaymentMethod(p.id);
                      setPaymentStatus("idle");
                      setError("");
                    }}
                    disabled={paymentStatus !== "idle"}
                    className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                      paymentMethod === p.id
                        ? "border-amber-600 text-amber-700"
                        : "border-amber-100 text-stone-600 hover:border-amber-300"
                    } disabled:opacity-60 disabled:cursor-not-allowed`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>

              {paymentMethod === "mpesa" && (
                <div className="border border-amber-100 rounded-2xl p-5 space-y-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-stone-800">
                    <Smartphone size={16} className="text-amber-600" />
                    Pay with M-Pesa
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-500 mb-1">M-Pesa Number</label>
                    <input
                      type="tel"
                      placeholder="+254 7XX XXX XXX"
                      value={mpesaPhone}
                      onChange={(e) => setMpesaPhone(e.target.value)}
                      disabled={paymentStatus !== "idle"}
                      className="w-full border border-amber-100 rounded-lg p-2.5 text-sm focus:ring-1 focus:ring-amber-600 focus:border-amber-600 outline-none disabled:opacity-60"
                    />
                  </div>

                  {paymentStatus === "processing" && (
                    <div className="flex items-center gap-2 text-xs text-stone-500 bg-stone-50 border border-stone-100 rounded-lg p-3">
                      <Loader2 size={14} className="animate-spin text-amber-600" />
                      Sending STK push request to {mpesaPhone || "your phone"}...
                    </div>
                  )}

                  {paymentStatus === "waiting" && (
                    <div className="flex items-center gap-2 text-xs text-amber-700 bg-amber-50 border border-amber-100 rounded-lg p-3">
                      <Loader2 size={14} className="animate-spin text-amber-600" />
                      Prompt sent. Enter your M-Pesa PIN on your phone to complete payment.
                    </div>
                  )}

                  {paymentStatus === "success" && (
                    <div className="flex items-center gap-2 text-xs text-green-700 bg-green-50 border border-green-100 rounded-lg p-3">
                      <CheckCircle2 size={14} />
                      Payment received. Confirming your reservation...
                    </div>
                  )}

                  {paymentStatus === "idle" && (
                    <p className="text-[11px] text-stone-400 leading-relaxed">
                      You'll receive a prompt on your phone to enter your M-Pesa PIN once you confirm below.
                    </p>
                  )}
                </div>
              )}

              {paymentMethod === "card" && (
                <div className="border border-amber-100 rounded-2xl p-5 space-y-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-stone-800">
                    <CreditCard size={16} className="text-amber-600" />
                    Pay with Card
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-500 mb-1">Name on Card</label>
                    <input
                      type="text"
                      name="name"
                      value={cardDetails.name}
                      onChange={handleCardChange}
                      disabled={paymentStatus !== "idle"}
                      className="w-full border border-amber-100 rounded-lg p-2.5 text-sm focus:ring-1 focus:ring-amber-600 focus:border-amber-600 outline-none disabled:opacity-60"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-500 mb-1">Card Number</label>
                    <input
                      type="text"
                      name="number"
                      placeholder="1234 5678 9012 3456"
                      value={cardDetails.number}
                      onChange={handleCardChange}
                      disabled={paymentStatus !== "idle"}
                      className="w-full border border-amber-100 rounded-lg p-2.5 text-sm focus:ring-1 focus:ring-amber-600 focus:border-amber-600 outline-none disabled:opacity-60"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-500 mb-1">Expiry</label>
                      <input
                        type="text"
                        name="expiry"
                        placeholder="MM/YY"
                        value={cardDetails.expiry}
                        onChange={handleCardChange}
                        disabled={paymentStatus !== "idle"}
                        className="w-full border border-amber-100 rounded-lg p-2.5 text-sm focus:ring-1 focus:ring-amber-600 focus:border-amber-600 outline-none disabled:opacity-60"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-500 mb-1">CVV</label>
                      <input
                        type="password"
                        name="cvv"
                        placeholder="123"
                        maxLength={3}
                        inputMode="numeric"
                        autoComplete="off"
                        value={cardDetails.cvv}
                        onChange={handleCardChange}
                        disabled={paymentStatus !== "idle"}
                        className="w-full border border-amber-100 rounded-lg p-2.5 text-sm focus:ring-1 focus:ring-amber-600 focus:border-amber-600 outline-none disabled:opacity-60"
                      />
                    </div>
                  </div>

                  {paymentStatus === "processing" && (
                    <div className="flex items-center gap-2 text-xs text-stone-500 bg-stone-50 border border-stone-100 rounded-lg p-3">
                      <Loader2 size={14} className="animate-spin text-amber-600" />
                      Authorizing card payment...
                    </div>
                  )}

                  {paymentStatus === "success" && (
                    <div className="flex items-center gap-2 text-xs text-green-700 bg-green-50 border border-green-100 rounded-lg p-3">
                      <CheckCircle2 size={14} />
                      Payment authorized. Confirming your reservation...
                    </div>
                  )}

                  <p className="flex items-center gap-1.5 text-[11px] text-stone-400 leading-relaxed">
                    <Lock size={11} /> Payments are securely processed. Card details are never stored.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="border border-amber-100 rounded-2xl p-6 shadow-sm space-y-5 sticky top-8">
              <h2 className="text-lg font-bold text-stone-800 flex items-center gap-2">
                <Ticket size={18} className="text-amber-600" /> Order Summary
              </h2>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-stone-600">
                  <span>
                    {tier.name} x {quantity}
                  </span>
                  <span>KSH {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Service Fee</span>
                  <span>KSH {serviceFee.toLocaleString()}</span>
                </div>
              </div>

              <div className="border-t border-amber-100 pt-4 flex justify-between items-center">
                <span className="font-semibold text-stone-800">Total</span>
                <span className="font-bold text-amber-600 text-lg">KSH {total.toLocaleString()}</span>
              </div>

              {error && (
                <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg p-2.5">{error}</p>
              )}

              <button
                onClick={handleConfirm}
                disabled={paymentStatus !== "idle"}
                className="w-full bg-amber-600 hover:bg-amber-700 disabled:opacity-70 disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                {paymentStatus === "idle" && (
                  <>{paymentMethod === "mpesa" ? "Send STK Push & Reserve" : "Confirm Reservation"}</>
                )}
                {paymentStatus === "processing" && (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    {paymentMethod === "mpesa" ? "Sending Push..." : "Processing Payment..."}
                  </>
                )}
                {paymentStatus === "waiting" && (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Waiting for PIN Entry...
                  </>
                )}
                {paymentStatus === "success" && (
                  <>
                    <CheckCircle2 size={16} />
                    Payment Confirmed
                  </>
                )}
              </button>

              <p className="text-[11px] text-stone-400 text-center leading-relaxed">
                By reserving, you agree to Velora Events' terms and refund policy.
              </p>
              <a href="/events" className="block text-center text-amber-600 font-semibold text-sm hover:text-amber-700">
                Back to more events
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}