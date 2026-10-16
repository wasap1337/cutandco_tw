import { useState } from "react";
import { X } from "lucide-react";

export default function BookingModal({ services, barbers = [], onClose }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    service: "",
    barber: "",
    date: "",
    time: "",
    comment: "",
  });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("sending");
    setErrors({});

    const body = {
      name: form.name,
      phone: form.phone,
      comment: form.comment,
      date: form.date,
      time: form.time,
    };
    if (form.service) {
      const asNumber = Number(form.service);
      if (Number.isInteger(asNumber)) body.service_id = asNumber;
      else body.service = form.service;
    }
    if (form.barber) body.barber_id = Number(form.barber);

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        setStatus("success");
      } else {
        const data = await response.json();
        setErrors(data.errors || {});
        setStatus("idle");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputClass = "rounded-xl border border-black/10 bg-white px-4 py-3 outline-none";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-5" onClick={onClose}>
      <div className="w-full max-w-md rounded-3xl bg-[#f6f4ef] p-7" onClick={(event) => event.stopPropagation()}>
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-semibold">Запись</h3>
          <button onClick={onClose} aria-label="Закрыть"><X /></button>
        </div>

        {status === "success" ? (
          <div className="mt-6 rounded-2xl border border-black/10 bg-white p-5 text-sm">
            Заявка отправлена. Мы перезвоним, чтобы подтвердить запись.
            <button
              onClick={onClose}
              className="mt-4 block w-full rounded-xl bg-[#201f1d] px-4 py-3 text-sm text-white"
            >
              Закрыть
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 grid max-h-[65vh] gap-3 overflow-y-auto pr-1">
            <input name="name" value={form.name} onChange={handleChange} className={inputClass} placeholder="Ваше имя" />
            {errors.name && <p className="-mt-1 text-xs text-red-600">{errors.name}</p>}

            <input name="phone" value={form.phone} onChange={handleChange} className={inputClass} placeholder="Телефон" />
            {errors.phone && <p className="-mt-1 text-xs text-red-600">{errors.phone}</p>}

            <select name="service" value={form.service} onChange={handleChange} className={inputClass}>
              <option value="">Выберите услугу</option>
              {services.map((service) => (
                <option key={service.id ?? service.name} value={service.id ?? service.name}>{service.name}</option>
              ))}
            </select>
            {(errors.service_id || errors.service) && (
              <p className="-mt-1 text-xs text-red-600">{errors.service_id || errors.service}</p>
            )}

            <select name="barber" value={form.barber} onChange={handleChange} className={inputClass}>
              <option value="">Любой мастер</option>
              {barbers.map((barber) => (
                <option key={barber.id ?? barber.full_name ?? barber.name} value={barber.id ?? ""}>
                  {barber.full_name ?? barber.name}
                </option>
              ))}
            </select>

            <div className="grid grid-cols-2 gap-3">
              <input name="date" type="date" value={form.date} onChange={handleChange} className={inputClass} />
              <input name="time" type="time" value={form.time} onChange={handleChange} className={inputClass} />
            </div>
            {(errors.date || errors.time) && (
              <p className="-mt-1 text-xs text-red-600">{errors.date || errors.time}</p>
            )}

            <input name="comment" value={form.comment} onChange={handleChange} className={inputClass} placeholder="Комментарий (необязательно)" />

            {status === "error" && (
              <p className="text-xs text-red-600">Не удалось отправить заявку. Попробуйте позже.</p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="mt-2 rounded-xl bg-[#201f1d] px-4 py-3 text-sm text-white disabled:opacity-60"
            >
              {status === "sending" ? "Отправка..." : "Отправить заявку"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
