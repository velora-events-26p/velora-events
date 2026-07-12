import { useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  Calendar,
  Clock,
  Inbox,
  Loader2,
  MapPin,
  QrCode,
  X,
} from "lucide-react";

const TICKETS_STORAGE_KEY = "veloraTickets";

const loadTicketsData = () => {
  const rawTickets = localStorage.getItem(TICKETS_STORAGE_KEY);

  return rawTickets ? JSON.parse(rawTickets) : [];
};

export default function MyTicketsPage() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedTicket, setSelectedTicket] = useState(null);

  useEffect(() => {
    try {
      setLoading(true);
      setError("");

      const savedTickets = loadTicketsData();

      setTickets(savedTickets);
    } catch (err) {
      console.error("Could not load tickets:", err);
      setError("We couldn't load your tickets. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  const filteredTickets = useMemo(() => {
    if (filter === "all") {
      return tickets;
    }

    return tickets.filter((ticket) => ticket.status === filter);
  }, [tickets, filter]);

  const filters = [
    { id: "all", label: "All" },
    { id: "upcoming", label: "Upcoming" },
    { id: "past", label: "Past" },
  ];

  return (
    <section className="min-h-screen bg-stone-50 py-12 text-stone-900 transition-colors dark:bg-stone-950 dark:text-stone-100 md:py-16">
      <div className="mx-auto w-full max-w-4xl space-y-8 px-4 sm:px-6 lg:px-8">
        {/* Page heading */}
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400">
            Your reservations
          </p>

          <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100 md:text-4xl">
            My Tickets
          </h1>

          <p className="text-sm text-stone-500 dark:text-stone-400">
            All the events you've reserved a spot at, in one place.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {filters.map((filterItem) => {
            const isActive = filter === filterItem.id;

            return (
              <button
                key={filterItem.id}
                type="button"
                onClick={() => setFilter(filterItem.id)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "border-amber-500 bg-amber-500 text-stone-950"
                    : "border-stone-200 bg-white text-stone-600 hover:border-amber-300 hover:bg-amber-50 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-300 dark:hover:border-amber-500 dark:hover:bg-stone-800"
                }`}
              >
                {filterItem.label}
              </button>
            );
          })}
        </div>

        {/* Loading state */}
        {loading && (
          <div className="flex flex-col items-center justify-center gap-3 py-20 text-stone-500 dark:text-stone-400">
            <Loader2
              size={26}
              className="animate-spin text-amber-600 dark:text-amber-400"
            />

            <p className="text-sm">Loading your tickets...</p>
          </div>
        )}

        {/* Error state */}
        {!loading && error && (
          <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-red-200 bg-red-50 px-6 py-20 text-center dark:border-red-500/30 dark:bg-red-500/10">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-500/15 dark:text-red-400">
              <AlertCircle size={22} />
            </div>

            <h2 className="font-semibold text-red-700 dark:text-red-300">
              Something went wrong
            </h2>

            <p className="text-sm text-red-600 dark:text-red-400">
              {error}
            </p>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && filteredTickets.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-stone-200 bg-white px-6 py-20 text-center shadow-sm dark:border-stone-800 dark:bg-stone-900">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400">
              <Inbox size={22} />
            </div>

            <h2 className="font-semibold text-stone-900 dark:text-stone-100">
              No tickets here yet
            </h2>

            <p className="max-w-xs text-sm text-stone-500 dark:text-stone-400">
              {filter === "all"
                ? "Reserve a ticket for an upcoming event and it will appear here."
                : `You don't have any ${filter} tickets right now.`}
            </p>
          </div>
        )}

        {/* Ticket list */}
        {!loading && !error && filteredTickets.length > 0 && (
          <div className="space-y-4">
            {filteredTickets.map((ticket) => (
              <article
                key={ticket.id}
                className="flex flex-col gap-4 rounded-2xl border border-stone-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-amber-300 hover:shadow-md dark:border-stone-800 dark:bg-stone-900 dark:hover:border-amber-500/50 md:p-5 sm:flex-row sm:items-center"
              >
                <img
                  src={ticket.image}
                  alt={ticket.eventName}
                  loading="lazy"
                  decoding="async"
                  onError={(event) => {
                    event.currentTarget.onerror = null;
                    event.currentTarget.src =
                      "/images/event-placeholder.jpg";
                  }}
                  className="h-40 w-full shrink-0 rounded-xl bg-stone-200 object-cover dark:bg-stone-800 sm:h-24 sm:w-32"
                />

                <div className="min-w-0 flex-1 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="truncate text-sm font-semibold text-stone-900 dark:text-stone-100 md:text-base">
                      {ticket.eventName}
                    </h2>

                    <span
                      className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                        ticket.status === "upcoming"
                          ? "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400"
                          : "bg-stone-100 text-stone-500 dark:bg-stone-800 dark:text-stone-400"
                      }`}
                    >
                      {ticket.status}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-stone-500 dark:text-stone-400">
                    <span className="flex items-center gap-1">
                      <Calendar
                        size={13}
                        className="text-amber-600 dark:text-amber-400"
                      />
                      {ticket.date}
                    </span>

                    <span className="flex items-center gap-1">
                      <Clock
                        size={13}
                        className="text-amber-600 dark:text-amber-400"
                      />
                      {ticket.time}
                    </span>

                    <span className="flex items-center gap-1">
                      <MapPin
                        size={13}
                        className="text-amber-600 dark:text-amber-400"
                      />
                      {ticket.venue}
                    </span>
                  </div>

                  <p className="text-xs text-stone-500 dark:text-stone-400">
                    {ticket.tier} × {ticket.quantity} &middot; KES{" "}
                    {Number(ticket.total).toLocaleString()} &middot;{" "}
                    <span className="capitalize">
                      {ticket.paymentMethod}
                    </span>
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedTicket(ticket)}
                  className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-amber-100 px-4 py-2.5 text-sm font-medium text-amber-800 transition-colors hover:bg-amber-200 dark:bg-amber-500/15 dark:text-amber-400 dark:hover:bg-amber-500/25 sm:self-center"
                >
                  <QrCode size={16} />
                  View Ticket
                </button>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Ticket details modal */}
      {selectedTicket && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/70 px-4 backdrop-blur-sm"
          onClick={() => setSelectedTicket(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="ticket-modal-title"
            className="relative w-full max-w-sm space-y-5 rounded-3xl border border-stone-200 bg-white p-6 text-stone-900 shadow-2xl dark:border-stone-800 dark:bg-stone-900 dark:text-stone-100"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedTicket(null)}
              className="absolute right-4 top-4 text-stone-400 transition hover:text-stone-700 dark:text-stone-500 dark:hover:text-stone-200"
              aria-label="Close ticket"
            >
              <X size={20} />
            </button>

            <div className="space-y-2 text-center">
              <span className="inline-block rounded-full bg-stone-100 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-stone-700 dark:bg-stone-800 dark:text-stone-300">
                Entry Ticket
              </span>

              <h2
                id="ticket-modal-title"
                className="text-lg font-bold text-stone-900 dark:text-stone-100"
              >
                {selectedTicket.eventName}
              </h2>

              <p className="text-xs text-stone-500 dark:text-stone-400">
                {selectedTicket.date}
              </p>
            </div>

            {/* Decorative QR pattern */}
            <div className="flex items-center justify-center py-4">
              <div className="grid h-40 w-40 grid-cols-6 grid-rows-6 gap-1 rounded-xl bg-stone-950 p-3">
                {Array.from({ length: 36 }).map((_, index) => (
                  <div
                    key={index}
                    className={`rounded-sm ${
                      (index * 7 +
                        String(selectedTicket.id).length) %
                        3 ===
                      0
                        ? "bg-white"
                        : "bg-transparent"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-3 border-t border-stone-200 pt-4 text-sm dark:border-stone-800">
              <div className="flex justify-between gap-4 text-stone-600 dark:text-stone-400">
                <span>Reservation ID</span>

                <span className="break-all text-right font-semibold text-stone-900 dark:text-stone-100">
                  {selectedTicket.id}
                </span>
              </div>

              <div className="flex justify-between gap-4 text-stone-600 dark:text-stone-400">
                <span>Ticket Type</span>

                <span className="text-right font-semibold text-stone-900 dark:text-stone-100">
                  {selectedTicket.tier} × {selectedTicket.quantity}
                </span>
              </div>

              <div className="flex justify-between gap-4 text-stone-600 dark:text-stone-400">
                <span>Venue</span>

                <span className="text-right font-semibold text-stone-900 dark:text-stone-100">
                  {selectedTicket.venue}
                </span>
              </div>

              <div className="flex justify-between gap-4 text-stone-600 dark:text-stone-400">
                <span>Total Paid</span>

                <span className="text-right font-semibold text-stone-900 dark:text-stone-100">
                  KES {Number(selectedTicket.total).toLocaleString()}
                </span>
              </div>
            </div>

            <p className="text-center text-[11px] leading-relaxed text-stone-400 dark:text-stone-500">
              Present this code at the entrance for scanning.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}