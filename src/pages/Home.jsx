import { ArrowRight,CalendarDays,ChevronDown,Sparkles,} from "lucide-react";
import {Music4,Heart,Building2,PartyPopper,ShieldCheck,Users,Clock3,MapPin,Star,Ticket,} from "lucide-react";
  import { Link } from "react-router-dom";

  export default function Home() {
    return (
      <main className="bg-black text-white overflow-hidden">
  
        {/* =======================================================
            HERO SECTION
        ======================================================== */}
  
        <section className="relative min-h-screen flex items-center">
  
          {/* =======================================================
              BACKGROUND
  
              These blurred circles create the luxury amber glow.
              They are positioned absolutely behind the content.
          ======================================================== */}
  
          <div className="absolute top-20 left-0 w-96 h-96 bg-amber-500/20 blur-[150px] rounded-full"></div>
  
          <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-amber-400/10 blur-[170px] rounded-full"></div>
  
          <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-900 to-black"></div>
  
          {/* =======================================================
              CONTENT
  
              "relative" makes sure it stays above
              the glowing background.
          ======================================================== */}
  
          <div className="relative max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-10 items-center">
  
            {/* ===================================================
                LEFT SIDE
            ==================================================== */}
  
            <div>
  
              {/* Small Badge */}
  
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-amber-500/40 bg-white/5 backdrop-blur-xl mb-8">
  
                <Sparkles className="text-amber-500" size={18} />
  
                <span className="text-sm tracking-widest uppercase">
  
                  Premium Event Experiences
  
                </span>
  
              </div>
  
              {/* Main Heading */}
  
              <h1 className="text-6xl lg:text-8xl font-extrabold leading-tight">
  
                Creating
  
                <span className="block text-amber-500">
  
                  Unforgettable
  
                </span>
  
                Moments
  
              </h1>
  
              {/* Description */}
  
              <p className="text-gray-300 mt-8 text-lg leading-8 max-w-xl">
  
                From elegant weddings and electrifying concerts
                to unforgettable corporate experiences,
                Velora Events transforms every occasion into
                a masterpiece worth remembering.
  
              </p>
  
              {/* Buttons */}
  
              <div className="flex flex-wrap gap-5 mt-10">
  
                <Link
                  to="/events"
                  className="group flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black px-8 py-4 rounded-full font-semibold transition duration-300 shadow-lg hover:shadow-amber-500/30"
                >
  
                  Explore Events
  
                  <ArrowRight
                    size={20}
                    className="group-hover:translate-x-1 transition"
                  />
  
                </Link>
  
                <Link
                  to="/contact"
                  className="border border-amber-500 text-white px-8 py-4 rounded-full hover:bg-amber-500 hover:text-black transition duration-300"
                >
  
                  Contact Us
  
                </Link>
  
              </div>
  
            </div>
  
            {/* ===================================================
                RIGHT SIDE
            ==================================================== */}
  
            <div className="relative flex justify-center">
  
              {/* ===================================================
                  Glassmorphism Card
  
                  Glass effect comes from:
  
                  bg-white/10
                  backdrop-blur-xl
                  border-white/20
  
                  These three classes create the frosted glass.
              ==================================================== */}
  
  <div className="absolute inset-0 flex items-center justify-center z-10">
  <div className="max-w-xs backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6 shadow-2xl">

    <CalendarDays
      className="text-amber-500 mb-4"
      size={35}
    />

    <p className="text-sm text-white">
      Upcoming Event
    </p>

    <h3 className="text-2xl font-bold mt-2">
      Nairobi Music Fest
    </h3>

    <p className="text-white mt-3">
      July 25 • KICC
    </p>

  </div>
</div>
  
              {/* Hero Image */}
  
             {/*  <img
                src="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=900&q=80"
                alt="Luxury Event"
                className="rounded-[40px] w-full max-w-lg shadow-[0_20px_80px_rgba(245,158,11,0.25)] hover:scale-105 transition duration-700"
              /> */}
  
            </div>
  
          </div>
  
          {/* =======================================================
              Scroll Down Indicator
  
              Small touch that makes the page feel premium.
          ======================================================== */}
  
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center">
  
            <p className="text-gray-400 text-sm mb-2">
  
              Scroll
  
            </p>
  
            <ChevronDown
              className="text-amber-500 animate-bounce"
              size={30}
            />
  
          </div>
  
        </section>

              {/* =======================================================
          EVENT CATEGORIES
      ======================================================== */}

      <section className="py-28 px-8 bg-zinc-950">

<div className="max-w-7xl mx-auto">

  <div className="text-center mb-16">

    <p className="text-amber-500 uppercase tracking-[6px] font-semibold">

      Discover

    </p>

    <h2 className="text-5xl font-bold mt-4">

      Event Categories

    </h2>

    <p className="text-gray-400 mt-5 max-w-2xl mx-auto leading-8">

      Whether you're celebrating love, music, business, or unforgettable
      milestones, Velora has the perfect experience waiting for you.

    </p>

  </div>

  {/* Responsive Grid */}

  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

    {/* Wedding */}

    <div className="group rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 hover:border-amber-500 hover:-translate-y-3 transition-all duration-500">

      <Heart
        size={45}
        className="text-amber-500 group-hover:scale-110 transition"
      />

      <h3 className="text-2xl font-semibold mt-6">

        Weddings

      </h3>

      <p className="text-gray-400 mt-4 leading-7">

        Elegant celebrations designed to make your special day truly unforgettable.

      </p>

    </div>

    {/* Concerts */}

    <div className="group rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 hover:border-amber-500 hover:-translate-y-3 transition-all duration-500">

      <Music4
        size={45}
        className="text-amber-500 group-hover:scale-110 transition"
      />

      <h3 className="text-2xl font-semibold mt-6">

        Concerts

      </h3>

      <p className="text-gray-400 mt-4 leading-7">

        Feel the rhythm with unforgettable live performances and festivals.

      </p>

    </div>

    {/* Corporate */}

    <div className="group rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 hover:border-amber-500 hover:-translate-y-3 transition-all duration-500">

      <Building2
        size={45}
        className="text-amber-500 group-hover:scale-110 transition"
      />

      <h3 className="text-2xl font-semibold mt-6">

        Corporate

      </h3>

      <p className="text-gray-400 mt-4 leading-7">

        Professional conferences, networking, launches, and executive events.

      </p>

    </div>

    {/* Parties */}

    <div className="group rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 hover:border-amber-500 hover:-translate-y-3 transition-all duration-500">

      <PartyPopper
        size={45}
        className="text-amber-500 group-hover:scale-110 transition"
      />

      <h3 className="text-2xl font-semibold mt-6">

        Celebrations

      </h3>

      <p className="text-gray-400 mt-4 leading-7">

        Birthdays, anniversaries, graduations, and life's greatest moments.

      </p>

    </div>

  </div>

</div>

</section>

      {/* =======================================================
          STATS SECTION
      ======================================================== */}

<section className="py-20 bg-black">

<div className="max-w-6xl mx-auto">

  <div className="grid md:grid-cols-3 gap-8">

    <div className="text-center">

      <h2 className="text-5xl font-extrabold text-amber-500">

        500+

      </h2>

      <p className="text-gray-400 mt-3">

        Successful Events

      </p>

    </div>

    <div className="text-center">

      <h2 className="text-5xl font-extrabold text-amber-500">

        15K+

      </h2>

      <p className="text-gray-400 mt-3">

        Happy Guests

      </p>

    </div>

    <div className="text-center">

      <h2 className="text-5xl font-extrabold text-amber-500">

        98%

      </h2>

      <p className="text-gray-400 mt-3">

        Client Satisfaction

      </p>

    </div>

  </div>

</div>

</section>

      {/* =======================================================
          WHY CHOOSE VELORA
      ======================================================== */}

<section className="py-28 px-8 bg-zinc-950">

<div className="max-w-7xl mx-auto">

  <div className="text-center">

    <p className="uppercase tracking-[6px] text-amber-500 font-semibold">

      Why Us

    </p>

    <h2 className="text-5xl font-bold mt-4">

      Why Choose Velora?

    </h2>

  </div>

  <div className="grid lg:grid-cols-3 gap-10 mt-16">

    {/* Card 1 */}

    <div className="group bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-10 hover:border-amber-500 hover:shadow-[0_0_40px_rgba(245,158,11,0.25)] transition duration-500">

      <ShieldCheck
        size={48}
        className="text-amber-500 mb-6"
      />

      <h3 className="text-2xl font-semibold">

        Trusted Excellence

      </h3>

      <p className="text-gray-400 mt-5 leading-8">

        Every event is handled with professionalism, attention to detail,
        and a commitment to delivering unforgettable experiences.

      </p>

    </div>

    {/* Card 2 */}

    <div className="group bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-10 hover:border-amber-500 hover:shadow-[0_0_40px_rgba(245,158,11,0.25)] transition duration-500">

      <Clock3
        size={48}
        className="text-amber-500 mb-6"
      />

      <h3 className="text-2xl font-semibold">

        Seamless Planning

      </h3>

      <p className="text-gray-400 mt-5 leading-8">

        From booking to execution, we make every step simple,
        efficient, and stress-free.

      </p>

    </div>

    {/* Card 3 */}

    <div className="group bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-10 hover:border-amber-500 hover:shadow-[0_0_40px_rgba(245,158,11,0.25)] transition duration-500">

      <Users
        size={48}
        className="text-amber-500 mb-6"
      />

      <h3 className="text-2xl font-semibold">

        Memorable Experiences

      </h3>

      <p className="text-gray-400 mt-5 leading-8">

        We create experiences that leave lasting impressions for
        guests, clients, and everyone involved.

      </p>

    </div>

  </div>

</div>

</section>

      {/* =======================================================
          FEATURED EVENTS
      ======================================================== */}

<section className="py-28 px-8 bg-black">

<div className="max-w-7xl mx-auto">

  <div className="text-center mb-16">

    <p className="uppercase tracking-[6px] text-amber-500 font-semibold">
      Upcoming
    </p>

    <h2 className="text-5xl font-bold mt-4">

      Featured Events

    </h2>

    <p className="text-gray-400 mt-5">

      Reserve your seat before they're gone.

    </p>

  </div>

  <div className="grid lg:grid-cols-3 gap-10">

    {/* Event Card */}

    {[
      {
        image:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800&q=80",
        title: "Summer Music Festival",
        location: "Nairobi",
        date: "25 July 2026",
      },
      {
        image:
          "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
        title: "Luxury Wedding Expo",
        location: "Karen",
        date: "2 August 2026",
      },
      {
        image:
          "https://images.unsplash.com/photo-1515169067868-5387ec356754?auto=format&fit=crop&w=800&q=80",
        title: "Business Summit",
        location: "Westlands",
        date: "15 August 2026",
      },
    ].map((event, index) => (

      <div
        key={index}
        className="overflow-hidden rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-amber-500 transition-all duration-500 hover:-translate-y-2"
      >

        <img
          src={event.image}
          alt={event.title}
          className="h-64 w-full object-cover hover:scale-110 transition duration-700"
        />

        <div className="p-7">

          <h3 className="text-2xl font-bold">

            {event.title}

          </h3>

          <div className="flex items-center gap-2 mt-4 text-gray-400">

            <CalendarDays size={18} />

            {event.date}

          </div>

          <div className="flex items-center gap-2 mt-2 text-gray-400">

            <MapPin size={18} />

            {event.location}

          </div>

          <button className="mt-8 w-full bg-amber-500 hover:bg-amber-400 text-black py-3 rounded-full font-semibold flex justify-center items-center gap-2 transition">

            Reserve Seat

            <Ticket size={18} />

          </button>

        </div>

      </div>

    ))}

  </div>

</div>

</section>

      {/* =======================================================
          TESTIMONIALS
      ======================================================== */}

<section className="py-28 px-8 bg-zinc-950">

<div className="max-w-7xl mx-auto">

  <div className="text-center">

    <p className="uppercase tracking-[6px] text-amber-500">

      Testimonials

    </p>

    <h2 className="text-5xl font-bold mt-4">

      What Our Clients Say

    </h2>

  </div>

  <div className="grid lg:grid-cols-3 gap-8 mt-16">

    {[
      {
        name: "Sarah Mwangi",
        text: "Velora turned our wedding into a dream come true. Every detail was perfect.",
      },
      {
        name: "Kevin Otieno",
        text: "Booking was effortless and the event exceeded every expectation.",
      },
      {
        name: "Faith Wanjiku",
        text: "Professional team, beautiful organization and unforgettable memories.",
      },
    ].map((review, index) => (

      <div
        key={index}
        className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:border-amber-500 hover:shadow-[0_0_40px_rgba(245,158,11,.25)] transition duration-500"
      >

        <div className="flex mb-6">

          {[1,2,3,4,5].map((star)=>(

            <Star
              key={star}
              size={20}
              className="fill-amber-500 text-amber-500"
            />

          ))}

        </div>

        <p className="text-gray-300 leading-8">

          "{review.text}"

        </p>

        <h3 className="mt-8 font-bold text-xl">

          {review.name}

        </h3>

      </div>

    ))}

  </div>

</div>

</section>

      {/* =======================================================
          FINAL CALL TO ACTION
      ======================================================== */}

<section className="py-28 px-8">

<div className="max-w-6xl mx-auto">

  <div className="rounded-[40px] bg-gradient-to-r from-amber-500 to-yellow-400 p-16 text-center shadow-[0_20px_80px_rgba(245,158,11,.35)]">

    <h2 className="text-5xl font-extrabold text-black">

      Ready To Create Your Next
      Unforgettable Experience?

    </h2>

    <p className="text-black/80 text-lg mt-8 max-w-2xl mx-auto leading-8">

      Whether you're planning a wedding, conference,
      concert or private celebration,
      Velora Events is ready to make it extraordinary.

    </p>

    <div className="flex flex-wrap justify-center gap-5 mt-12">

      <Link
        to="/events"
        className="bg-black text-white px-8 py-4 rounded-full font-semibold hover:scale-105 transition duration-300"
      >

        Browse Events

      </Link>

      <Link
        to="/contact"
        className="border-2 border-black text-black px-8 py-4 rounded-full font-semibold hover:bg-black hover:text-white transition duration-300"
      >

        Contact Us

      </Link>

    </div>

  </div>

</div>

</section>

</main>
  );
}
