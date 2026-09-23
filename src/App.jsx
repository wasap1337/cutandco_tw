import { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Barbers from "./components/Barbers";
import About from "./components/About";
import Contacts from "./components/Contacts";
import Footer from "./components/Footer";
import BookingModal from "./components/BookingModal";
import { barbers, contacts, services } from "./data/siteData";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);

  const openBooking = () => setBookingOpen(true);
  const closeBooking = () => setBookingOpen(false);

  return (
    <div>
      <Header open={menuOpen} setOpen={setMenuOpen} onBooking={openBooking} />

      <main id="top">
        <Hero onBooking={openBooking} />
        <Services services={services} />
        <Barbers barbers={barbers} onBooking={openBooking} />
        <About />
        <Contacts contacts={contacts} onBooking={openBooking} />
      </main>

      <Footer />

      {bookingOpen && (
        <BookingModal services={services} onClose={closeBooking} />
      )}
    </div>
  );
}
