import Placeholder from "./Placeholder";

export default function About() {
  return (
    <section id="about" className="bg-[#201f1d] text-[#f6f4ef]">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 md:grid-cols-2 md:items-center">
        <Placeholder className="min-h-[360px] rounded-2xl bg-[#35332f] text-[#aaa49b]" />
        <div>
          <p className="text-xs uppercase tracking-[.22em] text-[#aaa49b]">О нас</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-.03em]">
            Место, куда приходят не только за стрижкой.
          </h2>
          <p className="mt-6 max-w-lg leading-7 text-[#c3beb5]">
            Здесь можно спокойно выпить кофе, обсудить новый образ и получить аккуратный результат без суеты.
          </p>
        </div>
      </div>
    </section>
  );
}
