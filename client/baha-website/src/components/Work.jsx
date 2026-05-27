import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import NaNvbar from "./Navbar";

const API_URL = import.meta.env.VITE_API_URL

// ─── CONSTANTS ────────────────────────────────────────────────────────────────



const HEADER_H  = 57.6;
const SECTION_H = 44;
const FONT = "'Helvetica Neue', Helvetica, Arial, sans-serif";

// ─── IMG ──────────────────────────────────────────────────────────────────────
function Img({ src, alt }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="work-image">
      {src && (
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
      )}
    </div>
  );
}

// ─── CARD ─────────────────────────────────────────────────────────────────────
function Card({ item, delay, index }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  const coverImage = typeof item.cover_image === "object" ? item.cover_image?.url : item.cover_image;
  const firstGalleryImage = typeof item.images?.[0] === "object" ? item.images?.[0]?.url : item.images?.[0];
  const imageSrc = item.img || item.image || coverImage || firstGalleryImage;
  const year = item.year || item.date;
  const meta = [item.location, year, item.category].filter(Boolean).join(" / ");
  const cardInner = (
    <>
      <Img src={imageSrc} alt={item.title} />
      <div className="work-card-meta">
        <span>{String(index + 1).padStart(2, "0")}</span>
        <span>{meta}</span>
      </div>
      <h3 className="work-card-title">{item.title}</h3>
    </>
  );

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
      {item.slug ? (
        <Link to={`/Projectmodal/${item.slug}`} style={{ color: "inherit", textDecoration: "none", display: "block" }}>
          {cardInner}
        </Link>
      ) : cardInner}
    </div>
  );
}

// ─── INDEX ROW ────────────────────────────────────────────────────────────────
// ─── FILTER DROPDOWN ──────────────────────────────────────────────────────────


// ─── LOGO ─────────────────────────────────────────────────────────────────────
function WorkGrid({ items, keyPrefix, delayStep }) {
  return (
    <div className="kaan-work-grid">
      {items.map((item, i) => (
        <Card
          key={item._id || item.id || item.slug || `${keyPrefix}-${i}`}
          item={item}
          delay={i * delayStep}
          index={i}
        />
      ))}
    </div>
  );
}

