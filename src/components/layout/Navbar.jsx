import { Link, NavLink } from "react-router-dom";
import { CalendarDays, Menu, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";

function Navbar() {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Events", path: "/events" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200 bg-stone-50/90 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="rounded-2xl bg-amber-500 p-2.5 text-white shadow-sm">
            <CalendarDays size={24} />
          </div>

          <div>
            <h1 className="text-xl font-bold tracking-tight text-stone-900">
              Velora Events
            </h1>
            <p className="text-xs font-medium text-stone-500">
              Discover. Book. Experience.
            </p>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `text-sm font-medium transition ${
                  isActive
                    ? "text-amber-600"
                    : "text-stone-600 hover:text-amber-600"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Desktop Action */}
        <div className="hidden items-center gap-3 md:flex">
          <Button
            asChild
            variant="outline"
            className="border-stone-300 text-stone-700 hover:bg-stone-100"
          >
            <Link to="/login">Login</Link>
          </Button>

          <Button asChild className="bg-amber-500 text-white hover:bg-amber-600">
            <Link to="/events" className="flex items-center gap-2">
              <Ticket size={18} />
              Explore Events
            </Link>
          </Button>
        </div>

        {/* Mobile Icon for now */}
        <button className="rounded-xl border border-stone-300 p-2 text-stone-700 md:hidden">
          <Menu size={22} />
        </button>
      </nav>
    </header>
  );
}

export default Navbar;