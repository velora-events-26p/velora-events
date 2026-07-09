import { Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import Home from "@/pages/Home";
// import Events from "@/pages/Events";
import Contact from "@/pages/Contact";
import Login from "@/pages/Login";

function App() {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/events" element={<Events />} /> */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;