function KaanLogo() {
  return (
    <div>
      <p>BAHA ARCHITECTURE</p>
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function KAANWork() {

  const [BUILDINGS, setBuildings] = useState([]);
  const [PROJECTS, setProjects] = useState([]);
  const [INDEX_ITEMS, setIndexItems] = useState([]);

useEffect(() => {
    axios.get(`${API_URL}/api/buildings`).then((response) => {
      setBuildings(response.data);
    }).catch((error) => {
      console.error("Error fetching:", error);
    });
    axios.get(`${API_URL}/api/projectswork`).then((response) => {
      setProjects(response.data);
    }).catch((error) => {
      console.error("Error fetching:", error);
    });
    axios.get(`${API_URL}/api/index`).then((response) => {
      setIndexItems(response.data);
    }).catch((error) => {
      console.error("Error fetching:", error);
    });
}, []);













  const projectsRef = useRef(null);
  const indexRef    = useRef(null);

  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = useCallback((ref, topOffset) => {
    if (!ref.current) return;
    const y = ref.current.getBoundingClientRect().top + window.scrollY - topOffset;
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

  const bottomBars = [
    { label: "Projects", key: "projects", topOffset: HEADER_H + SECTION_H },
    { label: "Index", key: "index", topOffset: HEADER_H + SECTION_H * 2 },
  ].filter(item => {
    if (activeSection === "buildings") return true;
    if (activeSection === "projects") return item.key === "index";
    return false;
  });

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
        .work-image {
          aspect-ratio: 4 / 3;
          overflow: hidden;
          background: #d8d8d8;
          position: relative;
        }
        .kaan-work-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 2.6rem 1rem;
          padding: 1.25rem 0.75rem 3rem;
        }
        .kaan-work-grid .kaan-card {
          width: 100%;
          border-top: 1px solid rgba(0,0,0,0.22);
          padding-top: 0.55rem;
        }
        .kaan-work-grid .kaan-card a {
          height: 100%;
        }
        .work-card-meta {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 1rem;
          min-height: 1.2rem;
          margin-top: 0.65rem;
          color: #8b8b8b;
          font-family: ${FONT};
          font-size: 0.62rem;
          line-height: 1.3;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }
        .work-card-meta span:last-child {
          overflow: hidden;
          text-align: right;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .work-card-title {
          min-height: 2.35rem;
          margin-top: 0.28rem;
          color: #000;
          font-family: ${FONT};
          font-size: clamp(0.86rem, 1.1vw, 1.08rem);
          font-weight: 400;
          line-height: 1.16;
          letter-spacing: 0;
          text-transform: uppercase;
        }
        .kaan-card:hover .work-card-title {
          text-decoration: underline;
          text-underline-offset: 0.16em;
          text-decoration-thickness: 1px;
        }
        @media (min-width: 1400px) {
          .kaan-work-grid {
            grid-template-columns: repeat(4, minmax(0, 1fr));
          }
        }
        @media (max-width: 980px) {
          .kaan-work-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
        @media (max-width: 820px) {
          .kaan-work-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
            padding: 1rem 0.75rem 2.5rem;
          }
          .work-card-title {
            min-height: auto;
          }
          .work-card-meta span:last-child {
            max-width: 68%;
          }
        }
        
      `}</style>

      {/* FIXED TOP HEADER — z:500 */}
      <NaNvbar name="Work" />

      {/*
        LAYOUT STRATEGY:
        The entire scrollable content lives in ONE flat column inside #kaan-root.
        There is NO overflow:hidden/auto on any wrapper — that would break sticky.
        paddingTop on #kaan-root clears the fixed header.
        Each sticky bar is a direct child of #kaan-root, so position:sticky
        is guaranteed to work against the document scroll container (window).
      */}
      <div id="kaan-root" style={{ paddingTop: HEADER_H }}>

        {/* ── BUILDINGS STICKY BAR — z:30, sticks at top of viewport below header */}
        <div style={stickyBar(HEADER_H, 30)}>
          <h2 style={stickyTitle}>Buildings</h2>
          
        </div>

        {/* Buildings grid content */}
        <WorkGrid items={BUILDINGS} keyPrefix="building" delayStep={0.055} />

        {/* ── PROJECTS STICKY BAR — z:20, sticks below Buildings bar */}
        {/* ref is on this bar itself so scrollTo lands right at it */}
        <div ref={projectsRef} style={stickyBar(HEADER_H + SECTION_H, 20)}>
          <h2 style={stickyTitle}>Projects</h2>
          
        </div>

        {/* Projects grid content */}
        <WorkGrid items={PROJECTS} keyPrefix="project" delayStep={0.05} />

        {/* ── INDEX STICKY BAR — z:10, sticks below Projects bar */}
        <div ref={indexRef} style={stickyBar(HEADER_H + SECTION_H * 2, 10)}>
          <h2 style={stickyTitle}>Index</h2>
         
        </div>

        {/* Index grid content */}
        <WorkGrid items={INDEX_ITEMS} keyPrefix="index" delayStep={0.035} />

        {/* Footer */}
        <footer style={{ borderTop: "1px solid #e0e0e0", padding: "0 0.75rem" }}>
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
      {bottomBars.length > 0 && (
        <nav style={{
          position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 500,
          background: "#fff", display: "flex", flexDirection: "column",
          boxShadow: "0 -1px 0 #000",
        }}>
          {bottomBars.map(({ label, key, topOffset }) => (
            <button
              key={key}
              onClick={() => scrollTo(key === "projects" ? projectsRef : indexRef, topOffset)}
              style={{
                background: "#fff", border: "none", borderBottom: "1px solid #000",
                cursor: "pointer", height: SECTION_H, width: "100%",
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "0 0.75rem", color: "#000", textAlign: "left",
              }}
            >
              <span style={stickyTitle}>{label}</span>
              <span style={{
                fontSize: "0.72rem", fontFamily: FONT, fontWeight: 400,
                letterSpacing: "0.06em", textTransform: "uppercase", color: "#9a9a9a",
              }}>
                View
              </span>
            </button>
          ))}
        </nav>
      )}
    </>
  );
}
