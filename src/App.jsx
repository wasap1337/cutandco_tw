import { useEffect, useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Barbers from "./components/Barbers";
import About from "./components/About";
import Contacts from "./components/Contacts";
import Footer from "./components/Footer";
import BookingModal from "./components/BookingModal";
import { barbers, contacts, services } from "./data/siteData";

const formatPrice = (price) =>
  typeof price === "number" ? `${price.toLocaleString("ru-RU")} ₽` : price;

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [serviceList, setServiceList] = useState(services);
  const [barberList, setBarberList] = useState(barbers);

  useEffect(() => {
    fetch("/api/services")
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (data?.services?.length) {
          setServiceList(data.services.map((s) => ({ ...s, price: formatPrice(s.price) })));
        }
      })
      .catch(() => {});

    fetch("/api/barbers")
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (data?.barbers?.length) setBarberList(data.barbers);
      })
      .catch(() => {});
  }, []);

  const openBooking = () => setBookingOpen(true);
  const closeBooking = () => setBookingOpen(false);

  return (
    <div>
      <Header open={menuOpen} setOpen={setMenuOpen} onBooking={openBooking} />

      <main id="top">
        <Hero onBooking={openBooking} />
        <Services services={serviceList} />
        <Barbers barbers={barberList} onBooking={openBooking} />
        <About />
        <Contacts contacts={contacts} onBooking={openBooking} />
      </main>

      <Footer />

      {bookingOpen && (
        <BookingModal services={serviceList} barbers={barberList} onClose={closeBooking} />
      )}
    </div>
  );
}
