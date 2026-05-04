import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/ef865f98-91a8-4646-8ad7-ebc6b810f53e/files/03dbfd91-3334-4cc6-b62e-03a0c93009b5.jpg";

const PRODUCTS = [
  {
    id: 1,
    name: "Говядина мраморная",
    desc: "Отборная говядина с пастбищного откорма, богатая вкусом и ароматом",
    img: "https://cdn.poehali.dev/projects/ef865f98-91a8-4646-8ad7-ebc6b810f53e/files/27654ab0-0dde-4408-9cf5-e5078abcffcd.jpg",
    tag: "Премиум",
  },
  {
    id: 2,
    name: "Стейки и отбивные",
    desc: "Идеальная нарезка для гриля — из животных, выращенных на натуральном корме",
    img: "https://cdn.poehali.dev/projects/ef865f98-91a8-4646-8ad7-ebc6b810f53e/files/0f95dd7c-5c02-466b-bd5a-a3bb478c237d.jpg",
    tag: "Для гриля",
  },
  {
    id: 3,
    name: "Фермерские колбасы",
    desc: "Ручное производство без консервантов, по старинным рецептам",
    img: "https://cdn.poehali.dev/projects/ef865f98-91a8-4646-8ad7-ebc6b810f53e/files/27654ab0-0dde-4408-9cf5-e5078abcffcd.jpg",
    tag: "Ремесленное",
  },
  {
    id: 4,
    name: "Свинина фермерская",
    desc: "Нежное мясо от свиней свободного выгула на экологически чистых угодьях",
    img: "https://cdn.poehali.dev/projects/ef865f98-91a8-4646-8ad7-ebc6b810f53e/files/0f95dd7c-5c02-466b-bd5a-a3bb478c237d.jpg",
    tag: "Натуральное",
  },
  {
    id: 5,
    name: "Баранина",
    desc: "Молодая баранина с горных пастбищ — нежная, ароматная, полезная",
    img: "https://cdn.poehali.dev/projects/ef865f98-91a8-4646-8ad7-ebc6b810f53e/files/27654ab0-0dde-4408-9cf5-e5078abcffcd.jpg",
    tag: "Деликатес",
  },
];

const STORES = [
  { name: "Магазин «Йола» на Ленина", address: "ул. Ленина, 45" },
  { name: "Фирменный отдел ТЦ Центральный", address: "пр. Октябрьский, 12" },
  { name: "Магазин «Йола» на Мира", address: "ул. Мира, 78" },
];

