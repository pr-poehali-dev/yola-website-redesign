/** Прототип низкой детализации (Low-fidelity wireframe) — Йола */

const C = {
  bg: "#F5F5F5",
  surface: "#FFFFFF",
  block: "#E0E0E0",
  blockDark: "#C8C8C8",
  border: "#CCCCCC",
  borderDark: "#999999",
  text: "#333333",
  textMid: "#666666",
  textLight: "#999999",
  label: "#AAAAAA",
  accent: "#555555",
  accentLight: "#E8E8E8",
  red: "#BBBBBB",
  green: "#AAAAAA",
};

const Box = ({
  w, h, label, sublabel, style, children,
}: {
  w?: string; h?: string; label?: string; sublabel?: string; style?: React.CSSProperties; children?: React.ReactNode;
}) => (
  <div style={{
    width: w ?? "100%", height: h,
    background: C.block, border: `1.5px dashed ${C.borderDark}`,
    borderRadius: "4px", display: "flex", flexDirection: "column",
    alignItems: "center", justifyContent: "center",
    padding: "8px", boxSizing: "border-box", position: "relative",
    ...style,
  }}>
    {label && <span style={{ fontSize: "12px", fontWeight: 700, color: C.textMid, textAlign: "center", lineHeight: 1.3 }}>{label}</span>}
    {sublabel && <span style={{ fontSize: "10px", color: C.label, marginTop: "3px", textAlign: "center" }}>{sublabel}</span>}
    {children}
  </div>
);

const Line = ({ w = "60%", h = "10px", style }: { w?: string; h?: string; style?: React.CSSProperties }) => (
  <div style={{ width: w, height: h, background: C.blockDark, borderRadius: "3px", ...style }} />
);

const Chip = ({ label, dark }: { label: string; dark?: boolean }) => (
  <div style={{
    display: "inline-flex", alignItems: "center", padding: "3px 10px",
    borderRadius: "3px", border: `1.5px solid ${dark ? C.borderDark : C.border}`,
    background: dark ? C.blockDark : C.accentLight,
    fontSize: "11px", fontWeight: 600, color: dark ? C.text : C.textLight,
    whiteSpace: "nowrap",
  }}>{label}</div>
);

const Divider = ({ label }: { label?: string }) => (
  <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "32px 0 24px", opacity: 0.6 }}>
    <div style={{ flex: 1, height: "1px", background: C.border }} />
    {label && <span style={{ fontSize: "10px", color: C.label, whiteSpace: "nowrap", letterSpacing: "0.1em", textTransform: "uppercase" }}>{label}</span>}
    <div style={{ flex: 1, height: "1px", background: C.border }} />
  </div>
);

const SectionLabel = ({ num, title, desc }: { num: string; title: string; desc: string }) => (
  <div style={{ display: "flex", alignItems: "flex-start", gap: "14px", marginBottom: "20px" }}>
    <div style={{ width: "28px", height: "28px", background: C.blockDark, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "12px", fontWeight: 800, color: C.text }}>{num}</div>
    <div>
      <div style={{ fontSize: "13px", fontWeight: 700, color: C.text }}>{title}</div>
      <div style={{ fontSize: "11px", color: C.textLight, marginTop: "2px" }}>{desc}</div>
    </div>
  </div>
);

const Annotation = ({ text, pos }: { text: string; pos?: React.CSSProperties }) => (
  <div style={{
    position: "absolute", background: "#FFFBCC", border: "1px solid #E0D800",
    borderRadius: "4px", padding: "3px 8px", fontSize: "10px", color: "#555500",
    fontWeight: 600, whiteSpace: "nowrap", zIndex: 10, ...pos,
  }}>💬 {text}</div>
);

