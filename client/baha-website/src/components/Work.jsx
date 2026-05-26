import { useState, useEffect, useRef, useCallback } from "react";

/* ─── DATA ─────────────────────────────────────────────────────────────── */
const BUILDINGS = [
  { id: "netherlands-american-cemetery", title: "Netherlands American Cemetery Visitor Center", type: "culture", img: "https://kaanarchitecten.com/media/10-kaan-architecten-netherlands-american-cemetery-visitor-center-simon-menges-B.jpg", portrait: false },
  { id: "museum-paleis-het-loo", title: "Museum Paleis Het Loo", type: "culture", img: "https://kaanarchitecten.com/media/01-kaan-architecten-museum-paleis-het-loo-simon-menges.jpg", portrait: true },
  { id: "jump", title: "JUMP", type: "office", img: "https://kaanarchitecten.com/media/01-kaan-architecten-jump-schnepp-renou-hero.jpg", portrait: false },
  { id: "kmska", title: "Royal Museum of Fine Arts — KMSKA", type: "culture", img: "https://kaanarchitecten.com/media/01-kaan-architecten-kmska-sebastian-van-damme.jpg", portrait: false },
  { id: "loenen-pavilion", title: "Loenen Pavilion", type: "civic", img: "https://kaanarchitecten.com/media/01-kaan-architecten-loenen-pavilion-simone-bossi-B_2025-08-29-073603_tlys.jpg", portrait: false },
  { id: "amsterdam-courthouse", title: "Amsterdam Courthouse", type: "civic", img: "https://kaanarchitecten.com/media/01-kaan-architecten-amsterdam-courthouse-fernando-guerra-fg-sg-B_2025-08-29-075723_yghp.jpg", portrait: false },
  { id: "groningen", title: "Education Centre University of Groningen", type: "education", img: "https://kaanarchitecten.com/media/08-kaan-architecten-education-centre-university-groningen-sebastian-van-damme_2025-08-29-075603_luts.jpg", portrait: true },
  { id: "museum-fama", title: "Museum FAMA", type: "culture", img: "https://kaanarchitecten.com/media/03-kaan-architecten-public-museum-fama_2025-08-15-092719_zcsu.jpg", portrait: false },
  { id: "supreme-court", title: "Supreme Court of the Netherlands", type: "civic", img: "https://kaanarchitecten.com/media/17-kaan-architecten-supreme-court-of-the-netherlands-fernando-guerra-fg-sg.jpg", portrait: false },
  { id: "fresh", title: "FRESH", type: "residential", img: "https://kaanarchitecten.com/media/00-kaan-architecten-de-caai-campina-fresh-B_2025-08-27-130201_asbe.jpg", portrait: false },
  { id: "eco-museum", title: "Eco-Museum and Orla Piratininga Park", type: "culture", img: "https://kaanarchitecten.com/media/04-kaan-architecten-eco-museum-niteroi-sebastian-van-damme.jpg", portrait: false },
  { id: "de-zalmhaven", title: "De Zalmhaven Towers", type: "residential", img: "https://kaanarchitecten.com/media/kaan-architecten-de-zalmhaven-sebastian-van-damme-03_2025-08-27-131753_oplf.jpg", portrait: true },
  { id: "utopia", title: "Utopia — Library and Academy for Performing Arts", type: "culture", img: "https://kaanarchitecten.com/media/05-kaan-architecten-utopia-delfino-sisto-legnani-e-marco-cappelletti.jpg", portrait: false },
  { id: "cube", title: "CUBE — Education and Self Study Centre", type: "education", img: "https://kaanarchitecten.com/media/03-kaan-architecten-cube-simone-bossi.jpg", portrait: true },
  { id: "guz", title: "Geo- and Environmental Centre (GUZ)", type: "education", img: "https://kaanarchitecten.com/media/01-kaan-architecten-guz-tubingen-brigida-gonzalez.jpg", portrait: false },
  { id: "the-stack", title: "The Stack", type: "residential", img: "https://kaanarchitecten.com/media/Works/01-kaan-architecten-the-stack-sebastian-van-damme_2026-04-15-111921_mnpv.jpg", portrait: false },
  { id: "de-walvis", title: "De Walvis", type: "office", img: "https://kaanarchitecten.com/media/01-kaan-architecten-de-walvis-sebastian-van-damme.jpg", portrait: false },
  { id: "icampus-munich", title: "iCampus Munich", type: "office", img: "https://kaanarchitecten.com/media/01-kaan-architecten-rkw-icampus-munich-yohan-zerdoun.jpg", portrait: false },
  { id: "galeries-modernes", title: "Galeries Modernes", type: "office", img: "https://kaanarchitecten.com/media/01-kaan-architecten-galeries-modernes-sebastian-van-damme.jpg", portrait: false },
  { id: "b30", title: "B30 — governmental offices", type: "office", img: "https://kaanarchitecten.com/media/01-kaan-architecten-b30-karin-borghouts-hero-B_2025-08-27-140202_cbdl.jpg", portrait: false },
];

