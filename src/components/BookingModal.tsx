import { useState } from "react";
import Icon from "@/components/ui/icon";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BookingModal({ isOpen, onClose }: BookingModalProps) {
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
              className="mt-8 text-[#C9A96E] font-body text-xs tracking-[0.25em] uppercase hover:text-[#E8C98A] transition-colors"
            >
              Закрыть
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
