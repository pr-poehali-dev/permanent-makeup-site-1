import { useState, useEffect } from "react";

const COOKIE_KEY = "cookie_consent_accepted";

const CookieBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem(COOKIE_KEY);
    if (!accepted) {
      setTimeout(() => setVisible(true), 800);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_KEY, "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#1a1a1a] border-t border-[#C9A96E]/30 px-4 py-4 md:px-8">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-4">
        <p className="text-sm text-gray-300 leading-relaxed flex-1">
          <span className="text-[#C9A96E] font-medium">Olga Snezhurova Permanent</span> использует файлы cookie. Продолжая работу с{" "}
          <span className="text-[#C9A96E]">https://olgasnezhurovapermanent.ru/</span> вы подтверждаете использование сайтом cookies вашего браузера, которые помогают нам делать этот сайт удобнее для пользователей. Однако вы можете запретить сохранение определённых файлов cookie в настройках своего браузера.{" "}
          Обработка данных пользователей осуществляется в соответствии с{" "}
          <a href="/privacy" className="text-[#C9A96E] underline underline-offset-2 hover:opacity-80 transition-opacity">
            Политикой обработки персональных данных
          </a>{" "}
          и Уведомлением об использовании файлов cookie.
        </p>
        <button
          onClick={handleAccept}
          className="shrink-0 bg-[#C9A96E] hover:bg-[#b8934e] text-black font-semibold text-sm px-6 py-2.5 rounded transition-colors"
        >
          Принять
        </button>
      </div>
    </div>
  );
};

export default CookieBanner;