const PROJECTS_DATA = [
  { id: "twist-tower", title: "Twist Tower", type: "residential", status: "underConstruction", img: "https://kaanarchitecten.com/media/00-kaan-architecten-twist-tower-miro_2026-05-13-112051_bolg.jpg" },
  { id: "museum-catharijneconvent", title: "Museum Catharijneconvent", type: "culture", status: "underDevelopment", img: "https://kaanarchitecten.com/media/Works/723-kaan-architecten-museum-catharijneconvent-render-01-pfvisual.jpg" },
  { id: "middelburg-municipal-theatre", title: "Middelburg Municipal Theatre", type: "culture", status: "unbuilt", img: "https://kaanarchitecten.com/media/Works/253-kaan-architecten-middelburg-municipal-theatre-kim-zwarts-01.jpg" },
  { id: "aurora-building", title: "Aurora Building", type: "office", status: "underConstruction", img: "https://kaanarchitecten.com/media/01-kaan-architecten-aurora-building-render-ciiid.jpg" },
  { id: "building-140-cern", title: "Building 140 CERN", type: "science", status: "underDevelopment", img: "https://kaanarchitecten.com/media/00-kaan-architecten-building-140-cern-render-filippo-bolognese.jpg" },
  { id: "national-bank-belgium", title: "National Bank of Belgium", type: "office", status: "underConstruction", img: "https://kaanarchitecten.com/media/00-kaan-architecten-national-bank-belgium-render-filippo-bolognese.jpg" },
  { id: "antwerp-coordination-center", title: "Antwerp Coordination Center — ACC", type: "transport", status: "underConstruction", img: "https://kaanarchitecten.com/media/00-kaan-architecten-antwerp-coordination-centre-filippo-bolognese.jpg" },
  { id: "strijp-s-matchbox", title: "Strijp S — Matchbox", type: "residential", status: "underConstruction", img: "https://kaanarchitecten.com/media/01-kaan-architecten-matchbox-strijp-s-render-axo.jpg" },
  { id: "poort-van-de-prijkels", title: "Poort van de Prijkels", type: "office", status: "underConstruction", img: "https://kaanarchitecten.com/media/00-kaan-architecten-poort-van-de-prijkels-render.jpg" },
  { id: "courthouse-nancy", title: "Courthouse Nancy", type: "civic", status: "underDevelopment", img: "https://kaanarchitecten.com/media/00-kaan-architecten-courthouse-nancy-render.jpg" },
  { id: "european-parliament-spaak", title: "European Parliament — SPAAK", type: "civic", status: "unbuilt", img: "https://kaanarchitecten.com/media/00-kaan-architecten-european-parliament-spaak-render.jpg" },
  { id: "asb-epfl", title: "Advanced Science Building (ASB) — EPFL", type: "science", status: "underDevelopment", img: "https://kaanarchitecten.com/media/00-kaan-architecten-advanced-science-building-asb-epfl-render-filippo-bolognese.jpg" },
  { id: "musee-maritime-saint-malo", title: "Musée Maritime de Saint-Malo", type: "culture", status: "unbuilt", img: "https://kaanarchitecten.com/media/01-kaan-architecten-musee-maritime-de-saint-malo-render.jpg" },
  { id: "museum-pontevedra", title: "Museum Pontevedra", type: "culture", status: "unbuilt", img: "https://kaanarchitecten.com/media/01-kaan-architecten-museum-ponteverda_2025-09-25-150239_klmq.jpg" },
  { id: "the-dock-apartments", title: "The Dock Apartments", type: "residential", status: "underDevelopment", img: "https://kaanarchitecten.com/media/Works/727-kaan-architecten-the-dock-apartments-01.jpg" },
  { id: "schiphol-terminal", title: "Amsterdam Airport Schiphol Terminal", type: "transport", status: "underDevelopment", img: "https://kaanarchitecten.com/media/00-kaan-architecten-amsterdam-airport-schiphol-render-filippo-bolognese.JPG" },
];

