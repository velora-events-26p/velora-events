import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  CalendarDays,
  Filter,
  MapPin,
  Search,
  Ticket,
  X,
} from "lucide-react";

import events from "@/data/events.json";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

function Events() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = useMemo(() => {
    const eventCategories = events
      .map((event) => event.category)
      .filter(Boolean);

    return ["All", ...new Set(eventCategories)];
  }, []);

  const filteredEvents = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return events.filter((event) => {
      const title = event.title?.toLowerCase() || "";
      const location = event.location?.toLowerCase() || "";

      const matchesSearch =
        title.includes(normalizedSearch) ||
        location.includes(normalizedSearch);

      const matchesCategory =
        selectedCategory === "All" ||
        event.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory]);

  const clearFilters = () => {
    setSearch("");
    setSelectedCategory("All");
  };

  return (
    <section className="min-h-screen bg-stone-50 py-16 text-stone-900 transition-colors dark:bg-stone-950 dark:text-stone-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Page heading */}
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <Badge className="mb-4 bg-amber-100 text-amber-800 hover:bg-amber-100 dark:bg-amber-500/15 dark:text-amber-400 dark:hover:bg-amber-500/15">
            Explore Velora
          </Badge>

          <h1 className="text-4xl font-extrabold tracking-tight text-stone-900 dark:text-stone-100 sm:text-5xl lg:text-6xl">
            Discover amazing{" "}
            <span className="text-amber-600 dark:text-amber-400">
              events
            </span>
          </h1>

          <p className="mt-5 text-base leading-7 text-stone-600 dark:text-stone-400 sm:text-lg">
            Browse concerts, festivals, conferences, sports events, workshops,
            and unforgettable experiences happening around you.
          </p>
        </div>

        {/* Search and category filters */}
        <div className="mb-10 rounded-2xl border border-stone-200 bg-white p-4 shadow-sm dark:border-stone-800 dark:bg-stone-900 sm:p-5">
          <div className="grid gap-4 md:grid-cols-[1fr_240px_auto]">
            {/* Search */}
            <div className="relative">
              <Search
                aria-hidden="true"
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 dark:text-stone-500"
              />

              <Input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by event title or location..."
                aria-label="Search events"
                className="h-12 rounded-xl border-stone-300 bg-white pl-12 text-stone-900 placeholder:text-stone-400 focus-visible:border-amber-500 focus-visible:ring-amber-500/30 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100 dark:placeholder:text-stone-500"
              />
            </div>

            {/* Category dropdown */}
            <div className="relative">
              <Filter
                aria-hidden="true"
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 dark:text-stone-500"
              />

              <select
                value={selectedCategory}
                onChange={(event) =>
                  setSelectedCategory(event.target.value)
                }
                aria-label="Filter events by category"
                className="h-12 w-full appearance-none rounded-xl border border-stone-300 bg-white pl-11 pr-10 text-sm text-stone-700 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-200"
              >
                {categories.map((category) => (
                  <option
                    key={category}
                    value={category}
                    className="bg-white text-stone-900 dark:bg-stone-900 dark:text-stone-100"
                  >
                    {category === "All"
                      ? "All categories"
                      : category}
                  </option>
                ))}
              </select>

              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-stone-400">
                ▼
              </span>
            </div>

            {/* Clear filters */}
            <Button
              type="button"
              variant="outline"
              onClick={clearFilters}
              disabled={!search && selectedCategory === "All"}
              className="h-12 border-stone-300 bg-white px-5 text-stone-700 hover:bg-stone-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-200 dark:hover:bg-stone-800"
            >
              <X size={17} />
              Clear
            </Button>
          </div>
        </div>

        {/* Results heading */}
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100">
              Upcoming events
            </h2>

            <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
              {filteredEvents.length}{" "}
              {filteredEvents.length === 1 ? "event" : "events"} found
            </p>
          </div>
        </div>

        {/* Empty state */}
        {filteredEvents.length === 0 ? (
          <div className="rounded-2xl border border-stone-200 bg-white px-6 py-16 text-center shadow-sm dark:border-stone-800 dark:bg-stone-900">
            <h3 className="text-2xl font-semibold text-stone-900 dark:text-stone-100">
              No events found
            </h3>

            <p className="mt-3 text-stone-600 dark:text-stone-400">
              Try another search term or select a different category.
            </p>

            <Button
              type="button"
              onClick={clearFilters}
              className="mt-6 bg-amber-500 text-stone-950 hover:bg-amber-400"
            >
              Clear filters
            </Button>
          </div>
        ) : (
          /* Event cards */
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event) => (
              <Card
                key={event.id}
                className="group overflow-hidden border-stone-200 bg-white py-0 text-stone-900 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-stone-800 dark:bg-stone-900 dark:text-stone-100"
              >
                <div className="overflow-hidden bg-stone-200 dark:bg-stone-800">
                  <img
                    src={event.image}
                    alt={event.title}
                    loading="lazy"
                    decoding="async"
                    onError={(imageEvent) => {
                      imageEvent.currentTarget.onerror = null;
                      imageEvent.currentTarget.src =
                        "/images/event-placeholder.jpg";
                    }}
                    className="h-52 w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>

                <CardHeader className="space-y-3 px-5 pt-5">
                  <Badge className="w-fit bg-amber-100 text-amber-800 hover:bg-amber-100 dark:bg-amber-500/15 dark:text-amber-400 dark:hover:bg-amber-500/15">
                    {event.category || "General"}
                  </Badge>

                  <CardTitle className="line-clamp-2 text-xl text-stone-900 dark:text-stone-100">
                    {event.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-3 px-5 text-sm text-stone-600 dark:text-stone-400">
                  <p className="flex items-start gap-2">
                    <MapPin
                      size={17}
                      className="mt-0.5 shrink-0 text-amber-600 dark:text-amber-400"
                    />

                    <span>
                      {event.location || "Location unavailable"}
                    </span>
                  </p>

                  <p className="flex items-start gap-2">
                    <CalendarDays
                      size={17}
                      className="mt-0.5 shrink-0 text-amber-600 dark:text-amber-400"
                    />

                    <span>
                      {event.date || "Date unavailable"}
                      {event.time ? ` • ${event.time}` : ""}
                    </span>
                  </p>

                  <p className="flex items-center gap-2 font-semibold text-stone-900 dark:text-stone-100">
                    <Ticket
                      size={17}
                      className="text-amber-600 dark:text-amber-400"
                    />

                    {Number(event.price) === 0
                      ? "Free"
                      : `KES ${Number(event.price).toLocaleString()}`}
                  </p>
                </CardContent>

                <CardFooter className="px-5 pb-5">
                  <Button
                    asChild
                    className="w-full bg-amber-500 text-stone-950 hover:bg-amber-400"
                  >
                    <Link to={`/events/${event.id}`}>
                      View details
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Events;