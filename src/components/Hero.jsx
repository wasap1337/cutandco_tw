import { ArrowUpRight } from "lucide-react";
import Placeholder from "./Placeholder";

export default function Hero({ onBooking }) {
  return (
    <section className="mx-auto grid max-w-6xl gap-10 px-5 pb-20 pt-16 md:grid-cols-2 md:items-center md:pt-24">
      <div>
        <p className="mb-5 text-xs font-semibold uppercase tracking-[.22em] text-[#777269]">
          Barbershop · Новосибирск
        </p>
        <h1 className="max-w-xl text-5xl font-semibold leading-[.95] tracking-[-.04em] sm:text-6xl md:text-7xl">
          Хорошая стрижка начинается здесь.
        </h1>
        <p className="mt-7 max-w-lg text-base leading-7 text-[#625e57]">
          Спокойное пространство, точная работа и внимание к деталям. Соберите свой образ вместе с мастером.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <button onClick={onBooking} className="rounded-full bg-[#201f1d] px-6 py-3 text-sm text-white">
            Записаться
          </button>
          <a href="#services" className="flex items-center gap-2 rounded-full border border-black/15 px-6 py-3 text-sm">
            Смотреть услуги <ArrowUpRight size={16} />
          </a>
        </div>
      </div>

      <Placeholder className="min-h-[430px] rounded-[2rem] md:min-h-[560px]" />
    </section>
  );
}