const INDEX_ITEMS = [
  { id: "023", title: "Public Works Department", location: "Amsterdam, NL", date: "1990–1992", type: "office", status: "built" },
  { id: "065", title: "Borneo Sporenburg Housing", location: "Amsterdam, NL", date: "1994–1997", type: "residential", status: "built" },
  { id: "071", title: "Hoogte and Laagte Kadijk Housing", location: "Amsterdam, NL", date: "1994–1998", type: "residential", status: "built" },
  { id: "091", title: "Rietlanden Housing", location: "Amsterdam, NL", date: "1996–2001", type: "residential", status: "built" },
  { id: "137", title: "Netherlands Embassy Mozambique", location: "Maputo, MZ", date: "1999–2004", type: "civic", status: "built" },
  { id: "149", title: "Netherlands Forensic Institute", location: "The Hague, NL", date: "1999–2004", type: "civic", status: "built" },
  { id: "165", title: "Breda Municipal Offices", location: "Breda, NL", date: "1999–2003", type: "office", status: "built" },
  { id: "326", title: "De Zalmhaven Towers", location: "Rotterdam, NL", date: "2015–2021", type: "residential", status: "built" },
  { id: "339", title: "Crematorium Heimolen", location: "Sint-Niklaas, BE", date: "2005–2008", type: "civic", status: "built" },
  { id: "342", title: "Education Centre Erasmus MC", location: "Rotterdam, NL", date: "2004–2013", type: "education", status: "built" },
  { id: "566", title: "Royal Museum of Fine Arts — KMSKA", location: "Antwerp, BE", date: "2003–2022", type: "culture", status: "built" },
  { id: "572", title: "Institut des Sciences Moléculaires d'Orsay — ISMO", location: "Orsay, FR", date: "2012–2018", type: "science", status: "built" },
  { id: "573", title: "Supreme Court of the Netherlands", location: "The Hague, NL", date: "2011–2016", type: "civic", status: "built" },
  { id: "591", title: "Crematorium Siesegem", location: "Aalst, BE", date: "2013–2018", type: "civic", status: "built" },
  { id: "595", title: "B30 — governmental offices", location: "The Hague, NL", date: "2012–2017", type: "office", status: "built" },
  { id: "596", title: "Provinciehuis of North Brabant", location: "'s-Hertogenbosch, NL", date: "2012–2015", type: "civic", status: "built" },
  { id: "601", title: "Bottière Chénaie Housing", location: "Nantes, FR", date: "2012–2019", type: "residential", status: "built" },
  { id: "608", title: "Geo- and Environmental Centre (GUZ)", location: "Tübingen, DE", date: "2013–2020", type: "education", status: "built" },
  { id: "614", title: "Amsterdam Courthouse", location: "Amsterdam, NL", date: "2014–2020", type: "civic", status: "built" },
  { id: "623", title: "CUBE — Education and Self Study Centre", location: "Tilburg, NL", date: "2016–2018", type: "education", status: "built" },
  { id: "625", title: "Utopia — Library and Academy for Performing Arts", location: "Aalst, BE", date: "2016–2018", type: "culture", status: "built" },
  { id: "628", title: "Museum Paleis Het Loo", location: "Apeldoorn, NL", date: "2016–2022", type: "culture", status: "built" },
  { id: "641", title: "UAM Campus São José dos Campos", location: "São José dos Campos, BR", date: "2016–2017", type: "education", status: "built" },
  { id: "642", title: "UAM Campus Piracicaba", location: "Piracicaba, BR", date: "2017–2018", type: "education", status: "built" },
  { id: "644", title: "De Walvis", location: "Amsterdam, NL", date: "2017–2020", type: "office", status: "built" },
  { id: "650", title: "iCampus Munich", location: "Munich, DE", date: "2017–2022", type: "office", status: "built" },
  { id: "652", title: "Galeries Modernes", location: "Rotterdam, NL", date: "2017–2022", type: "office", status: "built" },
  { id: "654", title: "The Stack", location: "Amsterdam, NL", date: "2017–2024", type: "residential", status: "built" },
  { id: "655", title: "JUMP", location: "Paris, FR", date: "2017–2024", type: "office", status: "built" },
  { id: "662", title: "Netherlands American Cemetery Visitor Center", location: "Margraten, NL", date: "2018–2023", type: "culture", status: "built" },
  { id: "664", title: "Loenen Pavilion", location: "Loenen, NL", date: "2018–2020", type: "civic", status: "built" },
  { id: "687", title: "Education Centre University of Groningen", location: "Groningen, NL", date: "2019–2024", type: "education", status: "built" },
  { id: "705", title: "European Parliament — SPAAK", location: "Brussels, BE", date: "2021", type: "civic", status: "unbuilt" },
  { id: "707", title: "FRESH", location: "Eindhoven, NL", date: "2021–2025", type: "residential", status: "built" },
  { id: "711", title: "Strijp S — Matchbox", location: "Eindhoven, NL", date: "2021–", type: "residential", status: "underConstruction" },
  { id: "716", title: "National Bank of Belgium", location: "Brussels, BE", date: "2021–", type: "office", status: "underConstruction" },
  { id: "717", title: "Courthouse Nancy", location: "Nancy, FR", date: "2021–", type: "civic", status: "underDevelopment" },
  { id: "720", title: "Poort van de Prijkels", location: "Deinze, BE", date: "2021–", type: "office", status: "underConstruction" },
  { id: "723", title: "Museum Catharijneconvent", location: "Utrecht, NL", date: "2022–", type: "culture", status: "underDevelopment" },
  { id: "726", title: "Aurora Building", location: "Amsterdam, NL", date: "2021–", type: "office", status: "underConstruction" },
  { id: "727", title: "The Dock Apartments", location: "Amsterdam, NL", date: "2023–", type: "residential", status: "underDevelopment" },
  { id: "728", title: "Antwerp Coordination Center — ACC", location: "Antwerp, BE", date: "2022–", type: "transport", status: "underConstruction" },
  { id: "730", title: "Advanced Science Building (ASB) — EPFL", location: "Lausanne, CH", date: "2022–", type: "science", status: "underDevelopment" },
  { id: "731", title: "Twist Tower", location: "Antwerp, BE", date: "2022–", type: "residential", status: "underConstruction" },
  { id: "738", title: "Musée Maritime de Saint-Malo", location: "Saint-Malo, FR", date: "2024", type: "culture", status: "unbuilt" },
  { id: "743", title: "Building 140 CERN", location: "Geneva, CH", date: "2024–", type: "science", status: "underDevelopment" },
  { id: "747", title: "Amsterdam Airport Schiphol Terminal", location: "Schiphol, NL", date: "2017–2020", type: "transport", status: "underDevelopment" },
  { id: "757", title: "Eco-Museum and Orla Piratininga Park", location: "Niterói, BR", date: "2019–2024", type: "culture", status: "built" },
  { id: "758", title: "Museum FAMA", location: "Itu, São Paulo, BR", date: "2019–2022", type: "culture", status: "built" },
];

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const HEADER_H  = 57.6;
const SECTION_H = 44;
const FONT = "'Helvetica Neue', Helvetica, Arial, sans-serif";

