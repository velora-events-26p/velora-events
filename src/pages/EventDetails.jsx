// React Router
import { Link, useParams } from "react-router-dom";

// Local API
import eventsData from "../data/Events.json";

// Icons
import {CalendarDays,MapPin,Clock,Ticket,User,ArrowLeft} from "lucide-react";

function EventDetails() {

    // Get the event id from the URL
    const { id } = useParams();
  
    // Find the selected event
    const event = eventsData.find(
      (item) => item.id === Number(id)
    );
  
    // If the event doesn't exist
    if (!event) {
      return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <h1 className="text-3xl font-bold">
            Event Not Found
          </h1>
        </div>
      );
    }

    return (

        <section className="min-h-screen bg-black text-white pt-32 pb-20">
        
        <div className="max-w-6xl mx-auto px-6">
        <Link

to="/events"

className="inline-flex items-center gap-2 text-amber-500 hover:text-amber-400 transition mb-8"

>

<ArrowLeft size={20} />

Back to Events

</Link>
<img

src={event.image}

alt={event.title}

className="w-full h-[500px] object-cover rounded-3xl shadow-2xl"

/>
<div className="mt-10">

<span className="bg-amber-500 text-black px-4 py-2 rounded-full font-semibold">

{event.category}

</span>

<h1 className="text-5xl font-bold mt-6">

{event.title}

</h1>

<p className="text-gray-400 mt-6 leading-relaxed text-lg">

{event.description}

</p>

</div>
<div className="mt-12 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">

<h2 className="text-3xl font-bold mb-8">

Event Information

</h2>

<div className="grid md:grid-cols-2 gap-8">
<div className="flex items-center gap-4">

<MapPin className="text-amber-500" />

<div>

<p className="text-gray-400">

Location

</p>

<h3>{event.location}</h3>

</div>

</div>
<div className="flex items-center gap-4">

<CalendarDays className="text-amber-500" />

<div>

<p className="text-gray-400">

Date

</p>

<h3>{event.date}</h3>

</div>

</div>
<div className="flex items-center gap-4">

<Clock className="text-amber-500" />

<div>

<p className="text-gray-400">

Time

</p>

<h3>{event.time}</h3>

</div>

</div>
<div className="flex items-center gap-4">

<User className="text-amber-500" />

<div>

<p className="text-gray-400">

Organizer

</p>

<h3>{event.organizer}</h3>

</div>

</div>
<div className="flex items-center gap-4">

<Ticket className="text-amber-500" />

<div>

<p className="text-gray-400">

Available Tickets

</p>

<h3>

{event.availableTickets}

</h3>

</div>

</div>
<div className="flex items-center gap-4">

<Ticket className="text-amber-500" />

<div>

<p className="text-gray-400">

Price

</p>

<h3 className="text-amber-500 font-bold">

KES {event.price}

</h3>

</div>

</div>
</div>

</div>

</div>

</section>

);

}

export default EventDetails;