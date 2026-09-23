import { ArrowUpRight } from "lucide-react";
import Placeholder from "./Placeholder";

export default function Barbers({ barbers, onBooking }) {
  return (
    <section id="barbers" className="mx-auto max-w-6xl px-5 py-20">
      <p className="text-xs uppercase tracking-[.22em] text-[#777269]">Команда</p>
      <h2 className="mt-3 text-4xl font-semibold tracking-[-.03em]">Ваш мастер.</h2>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 md:grid-cols-3">
        {barbers.map((barber, index) => (
          <div key={index}>
            <Placeholder className="aspect-[4/5] rounded-2xl" />
            <div className="flex items-center justify-between pt-4">
              <div>
                <h3 className="font-medium">{barber.name}</h3>
                <p className="mt-1 text-sm text-[#777269]">{barber.experience}</p>
              </div>
              <button onClick={onBooking} className="rounded-full border border-black/15 p-2" aria-label="Записаться">
                <ArrowUpRight size={17} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
