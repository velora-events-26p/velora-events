// React Hooks
import { useEffect, useMemo, useState } from "react";

// React Router
import { Link } from "react-router-dom";

// Local JSON (Our Local API)
import eventsData from "../data/Events.json";

// Icons
import {Search,CalendarDays,MapPin,Ticket} from "lucide-react";

function Events() {

    // Stores all the events fetched from Events.json
    const [events, setEvents] = useState([]);
  
    // Stores what the user types in the search bar
    const [search, setSearch] = useState("");
  
    // Stores the currently selected category
    const [selectedCategory, setSelectedCategory] = useState("All");

      // Load all events when the page loads
  useEffect(() => {
    setEvents(eventsData);
  }, []);

    // Automatically generate categories from Events.json
    const categories = useMemo(() => {
        return [
          "All",
          ...new Set(events.map((event) => event.category))
        ];
      }, [events]);

        // Filter events based on search text and selected category
  const filteredEvents = events.filter((event) => {

    // Check category
    const matchesCategory =
      selectedCategory === "All" ||
      event.category === selectedCategory;

    // Check search input
    const matchesSearch =
      event.title.toLowerCase().includes(search.toLowerCase()) ||
      event.location.toLowerCase().includes(search.toLowerCase());

    // Return events matching both conditions
    return matchesCategory && matchesSearch;

  });

  return (

    <section className="min-h-screen bg-black text-white pt-32 pb-20">

      <div className="max-w-7xl mx-auto px-6">
                {/* ===============================
             Hero Section
        =============================== */}

<div className="text-center mb-14">

<h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold">

  Discover Amazing{" "}

  <span className="text-amber-500">
    Events
  </span>

</h1>

<p className="text-gray-400 mt-6 max-w-2xl mx-auto leading-relaxed">

  Browse concerts, festivals, conferences,
  weddings, sports events and unforgettable
  experiences happening around you.

</p>

</div>
        {/* ===============================
             Search Bar
        =============================== */}

<div className="relative max-w-3xl mx-auto mb-16">

<Search
  className="absolute left-5 top-4 text-gray-400"
  size={22}
/>

<input
  type="text"
  placeholder="Search events by title or location..."

  value={search}

  onChange={(e) => setSearch(e.target.value)}

  className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl py-4 pl-14 pr-5 text-white focus:outline-none focus:border-amber-500"

/>

</div>
        {/* =====================================
              Main Content (Sidebar + Events)
        ====================================== */}

<div className="grid grid-cols-1 lg:grid-cols-4 gap-10">

{/* =====================================
      Left Sidebar - Categories
====================================== */}

<div className="lg:col-span-1">

  {/* Glassmorphism Sidebar */}
  <div className="sticky top-28 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

    <h2 className="text-2xl font-bold mb-6">

      Categories

    </h2>

    {/* Dynamic Category Buttons */}
    <div className="flex lg:flex-col flex-wrap gap-3">

      {categories.map((category) => (

        <button
          key={category}

          onClick={() => setSelectedCategory(category)}

          className={`px-5 py-3 rounded-xl transition duration-300 text-left font-medium

          ${
            selectedCategory === category

              ? "bg-amber-500 text-black"

              : "bg-white/5 text-gray-300 hover:bg-amber-500 hover:text-black"
          }`}

        >

          {category}

        </button>

      ))}

    </div>

  </div>

</div>

{/* =====================================
       Right Side - Event Cards
====================================== */}

<div className="lg:col-span-3">

  {filteredEvents.length === 0 ? (

    <div className="text-center py-20">

      <h2 className="text-3xl font-bold">

        No Events Found

      </h2>

      <p className="text-gray-400 mt-4">

        Try searching for another event or category.

      </p>

    </div>

  ) : (

    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">

      {filteredEvents.map((event) => (

        <div

          key={event.id}

          className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden hover:border-amber-500 hover:-translate-y-3 transition-all duration-500 shadow-xl"

        >

          {/* Event Image */}

          <div className="overflow-hidden">

            <img

              src={event.image}

              alt={event.title}

              className="h-60 w-full object-cover group-hover:scale-110 transition duration-700"

            />

          </div>

          {/* Card Content */}

          <div className="p-6">

            <span className="inline-block bg-amber-500 text-black text-xs font-semibold px-3 py-1 rounded-full">

              {event.category}

            </span>

            <h2 className="text-2xl font-bold mt-4">

              {event.title}

            </h2>

            {/* Location */}

            <div className="flex items-center gap-2 mt-4 text-gray-400">

              <MapPin size={18} />

              <span>{event.location}</span>

            </div>

            {/* Date */}

            <div className="flex items-center gap-2 mt-3 text-gray-400">

              <CalendarDays size={18} />

              <span>{event.date}</span>

            </div>

            {/* Price */}

            <div className="flex items-center gap-2 mt-3">

              <Ticket
                size={18}
                className="text-amber-500"
              />

              <span className="text-amber-500 font-bold">

                KES {event.price}

              </span>

            </div>

            {/* View Details Button */}

            <Link

              to={`/events/${event.id}`}

              className="block mt-6 bg-amber-500 text-center text-black font-semibold py-3 rounded-xl hover:bg-amber-400 transition"

            >

              View Details

            </Link>

          </div>

        </div>

      ))}

    </div>

  )}

</div>

</div>

</div>

</section>

);

}

export default Events;