// ─── IMG ──────────────────────────────────────────────────────────────────────
function Img({ src, alt, portrait }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div style={{ overflow: "hidden", background: "#d8d8d8", position: "relative", paddingBottom: portrait ? "133%" : "75%" }}>
      <img
        src={src} alt={alt} loading="lazy"
        onLoad={() => setLoaded(true)}
        style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          objectFit: "cover", display: "block", filter: "grayscale(100%)",
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.4s, transform 0.55s, filter 0.35s",
        }}
        className="kaan-img"
      />
    </div>
  );
}

// ─── CARD ─────────────────────────────────────────────────────────────────────
function Card({ item, delay }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } }, { threshold: 0.08 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className="kaan-card" style={{
      opacity: visible ? 1 : 0, cursor: "pointer",
      transform: visible ? "translateY(0)" : "translateY(22px)",
      transition: `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s`,
    }}>
      <Img src={item.img} alt={item.title} portrait={item.portrait ?? false} />
      <p style={{ marginTop: "0.55rem", fontSize: "0.72rem", fontFamily: FONT, fontWeight: 400, lineHeight: 1.35, textTransform: "uppercase", letterSpacing: "0.03em", color: "#000" }}>{item.title}</p>
    </div>
  );
}

// ─── INDEX ROW ────────────────────────────────────────────────────────────────
function IndexRow({ item, delay }) {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } }, { threshold: 0.05 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        display: "grid", gridTemplateColumns: "3.2rem 1fr auto auto",
        alignItems: "baseline", gap: "0 1.2rem", padding: "0.58rem 0.75rem",
        borderBottom: "1px solid #e5e5e5", cursor: "pointer",
        background: hovered ? "#f7f7f7" : "transparent",
        opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(6px)",
        transition: `opacity 0.3s ease ${Math.min(delay, 0.6)}s, transform 0.3s ease ${Math.min(delay, 0.6)}s, background 0.15s`,
      }}>
      <span style={{ fontSize: "0.62rem", color: "#c0c0c0", fontFamily: FONT, letterSpacing: "0.04em" }}>{item.id}</span>
      <span style={{ fontSize: "0.71rem", fontFamily: FONT, letterSpacing: "0.025em", textTransform: "uppercase" }}>{item.title}</span>
      <span style={{ fontSize: "0.63rem", color: "#888", fontFamily: FONT, letterSpacing: "0.02em", whiteSpace: "nowrap" }}>{item.location}</span>
      <span style={{ fontSize: "0.63rem", color: "#888", fontFamily: FONT, textAlign: "right", whiteSpace: "nowrap" }}>{item.date}</span>
    </div>
  );
}

