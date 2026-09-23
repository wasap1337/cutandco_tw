import { X } from "lucide-react";

export default function BookingModal({ services, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-5" onClick={onClose}>
      <div className="w-full max-w-md rounded-3xl bg-[#f6f4ef] p-7" onClick={(event) => event.stopPropagation()}>
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-semibold">Запись</h3>
          <button onClick={onClose} aria-label="Закрыть"><X /></button>
        </div>

        <div className="mt-6 grid gap-3">
          <input className="rounded-xl border border-black/10 bg-white px-4 py-3 outline-none" placeholder="Ваше имя" />
          <input className="rounded-xl border border-black/10 bg-white px-4 py-3 outline-none" placeholder="Телефон" />

          <select className="rounded-xl border border-black/10 bg-white px-4 py-3 outline-none">
            <option>Выберите услугу</option>
            {services.map((service) => (
              <option key={service.name} value={service.name}>{service.name}</option>
            ))}
          </select>

          <button onClick={onClose} className="mt-2 rounded-xl bg-[#201f1d] px-4 py-3 text-sm text-white">
            Отправить заявку
          </button>
        </div>
      </div>
    </div>
  );
}
