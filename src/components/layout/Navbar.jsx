import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { CalendarDays, Menu, X, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext.jsx";

function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Events", path: "/events" },
    { name: "Contact", path: "/contact" },
  ];

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200 bg-stone-50/90 backdrop-blur-md dark:border-stone-800 dark:bg-stone-950/90">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" onClick={closeMenu} className="flex items-center gap-3">
          <div className="rounded-2xl bg-amber-500 p-2.5 text-stone-950 shadow-sm">
            <CalendarDays size={24} />
          </div>

          <div>
            <h1 className="text-xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
              Velora Events
            </h1>

            <p className="text-xs font-medium text-stone-500 dark:text-stone-400">
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
                    : "text-stone-600 hover:text-amber-600 dark:text-stone-300 dark:hover:text-amber-500"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Desktop Login */}
        <div className="hidden items-center gap-3 md:flex">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            aria-label={
              theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
            }
            className="border-stone-300 dark:border-stone-700 dark:bg-stone-900"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </Button>

          <Button
            asChild
            variant="outline"
            className="border-stone-300 text-stone-700 hover:bg-stone-100 dark:border-stone-700 dark:text-stone-200 dark:hover:bg-stone-800"
          >
            <Link to="/login">Login</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsMenuOpen((previousState) => !previousState)}
          aria-label={
            isMenuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          className="rounded-xl border border-stone-300 p-2 text-stone-700 transition hover:bg-stone-100 md:hidden dark:border-stone-700 dark:text-stone-200 dark:hover:bg-stone-800"
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          id="mobile-menu"
          className="border-t border-stone-200 bg-stone-50 px-4 py-5 md:hidden dark:border-stone-800 dark:bg-stone-950"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-400"
                      : "text-stone-700 hover:bg-stone-100 dark:text-stone-200 dark:hover:bg-stone-900"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            <div className="my-2 border-t border-stone-200 dark:border-stone-800" />

            <Button
              type="button"
              variant="outline"
              onClick={toggleTheme}
              className="w-full dark:border-stone-700"
            >
              {theme === "dark" ? (
                <>
                  <Sun size={18} />
                  Light Mode
                </>
              ) : (
                <>
                  <Moon size={18} />
                  Dark Mode
                </>
              )}
            </Button>

            <Button
              asChild
              variant="outline"
              className="w-full border-stone-300 dark:border-stone-700"
            >
              <Link to="/login" onClick={closeMenu}>
                Login
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
