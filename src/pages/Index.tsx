import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/5016e935-bb63-4aee-a242-8c9dfade0619/files/1ca10198-a465-49be-94f5-c8b14173b6cd.jpg";
const PROCEDURE_IMAGE = "https://cdn.poehali.dev/projects/5016e935-bb63-4aee-a242-8c9dfade0619/files/4857ded8-dbfe-4320-8234-9a88547ad752.jpg";
const PORTRAIT_IMAGE = "https://cdn.poehali.dev/projects/5016e935-bb63-4aee-a242-8c9dfade0619/files/d15456e4-a9b9-4f59-b02e-f201ccd68f9a.jpg";

const services = [
  {
    title: "Брови",
    subtitle: "Перманентный макияж",
    items: ["Микроблейдинг", "Пудровые брови", "Акварельные брови", "Комбинированная техника"],
    price: "от 8 000 ₽",
    icon: "Sparkles",
  },
  {
    title: "Губы",
    subtitle: "Перманентный макияж",
    items: ["Акварельные губы", "Контур губ", "Омбре губы", "Коррекция формы"],
    price: "от 9 000 ₽",
    icon: "Heart",
  },
  {
    title: "Стрелки",
    subtitle: "Перманентный макияж",
    items: ["Межресничное пространство", "Классические стрелки", "Смоки", "Нижнее веко"],
    price: "от 7 000 ₽",
    icon: "Eye",
  },
  {
    title: "Консультация",
    subtitle: "Подбор техники",
    items: ["Анализ типажа", "Подбор формы", "Цветодиагностика", "Пробный эскиз"],
    price: "Бесплатно",
    icon: "MessageCircle",
  },
];

const reviews = [
  {
    name: "Анастасия М.",
    date: "Март 2024",
    text: "Делала брови в технике пудровых. Результат превзошёл все ожидания — естественно, аккуратно, идеально по форме. Мастер настоящий профессионал!",
    rating: 5,
  },
  {
    name: "Екатерина В.",
    date: "Февраль 2024",
    text: "Записалась на акварельные губы. Страшновато было, но Юлия всё объяснила, сделала эскиз — и я влюбилась в результат. Рекомендую всем!",
    rating: 5,
  },
  {
    name: "Ольга Д.",
    date: "Январь 2024",
    text: "Хожу уже второй раз на коррекцию. Студия премиальная, всё стерильно, атмосфера расслабляющая. Брови держатся отлично уже полтора года.",
    rating: 5,
  },
];

const timeline = [
  { step: "01", title: "Консультация", desc: "Обсуждаем желаемый результат, подбираем форму и оттенок под ваш тип внешности" },
  { step: "02", title: "Эскиз", desc: "Создаём пробный эскиз маркером прямо на вас — утверждаем каждую деталь" },
  { step: "03", title: "Процедура", desc: "Работа в стерильных условиях с анестезией. Комфортно и безопасно" },
  { step: "04", title: "Заживление", desc: "Инструктаж по уходу. Через 4–6 недель — коррекция в подарок" },
];

const faqItems = [
  { q: "Больно ли делать перманентный макияж?", a: "Процедура проводится с использованием качественных анестетиков. Большинство клиентов описывают ощущения как лёгкое покалывание." },
  { q: "Как долго держится результат?", a: "В среднем 1,5–3 года в зависимости от типа кожи, техники и ухода. После коррекции срок увеличивается." },
  { q: "Есть ли противопоказания?", a: "Да: беременность, кормление грудью, онкология, диабет, склонность к келоидным рубцам. Полный список — на консультации." },
  { q: "Когда виден окончательный результат?", a: "Через 4–6 недель после заживления. Первые дни пигмент выглядит ярче — это нормально." },
];

function BookingModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [form, setForm] = useState({ name: "", phone: "", service: "", date: "", comment: "" });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-lg bg-[#1A1714] border border-[#C9A96E]/30 p-8 animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#C9A96E]/60 hover:text-[#C9A96E] transition-colors"
        >
          <Icon name="X" size={20} />
        </button>

        {!submitted ? (
          <>
            <div className="mb-6">
              <p className="text-[#C9A96E] font-body text-xs tracking-[0.3em] uppercase mb-2">Онлайн-запись</p>
              <h3 className="font-display text-3xl text-white">Записаться на процедуру</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-body text-[#C9A96E]/70 tracking-widest uppercase mb-1">Ваше имя</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-[#0F0D0A] border border-[#C9A96E]/20 text-white px-4 py-3 text-sm font-body focus:outline-none focus:border-[#C9A96E]/60 transition-colors placeholder:text-white/20"
                  placeholder="Анастасия"
                />
              </div>

              <div>
                <label className="block text-xs font-body text-[#C9A96E]/70 tracking-widest uppercase mb-1">Телефон</label>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                  className="w-full bg-[#0F0D0A] border border-[#C9A96E]/20 text-white px-4 py-3 text-sm font-body focus:outline-none focus:border-[#C9A96E]/60 transition-colors placeholder:text-white/20"
                  placeholder="+7 (999) 000-00-00"
                />
              </div>

              <div>
                <label className="block text-xs font-body text-[#C9A96E]/70 tracking-widest uppercase mb-1">Процедура</label>
                <select
                  value={form.service}
                  onChange={e => setForm({ ...form, service: e.target.value })}
                  className="w-full bg-[#0F0D0A] border border-[#C9A96E]/20 text-white px-4 py-3 text-sm font-body focus:outline-none focus:border-[#C9A96E]/60 transition-colors"
                >
                  <option value="">Выберите процедуру</option>
                  <option>Перманентный макияж бровей</option>
                  <option>Перманентный макияж губ</option>
                  <option>Перманентный макияж век</option>
                  <option>Консультация</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-body text-[#C9A96E]/70 tracking-widest uppercase mb-1">Удобная дата</label>
                <input
                  type="date"
                  value={form.date}
                  onChange={e => setForm({ ...form, date: e.target.value })}
                  className="w-full bg-[#0F0D0A] border border-[#C9A96E]/20 text-white px-4 py-3 text-sm font-body focus:outline-none focus:border-[#C9A96E]/60 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-body text-[#C9A96E]/70 tracking-widest uppercase mb-1">Комментарий</label>
                <textarea
                  value={form.comment}
                  onChange={e => setForm({ ...form, comment: e.target.value })}
                  rows={3}
                  className="w-full bg-[#0F0D0A] border border-[#C9A96E]/20 text-white px-4 py-3 text-sm font-body focus:outline-none focus:border-[#C9A96E]/60 transition-colors resize-none placeholder:text-white/20"
                  placeholder="Расскажите о пожеланиях..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#C9A96E] text-[#0F0D0A] py-4 text-xs font-body font-semibold tracking-[0.25em] uppercase hover:bg-[#E8C98A] transition-colors mt-2"
              >
                Отправить заявку
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 border border-[#C9A96E] flex items-center justify-center mx-auto mb-6">
              <Icon name="Check" size={28} className="text-[#C9A96E]" />
            </div>
            <h3 className="font-display text-3xl text-white mb-3">Заявка принята</h3>
            <p className="text-white/50 font-body text-sm leading-relaxed">
              Мы свяжемся с вами в течение 30 минут<br />для подтверждения записи
            </p>
            <button
              onClick={() => { setSubmitted(false); onClose(); }}
              className="mt-8 text-[#C9A96E] text-xs font-body tracking-widest uppercase border-b border-[#C9A96E]/30 hover:border-[#C9A96E] transition-colors pb-0.5"
            >
              Закрыть
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const Index = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#0F0D0A] scroll-smooth">
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />

      {/* NAVIGATION */}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${scrolled ? "bg-[#0F0D0A]/95 backdrop-blur-md border-b border-[#C9A96E]/10" : ""}`}>
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <button onClick={() => scrollTo("hero")} className="font-display text-2xl text-white tracking-[0.15em]">
            LUMIÈRE
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
              onClick={() => setBookingOpen(true)}
              className="hidden md:block bg-[#C9A96E] text-[#0F0D0A] px-6 py-2.5 text-xs font-body font-semibold tracking-[0.2em] uppercase hover:bg-[#E8C98A] transition-colors"
            >
              Записаться
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white/60 hover:text-[#C9A96E]">
              <Icon name={menuOpen ? "X" : "Menu"} size={22} />
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-[#0F0D0A]/98 border-t border-[#C9A96E]/10 px-6 py-6 space-y-4 animate-fade-in">
            {[["Услуги", "services"], ["О нас", "about"], ["Портфолио", "portfolio"], ["Отзывы", "reviews"], ["Контакты", "contacts"]].map(([label, id]) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="block text-sm font-body text-white/60 tracking-widest uppercase hover:text-[#C9A96E] transition-colors"
              >
                {label}
              </button>
            ))}
            <button
              onClick={() => { setBookingOpen(true); setMenuOpen(false); }}
              className="w-full bg-[#C9A96E] text-[#0F0D0A] py-3 text-xs font-body font-semibold tracking-widest uppercase mt-2"
            >
              Записаться
            </button>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMAGE} alt="Studio" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F0D0A] via-[#0F0D0A]/80 to-[#0F0D0A]/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F0D0A] via-transparent to-[#0F0D0A]/40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-16">
          <div className="max-w-2xl">
            <p className="animate-fade-in-up delay-100 text-[#C9A96E] font-body text-xs tracking-[0.4em] uppercase mb-6">
              Студия перманентного макияжа
            </p>
            <h1 className="animate-fade-in-up delay-200 font-display text-6xl md:text-8xl text-white leading-[0.9] mb-4">
              Красота,<br />
              <span className="gold-shimmer">которая длится</span>
            </h1>
            <p className="animate-fade-in-up delay-300 font-body text-white/50 text-base leading-relaxed max-w-md mt-6 mb-10">
              Перманентный макияж бровей, губ и век в Москве. Премиальные пигменты, европейские техники, безопасность — прежде всего.
            </p>
            <div className="animate-fade-in-up delay-400 flex flex-wrap gap-4">
              <button
                onClick={() => setBookingOpen(true)}
                className="bg-[#C9A96E] text-[#0F0D0A] px-10 py-4 text-xs font-body font-semibold tracking-[0.25em] uppercase hover:bg-[#E8C98A] transition-colors"
              >
                Записаться на процедуру
              </button>
              <button
                onClick={() => scrollTo("services")}
                className="border border-[#C9A96E]/40 text-[#C9A96E] px-8 py-4 text-xs font-body tracking-[0.25em] uppercase hover:border-[#C9A96E] hover:bg-[#C9A96E]/5 transition-colors"
              >
                Наши услуги
              </button>
            </div>

            <div className="animate-fade-in-up delay-600 flex gap-10 mt-14">
              {[["500+", "Довольных клиентов"], ["7", "Лет опыта"], ["100%", "Безопасность"]].map(([num, label]) => (
                <div key={label}>
                  <div className="font-display text-3xl text-[#C9A96E] font-light">{num}</div>
                  <div className="font-body text-xs text-white/40 tracking-widest uppercase mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={() => scrollTo("services")}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-[#C9A96E]/50 hover:text-[#C9A96E] transition-colors"
        >
          <Icon name="ChevronDown" size={24} />
        </button>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 md:py-32 bg-[#0F0D0A]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <p className="text-[#C9A96E] font-body text-xs tracking-[0.4em] uppercase mb-3">Прайс-лист</p>
              <h2 className="font-display text-5xl md:text-6xl text-white">Наши услуги</h2>
            </div>
            <p className="font-body text-white/40 text-sm leading-relaxed max-w-xs">
              В стоимость включена бесплатная коррекция через 4–6 недель
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#C9A96E]/10">
            {services.map((s) => (
              <div
                key={s.title}
                className="bg-[#0F0D0A] p-8 group hover:bg-[#1A1714] transition-colors"
              >
                <div className="w-10 h-10 border border-[#C9A96E]/30 flex items-center justify-center mb-6 group-hover:border-[#C9A96E]/60 transition-colors">
                  <Icon name={s.icon} size={18} className="text-[#C9A96E]" />
                </div>
                <p className="text-[#C9A96E]/60 font-body text-xs tracking-widest uppercase mb-1">{s.subtitle}</p>
                <h3 className="font-display text-3xl text-white mb-4">{s.title}</h3>
                <ul className="space-y-2 mb-6">
                  {s.items.map(item => (
                    <li key={item} className="font-body text-sm text-white/40 flex items-center gap-2">
                      <span className="w-1 h-1 bg-[#C9A96E]/40 rounded-full flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="pt-4 border-t border-[#C9A96E]/10">
                  <span className="font-display text-2xl text-[#C9A96E]">{s.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 md:py-32 bg-[#0F0D0A]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img
                src={PORTRAIT_IMAGE}
                alt="Мастер"
                className="w-full aspect-[3/4] object-cover"
              />
              <div className="absolute -bottom-6 -right-6 bg-[#C9A96E] text-[#0F0D0A] p-6 hidden md:block">
                <div className="font-display text-4xl font-light">7</div>
                <div className="font-body text-xs tracking-widest uppercase">лет в профессии</div>
              </div>
              <div className="absolute top-8 -left-6 w-12 h-32 bg-[#C9A96E]/10 border-l-2 border-[#C9A96E]/30 hidden md:block" />
            </div>

            <div>
              <p className="text-[#C9A96E] font-body text-xs tracking-[0.4em] uppercase mb-4">О студии</p>
              <h2 className="font-display text-5xl md:text-6xl text-white leading-tight mb-6">
                Искусство<br />красоты —<br />
                <em className="not-italic text-[#C9A96E]">наша страсть</em>
              </h2>
              <p className="font-body text-white/50 text-sm leading-relaxed mb-4">
                LUMIÈRE — это студия, где каждая процедура — это диалог между мастером и клиентом. Мы не делаем «как у всех», мы создаём образ именно для вас.
              </p>
              <p className="font-body text-white/50 text-sm leading-relaxed mb-8">
                Используем только сертифицированные европейские пигменты и одноразовые инструменты. Каждый мастер проходит регулярное обучение в ведущих школах Европы.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-10">
                {[["Пигменты Li Pigments", "Швейцарский бренд"], ["Стерильность 100%", "Одноразовые иглы"], ["Мягкая анестезия", "Комфортно"], ["Коррекция в подарок", "Через 4–6 недель"]].map(([title, sub]) => (
                  <div key={title} className="border border-[#C9A96E]/15 p-4">
                    <div className="font-body text-sm text-white font-medium mb-0.5">{title}</div>
                    <div className="font-body text-xs text-[#C9A96E]/60">{sub}</div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setBookingOpen(true)}
                className="border border-[#C9A96E] text-[#C9A96E] px-10 py-4 text-xs font-body tracking-[0.25em] uppercase hover:bg-[#C9A96E] hover:text-[#0F0D0A] transition-colors"
              >
                Записаться
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 bg-[#1A1714]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[#C9A96E] font-body text-xs tracking-[0.4em] uppercase mb-3">Процесс</p>
            <h2 className="font-display text-5xl md:text-6xl text-white">Как это работает</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
            {timeline.map((item, i) => (
              <div key={item.step} className="relative p-8 border-t border-[#C9A96E]/20 md:border-t-0 md:border-l md:first:border-l-0 border-[#C9A96E]/20">
                <div className="font-display text-6xl text-[#C9A96E]/10 leading-none mb-4">{item.step}</div>
                <h3 className="font-display text-2xl text-white mb-3">{item.title}</h3>
                <p className="font-body text-sm text-white/40 leading-relaxed">{item.desc}</p>
                {i < timeline.length - 1 && (
                  <div className="hidden md:block absolute top-8 right-0 translate-x-1/2 z-10">
                    <Icon name="ChevronRight" size={16} className="text-[#C9A96E]/30" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-24 md:py-32 bg-[#0F0D0A]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <p className="text-[#C9A96E] font-body text-xs tracking-[0.4em] uppercase mb-3">Работы</p>
              <h2 className="font-display text-5xl md:text-6xl text-white">Портфолио</h2>
            </div>
            <button className="font-body text-xs text-[#C9A96E]/60 tracking-widest uppercase border-b border-[#C9A96E]/20 hover:text-[#C9A96E] hover:border-[#C9A96E]/50 transition-colors pb-0.5 self-start md:self-auto">
              Смотреть все работы
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { img: PROCEDURE_IMAGE, tag: "Брови · Пудровые", tall: true },
              { img: PORTRAIT_IMAGE, tag: "Губы · Омбре", tall: false },
              { img: HERO_IMAGE, tag: "Студия", tall: false },
            ].map((item, i) => (
              <div key={i} className={`relative overflow-hidden group ${item.tall ? "row-span-2" : ""}`}>
                <img
                  src={item.img}
                  alt={item.tag}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  style={{ minHeight: item.tall ? "420px" : "200px" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F0D0A]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <span className="font-body text-xs text-[#C9A96E] tracking-widest uppercase">{item.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-24 md:py-32 bg-[#1A1714]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[#C9A96E] font-body text-xs tracking-[0.4em] uppercase mb-3">Клиенты о нас</p>
            <h2 className="font-display text-5xl md:text-6xl text-white">Отзывы</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((r) => (
              <div key={r.name} className="bg-[#0F0D0A] border border-[#C9A96E]/10 p-8 hover:border-[#C9A96E]/25 transition-colors">
                <div className="flex gap-0.5 mb-6">
                  {Array(r.rating).fill(0).map((_, i) => (
                    <Icon key={i} name="Star" size={14} className="text-[#C9A96E] fill-[#C9A96E]" />
                  ))}
                </div>
                <p className="font-body text-white/60 text-sm leading-relaxed mb-8 italic">
                  «{r.text}»
                </p>
                <div className="flex items-center justify-between border-t border-[#C9A96E]/10 pt-4">
                  <div className="font-body text-sm text-white font-medium">{r.name}</div>
                  <div className="font-body text-xs text-white/30">{r.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-[#0F0D0A]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[#C9A96E] font-body text-xs tracking-[0.4em] uppercase mb-3">Вопросы</p>
            <h2 className="font-display text-5xl md:text-6xl text-white">Частые вопросы</h2>
          </div>

          <div className="space-y-0 divide-y divide-[#C9A96E]/10">
            {faqItems.map((item, i) => (
              <div key={i}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between py-6 text-left group"
                >
                  <span className="font-body text-sm text-white font-medium group-hover:text-[#C9A96E] transition-colors pr-4">
                    {item.q}
                  </span>
                  <Icon
                    name={openFaq === i ? "Minus" : "Plus"}
                    size={16}
                    className="text-[#C9A96E] flex-shrink-0"
                  />
                </button>
                {openFaq === i && (
                  <div className="pb-6 font-body text-sm text-white/50 leading-relaxed animate-fade-in">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOOKING CTA */}
      <section className="py-24 bg-[#1A1714] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-[#C9A96E]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-[#C9A96E]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full border border-[#C9A96E]" />
        </div>
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <p className="text-[#C9A96E] font-body text-xs tracking-[0.4em] uppercase mb-4">Начните сейчас</p>
          <h2 className="font-display text-5xl md:text-7xl text-white mb-6">
            Запишитесь<br />
            <span className="gold-text-gradient">на консультацию</span>
          </h2>
          <p className="font-body text-white/40 text-sm mb-10 leading-relaxed">
            Консультация бесплатна. Мы подберём технику, форму и цвет — именно для вас.
          </p>
          <button
            onClick={() => setBookingOpen(true)}
            className="bg-[#C9A96E] text-[#0F0D0A] px-14 py-5 text-xs font-body font-semibold tracking-[0.3em] uppercase hover:bg-[#E8C98A] transition-colors"
          >
            Записаться бесплатно
          </button>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 bg-[#0F0D0A]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <p className="text-[#C9A96E] font-body text-xs tracking-[0.4em] uppercase mb-4">Контакты</p>
              <h2 className="font-display text-5xl text-white mb-10">Приходите к нам</h2>

              <div className="space-y-6">
                {[
                  { icon: "MapPin", label: "Адрес", value: "Череповец, ул. Архангельская, 3" },
                  { icon: "Phone", label: "Телефон", value: "+7 (951) 738-99-90" },
                  { icon: "Mail", label: "Email", value: "hello@lumiere-studio.ru" },
                  { icon: "Clock", label: "Режим работы", value: "Пн–Сб: 10:00 – 20:00" },
                ].map(({ icon, label, value }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-10 h-10 border border-[#C9A96E]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon name={icon} size={16} className="text-[#C9A96E]" />
                    </div>
                    <div>
                      <div className="font-body text-xs text-[#C9A96E]/60 tracking-widest uppercase mb-1">{label}</div>
                      <div className="font-body text-sm text-white">{value}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 mt-10">
                {[{ icon: "Instagram", label: "Instagram" }, { icon: "MessageCircle", label: "Telegram" }, { icon: "Phone", label: "WhatsApp" }].map(({ icon, label }) => (
                  <button
                    key={label}
                    className="w-10 h-10 border border-[#C9A96E]/20 flex items-center justify-center text-[#C9A96E]/50 hover:text-[#C9A96E] hover:border-[#C9A96E]/50 transition-colors"
                    title={label}
                  >
                    <Icon name={icon} size={16} />
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-[#1A1714] border border-[#C9A96E]/10 p-8">
              <h3 className="font-display text-3xl text-white mb-6">Задайте вопрос</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-body text-[#C9A96E]/60 tracking-widest uppercase mb-1">Имя</label>
                  <input
                    type="text"
                    className="w-full bg-[#0F0D0A] border border-[#C9A96E]/15 text-white px-4 py-3 text-sm font-body focus:outline-none focus:border-[#C9A96E]/40 transition-colors placeholder:text-white/20"
                    placeholder="Ваше имя"
                  />
                </div>
                <div>
                  <label className="block text-xs font-body text-[#C9A96E]/60 tracking-widest uppercase mb-1">Телефон или Email</label>
                  <input
                    type="text"
                    className="w-full bg-[#0F0D0A] border border-[#C9A96E]/15 text-white px-4 py-3 text-sm font-body focus:outline-none focus:border-[#C9A96E]/40 transition-colors placeholder:text-white/20"
                    placeholder="+7 (999) 000-00-00"
                  />
                </div>
                <div>
                  <label className="block text-xs font-body text-[#C9A96E]/60 tracking-widest uppercase mb-1">Сообщение</label>
                  <textarea
                    rows={4}
                    className="w-full bg-[#0F0D0A] border border-[#C9A96E]/15 text-white px-4 py-3 text-sm font-body focus:outline-none focus:border-[#C9A96E]/40 transition-colors resize-none placeholder:text-white/20"
                    placeholder="Ваш вопрос..."
                  />
                </div>
                <button className="w-full bg-[#C9A96E] text-[#0F0D0A] py-4 text-xs font-body font-semibold tracking-[0.25em] uppercase hover:bg-[#E8C98A] transition-colors">
                  Отправить
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#C9A96E]/10 py-8 bg-[#0F0D0A]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-display text-xl text-white tracking-[0.15em]">LUMIÈRE</div>
          <p className="font-body text-xs text-white/25 tracking-widest">
            © 2024 LUMIÈRE Studio. Все права защищены.
          </p>
          <div className="flex gap-6">
            {["Политика конфиденциальности", "Договор-оферта"].map(link => (
              <button key={link} className="font-body text-xs text-white/25 hover:text-[#C9A96E]/60 transition-colors">
                {link}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;