import {
  ArrowRight,
  Building2,
  CalendarDays,
  ChevronDown,
  Clock3,
  Heart,
  MapPin,
  Music4,
  PartyPopper,
  ShieldCheck,
  Sparkles,
  Star,
  Ticket,
  Users,
} from "lucide-react";

import { Link } from "react-router-dom";
import events from "@/data/events.json";

const categories = [
  {
    title: "Weddings",
    description:
      "Elegant celebrations designed to make your special day truly unforgettable.",
    icon: Heart,
  },
  {
    title: "Concerts",
    description:
      "Experience unforgettable live performances, concerts and festivals.",
    icon: Music4,
  },
  {
    title: "Corporate",
    description:
      "Professional conferences, networking events and business experiences.",
    icon: Building2,
  },
  {
    title: "Celebrations",
    description:
      "Birthdays, anniversaries, graduations and life's greatest moments.",
    icon: PartyPopper,
  },
];

const benefits = [
  {
    title: "Trusted Events",
    description:
      "Explore carefully selected events with clear dates, venues and ticket information.",
    icon: ShieldCheck,
  },
  {
    title: "Simple Booking",
    description:
      "Move from discovering an event to reserving your ticket through a simple experience.",
    icon: Clock3,
  },
  {
    title: "Memorable Experiences",
    description:
      "Find events that bring people together and create moments worth remembering.",
    icon: Users,
  },
];

const testimonials = [
  {
    name: "Sarah Mwangi",
    text: "Velora made it easy to discover the perfect event for our weekend.",
  },
  {
    name: "Kevin Otieno",
    text: "The platform is clean, simple and makes browsing upcoming events effortless.",
  },
  {
    name: "Faith Wanjiku",
    text: "I loved how quickly I could view event details and find something exciting nearby.",
  },
];

