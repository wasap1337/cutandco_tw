export default function Services({ services }) {
  return (
    <section id="services" className="border-y border-black/10 bg-[#eeece6]">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[.22em] text-[#777269]">Услуги</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-[-.03em]">Без лишнего.</h2>
          </div>
          <p className="hidden max-w-sm text-sm leading-6 text-[#625e57] sm:block">
            ЗАМЕНИТЬ
          </p>
        </div>

        <div className="grid gap-3">
          {services.map((service, index) => (
            <div key={service.name} className="grid gap-3 rounded-2xl border border-black/10 bg-[#f6f4ef] p-5 sm:grid-cols-[60px_1fr_auto] sm:items-center">
              <span className="text-xs text-[#8b867e]">0{index + 1}</span>
              <div>
                <h3 className="font-medium">{service.name}</h3>
                <p className="mt-1 text-sm text-[#777269]">{service.description}</p>
              </div>
              <span className="text-sm font-medium">{service.price}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
