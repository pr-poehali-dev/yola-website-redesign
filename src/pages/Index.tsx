import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE =
  "https://cdn.poehali.dev/projects/ef865f98-91a8-4646-8ad7-ebc6b810f53e/files/03dbfd91-3334-4cc6-b62e-03a0c93009b5.jpg";
const IMG_MEAT1 =
  "https://cdn.poehali.dev/projects/ef865f98-91a8-4646-8ad7-ebc6b810f53e/files/27654ab0-0dde-4408-9cf5-e5078abcffcd.jpg";
const IMG_MEAT2 =
  "https://cdn.poehali.dev/projects/ef865f98-91a8-4646-8ad7-ebc6b810f53e/files/0f95dd7c-5c02-466b-bd5a-a3bb478c237d.jpg";

const PRODUCTS = [
  { id: 1, name: "Говядина мраморная",  desc: "Пастбищный откорм, насыщенный вкус и аромат",      img: IMG_MEAT1, tag: "Премиум" },
  { id: 2, name: "Стейки и отбивные",   desc: "Идеальная нарезка для гриля, натуральный корм",     img: IMG_MEAT2, tag: "Для гриля" },
  { id: 3, name: "Фермерские колбасы",  desc: "Ручное производство, без консервантов",             img: IMG_MEAT1, tag: "Ремесленное" },
  { id: 4, name: "Свинина фермерская",  desc: "Свободный выгул, экологически чистые угодья",       img: IMG_MEAT2, tag: "Натуральное" },
  { id: 5, name: "Баранина",            desc: "Горные пастбища, молодое и нежное мясо",            img: IMG_MEAT1, tag: "Деликатес" },
];

const STORES = [
  { name: "Магазин «Йола» на Ленина",       address: "ул. Ленина, 45",        hours: "9:00 – 21:00" },
  { name: "Фирменный отдел ТЦ Центральный", address: "пр. Октябрьский, 12",   hours: "10:00 – 22:00" },
  { name: "Магазин «Йола» на Мира",         address: "ул. Мира, 78",          hours: "9:00 – 20:00" },
];

const FILTERS = ["Все", "Премиум", "Для гриля", "Ремесленное", "Натуральное", "Деликатес"];

const STATS = [
  { num: "15+",  label: "лет на рынке",       icon: "Award" },
  { num: "2000", label: "га экопастбищ",       icon: "Leaf" },
  { num: "30+",  label: "видов продукции",     icon: "Package" },
  { num: "100%", label: "натуральный продукт", icon: "ShieldCheck" },
];

const G  = "var(--y-green)";
const GL = "var(--y-green-light)";
const GP = "var(--y-green-pale)";
const R  = "var(--y-red)";
const D  = "var(--y-dark)";
const GR = "var(--y-gray)";

