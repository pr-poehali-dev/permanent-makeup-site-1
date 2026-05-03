import { useState, useEffect } from "react";
import { BookingModal } from "@/components/BookingModal";
import { Navigation } from "@/components/Navigation";
import { PageSections } from "@/components/PageSections";

const Index = () => {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 60);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#0F0D0A] scroll-smooth">
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
      <Navigation
        scrolled={scrolled}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        scrollTo={scrollTo}
        onBookingOpen={() => setBookingOpen(true)}
      />
      <PageSections scrollTo={scrollTo} onBookingOpen={() => setBookingOpen(true)} />
    </div>
  );
};

export default Index;