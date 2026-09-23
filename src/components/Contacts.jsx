import { Camera, Clock, MapPin, Phone } from "lucide-react";

export default function Contacts({ contacts, onBooking }) {
  return (
    <section id="contacts" className="mx-auto max-w-6xl px-5 py-20">
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <p className="text-xs uppercase tracking-[.22em] text-[#777269]">Контакты</p>
          <h2 className="mt-3 text-4xl font-semibold">Будем ждать.</h2>

          <div className="mt-8 grid gap-4 text-sm">
            <p className="flex gap-3"><MapPin size={18} /> {contacts.address}</p>
            <p className="flex gap-3"><Phone size={18} /> {contacts.phone}</p>
            <p className="flex gap-3"><Clock size={18} /> {contacts.hours}</p>
            <p className="flex gap-3"><Camera size={18} /> {contacts.instagram}</p>
          </div>
        </div>

        <div className="rounded-3xl border border-black/10 bg-[#eeece6] p-7">
          <h3 className="text-xl font-medium">Записаться</h3>
          <p className="mt-2 text-sm text-[#777269]">
            ТГ ИЛИ БЕК ПОДКЛЮЧИТЬ
          </p>
          <button onClick={onBooking} className="mt-7 rounded-full bg-[#201f1d] px-6 py-3 text-sm text-white">
            Открыть форму
          </button>
        </div>
      </div>
    </section>
  );
}