// ─── FILTER DROPDOWN ──────────────────────────────────────────────────────────
function FilterDropdown({ filters, active, onToggle, open, onOpen }) {
  const ref = useRef(null);
  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) onOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onOpen]);
  const count = active.length;
  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button onClick={() => onOpen(!open)} style={{
        background: "none", border: "none", cursor: "pointer",
        fontSize: "0.72rem", fontFamily: FONT, fontWeight: 400,
        textTransform: "uppercase", letterSpacing: "0.06em",
        color: count > 0 ? "#000" : "#c0c0c0", padding: 0,
      }}>
        Filter{count > 0 ? ` (${count})` : ""}
      </button>
      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 6px)", right: 0,
          background: "#fff", border: "1px solid #ddd", zIndex: 600,
          minWidth: 220, boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
        }}>
          {filters.map(f => (
            <label key={f} style={{
              display: "flex", alignItems: "center", gap: 9,
              padding: "0.38rem 1rem", cursor: "pointer",
              fontSize: "0.71rem", fontFamily: FONT, letterSpacing: "0.04em",
              textTransform: "uppercase",
              background: active.includes(f) ? "#f3f3f3" : "transparent",
            }}>
              <span style={{
                width: 11, height: 11,
                border: `1px solid ${active.includes(f) ? "#000" : "#bbb"}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                background: active.includes(f) ? "#000" : "transparent", flexShrink: 0,
              }}>
                {active.includes(f) && <span style={{ color: "#fff", fontSize: 8, lineHeight: 1 }}>✓</span>}
              </span>
              <input type="checkbox" checked={active.includes(f)} onChange={() => onToggle(f)} style={{ display: "none" }} />
              {f}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── LOGO ─────────────────────────────────────────────────────────────────────
function KaanLogo({ width = 80 }) {
  return (
    <svg width={width} height={width * 31 / 120} viewBox="0 0 120 31" xmlns="http://www.w3.org/2000/svg" fill="#000">
      <path d="M18.345 0.958557L6.60569 13.4125V0.958557H0V31H6.60569V21.3216L10.393 17.4942L19.4398 31H27.729L14.8549 12.8236L26.5914 0.958557H18.345ZM44.3905 8.36459H44.4733L48.2607 19.3893H40.4773L44.3905 8.36459ZM41.109 0.958557L29.747 31H36.3956L38.7509 24.3114H49.9843L52.2567 31H59.1139L47.8834 0.958557H41.109ZM76.0326 8.36459H76.1155L79.9028 19.3893H72.1195L76.0326 8.36459ZM72.7512 0.958557L61.3892 31H68.0377L70.393 24.3114H81.6293L83.9017 31H90.7589L79.5255 0.958557H72.7512ZM113.817 0.958557V21.1129H113.734L101.195 0.958557H94.6291V31H100.815V10.8885H100.898L113.394 31H120V0.958557H113.814H113.817Z" />
    </svg>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function KAANWork() {
  const projectsRef = useRef(null);
  const indexRef    = useRef(null);

  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const [bFilters, setBFilters] = useState([]);
  const [pFilters, setPFilters] = useState([]);
  const [iFilters, setIFilters] = useState([]);
  const [bOpen, setBOpen] = useState(false);
  const [pOpen, setPOpen] = useState(false);
  const [iOpen, setIOpen] = useState(false);

  const toggle = (setter) => (val) =>
    setter(prev => prev.includes(val) ? prev.filter(x => x !== val) : [...prev, val]);

  const TYPE_MAP   = { Civic: "civic", Commercial: "office", Education: "education", Residential: "residential", Culture: "culture", "Science and Health": "science", Transport: "transport" };
  const STATUS_MAP = { "Under Construction": "underConstruction", "Under Development": "underDevelopment", Unbuilt: "unbuilt", Built: "built" };

  const filteredBuildings = BUILDINGS.filter(b => bFilters.length === 0 || bFilters.some(f => b.type === TYPE_MAP[f]));
  const filteredProjects  = PROJECTS_DATA.filter(p => pFilters.length === 0 || pFilters.some(f => p.type === TYPE_MAP[f] || p.status === STATUS_MAP[f]));
  const filteredIndex     = INDEX_ITEMS.filter(item => iFilters.length === 0 || iFilters.some(f => item.type === TYPE_MAP[f] || item.status === STATUS_MAP[f]));

  const scrollTo = useCallback((ref) => {
    if (!ref.current) return;
    const y = ref.current.getBoundingClientRect().top + window.scrollY - HEADER_H;
    window.scrollTo({ top: y, behavior: "smooth" });
  }, []);

  const [activeSection, setActiveSection] = useState("buildings");
  useEffect(() => {
    if (!projectsRef.current || !indexRef.current) return;
    const pTop = projectsRef.current.getBoundingClientRect().top + window.scrollY - HEADER_H - SECTION_H;
    const iTop = indexRef.current.getBoundingClientRect().top   + window.scrollY - HEADER_H - SECTION_H * 2;
    if (scrollY >= iTop - 20)      setActiveSection("index");
    else if (scrollY >= pTop - 20) setActiveSection("projects");
    else                           setActiveSection("buildings");
  }, [scrollY]);

  const headerScrolled = scrollY > 10;

  // ─── STICKY BAR STYLE (shared) ──────────────────────────────────────────────
  const stickyBar = (top, zIndex) => ({
    position: "sticky",
    top,
    zIndex,
    background: "#fff",
    borderBottom: "1px solid #000",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 0.75rem",
    height: SECTION_H,
    // Guarantee sticky always works — no transform, no overflow on ancestors
    marginLeft: 0,
    marginRight: 0,
  });

  const stickyTitle = {
    fontSize: "1.55rem", fontFamily: FONT, fontWeight: 400,
    textTransform: "uppercase", letterSpacing: "0.01em", lineHeight: 1, margin: 0,
  };

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { height: 100%; }
        body { background: #fff; color: #000; -webkit-font-smoothing: antialiased; overflow-x: hidden; }
        /* CRITICAL: no overflow:hidden/auto on any ancestor of sticky elements */
        #kaan-root { min-height: 100vh; }
        .kaan-card:hover .kaan-img { filter: grayscale(0%) !important; transform: scale(1.04); }
        .kaan-card .kaan-img { will-change: transform, filter; }
        ::-webkit-scrollbar { width: 0; }
      `}</style>

      {/* FIXED TOP HEADER — z:500 */}
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, height: HEADER_H, zIndex: 500,
        background: headerScrolled ? "rgba(255,255,255,0.93)" : "#fff",
        backdropFilter: headerScrolled ? "blur(10px)" : "none",
        borderBottom: "1px solid #e0e0e0",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 0.75rem", transition: "background 0.25s",
      }}>
        <KaanLogo width={80} />
        <nav style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          {["About", "Work", "Repository"].map(n => (
            <a key={n} href="#" style={{
              fontSize: "0.72rem", fontFamily: FONT, fontWeight: 400,
              letterSpacing: "0.02em", textDecoration: "none", color: "#000",
              borderBottom: n === "Work" ? "1px solid #000" : "none", paddingBottom: 1,
            }}>{n}</a>
          ))}
          <button style={{ background: "none", border: "none", cursor: "pointer", padding: "4px", display: "flex" }}>
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="#000" strokeWidth="1.3">
              <circle cx="9.5" cy="9.5" r="7.5" /><path d="M15 15L19 19" />
            </svg>
          </button>
        </nav>
      </header>

      {/*
        LAYOUT STRATEGY:
        The entire scrollable content lives in ONE flat column inside #kaan-root.
        There is NO overflow:hidden/auto on any wrapper — that would break sticky.
        paddingTop on #kaan-root clears the fixed header.
        Each sticky bar is a direct child of #kaan-root, so position:sticky
        is guaranteed to work against the document scroll container (window).
      */}
      <div id="kaan-root" style={{ paddingTop: HEADER_H, paddingBottom: 40 }}>

        {/* ── BUILDINGS STICKY BAR — z:30, sticks at top of viewport below header */}
        <div style={stickyBar(HEADER_H, 30)}>
          <h2 style={stickyTitle}>Buildings</h2>
          <FilterDropdown
            filters={["Civic", "Commercial", "Education", "Residential", "Culture", "Science and Health"]}
            active={bFilters} onToggle={toggle(setBFilters)} open={bOpen} onOpen={setBOpen}
          />
        </div>

        {/* Buildings grid content */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1rem", padding: "1.5rem 0.75rem 3rem" }}>
          {filteredBuildings.map((item, i) => <Card key={item.id} item={item} delay={i * 0.055} />)}
        </div>

        {/* ── PROJECTS STICKY BAR — z:20, sticks below Buildings bar */}
        {/* ref is on this bar itself so scrollTo lands right at it */}
        <div ref={projectsRef} style={stickyBar(HEADER_H + SECTION_H, 20)}>
          <h2 style={stickyTitle}>Projects</h2>
          <FilterDropdown
            filters={["Civic", "Commercial", "Education", "Residential", "Culture", "Transport", "Science and Health", "Under Construction", "Under Development", "Unbuilt"]}
            active={pFilters} onToggle={toggle(setPFilters)} open={pOpen} onOpen={setPOpen}
          />
        </div>

        {/* Projects grid content */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1rem", padding: "1.5rem 0.75rem 3rem" }}>
          {filteredProjects.map((item, i) => <Card key={item.id} item={item} delay={i * 0.05} />)}
        </div>

        {/* ── INDEX STICKY BAR — z:10, sticks below Projects bar */}
        <div ref={indexRef} style={stickyBar(HEADER_H + SECTION_H * 2, 10)}>
          <h2 style={stickyTitle}>Index</h2>
          <FilterDropdown
            filters={["Civic", "Commercial", "Education", "Residential", "Culture", "Transport", "Science and Health", "Built", "Unbuilt", "Under Construction", "Under Development"]}
            active={iFilters} onToggle={toggle(setIFilters)} open={iOpen} onOpen={setIOpen}
          />
        </div>

        {/* Index column labels */}
        <div style={{ display: "grid", gridTemplateColumns: "3.2rem 1fr auto auto", gap: "0 1.2rem", padding: "0.4rem 0.75rem", borderBottom: "1px solid #ddd", background: "#fff" }}>
          {["", "Project", "Location", "Date"].map(h => (
            <span key={h} style={{ fontSize: "0.6rem", color: "#bbb", fontFamily: FONT, letterSpacing: "0.06em", textTransform: "uppercase" }}>{h}</span>
          ))}
        </div>

        {/* Index rows */}
        <div style={{ paddingBottom: "3rem" }}>
          {filteredIndex.map((item, i) => <IndexRow key={`${item.id}-${i}`} item={item} delay={i * 0.018} />)}
        </div>

        {/* Footer */}
        <footer style={{ borderTop: "1px solid #e0e0e0", padding: "0 0.75rem", marginBottom: 40 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem", minHeight: "2.5rem", padding: "0.5rem 0" }}>
            <KaanLogo width={60} />
            <nav style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
              {["Contact", "News Archive", "Instagram", "LinkedIn", "Imprint and Privacy Policy", "© KAAN Architecten"].map(item => (
                <a key={item} href="#" style={{ fontSize: "0.63rem", fontFamily: FONT, textDecoration: "none", color: "#000", letterSpacing: "0.02em" }}>{item}</a>
              ))}
            </nav>
          </div>
        </footer>

      </div>

      {/* FIXED BOTTOM NAV — z:500 */}
      <nav style={{
        position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 500,
        background: "#fff", borderTop: "1px solid #e0e0e0",
        display: "flex", alignItems: "stretch", height: 40,
      }}>
        {[
          { label: "Projects", ref: projectsRef, key: "projects" },
          { label: "Index",    ref: indexRef,    key: "index"    },
        ].map(({ label, ref: sRef, key }) => (
          <button key={key} onClick={() => scrollTo(sRef)} style={{
            flex: 1, background: "none", border: "none",
            borderRight: key === "projects" ? "1px solid #e0e0e0" : "none",
            cursor: "pointer", fontSize: "0.72rem", fontFamily: FONT,
            fontWeight: 400, letterSpacing: "0.06em", textTransform: "uppercase",
            color: activeSection === key ? "#000" : "#b0b0b0",
            transition: "color 0.2s", position: "relative",
          }}>
            {label}
            <span style={{
              position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)",
              height: 2, width: activeSection === key ? "40%" : "0%",
              background: "#000", transition: "width 0.3s ease", display: "block",
            }} />
          </button>
        ))}
      </nav>
    </>
  );
}