import { useState, useMemo, useEffect } from "react";
import { Calendar, MapPin, Clock, QrCode, X, Inbox, Loader2, AlertCircle,} from "lucide-react";


const TICKETS_STORAGE_KEY = "veloraTickets";

const loadTicketsData = async () => {
  try {
    const raw = localStorage.getItem(TICKETS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.warn("Could not load your tickets:", err);
    throw err;
  }
};

const fetchMyTickets = () =>
  new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const data = await loadTicketsData();
        resolve(data);
      } catch (err) {
        reject(err);
      }
    }, 1000);
  });

export default function MyTicketsPage() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedTicket, setSelectedTicket] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError("");
    fetchMyTickets()
      .then((data) => setTickets(data))
      .catch(() => setError("We couldn't load your tickets. Please try again."))
      .finally(() => setLoading(false));
  }, []);

  const filteredTickets = useMemo(() => {
    if (filter === "all") return tickets;
    return tickets.filter((t) => t.status === filter);
  }, [tickets, filter]);

  const filters = [
    { id: "all", label: "All" },
    { id: "upcoming", label: "Upcoming" },
    { id: "past", label: "Past" },
  ];

  return (
    <div className="min-h-screen bg-white text-stone-800" dark:bg-stone-950 dark:text-stone-100 style={{ fontFamily: "'Poppins', sans-serif" }}>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap"
      />

      <main className="max-w-4xl mx-auto px-6 md:px-12 py-12 md:py-16 space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-stone-800">My Tickets</h1>
          <p className="text-sm text-stone-500">All the events you've reserved a spot at, in one place.</p>
        </div>

        {/* Filter tabs */}
        <div className="flex items-center gap-2">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === f.id
                  ? "bg-amber-600 text-white"
                  : "bg-white border border-amber-100 text-stone-600 hover:border-amber-300"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Loading state */}
        {loading && (
          <div className="flex flex-col items-center justify-center gap-3 text-stone-500 py-20">
            <Loader2 size={26} className="animate-spin text-amber-600" />
            <p className="text-sm">Loading your tickets...</p>
          </div>
        )}

        {/* Error state */}
        {!loading && error && (
          <div className="flex flex-col items-center justify-center gap-3 text-center py-20">
            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-500">
              <AlertCircle size={22} />
            </div>
            <p className="text-sm text-stone-500">{error}</p>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && filteredTickets.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-3 text-center py-20 border border-amber-100 rounded-2xl">
            <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
              <Inbox size={22} />
            </div>
            <h3 className="font-semibold text-stone-800">No tickets here yet</h3>
            <p className="text-sm text-stone-500 max-w-xs">
              {filter === "all"
                ? "Reserve a ticket for an upcoming event and it'll show up here."
                : `You don't have any ${filter} tickets right now.`}
            </p>
          </div>
        )}

        {/* Ticket list */}
        {!loading && !error && filteredTickets.length > 0 && (
          <div className="space-y-4">
            {filteredTickets.map((t) => (
              <div
                key={t.id}
                className="border border-amber-100 rounded-2xl p-4 md:p-5 flex flex-col sm:flex-row gap-4 sm:items-center"
              >
                <img
                  src={t.image}
                  alt={t.eventName}
                  className="w-full sm:w-32 h-24 object-cover rounded-xl shrink-0"
                />

                <div className="flex-1 space-y-1.5 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-stone-800 text-sm md:text-base truncate">
                      {t.eventName}
                    </h3>
                    <span
                      className={`text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full shrink-0 ${
                        t.status === "upcoming"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-stone-100 text-stone-500"
                      }`}
                    >
                      {t.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-stone-500">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} className="text-amber-600" /> {t.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} className="text-amber-600" /> {t.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={12} className="text-amber-600" /> {t.venue}
                    </span>
                  </div>
                  <p className="text-xs text-stone-500">
                    {t.tier} x {t.quantity} &middot; KSH {t.total.toLocaleString()} &middot;{" "}
                    <span className="capitalize">{t.paymentMethod}</span>
                  </p>
                </div>

                <button
                  onClick={() => setSelectedTicket(t)}
                  className="flex items-center justify-center gap-2 bg-amber-50 hover:bg-amber-100 text-amber-700 text-sm font-medium px-4 py-2.5 rounded-lg transition-colors shrink-0 sm:self-center"
                >
                  <QrCode size={16} /> View Ticket
                </button>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Ticket detail / QR modal */}
      {selectedTicket && (
        <div
          className="fixed inset-0 bg-stone-900/50 flex items-center justify-center px-6 z-50"
          onClick={() => setSelectedTicket(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-sm w-full p-6 space-y-5 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedTicket(null)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-600"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            <div className="text-center space-y-1">
              <span className="inline-block bg-stone-100 text-stone-700 text-[10px] tracking-widest uppercase font-semibold px-3 py-1 rounded-full">
                Entry Ticket
              </span>
              <h2 className="text-lg font-bold text-stone-800">{selectedTicket.eventName}</h2>
              <p className="text-xs text-stone-500">{selectedTicket.date}</p>
            </div>

            <div className="flex items-center justify-center py-4">
              <div className="w-40 h-40 rounded-xl bg-stone-900 grid grid-cols-6 grid-rows-6 gap-1 p-3">
                {Array.from({ length: 36 }).map((_, i) => (
                  <div
                    key={i}
                    className={`rounded-sm ${
                      // deterministic pseudo-random pattern so it looks like a QR code
                      (i * 7 + selectedTicket.id.length) % 3 === 0 ? "bg-white" : "bg-transparent"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="border-t border-amber-100 pt-4 space-y-2 text-sm">
              <div className="flex justify-between text-stone-600">
                <span>Reservation ID</span>
                <span className="font-semibold text-stone-800">{selectedTicket.id}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Ticket Type</span>
                <span className="font-semibold text-stone-800">
                  {selectedTicket.tier} x {selectedTicket.quantity}
                </span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Venue</span>
                <span className="font-semibold text-stone-800 text-right">{selectedTicket.venue}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Total Paid</span>
                <span className="font-semibold text-stone-800">
                  KSH {selectedTicket.total.toLocaleString()}
                </span>
              </div>
            </div>

            <p className="text-[11px] text-stone-400 text-center leading-relaxed">
              Present this code at the entrance for scanning.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}