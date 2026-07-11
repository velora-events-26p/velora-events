import { Link, useParams } from "react-router-dom";

import events from "@/data/events.json";

import {
  ArrowLeft,
  Banknote,
  CalendarDays,
  Clock,
  MapPin,
  Ticket,
  UserRound,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

function EventDetails() {
  // Get the event ID from the URL.
  const { id } = useParams();

  // Convert the URL ID into a number and find the matching event.
  const event = events.find((item) => item.id === Number(id));

  // Display this when the requested event does not exist.
  if (!event) {
    return (
      <section className="flex min-h-[70vh] items-center justify-center bg-stone-50 px-4">
        <Card className="w-full max-w-lg border-stone-200 text-center shadow-sm">
          <CardContent className="p-8">
            <h1 className="text-3xl font-bold text-stone-900">
              Event not found
            </h1>

            <p className="mt-3 text-stone-600">
              The event may have been removed or the link may be incorrect.
            </p>

            <Button
              asChild
              className="mt-6 bg-amber-500 text-stone-950 hover:bg-amber-600"
            >
              <Link to="/events">
                <ArrowLeft size={18} />
                Back to events
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    );
  }

  const formattedPrice =
    Number(event.price) === 0
      ? "Free"
      : `KES ${Number(event.price).toLocaleString()}`;

  return (
    <section className="min-h-screen bg-stone-50 py-12 text-stone-900">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Button
          asChild
          variant="ghost"
          className="mb-6 text-stone-600 hover:bg-stone-100 hover:text-amber-700"
        >
          <Link to="/events">
            <ArrowLeft size={18} />
            Back to events
          </Link>
        </Button>

        <div className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm">
          <img
            src={event.image}
            alt={event.title}
            className="h-64 w-full object-cover sm:h-80 lg:h-[460px]"
          />

          <div className="p-6 sm:p-8 lg:p-10">
            <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
              {event.category || "General"}
            </Badge>

            <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              {event.title}
            </h1>

            <p className="mt-5 max-w-4xl leading-7 text-stone-600">
              {event.description || "More information will be available soon."}
            </p>

            <div className="mt-10 rounded-2xl border border-stone-200 bg-stone-50 p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-stone-900">
                Event information
              </h2>

              <div className="mt-8 grid gap-7 sm:grid-cols-2">
                <InfoItem
                  icon={MapPin}
                  label="Location"
                  value={event.location || "Location unavailable"}
                />

                <InfoItem
                  icon={CalendarDays}
                  label="Date"
                  value={event.date || "Date unavailable"}
                />

                <InfoItem
                  icon={Clock}
                  label="Time"
                  value={event.time || "Time unavailable"}
                />

                <InfoItem
                  icon={UserRound}
                  label="Organizer"
                  value={event.organizer || "Velora Events"}
                />

                <InfoItem
                  icon={Ticket}
                  label="Available tickets"
                  value={
                    event.availableTickets !== undefined
                      ? event.availableTickets
                      : "Not specified"
                  }
                />

                <InfoItem
                  icon={Banknote}
                  label="Price"
                  value={formattedPrice}
                  highlight
                />
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                className="bg-amber-500 text-stone-950 hover:bg-amber-600"
              >
                <Link to={`/book/${event.id}`}>
                  <Ticket size={18} />
                  Book this event
                </Link>
              </Button>

              <Button asChild variant="outline" className="border-stone-300">
                <Link to="/events">Browse more events</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoItem({ icon: Icon, label, value, highlight = false }) {
  return (
    <div className="flex items-start gap-4">
      <div className="rounded-xl bg-amber-100 p-3 text-amber-700">
        <Icon size={21} />
      </div>

      <div>
        <p className="text-sm text-stone-500">{label}</p>

        <p
          className={`mt-1 font-semibold ${
            highlight ? "text-amber-700" : "text-stone-900"
          }`}
        >
          {value}
        </p>
      </div>
    </div>
  );
}

export default EventDetails;