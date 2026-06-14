import Icon from "@/components/ui/icon";
import { Logo } from "@/components/Logo";

declare global {
  interface Window { ym?: (...args: unknown[]) => void; }
}

interface NavigationProps {
  scrolled: boolean;
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
  scrollTo: (id: string) => void;
  onBookingOpen: () => void;
}

function trackBookingOpen() {
  if (typeof window !== "undefined" && window.ym) {
    window.ym(109022974, 'reachGoal', 'booking_open');
  }
}

export function Navigation({ scrolled, menuOpen, setMenuOpen, scrollTo, onBookingOpen }: NavigationProps) {
  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${scrolled ? "bg-[#0F0D0A]/95 backdrop-blur-md border-b border-[#C9A96E]/10" : ""}`}>
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <button onClick={() => scrollTo("hero")} className="flex items-center gap-3 leading-none">
          <Logo className="w-9 h-9 text-[#C9A96E] flex-shrink-0" />
          <span className="flex flex-col items-start">
            <span className="font-display text-2xl text-white tracking-[0.15em]">Olga Snezhurova</span>
            <span className="font-body text-[#C9A96E] text-xs tracking-[0.4em] uppercase mt-0.5" style={{ fontFamily: "'Great Vibes', cursive" }}>Permanent</span>
          </span>
        </button>

        <div className="hidden md:flex items-center gap-8">
          {[["Услуги", "services"], ["О нас", "about"], ["Портфолио", "portfolio"], ["Отзывы", "reviews"], ["Контакты", "contacts"]].map(([label, id]) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="text-xs font-body text-white/50 tracking-[0.2em] uppercase hover:text-[#C9A96E] transition-colors"
            >
              {label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => { trackBookingOpen(); onBookingOpen(); }}
            className="hidden md:block bg-[#C9A96E] text-[#0F0D0A] px-6 py-2.5 text-xs font-body font-semibold tracking-[0.2em] uppercase hover:bg-[#E8C98A] transition-colors"
          >
            Записаться
          </button>
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white/60 hover:text-[#C9A96E] p-2 -mr-2">
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-[#0F0D0A]/98 border-t border-[#C9A96E]/10 px-6 py-6 space-y-4 animate-fade-in">
          {[["Услуги", "services"], ["О нас", "about"], ["Портфолио", "portfolio"], ["Отзывы", "reviews"], ["Контакты", "contacts"]].map(([label, id]) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="block text-base font-body text-white/60 tracking-widest uppercase hover:text-[#C9A96E] transition-colors py-1"
            >
              {label}
            </button>
          ))}
          <button
            onClick={() => { trackBookingOpen(); onBookingOpen(); setMenuOpen(false); }}
            className="w-full bg-[#C9A96E] text-[#0F0D0A] py-3 text-xs font-body font-semibold tracking-widest uppercase mt-2"
          >
            Записаться
          </button>
        </div>
      )}
    </nav>
  );
}