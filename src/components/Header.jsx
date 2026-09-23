import { Menu, X } from "lucide-react";

export default function Header({ open, setOpen, onBooking }) {
  const closeMenu = () => setOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-[#f6f4ef]/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <a href="#top" className="text-lg font-semibold tracking-[.2em]">CUT & CO</a>

        <nav className="hidden gap-7 text-sm md:flex">
          <a href="#services">Услуги</a>
          <a href="#barbers">Барберы</a>
          <a href="#about">О нас</a>
          <a href="#contacts">Контакты</a>
        </nav>

        <button onClick={() => setOpen(!open)} className="md:hidden" aria-label="Меню">
          {open ? <X /> : <Menu />}
        </button>

        <button
          onClick={onBooking}
          className="hidden rounded-full bg-[#201f1d] px-5 py-2.5 text-sm text-white md:block"
        >
          Записаться
        </button>
      </div>

      {open && (
        <nav className="border-t border-black/10 px-5 py-4 md:hidden">
          <div className="grid gap-4 text-sm">
            <a href="#services" onClick={closeMenu}>Услуги</a>
            <a href="#barbers" onClick={closeMenu}>Барберы</a>
            <a href="#about" onClick={closeMenu}>О нас</a>
            <a href="#contacts" onClick={closeMenu}>Контакты</a>
            <button
              onClick={() => {
                closeMenu();
                onBooking();
              }}
              className="rounded-full bg-[#201f1d] px-5 py-3 text-sm text-white"
            >
              Записаться
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