export default function Index() {
  const [carouselIdx, setCarouselIdx] = useState(0);
  const [activeFilter, setActiveFilter] = useState("Все");
  const heroRef = useRef<HTMLDivElement>(null);

  const filters = ["Все", "Премиум", "Для гриля", "Ремесленное", "Натуральное", "Деликатес"];
  const filtered = activeFilter === "Все" ? PRODUCTS : PRODUCTS.filter(p => p.tag === activeFilter);

  const visibleCount = 3;
  const maxIdx = Math.max(0, filtered.length - visibleCount);

  const prev = () => setCarouselIdx(i => Math.max(0, i - 1));
  const next = () => setCarouselIdx(i => Math.min(maxIdx, i + 1));

  useEffect(() => { setCarouselIdx(0); }, [activeFilter]);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrolled = window.scrollY;
        const el = heroRef.current.querySelector('.hero-bg') as HTMLElement;
        if (el) el.style.transform = `translateY(${scrolled * 0.3}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: 'var(--yola-cream)', color: 'var(--yola-bark)' }}>

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4"
        style={{ background: 'rgba(61,43,26,0.88)', backdropFilter: 'blur(12px)' }}>
        <div className="flex items-center gap-2">
          <span className="text-3xl font-bold tracking-wider"
            style={{ fontFamily: 'Cormorant Garamond, serif', color: 'var(--yola-sand)' }}>
            ЙОЛА
          </span>
          <span className="text-xs tracking-widest uppercase ml-2"
            style={{ color: 'var(--yola-sage)', marginTop: '4px' }}>Аграхолдинг</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm tracking-wide"
          style={{ color: 'var(--yola-sand)' }}>
          <a href="#segments" className="nav-link hover:opacity-80 transition-opacity">Покупателям</a>
          <a href="#catalog" className="nav-link hover:opacity-80 transition-opacity">Продукция</a>
          <a href="#about" className="nav-link hover:opacity-80 transition-opacity">О нас</a>
          <a href="#stores" className="nav-link hover:opacity-80 transition-opacity">Магазины</a>
        </div>
        <a href="#segments"
          className="px-5 py-2 text-sm font-medium tracking-wide transition-all hover:opacity-90 hover:scale-105"
          style={{ background: 'var(--yola-terracotta)', color: '#fff', borderRadius: '50px' }}>
          Сделать выбор
        </a>
      </nav>

      {/* HERO */}
      <section ref={heroRef} className="relative h-screen overflow-hidden texture-overlay" id="hero">
        <div className="hero-bg absolute inset-0 will-change-transform">
          <img src={HERO_IMAGE} alt="Пастбища Йолы"
            className="w-full h-full object-cover scale-110"
            style={{ transformOrigin: 'center top' }} />
        </div>
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(61,43,26,0.3) 0%, rgba(61,43,26,0.05) 40%, rgba(61,43,26,0.75) 100%)' }} />

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
          style={{ paddingTop: '80px' }}>
          <p className="animate-fade-in-up delay-200 text-xs tracking-[0.4em] uppercase mb-6"
            style={{ color: 'var(--yola-sand)', opacity: 0 }}>
            Натуральное · Экологичное · Своё
          </p>
          <h1 className="animate-fade-in-up delay-400 text-6xl md:text-8xl font-light italic mb-4"
            style={{ color: '#fff', opacity: 0, fontFamily: 'Cormorant Garamond, serif', lineHeight: 1.1 }}>
            С пастбища<br />
            <span style={{ color: 'var(--yola-sand)' }}>на ваш стол</span>
          </h1>
          <p className="animate-fade-in-up delay-600 max-w-xl text-lg mb-10 font-light"
            style={{ color: 'rgba(245,239,230,0.85)', opacity: 0 }}>
            Аграхолдинг Йола — живое хозяйство, где каждое животное растёт на свободных лугах и чистом воздухе
          </p>
          <a href="#segments"
            className="animate-fade-in-up delay-800 inline-flex items-center gap-3 px-10 py-4 text-base font-medium tracking-wide transition-all hover:scale-105 hover:shadow-2xl"
            style={{ background: 'var(--yola-terracotta)', color: '#fff', borderRadius: '50px', opacity: 0 }}>
            Сделать выбор
            <Icon name="ArrowDown" size={18} />
          </a>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <div className="w-6 h-10 border-2 rounded-full flex items-start justify-center p-1"
            style={{ borderColor: 'rgba(212,184,150,0.6)' }}>
            <div className="w-1 h-3 rounded-full" style={{ background: 'var(--yola-sand)' }} />
          </div>
        </div>
      </section>

      {/* B2B / B2C */}
      <section id="segments" className="py-24 px-6" style={{ background: 'var(--yola-cream)' }}>
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-xs tracking-[0.4em] uppercase mb-3"
            style={{ color: 'var(--yola-terracotta)' }}>Выберите свой путь</p>
          <h2 className="text-center text-5xl font-light italic mb-16"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Для кого мы работаем
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* B2C */}
            <div className="relative overflow-hidden group cursor-pointer rounded-3xl p-10 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1"
              style={{ background: 'linear-gradient(135deg, #6B3F2A 0%, #3D2B1A 100%)' }}>
              <div className="absolute top-0 right-0 w-64 h-64 blob-shape opacity-10"
                style={{ background: 'var(--yola-sand)', transform: 'translate(30%, -30%)' }} />
              <div className="relative z-10">
                <span className="inline-block text-xs tracking-widest uppercase px-3 py-1 rounded-full mb-6"
                  style={{ background: 'rgba(212,184,150,0.2)', color: 'var(--yola-sand)' }}>
                  Частным покупателям
                </span>
                <h3 className="text-4xl font-light italic mb-4"
                  style={{ color: '#fff', fontFamily: 'Cormorant Garamond, serif' }}>
                  Свежее мясо<br />для вашей семьи
                </h3>
                <p className="mb-8 font-light" style={{ color: 'rgba(245,239,230,0.75)' }}>
                  Покупайте натуральную фермерскую продукцию напрямую. Никаких посредников — только свежесть с пастбища.
                </p>
                <div className="flex flex-col gap-3 mb-10">
                  {["Доставка по городу", "Фирменные магазины", "Гарантия свежести"].map(f => (
                    <div key={f} className="flex items-center gap-2 text-sm" style={{ color: 'var(--yola-sand)' }}>
                      <Icon name="Check" size={16} />
                      {f}
                    </div>
                  ))}
                </div>
                <button className="px-8 py-3 text-sm font-medium tracking-wide rounded-full transition-all group-hover:shadow-lg hover:opacity-90"
                  style={{ background: 'var(--yola-sand)', color: 'var(--yola-bark)' }}>
                  В магазин →
                </button>
              </div>
            </div>

            {/* B2B */}
            <div className="relative overflow-hidden group cursor-pointer rounded-3xl p-10 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1"
              style={{ background: 'linear-gradient(135deg, #5C6B3A 0%, #3A4525 100%)' }}>
              <div className="absolute top-0 right-0 w-64 h-64 blob-shape opacity-10"
                style={{ background: 'var(--yola-sage)', transform: 'translate(30%, -30%)' }} />
              <div className="relative z-10">
                <span className="inline-block text-xs tracking-widest uppercase px-3 py-1 rounded-full mb-6"
                  style={{ background: 'rgba(139,158,107,0.25)', color: 'var(--yola-sage)' }}>
                  Для бизнеса
                </span>
                <h3 className="text-4xl font-light italic mb-4"
                  style={{ color: '#fff', fontFamily: 'Cormorant Garamond, serif' }}>
                  Оптовые<br />поставки
                </h3>
                <p className="mb-8 font-light" style={{ color: 'rgba(245,239,230,0.75)' }}>
                  Рестораны, кафе, отели и ретейл — мы обеспечиваем стабильные поставки экологически чистой продукции по договору.
                </p>
                <div className="flex flex-col gap-3 mb-10">
                  {["Оптовые объёмы и цены", "Постоянный ассортимент", "Договор и сертификаты"].map(f => (
                    <div key={f} className="flex items-center gap-2 text-sm" style={{ color: 'var(--yola-sage)' }}>
                      <Icon name="Check" size={16} />
                      {f}
                    </div>
                  ))}
                </div>
                <button className="px-8 py-3 text-sm font-medium tracking-wide rounded-full transition-all group-hover:shadow-lg hover:opacity-90"
                  style={{ background: 'var(--yola-sage)', color: '#fff' }}>
                  Запросить условия →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* КАТАЛОГ / КАРУСЕЛЬ */}
      <section id="catalog" className="py-24 px-6" style={{ background: '#EDE5D8' }}>
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-xs tracking-[0.4em] uppercase mb-3"
            style={{ color: 'var(--yola-terracotta)' }}>Прямо с фермы</p>
          <h2 className="text-center text-5xl font-light italic mb-10"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Наша продукция
          </h2>

          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {filters.map(f => (
              <button key={f}
                onClick={() => setActiveFilter(f)}
                className="px-5 py-2 text-sm rounded-full transition-all hover:shadow-md"
                style={{
                  background: activeFilter === f ? 'var(--yola-earth)' : 'rgba(107,63,42,0.1)',
                  color: activeFilter === f ? '#fff' : 'var(--yola-earth)',
                }}>
                {f}
              </button>
            ))}
          </div>

          <div className="relative overflow-hidden">
            <div className="carousel-track"
              style={{ transform: `translateX(calc(-${carouselIdx} * (100% / ${visibleCount} + 0.5rem)))` }}>
              {filtered.map(p => (
                <div key={p.id}
                  className="flex-shrink-0 rounded-2xl overflow-hidden group cursor-pointer"
                  style={{ width: `calc(${100 / visibleCount}% - 1rem)`, background: '#fff', minWidth: '260px' }}>
                  <div className="relative overflow-hidden" style={{ height: '240px' }}>
                    <img src={p.img} alt={p.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <span className="absolute top-4 left-4 text-xs tracking-wide px-3 py-1 rounded-full"
                      style={{ background: 'var(--yola-terracotta)', color: '#fff' }}>
                      {p.tag}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2"
                      style={{ fontFamily: 'Cormorant Garamond, serif', color: 'var(--yola-bark)' }}>
                      {p.name}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--yola-earth)', opacity: 0.8 }}>
                      {p.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {carouselIdx > 0 && (
              <button onClick={prev}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 rounded-full shadow-xl flex items-center justify-center transition-all hover:scale-110 z-10"
                style={{ background: 'var(--yola-earth)', color: '#fff' }}>
                <Icon name="ChevronLeft" size={20} />
              </button>
            )}
            {carouselIdx < maxIdx && (
              <button onClick={next}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 rounded-full shadow-xl flex items-center justify-center transition-all hover:scale-110 z-10"
                style={{ background: 'var(--yola-earth)', color: '#fff' }}>
                <Icon name="ChevronRight" size={20} />
              </button>
            )}
          </div>

          {maxIdx > 0 && (
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: maxIdx + 1 }).map((_, i) => (
                <button key={i} onClick={() => setCarouselIdx(i)}
                  className="h-2 rounded-full transition-all"
                  style={{
                    background: i === carouselIdx ? 'var(--yola-earth)' : 'rgba(107,63,42,0.25)',
                    width: i === carouselIdx ? '24px' : '8px'
                  }} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* О НАС */}
      <section id="about" className="py-24 px-6 overflow-hidden" style={{ background: 'var(--yola-cream)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs tracking-[0.4em] uppercase mb-4" style={{ color: 'var(--yola-terracotta)' }}>
                История Йолы
              </p>
              <h2 className="text-5xl font-light italic mb-8 leading-tight"
                style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                Мы выращиваем<br />
                <span style={{ color: 'var(--yola-terracotta)' }}>с любовью к земле</span>
              </h2>
              <p className="mb-6 leading-relaxed" style={{ color: 'var(--yola-earth)', opacity: 0.85 }}>
                Аграхолдинг Йола — это семейное хозяйство с многолетней историей. Мы убеждены, что качество начинается задолго до прилавка — с чистых пастбищ, свежего воздуха и уважительного отношения к каждому животному.
              </p>
              <p className="mb-10 leading-relaxed" style={{ color: 'var(--yola-earth)', opacity: 0.85 }}>
                Наши угодья расположены вдали от промышленных зон. Животные питаются натуральным кормом, растут на свободном выгуле — это отражается в качестве и вкусе нашей продукции.
              </p>

              <div className="grid grid-cols-3 gap-6">
                {[
                  { num: "15+", label: "Лет работы" },
                  { num: "2000", label: "Га пастбищ" },
                  { num: "30+", label: "Видов продукции" },
                ].map(s => (
                  <div key={s.label} className="text-center p-4 rounded-2xl"
                    style={{ background: 'rgba(107,63,42,0.08)' }}>
                    <div className="text-4xl font-light italic mb-1"
                      style={{ fontFamily: 'Cormorant Garamond, serif', color: 'var(--yola-terracotta)' }}>
                      {s.num}
                    </div>
                    <div className="text-xs tracking-wide" style={{ color: 'var(--yola-earth)' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative h-[500px]">
              <div className="absolute rounded-3xl overflow-hidden shadow-2xl"
                style={{ top: 0, left: '5%', width: '70%', height: '60%' }}>
                <img src={HERO_IMAGE} alt="Пастбища" className="w-full h-full object-cover" />
              </div>
              <div className="absolute rounded-3xl overflow-hidden shadow-xl"
                style={{ bottom: 0, right: 0, width: '58%', height: '55%', border: '4px solid var(--yola-cream)' }}>
                <img src="https://cdn.poehali.dev/projects/ef865f98-91a8-4646-8ad7-ebc6b810f53e/files/27654ab0-0dde-4408-9cf5-e5078abcffcd.jpg"
                  alt="Продукция" className="w-full h-full object-cover" />
              </div>
              <div className="absolute blob-shape w-28 h-28 opacity-25"
                style={{ background: 'var(--yola-terracotta)', bottom: '18%', left: '-2%', zIndex: 0 }} />
            </div>
          </div>
        </div>
      </section>

      {/* КАРТА */}
      <section id="stores" className="py-24 px-6" style={{ background: '#EDE5D8' }}>
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-xs tracking-[0.4em] uppercase mb-3"
            style={{ color: 'var(--yola-terracotta)' }}>Найдите нас</p>
          <h2 className="text-center text-5xl font-light italic mb-16"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Наши магазины
          </h2>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {STORES.map((s, i) => (
              <div key={i}
                className="rounded-2xl p-6 flex items-start gap-4 transition-all hover:shadow-lg hover:-translate-y-1"
                style={{ background: '#fff' }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(107,63,42,0.1)' }}>
                  <Icon name="MapPin" size={20} style={{ color: 'var(--yola-terracotta)' }} />
                </div>
                <div>
                  <h4 className="font-semibold mb-1"
                    style={{ color: 'var(--yola-bark)', fontFamily: 'Cormorant Garamond, serif', fontSize: '18px' }}>
                    {s.name}
                  </h4>
                  <p className="text-sm" style={{ color: 'var(--yola-earth)', opacity: 0.75 }}>{s.address}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-3xl overflow-hidden shadow-xl" style={{ height: '420px', position: 'relative' }}>
            <iframe
              src="https://yandex.ru/map-widget/v1/?ll=49.1221%2C55.7887&z=12&l=map"
              width="100%"
              height="100%"
              style={{ border: 'none' }}
              title="Карта магазинов Йола"
            />
            <div className="absolute inset-0 pointer-events-none rounded-3xl"
              style={{ boxShadow: 'inset 0 0 0 2px rgba(107,63,42,0.15)' }} />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-16 px-6" style={{ background: 'var(--yola-bark)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div className="md:col-span-2">
              <div className="text-4xl font-light italic mb-2"
                style={{ fontFamily: 'Cormorant Garamond, serif', color: 'var(--yola-sand)' }}>
                ЙОЛА
              </div>
              <p className="text-xs tracking-widest uppercase mb-4" style={{ color: 'var(--yola-sage)' }}>Аграхолдинг</p>
              <p className="text-sm leading-relaxed max-w-xs" style={{ color: 'rgba(212,184,150,0.65)' }}>
                Натуральная мясная продукция с экологически чистых пастбищ. С любовью к природе и уважением к вашему столу.
              </p>
            </div>

            <div>
              <p className="text-xs tracking-widest uppercase mb-4" style={{ color: 'var(--yola-sage)' }}>Навигация</p>
              <div className="flex flex-col gap-3">
                {["Продукция", "Покупателям", "Оптовикам", "О нас", "Магазины"].map(l => (
                  <a key={l} href="#" className="text-sm transition-opacity hover:opacity-80"
                    style={{ color: 'rgba(212,184,150,0.75)' }}>{l}</a>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs tracking-widest uppercase mb-4" style={{ color: 'var(--yola-sage)' }}>Контакты</p>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 text-sm" style={{ color: 'rgba(212,184,150,0.75)' }}>
                  <Icon name="Phone" size={14} />
                  +7 (XXX) XXX-XX-XX
                </div>
                <div className="flex items-center gap-2 text-sm" style={{ color: 'rgba(212,184,150,0.75)' }}>
                  <Icon name="Mail" size={14} />
                  info@yola-agro.ru
                </div>
                <div className="flex items-center gap-2 text-sm" style={{ color: 'rgba(212,184,150,0.75)' }}>
                  <Icon name="MapPin" size={14} />
                  Республика Марий Эл
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <a href="#"
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:opacity-80"
                  style={{ background: 'rgba(212,184,150,0.15)' }}>
                  <Icon name="Send" size={16} style={{ color: 'var(--yola-sand)' }} />
                </a>
                <a href="#"
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:opacity-80"
                  style={{ background: 'rgba(212,184,150,0.15)' }}>
                  <Icon name="Globe" size={16} style={{ color: 'var(--yola-sand)' }} />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
            style={{ borderColor: 'rgba(212,184,150,0.15)' }}>
            <p className="text-xs" style={{ color: 'rgba(212,184,150,0.4)' }}>
              © 2024 Аграхолдинг Йола. Все права защищены.
            </p>
            <p className="text-xs" style={{ color: 'rgba(212,184,150,0.4)' }}>
              Натуральный продукт · Экологически чистое производство
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