export default function Index() {
  const [carouselIdx, setCarouselIdx] = useState(0);
  const [activeFilter, setActiveFilter] = useState("Все");
  const [menuOpen, setMenuOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  const filtered = activeFilter === "Все" ? PRODUCTS : PRODUCTS.filter(p => p.tag === activeFilter);
  const visibleCount = 3;
  const maxIdx = Math.max(0, filtered.length - visibleCount);

  const prev = () => setCarouselIdx(i => Math.max(0, i - 1));
  const next = () => setCarouselIdx(i => Math.min(maxIdx, i + 1));

  useEffect(() => { setCarouselIdx(0); }, [activeFilter]);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const el = heroRef.current.querySelector(".hero-bg") as HTMLElement;
        if (el) el.style.transform = `translateY(${window.scrollY * 0.28}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div style={{ background: "#fff", color: D, fontFamily: "'Golos Text', sans-serif" }}>

      {/* NAV */}
      <nav style={{ background: G, position: "fixed", top: 0, left: 0, right: 0, zIndex: 50 }}>
        <div style={{ height: "4px", background: `linear-gradient(90deg, ${R} 0%, #f4a261 50%, ${R} 100%)` }} />
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: "66px" }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "40px", height: "40px", background: R, borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: "20px" }}>🌿</span>
            </div>
            <div>
              <div style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 800, fontSize: "20px", color: "#fff", letterSpacing: "0.05em", lineHeight: 1 }}>ЙОЛА</div>
              <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.6)", letterSpacing: "0.15em", textTransform: "uppercase" }}>Аграхолдинг</div>
            </div>
          </div>

          {/* Links */}
          <div className="hidden md:flex" style={{ gap: "32px", alignItems: "center" }}>
            {(["#segments", "#catalog", "#about", "#stores"] as const).map((href, i) => (
              <a key={href} href={href} className="nav-link"
                style={{ color: "rgba(255,255,255,0.88)", fontSize: "14px", fontWeight: 500, textDecoration: "none" }}>
                {["Покупателям", "Продукция", "О нас", "Магазины"][i]}
              </a>
            ))}
          </div>

          <a href="#segments"
            style={{ background: R, color: "#fff", padding: "10px 22px", borderRadius: "6px", fontWeight: 700, fontSize: "14px", textDecoration: "none" }}
            className="hidden md:inline-block">
            Сделать выбор
          </a>

          <button className="flex md:hidden" onClick={() => setMenuOpen(o => !o)}
            style={{ background: "none", border: "none", color: "#fff", cursor: "pointer" }}>
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {menuOpen && (
          <div style={{ background: D, padding: "16px 24px 20px" }}>
            {(["#segments", "#catalog", "#about", "#stores"] as const).map((href, i) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)}
                style={{ display: "block", color: "#fff", padding: "10px 0", fontSize: "15px", textDecoration: "none", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                {["Покупателям", "Продукция", "О нас", "Магазины"][i]}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section ref={heroRef} id="hero" style={{ position: "relative", height: "100vh", overflow: "hidden", marginTop: "70px" }}>
        <div className="hero-bg" style={{ position: "absolute", inset: 0, willChange: "transform" }}>
          <img src={HERO_IMAGE} alt="Пастбища Йолы"
            style={{ width: "100%", height: "110%", objectFit: "cover", objectPosition: "center 30%" }} />
        </div>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(26,46,34,0.85) 0%, rgba(26,46,34,0.45) 60%, transparent 100%)" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "5px", background: G, zIndex: 2 }} />

        <div style={{ position: "relative", zIndex: 1, height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 6vw", maxWidth: "680px" }}>
          <div className="animate-fade-in-up delay-200"
            style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: R, color: "#fff", padding: "5px 14px", borderRadius: "4px", fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "22px", width: "fit-content", opacity: 0 }}>
            🌿 Экологически чистое производство
          </div>
          <h1 className="animate-fade-in-up delay-400"
            style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 800, fontSize: "clamp(36px, 5.5vw, 68px)", color: "#fff", lineHeight: 1.12, margin: "0 0 18px", opacity: 0 }}>
            Мясо с фермы —<br />
            <span style={{ color: "#74c69d" }}>прямо к вашему столу</span>
          </h1>
          <p className="animate-fade-in-up delay-600"
            style={{ color: "rgba(255,255,255,0.78)", fontSize: "17px", lineHeight: 1.65, marginBottom: "34px", maxWidth: "460px", opacity: 0 }}>
            Аграхолдинг Йола — натуральная мясная продукция с пастбищ Республики Марий Эл. Без химии, с заботой о природе.
          </p>
          <div className="animate-fade-in-up delay-800" style={{ display: "flex", gap: "12px", flexWrap: "wrap", opacity: 0 }}>
            <a href="#segments"
              style={{ background: R, color: "#fff", padding: "14px 30px", borderRadius: "6px", fontWeight: 700, fontSize: "15px", textDecoration: "none", display: "flex", alignItems: "center", gap: "8px" }}>
              Сделать выбор <Icon name="ArrowRight" size={18} />
            </a>
            <a href="#catalog"
              style={{ background: "rgba(255,255,255,0.14)", color: "#fff", padding: "14px 28px", borderRadius: "6px", fontWeight: 600, fontSize: "15px", textDecoration: "none", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.22)" }}>
              Каталог продукции
            </a>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <div style={{ background: D, padding: "28px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "8px" }}>
          {STATS.map(s => (
            <div key={s.label} style={{ display: "flex", alignItems: "center", gap: "14px", padding: "8px 12px" }}>
              <div style={{ width: "42px", height: "42px", background: "rgba(116,198,157,0.12)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon name={s.icon} size={20} style={{ color: "#74c69d" }} />
              </div>
              <div>
                <div style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 800, fontSize: "22px", color: "#fff", lineHeight: 1 }}>{s.num}</div>
                <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.45)", marginTop: "2px" }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* B2B / B2C */}
      <section id="segments" style={{ background: "#fff", padding: "80px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <p style={{ color: R, fontSize: "12px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "10px" }}>Для кого мы работаем</p>
            <h2 style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 800, fontSize: "clamp(26px, 4vw, 42px)", color: D, margin: 0 }}>Выберите свой формат</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
            {/* B2C */}
            <div style={{ border: `2px solid ${G}`, borderRadius: "12px", overflow: "hidden", cursor: "pointer", transition: "transform .25s, box-shadow .25s" }}
              onMouseOver={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(-4px)"; el.style.boxShadow = "0 16px 40px rgba(45,106,79,0.14)"; }}
              onMouseOut={e => { const el = e.currentTarget as HTMLElement; el.style.transform = ""; el.style.boxShadow = ""; }}>
              <div style={{ background: G, padding: "24px 28px 18px" }}>
                <span style={{ background: "rgba(255,255,255,0.15)", color: "#fff", padding: "3px 12px", borderRadius: "4px", fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>Частным покупателям</span>
                <h3 style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 800, fontSize: "26px", color: "#fff", margin: "14px 0 0" }}>Свежее мясо<br />для семьи</h3>
              </div>
              <div style={{ padding: "22px 28px 28px" }}>
                <p style={{ color: GR, fontSize: "15px", lineHeight: 1.6, marginBottom: "18px" }}>Покупайте натуральную фермерскую продукцию напрямую. Никаких посредников — только свежесть с пастбища.</p>
                {["Доставка по городу", "Фирменные магазины", "Гарантия свежести"].map(f => (
                  <div key={f} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px", fontSize: "14px", color: D }}>
                    <div style={{ width: "20px", height: "20px", background: GP, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon name="Check" size={12} style={{ color: G }} />
                    </div>
                    {f}
                  </div>
                ))}
                <button style={{ marginTop: "18px", width: "100%", background: G, color: "#fff", padding: "13px", borderRadius: "7px", border: "none", fontWeight: 700, fontSize: "14px", cursor: "pointer" }}>
                  Перейти в каталог →
                </button>
              </div>
            </div>

            {/* B2B */}
            <div style={{ border: `2px solid ${R}`, borderRadius: "12px", overflow: "hidden", cursor: "pointer", transition: "transform .25s, box-shadow .25s" }}
              onMouseOver={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(-4px)"; el.style.boxShadow = "0 16px 40px rgba(214,40,40,0.12)"; }}
              onMouseOut={e => { const el = e.currentTarget as HTMLElement; el.style.transform = ""; el.style.boxShadow = ""; }}>
              <div style={{ background: R, padding: "24px 28px 18px" }}>
                <span style={{ background: "rgba(255,255,255,0.15)", color: "#fff", padding: "3px 12px", borderRadius: "4px", fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>Для бизнеса / B2B</span>
                <h3 style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 800, fontSize: "26px", color: "#fff", margin: "14px 0 0" }}>Оптовые<br />поставки</h3>
              </div>
              <div style={{ padding: "22px 28px 28px" }}>
                <p style={{ color: GR, fontSize: "15px", lineHeight: 1.6, marginBottom: "18px" }}>Рестораны, кафе, отели и ретейл — стабильные поставки экологически чистой продукции по договору.</p>
                {["Оптовые объёмы и цены", "Постоянный ассортимент", "Договор и сертификаты"].map(f => (
                  <div key={f} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px", fontSize: "14px", color: D }}>
                    <div style={{ width: "20px", height: "20px", background: "#fde8e8", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon name="Check" size={12} style={{ color: R }} />
                    </div>
                    {f}
                  </div>
                ))}
                <button style={{ marginTop: "18px", width: "100%", background: R, color: "#fff", padding: "13px", borderRadius: "7px", border: "none", fontWeight: 700, fontSize: "14px", cursor: "pointer" }}>
                  Запросить условия →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATALOG */}
      <section id="catalog" className="stripe-bg" style={{ padding: "80px 24px", background: "#f7fcf8" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "36px" }}>
            <p style={{ color: R, fontSize: "12px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "10px" }}>Прямо с фермы</p>
            <h2 style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 800, fontSize: "clamp(26px, 4vw, 42px)", color: D, margin: 0 }}>Наша продукция</h2>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "8px", marginBottom: "36px" }}>
            {FILTERS.map(f => (
              <button key={f} onClick={() => setActiveFilter(f)}
                style={{ padding: "7px 18px", borderRadius: "5px", border: `2px solid ${activeFilter === f ? G : "rgba(45,106,79,0.2)"}`, background: activeFilter === f ? G : "#fff", color: activeFilter === f ? "#fff" : G, fontWeight: 600, fontSize: "13px", cursor: "pointer", transition: "all .2s" }}>
                {f}
              </button>
            ))}
          </div>

          <div style={{ position: "relative", overflow: "hidden" }}>
            <div className="carousel-track" style={{ transform: `translateX(calc(-${carouselIdx} * (100% / ${visibleCount} + 0.5rem)))` }}>
              {filtered.map(p => (
                <div key={p.id}
                  style={{ flexShrink: 0, width: `calc(${100 / visibleCount}% - 1rem)`, minWidth: "260px", background: "#fff", borderRadius: "10px", overflow: "hidden", border: "1px solid rgba(45,106,79,0.1)", transition: "box-shadow .25s, transform .25s" }}
                  onMouseOver={e => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = "0 10px 28px rgba(45,106,79,0.12)"; el.style.transform = "translateY(-2px)"; }}
                  onMouseOut={e => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = ""; el.style.transform = ""; }}>
                  <div style={{ position: "relative", height: "220px", overflow: "hidden" }}>
                    <img src={p.img} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    <span style={{ position: "absolute", top: "12px", left: "12px", background: R, color: "#fff", padding: "3px 10px", borderRadius: "4px", fontSize: "11px", fontWeight: 700, letterSpacing: "0.05em" }}>{p.tag}</span>
                  </div>
                  <div style={{ padding: "18px 20px 20px" }}>
                    <h3 style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 700, fontSize: "17px", color: D, marginBottom: "6px" }}>{p.name}</h3>
                    <p style={{ fontSize: "13px", color: GR, lineHeight: 1.5 }}>{p.desc}</p>
                    <div style={{ marginTop: "12px", display: "flex", alignItems: "center", gap: "5px", fontSize: "12px", color: GL, fontWeight: 600 }}>
                      <Icon name="Leaf" size={13} /> Натуральный продукт
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {carouselIdx > 0 && (
              <button onClick={prev}
                style={{ position: "absolute", left: "-18px", top: "50%", transform: "translateY(-50%)", width: "44px", height: "44px", background: G, color: "#fff", borderRadius: "50%", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(45,106,79,0.3)", zIndex: 10 }}>
                <Icon name="ChevronLeft" size={20} />
              </button>
            )}
            {carouselIdx < maxIdx && (
              <button onClick={next}
                style={{ position: "absolute", right: "-18px", top: "50%", transform: "translateY(-50%)", width: "44px", height: "44px", background: G, color: "#fff", borderRadius: "50%", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(45,106,79,0.3)", zIndex: 10 }}>
                <Icon name="ChevronRight" size={20} />
              </button>
            )}
          </div>

          {maxIdx > 0 && (
            <div style={{ display: "flex", justifyContent: "center", gap: "6px", marginTop: "22px" }}>
              {Array.from({ length: maxIdx + 1 }).map((_, i) => (
                <button key={i} onClick={() => setCarouselIdx(i)}
                  style={{ height: "6px", borderRadius: "3px", border: "none", cursor: "pointer", background: i === carouselIdx ? G : "rgba(45,106,79,0.2)", width: i === carouselIdx ? "28px" : "8px", transition: "all .2s" }} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* О НАС */}
      <section id="about" style={{ background: "#fff", padding: "80px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "60px", alignItems: "center" }}>
          {/* Фото */}
          <div style={{ position: "relative" }}>
            <div style={{ borderRadius: "12px", overflow: "hidden", aspectRatio: "4/3" }}>
              <img src={HERO_IMAGE} alt="Ферма Йола" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={{ position: "absolute", bottom: "-18px", right: "24px", background: "#fff", border: `3px solid ${G}`, borderRadius: "10px", padding: "14px 20px", boxShadow: "0 8px 24px rgba(0,0,0,0.1)" }}>
              <div style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 800, fontSize: "28px", color: G, lineHeight: 1 }}>2000</div>
              <div style={{ fontSize: "12px", color: GR, fontWeight: 600 }}>га пастбищ</div>
            </div>
            <div style={{ position: "absolute", top: "24px", left: "-5px", width: "5px", height: "80px", background: R, borderRadius: "0 4px 4px 0" }} />
          </div>

          {/* Текст */}
          <div>
            <p style={{ color: R, fontSize: "12px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "12px" }}>История Йолы</p>
            <h2 style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 800, fontSize: "clamp(24px, 3.5vw, 40px)", color: D, lineHeight: 1.15, margin: "0 0 18px" }}>
              Выращено с любовью<br /><span style={{ color: G }}>к земле и природе</span>
            </h2>
            <p style={{ color: GR, fontSize: "15px", lineHeight: 1.7, marginBottom: "14px" }}>
              Аграхолдинг Йола — семейное хозяйство с многолетней историей. Качество начинается задолго до прилавка: с чистых пастбищ, свежего воздуха и бережного отношения к каждому животному.
            </p>
            <p style={{ color: GR, fontSize: "15px", lineHeight: 1.7, marginBottom: "28px" }}>
              Наши угодья — вдали от промышленных зон. Животные питаются натуральным кормом на свободном выгуле.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                { icon: "Leaf",        text: "Без ГМО, без антибиотиков, без гормонов роста" },
                { icon: "Truck",       text: "Прямая доставка с фермы в магазины и рестораны" },
                { icon: "ShieldCheck", text: "Ветеринарные сертификаты на всю продукцию" },
              ].map(item => (
                <div key={item.text} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                  <div style={{ width: "36px", height: "36px", background: GP, borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon name={item.icon} size={18} style={{ color: G }} />
                  </div>
                  <p style={{ fontSize: "14px", color: D, margin: "8px 0 0", lineHeight: 1.45 }}>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* МАГАЗИНЫ */}
      <section id="stores" style={{ background: "#f7fcf8", padding: "80px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <p style={{ color: R, fontSize: "12px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "10px" }}>Найдите нас рядом</p>
            <h2 style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 800, fontSize: "clamp(26px, 4vw, 42px)", color: D, margin: 0 }}>Наши магазины</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px", marginBottom: "36px" }}>
            {STORES.map((s, i) => (
              <div key={i}
                style={{ background: "#fff", borderRadius: "10px", padding: "20px 22px", border: "1px solid rgba(45,106,79,0.12)", display: "flex", gap: "14px", alignItems: "flex-start", transition: "box-shadow .2s, transform .2s" }}
                onMouseOver={e => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = "0 8px 24px rgba(45,106,79,0.1)"; el.style.transform = "translateY(-2px)"; }}
                onMouseOut={e => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = ""; el.style.transform = ""; }}>
                <div style={{ width: "44px", height: "44px", background: GP, borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon name="MapPin" size={20} style={{ color: G }} />
                </div>
                <div>
                  <div style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 700, fontSize: "15px", color: D, marginBottom: "4px" }}>{s.name}</div>
                  <div style={{ fontSize: "13px", color: GR, marginBottom: "4px" }}>{s.address}</div>
                  <div style={{ fontSize: "12px", color: GL, fontWeight: 600, display: "flex", alignItems: "center", gap: "4px" }}>
                    <Icon name="Clock" size={12} /> {s.hours}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ borderRadius: "12px", overflow: "hidden", border: "2px solid rgba(45,106,79,0.15)", height: "400px" }}>
            <iframe
              src="https://yandex.ru/map-widget/v1/?ll=49.1221%2C55.7887&z=12&l=map"
              width="100%" height="100%"
              style={{ border: "none", display: "block" }}
              title="Карта магазинов Йола" />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: D, padding: "56px 24px 32px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "40px", marginBottom: "48px" }}>
            {/* Brand */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
                <div style={{ width: "36px", height: "36px", background: R, borderRadius: "7px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: "18px" }}>🌿</span>
                </div>
                <span style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 800, fontSize: "20px", color: "#fff", letterSpacing: "0.05em" }}>ЙОЛА</span>
              </div>
              <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.45)", lineHeight: 1.6, maxWidth: "210px" }}>
                Натуральная мясная продукция с экологически чистых пастбищ Республики Марий Эл.
              </p>
              <div style={{ marginTop: "18px", display: "flex", gap: "8px" }}>
                {["Send", "Globe"].map(ic => (
                  <a key={ic} href="#"
                    style={{ width: "36px", height: "36px", background: "rgba(255,255,255,0.07)", borderRadius: "7px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon name={ic} size={16} style={{ color: "rgba(255,255,255,0.55)" }} />
                  </a>
                ))}
              </div>
            </div>

            {/* Nav */}
            <div>
              <div style={{ color: "#fff", fontWeight: 700, fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "14px" }}>Навигация</div>
              {["Продукция", "Покупателям", "Оптовикам", "О нас", "Магазины"].map(l => (
                <a key={l} href="#"
                  style={{ display: "block", color: "rgba(255,255,255,0.45)", fontSize: "14px", textDecoration: "none", marginBottom: "9px" }}>
                  {l}
                </a>
              ))}
            </div>

            {/* Contacts */}
            <div>
              <div style={{ color: "#fff", fontWeight: 700, fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "14px" }}>Контакты</div>
              {[
                { icon: "Phone",  text: "+7 (XXX) XXX-XX-XX" },
                { icon: "Mail",   text: "info@yola-agro.ru" },
                { icon: "MapPin", text: "Республика Марий Эл" },
              ].map(c => (
                <div key={c.text} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "11px", color: "rgba(255,255,255,0.45)", fontSize: "14px" }}>
                  <Icon name={c.icon} size={14} style={{ color: "#74c69d", flexShrink: 0 }} />
                  {c.text}
                </div>
              ))}
            </div>

            {/* Eco badge */}
            <div>
              <div style={{ background: "rgba(45,106,79,0.18)", border: "1px solid rgba(64,145,108,0.25)", borderRadius: "10px", padding: "20px" }}>
                <div style={{ fontSize: "30px", marginBottom: "8px" }}>🌿</div>
                <div style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 700, fontSize: "14px", color: "#74c69d", marginBottom: "6px" }}>Экосертификат</div>
                <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", lineHeight: 1.5 }}>
                  Вся продукция проходит ветеринарный контроль и соответствует стандартам экологически чистого производства
                </p>
              </div>
            </div>
          </div>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "22px", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "10px" }}>
            <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.28)" }}>© 2024 Аграхолдинг Йола. Все права защищены.</p>
            <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.28)" }}>Натуральное · Экологичное · Фермерское</p>
          </div>
        </div>
      </footer>
    </div>
  );
}