export default function Wireframe() {
  const W = "900px";

  return (
    <div style={{ background: C.bg, minHeight: "100vh", padding: "32px 24px", fontFamily: "'Golos Text', sans-serif" }}>

      {/* Header */}
      <div style={{ maxWidth: W, margin: "0 auto 40px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
          <div>
            <h1 style={{ fontSize: "20px", fontWeight: 800, color: C.text, margin: 0 }}>Wireframe — Йола</h1>
            <p style={{ fontSize: "12px", color: C.textLight, margin: "4px 0 0" }}>Прототип низкой детализации · Сайт мясного аграхолдинга</p>
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            <Chip label="v1.0" dark />
            <Chip label="Low-fidelity" />
            <Chip label="Desktop 1200px" />
          </div>
        </div>
        <div style={{ height: "2px", background: C.blockDark, borderRadius: "2px", marginTop: "16px" }} />
      </div>

      <div style={{ maxWidth: W, margin: "0 auto" }}>

        {/* ─── 1. NAV ─── */}
        <SectionLabel num="1" title="Навигационная панель" desc="Фиксированная, висит поверх страницы" />
        <div style={{ background: C.blockDark, borderRadius: "6px", padding: "12px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative", marginBottom: "8px" }}>
          <Annotation text="Фиксированный nav, z-index: 50" pos={{ top: "-22px", left: 0 }} />
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Box w="36px" h="36px" style={{ borderRadius: "6px", flexShrink: 0 }} />
            <div>
              <Line w="60px" h="10px" />
              <Line w="40px" h="6px" style={{ marginTop: "4px" }} />
            </div>
          </div>
          {/* Links */}
          <div style={{ display: "flex", gap: "24px" }}>
            {["Покупателям", "Продукция", "О нас", "Магазины"].map(l => (
              <Line key={l} w="70px" h="8px" />
            ))}
          </div>
          {/* CTA */}
          <Box w="130px" h="34px" label="CTA-кнопка" style={{ borderStyle: "solid", background: C.blockDark }} />
        </div>
        <p style={{ fontSize: "10px", color: C.label, marginBottom: "32px" }}>
          ↳ Топ-аккент-полоса (4px), логотип слева, ссылки по центру, кнопка «Сделать выбор» справа
        </p>

        <Divider label="Секция 2 — Hero" />

        {/* ─── 2. HERO ─── */}
        <SectionLabel num="2" title="Hero-секция" desc="Высота = 100vh, параллакс-фон" />
        <div style={{ position: "relative", borderRadius: "8px", overflow: "hidden", marginBottom: "8px" }}>
          <Box w="100%" h="480px" label="" style={{ background: C.block, border: `2px solid ${C.borderDark}`, justifyContent: "flex-start", padding: "40px 48px" }}>
            <Annotation text="Фоновое фото (parallax)" pos={{ top: "16px", right: "16px" }} />
            {/* Overlay hint */}
            <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "55%", background: "rgba(0,0,0,0.08)", borderRight: `1px dashed ${C.border}` }} />
            <div style={{ position: "relative", zIndex: 1, maxWidth: "380px" }}>
              <Chip label="🌿 Экобейдж-плашка" dark />
              <div style={{ marginTop: "18px", display: "flex", flexDirection: "column", gap: "10px" }}>
                <Line w="280px" h="20px" />
                <Line w="220px" h="20px" />
                <Line w="240px" h="20px" />
              </div>
              <div style={{ marginTop: "12px", display: "flex", flexDirection: "column", gap: "6px" }}>
                <Line w="320px" h="8px" />
                <Line w="290px" h="8px" />
                <Line w="260px" h="8px" />
              </div>
              <div style={{ marginTop: "24px", display: "flex", gap: "10px" }}>
                <Box w="140px" h="44px" label="Главная CTA" style={{ borderStyle: "solid", background: C.blockDark }} />
                <Box w="140px" h="44px" label="Вторичная CTA" />
              </div>
            </div>
            {/* Bottom bar */}
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "5px", background: C.borderDark }} />
          </Box>
        </div>
        <p style={{ fontSize: "10px", color: C.label, marginBottom: "32px" }}>
          ↳ Тёмный градиент слева, заголовок + подзаголовок + 2 кнопки. Зелёная полоска-граница внизу секции
        </p>

        <Divider label="Секция 3 — Статистика" />

        {/* ─── 3. STATS ─── */}
        <SectionLabel num="3" title="Полоса статистики" desc="Тёмный фон, 4 показателя" />
        <div style={{ background: C.blockDark, borderRadius: "6px", padding: "20px", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px", marginBottom: "8px" }}>
          {["15+ лет", "2000 га", "30+ видов", "100%"].map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Box w="40px" h="40px" style={{ flexShrink: 0, borderRadius: "7px" }} />
              <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                <Line w="50px" h="12px" />
                <Line w="70px" h="7px" />
              </div>
            </div>
          ))}
        </div>
        <p style={{ fontSize: "10px", color: C.label, marginBottom: "32px" }}>
          ↳ Иконка + крупная цифра + подпись. 4 колонки, тёмный фон-разделитель
        </p>

        <Divider label="Секция 4 — Выбор сегмента" />

        {/* ─── 4. B2C / B2B ─── */}
        <SectionLabel num="4" title="Выбор сегмента (B2C / B2B)" desc="Две карточки — для частных покупателей и бизнеса" />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "8px" }}>
          {["Частным покупателям", "Бизнес / B2B"].map((seg, i) => (
            <div key={i} style={{ border: `2px solid ${C.borderDark}`, borderRadius: "10px", overflow: "hidden" }}>
              <Box h="80px" label={seg} sublabel="Цветная шапка карточки" style={{ borderRadius: 0, border: "none", background: i === 0 ? "#C5C5C5" : "#B8B8B8" }} />
              <div style={{ padding: "16px 18px", display: "flex", flexDirection: "column", gap: "8px", background: "#fff" }}>
                <Line w="90%" h="7px" />
                <Line w="75%" h="7px" />
                {["Пункт 1", "Пункт 2", "Пункт 3"].map(p => (
                  <div key={p} style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                    <Box w="16px" h="16px" style={{ flexShrink: 0, borderRadius: "50%" }} />
                    <Line w="120px" h="7px" />
                  </div>
                ))}
                <Box h="38px" label="CTA-кнопка" style={{ marginTop: "6px", borderStyle: "solid", background: C.blockDark }} />
              </div>
            </div>
          ))}
        </div>
        <p style={{ fontSize: "10px", color: C.label, marginBottom: "32px" }}>
          ↳ Цветная шапка (зелёная / красная) + описание + чек-лист из 3 пунктов + кнопка действия
        </p>

        <Divider label="Секция 5 — Каталог" />

        {/* ─── 5. CATALOG ─── */}
        <SectionLabel num="5" title="Каталог продукции" desc="Фильтры + карусель карточек товаров" />
        {/* filters */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "16px", flexWrap: "wrap" }}>
          {["Все", "Премиум", "Для гриля", "Ремесленное", "Натуральное", "Деликатес"].map((f, i) => (
            <Chip key={f} label={f} dark={i === 0} />
          ))}
        </div>
        {/* cards */}
        <div style={{ position: "relative" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "14px", marginBottom: "8px" }}>
            {[1, 2, 3].map(i => (
              <div key={i} style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: "8px", overflow: "hidden" }}>
                <div style={{ position: "relative" }}>
                  <Box h="160px" label="Фото товара" sublabel="objectFit: cover" style={{ borderRadius: 0, border: "none" }}>
                    {/* X-line */}
                    <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} viewBox="0 0 100 100" preserveAspectRatio="none">
                      <line x1="0" y1="0" x2="100" y2="100" stroke={C.borderDark} strokeWidth="1" />
                      <line x1="100" y1="0" x2="0" y2="100" stroke={C.borderDark} strokeWidth="1" />
                    </svg>
                  </Box>
                  <div style={{ position: "absolute", top: "8px", left: "8px", display: "inline-flex", alignItems: "center", padding: "3px 10px", borderRadius: "3px", border: `1.5px solid ${C.borderDark}`, background: C.blockDark, fontSize: "11px", fontWeight: 600, color: C.text }}>Тег</div>
                </div>
                <div style={{ padding: "12px 14px", display: "flex", flexDirection: "column", gap: "7px" }}>
                  <Line w="80%" h="9px" />
                  <Line w="95%" h="7px" />
                  <Line w="70%" h="7px" />
                  <div style={{ display: "flex", alignItems: "center", gap: "5px", marginTop: "4px" }}>
                    <Box w="14px" h="14px" style={{ flexShrink: 0, borderRadius: "2px" }} />
                    <Line w="100px" h="6px" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* nav arrows */}
          <Box w="36px" h="36px" style={{ position: "absolute", left: "-18px", top: "80px", borderRadius: "50%", background: C.blockDark }} />
          <Box w="36px" h="36px" style={{ position: "absolute", right: "-18px", top: "80px", borderRadius: "50%", background: C.blockDark }} />
        </div>
        {/* dots */}
        <div style={{ display: "flex", justifyContent: "center", gap: "5px", margin: "12px 0 8px" }}>
          {[1, 2].map((d, i) => (
            <div key={d} style={{ height: "6px", borderRadius: "3px", background: C.blockDark, width: i === 0 ? "24px" : "8px" }} />
          ))}
        </div>
        <p style={{ fontSize: "10px", color: C.label, marginBottom: "32px" }}>
          ↳ Фильтры сверху → карусель 3 карточки → стрелки «‹ ›» + точки-пагинация
        </p>

        <Divider label="Секция 6 — О нас" />

        {/* ─── 6. ABOUT ─── */}
        <SectionLabel num="6" title="О нас / История" desc="Фото + текстовый блок, 2 колонки" />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", alignItems: "start", marginBottom: "8px" }}>
          {/* photo */}
          <div style={{ position: "relative" }}>
            <Box h="280px" label="Фото фермы" sublabel="aspectRatio 4:3">
              <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} viewBox="0 0 100 100" preserveAspectRatio="none">
                <line x1="0" y1="0" x2="100" y2="100" stroke={C.borderDark} strokeWidth="1" />
                <line x1="100" y1="0" x2="0" y2="100" stroke={C.borderDark} strokeWidth="1" />
              </svg>
            </Box>
            {/* badge */}
            <div style={{ position: "absolute", bottom: "-16px", right: "16px", background: "#fff", border: `2px solid ${C.borderDark}`, borderRadius: "8px", padding: "10px 14px" }}>
              <Line w="40px" h="14px" />
              <Line w="50px" h="7px" style={{ marginTop: "4px" }} />
            </div>
            {/* red stripe */}
            <div style={{ position: "absolute", top: "20px", left: "-5px", width: "5px", height: "70px", background: C.blockDark, borderRadius: "0 3px 3px 0" }} />
            <Annotation text="Декор-бейдж: «2000 га»" pos={{ bottom: "-38px", right: "16px" }} />
          </div>

          {/* text */}
          <div style={{ paddingTop: "8px" }}>
            <Chip label="Overline: подзаголовок" />
            <div style={{ margin: "14px 0 10px", display: "flex", flexDirection: "column", gap: "8px" }}>
              <Line w="90%" h="14px" />
              <Line w="70%" h="14px" />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "5px", marginBottom: "20px" }}>
              {[95, 85, 90, 78, 80].map((w, i) => (
                <Line key={i} w={`${w}%`} h="7px" />
              ))}
            </div>
            {[1, 2, 3].map(i => (
              <div key={i} style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
                <Box w="32px" h="32px" style={{ flexShrink: 0, borderRadius: "7px" }} />
                <Line w="85%" h="8px" style={{ alignSelf: "center" }} />
              </div>
            ))}
          </div>
        </div>
        <p style={{ fontSize: "10px", color: C.label, marginBottom: "32px", marginTop: "40px" }}>
          ↳ Слева фото с декор-бейджем, справа — overline + заголовок + 2 абзаца + 3 иконки-тезиса
        </p>

        <Divider label="Секция 7 — Магазины" />

        {/* ─── 7. STORES ─── */}
        <SectionLabel num="7" title="Наши магазины" desc="3 карточки адресов + карта Яндекс" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginBottom: "16px" }}>
          {[1, 2, 3].map(i => (
            <div key={i} style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: "8px", padding: "14px 16px", display: "flex", gap: "10px" }}>
              <Box w="38px" h="38px" style={{ flexShrink: 0, borderRadius: "7px" }} />
              <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                <Line w="120px" h="8px" />
                <Line w="90px" h="7px" />
                <Line w="70px" h="6px" />
              </div>
            </div>
          ))}
        </div>
        <Box h="300px" label="Яндекс Карта (iframe)" sublabel="Встроенная карта с маркерами" style={{ marginBottom: "8px" }}>
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} viewBox="0 0 100 100" preserveAspectRatio="none">
            <line x1="0" y1="0" x2="100" y2="100" stroke={C.border} strokeWidth="0.5" />
            <line x1="100" y1="0" x2="0" y2="100" stroke={C.border} strokeWidth="0.5" />
          </svg>
          <Annotation text="iframe: yandex map widget" pos={{ bottom: "16px", right: "16px" }} />
        </Box>
        <p style={{ fontSize: "10px", color: C.label, marginBottom: "32px" }}>
          ↳ Иконка MapPin + название + адрес + часы работы. Под картами — полноширинная карта-iframe
        </p>

        <Divider label="Секция 8 — Footer" />

        {/* ─── 8. FOOTER ─── */}
        <SectionLabel num="8" title="Footer" desc="Тёмный фон, 4 колонки" />
        <div style={{ background: C.blockDark, borderRadius: "8px", padding: "32px 24px", marginBottom: "8px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px", marginBottom: "24px" }}>
            {/* col 1 */}
            <div>
              <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "10px" }}>
                <Box w="32px" h="32px" style={{ flexShrink: 0, borderRadius: "6px" }} />
                <Line w="50px" h="10px" />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "5px", marginBottom: "12px" }}>
                <Line w="90%" h="6px" />
                <Line w="80%" h="6px" />
                <Line w="70%" h="6px" />
              </div>
              <div style={{ display: "flex", gap: "6px" }}>
                <Box w="30px" h="30px" style={{ borderRadius: "6px" }} />
                <Box w="30px" h="30px" style={{ borderRadius: "6px" }} />
              </div>
            </div>
            {/* col 2 */}
            <div>
              <Line w="70px" h="8px" style={{ marginBottom: "12px" }} />
              {[1, 2, 3, 4, 5].map(i => <Line key={i} w="80px" h="7px" style={{ marginBottom: "8px" }} />)}
            </div>
            {/* col 3 */}
            <div>
              <Line w="70px" h="8px" style={{ marginBottom: "12px" }} />
              {[1, 2, 3].map(i => (
                <div key={i} style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "9px" }}>
                  <Box w="14px" h="14px" style={{ flexShrink: 0, borderRadius: "2px" }} />
                  <Line w="110px" h="7px" />
                </div>
              ))}
            </div>
            {/* col 4 — eco badge */}
            <div>
              <Box h="110px" label="Экосертификат-блок" sublabel="Иконка + заголовок + текст" style={{ border: `1.5px dashed ${C.border}` }} />
            </div>
          </div>
          {/* bottom */}
          <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: "16px", display: "flex", justifyContent: "space-between" }}>
            <Line w="220px" h="7px" />
            <Line w="180px" h="7px" />
          </div>
        </div>
        <p style={{ fontSize: "10px", color: C.label, marginBottom: "40px" }}>
          ↳ Логотип + описание + соцсети · Навигация · Контакты · Экобейдж. Нижняя строка — копирайт
        </p>

        {/* ─── LEGEND ─── */}
        <Divider label="Легенда" />
        <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: "8px", padding: "20px 24px" }}>
          <div style={{ fontSize: "13px", fontWeight: 700, color: C.text, marginBottom: "14px" }}>Условные обозначения</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "10px" }}>
            {[
              { el: <Box w="60px" h="24px" label="Блок" />, desc: "Прямоугольник — контент-блок / изображение" },
              { el: <Line w="80px" />, desc: "Линия — текстовый элемент (заголовок / абзац)" },
              { el: <Chip label="Тег" />, desc: "Чип — метка, бейдж, фильтр" },
              { el: <div style={{ background: "#FFFBCC", border: "1px solid #E0D800", borderRadius: "3px", padding: "2px 7px", fontSize: "10px", color: "#555500", fontWeight: 600 }}>💬 Заметка</div>, desc: "Жёлтый стикер — аннотация к элементу" },
              { el: <Box w="60px" h="24px" label="CTA" style={{ background: C.blockDark, borderStyle: "solid" }} />, desc: "Тёмный блок — интерактивная кнопка" },
              { el: <div><svg width="40" height="24" viewBox="0 0 40 24"><line x1="0" y1="0" x2="40" y2="24" stroke={C.borderDark} strokeWidth="1.5" /><line x1="40" y1="0" x2="0" y2="24" stroke={C.borderDark} strokeWidth="1.5" /></svg></div>, desc: "Перечёркнутый прямоугольник — изображение / карта" },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ flexShrink: 0 }}>{item.el}</div>
                <span style={{ fontSize: "11px", color: C.textMid }}>{item.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* footer */}
        <div style={{ textAlign: "center", marginTop: "40px", paddingBottom: "32px" }}>
          <p style={{ fontSize: "11px", color: C.label }}>Wireframe · Йола · Аграхолдинг · Low-fidelity prototype v1.0</p>
        </div>

      </div>
    </div>
  );
}