function formatDate(date) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-KE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function Home() {
  const markedFeaturedEvents = events.filter((event) => event.featured);

  const featuredEvents =
    markedFeaturedEvents.length > 0
      ? markedFeaturedEvents.slice(0, 3)
      : events.slice(0, 3);

  return (
    <div className="overflow-hidden bg-stone-950 text-white">
      {/* Hero section */}
      <section className="relative flex min-h-[calc(100vh-5rem)] items-center px-4 py-20 sm:px-6 lg:px-8">
        {/* Background decoration */}
        <div className="absolute left-0 top-20 h-80 w-80 rounded-full bg-amber-500/20 blur-[140px]" />

        <div className="absolute bottom-10 right-0 h-96 w-96 rounded-full bg-amber-400/10 blur-[160px]" />

        <div className="absolute inset-0 bg-gradient-to-br from-stone-950 via-stone-900 to-stone-950" />

        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-2">
          {/* Hero text */}
          <div>
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-white/5 px-5 py-2 backdrop-blur-xl">
              <Sparkles className="text-amber-500" size={18} />

              <span className="text-xs font-medium uppercase tracking-[0.2em] text-stone-200 sm:text-sm">
                Discover unforgettable experiences
              </span>
            </div>

            <h1 className="text-4xl font-extrabold leading-tight sm:text-6xl lg:text-7xl xl:text-8xl">
              Find your next
              <span className="block text-amber-500">
                unforgettable
              </span>
              experience
            </h1>

            <p className="mt-8 max-w-xl text-base leading-8 text-stone-300 sm:text-lg">
              Discover concerts, festivals, conferences, exhibitions and
              exciting experiences happening around you. Velora Events makes
              finding your next plan simple.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/events"
                className="group flex items-center gap-2 rounded-full bg-amber-500 px-7 py-4 font-semibold text-stone-950 shadow-lg transition duration-300 hover:bg-amber-400 hover:shadow-amber-500/30"
              >
                Explore Events

                <ArrowRight
                  size={20}
                  className="transition group-hover:translate-x-1"
                />
              </Link>

              <Link
                to="/contact"
                className="rounded-full border border-amber-500 px-7 py-4 font-semibold text-white transition duration-300 hover:bg-amber-500 hover:text-stone-950"
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* Hero image */}
          <div className="relative flex min-h-[420px] items-center justify-center">
            <img
              src="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1000&q=80"
              alt="People enjoying an event"
              className="h-[420px] w-full max-w-lg rounded-[36px] object-cover shadow-[0_20px_80px_rgba(245,158,11,0.18)] sm:h-[520px]"
            />

            <div className="absolute bottom-6 left-4 max-w-xs rounded-3xl border border-white/20 bg-stone-950/60 p-5 shadow-2xl backdrop-blur-xl sm:left-0">
              <CalendarDays
                className="mb-4 text-amber-500"
                size={32}
              />

              <p className="text-sm text-stone-300">
                Upcoming event
              </p>

              <h2 className="mt-2 text-xl font-bold sm:text-2xl">
                {featuredEvents[0]?.title || "Nairobi Music Festival"}
              </h2>

              <p className="mt-3 text-sm text-stone-300">
                {featuredEvents[0]
                  ? `${formatDate(featuredEvents[0].date)} • ${
                      featuredEvents[0].location
                    }`
                  : "25 July 2026 • KICC, Nairobi"}
              </p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center md:flex">
          <p className="mb-2 text-sm text-stone-400">
            Scroll
          </p>

          <ChevronDown
            className="animate-bounce text-amber-500"
            size={28}
          />
        </div>
      </section>

      {/* Event categories */}
      <section className="bg-stone-900 px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 text-center">
            <p className="font-semibold uppercase tracking-[6px] text-amber-500">
              Discover
            </p>

            <h2 className="mt-4 text-3xl font-bold sm:text-5xl">
              Event Categories
            </h2>

            <p className="mx-auto mt-5 max-w-2xl leading-8 text-stone-400">
              Explore experiences across music, weddings, business,
              celebrations and much more.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map(({ title, description, icon: Icon }) => (
              <article
                key={title}
                className="group rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-amber-500"
              >
                <Icon
                  size={42}
                  className="text-amber-500 transition group-hover:scale-110"
                />

                <h3 className="mt-6 text-2xl font-semibold">
                  {title}
                </h3>

                <p className="mt-4 leading-7 text-stone-400">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose Velora */}
      <section className="bg-stone-950 px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="font-semibold uppercase tracking-[6px] text-amber-500">
              Why Us
            </p>

            <h2 className="mt-4 text-3xl font-bold sm:text-5xl">
              Why Choose Velora?
            </h2>
          </div>

          <div className="mt-14 grid gap-8 lg:grid-cols-3">
            {benefits.map(({ title, description, icon: Icon }) => (
              <article
                key={title}
                className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition duration-300 hover:border-amber-500 hover:shadow-[0_0_40px_rgba(245,158,11,0.16)] sm:p-10"
              >
                <Icon
                  size={44}
                  className="mb-6 text-amber-500"
                />

                <h3 className="text-2xl font-semibold">
                  {title}
                </h3>

                <p className="mt-5 leading-8 text-stone-400">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Featured events */}
      <section className="bg-stone-900 px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 text-center">
            <p className="font-semibold uppercase tracking-[6px] text-amber-500">
              Upcoming
            </p>

            <h2 className="mt-4 text-3xl font-bold sm:text-5xl">
              Featured Events
            </h2>

            <p className="mt-5 text-stone-400">
              Find your next experience before tickets run out.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredEvents.map((event) => (
              <article
                key={event.id}
                className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 transition duration-300 hover:-translate-y-2 hover:border-amber-500"
              >
                <div className="overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="p-7">
                  <span className="inline-block rounded-full bg-amber-500 px-3 py-1 text-xs font-semibold text-stone-950">
                    {event.category}
                  </span>

                  <h3 className="mt-4 text-2xl font-bold">
                    {event.title}
                  </h3>

                  <div className="mt-4 flex items-start gap-2 text-stone-400">
                    <CalendarDays
                      size={18}
                      className="mt-0.5 shrink-0 text-amber-500"
                    />

                    <span>
                      {formatDate(event.date)}
                    </span>
                  </div>

                  <div className="mt-3 flex items-start gap-2 text-stone-400">
                    <MapPin
                      size={18}
                      className="mt-0.5 shrink-0 text-amber-500"
                    />

                    <span>
                      {event.location}
                    </span>
                  </div>

                  <Link
                    to={`/events/${event.id}`}
                    className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-amber-500 py-3 font-semibold text-stone-950 transition hover:bg-amber-400"
                  >
                    View Details
                    <Ticket size={18} />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/events"
              className="inline-flex items-center gap-2 font-semibold text-amber-500 transition hover:text-amber-400"
            >
              View all events
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-stone-950 px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="uppercase tracking-[6px] text-amber-500">
              Testimonials
            </p>

            <h2 className="mt-4 text-3xl font-bold sm:text-5xl">
              What Our Users Say
            </h2>
          </div>

          <div className="mt-14 grid gap-8 lg:grid-cols-3">
            {testimonials.map((review) => (
              <article
                key={review.name}
                className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition duration-300 hover:border-amber-500"
              >
                <div className="mb-6 flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={20}
                      className="fill-amber-500 text-amber-500"
                    />
                  ))}
                </div>

                <p className="leading-8 text-stone-300">
                  “{review.text}”
                </p>

                <h3 className="mt-8 text-xl font-bold">
                  {review.name}
                </h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-stone-950 px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-[32px] bg-gradient-to-r from-amber-500 to-amber-300 p-8 text-center shadow-[0_20px_80px_rgba(245,158,11,0.25)] sm:p-12 lg:p-16">
            <h2 className="text-3xl font-extrabold text-stone-950 sm:text-5xl">
              Ready to find your next unforgettable experience?
            </h2>

            <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-stone-800 sm:text-lg">
              Browse concerts, festivals, conferences, exhibitions and
              exciting events happening around you.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                to="/events"
                className="rounded-full bg-stone-950 px-8 py-4 font-semibold text-white transition duration-300 hover:scale-105"
              >
                Browse Events
              </Link>

              <Link
                to="/contact"
                className="rounded-full border-2 border-stone-950 px-8 py-4 font-semibold text-stone-950 transition duration-300 hover:bg-stone-950 hover:text-white"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}