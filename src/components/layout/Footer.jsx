const Footer = () => {
  return (
    <footer className="bg-black text-stone-300">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-amber-500">Velora Events</h2>

            <p className="mt-4 text-sm leading-6">
              Discover exciting events, connect with people, and create
              unforgettable experiences.
            </p>

            <div className="flex gap-4 mt-6">
              <a href="#" className="hover:text-amber-500 transition-colors">
                Facebook
              </a>
              <a href="#" className="hover:text-amber-500 transition-colors">
                Instagram
              </a>
              <a href="#" className="hover:text-amber-500 transition-colors">
                X/Twitter
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h3>

            <ul className="space-y-2">
              <li><a href="/" className="hover:text-amber-500 transition-colors">Home</a></li>
              <li><a href="/events" className="hover:text-amber-500 transition-colors">Events</a></li>
              <li><a href="/about" className="hover:text-amber-500 transition-colors">About</a></li>
              <li><a href="/contact" className="hover:text-amber-500 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Categories
            </h3>

            <ul className="space-y-2">
              <li>Music</li>
              <li>Business</li>
              <li>Sports</li>
              <li>Workshops</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Contact
            </h3>

            <ul className="space-y-2 text-sm">
              <li>Nairobi, Kenya</li>
              <li>info@veloraevents.com</li>
              <li>+254 700 000 000</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-stone-700 mt-10 pt-6 text-center text-sm">
          © {new Date().getFullYear()} Velora Events. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;