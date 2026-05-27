import { useState, useEffect, useRef } from "react";
import  Navbar from "./Navbar"; 
/* ── Hooks ───────────────────────────────────────────────────────────────── */
function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const h = () => setY(window.scrollY);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return y;
}

/* ── Reveal ──────────────────────────────────────────────────────────────── */
function Reveal({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(40px)",
        transition: `opacity .85s cubic-bezier(.16,1,.3,1) ${delay}s, transform .85s cubic-bezier(.16,1,.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ── Data ────────────────────────────────────────────────────────────────── */
const IMAGES = [
  { src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1000&q=80", w: "52vw", minW: 320 },
  { src: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1000&q=80", w: "36vw", minW: 220 },
  { src: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1000&q=80", w: "46vw", minW: 280 },
  { src: "https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=1000&q=80", w: "34vw", minW: 210 },
  { src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1000&q=80", w: "44vw", minW: 260 },
  { src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1000&q=80", w: "38vw", minW: 230 },
];



const STYLES = [
  {
    num: "01",
    tag: "(Solution to a Problem)",
    title: "Offices built around\nyour challenge.",
    body: "We address not just goals but chemistry and expertise — assigning optimal teams and actively collaborating with external creatives and artists.",
  },
  {
    num: "02",
    tag: "(One Goal. Infinite Ways)",
    title: "One goal.\nEndless paths.",
    body: "Every client's situation is unique. We bring craft, strategy, and spatial intelligence — spaces that are alive with purpose.",
  },
  {
    num: "03",
    tag: "(Always Evolving)",
    title: "Design that\ngrows with you.",
    body: "Post-occupancy consulting, iterative improvements, and ongoing partnership keep your space in motion.",
  },
];

const TEAM = [
  { role: "Client", headline: "Your vision,\nas the starting point.", body: "Your aspirations, tensions, and contradictions are the raw material from which every space is made." },
  { role: "Designer", headline: "Spatial thinking\nbrought to life.", body: "Our designers weave business insight and spatial craft into environments that feel inevitable." },
  { role: "Architect", headline: "Structure as\nexperience.", body: "Technical precision in service of human experience — every beam, bay, and boundary considered." },
  { role: "Partner", headline: "Creative network\nwithout limits.", body: "We collaborate with artists and specialists from outside the industry — great spaces draw from the full world." },
];

const NAV_LINKS = ["Home", "Works", "About", "Journal", "Company", "Designers"];

/* ── Nav ─────────────────────────────────────────────────────────────────── */

/* ── THE KEY EFFECT: Sticky Wordmark + Images scrolling over it ────────────
   Structure:
   - heroSection: position relative, tall enough to scroll through
   - stickyWordmark: position sticky, top: 0, height: 100vh, z-index: 0
     (the wordmark sits centered inside this sticky container)
   - galleryOverlay: position relative, z-index: 10, background: white
     (this scrolls normally ON TOP of the sticky wordmark)
──────────────────────────────────────────────────────────────────────────── */
function HeroWithStickyWordmark({ heroVisible }) {
  return (
    <div className="relative" style={{ marginTop: "64px" }}>

      {/* STICKY wordmark container — stays fixed while user scrolls */}
      <div
        className="sticky top-0 w-full flex flex-col"
        style={{ height: "100vh", zIndex: 1 }}
      >
        {/* "About" label top-left */}
        <div
          className="px-9 pt-10 text-[14px] tracking-[0.01em] text-neutral-900"
          style={{
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "none" : "translateY(16px)",
            transition: "opacity .8s ease .2s, transform .8s ease .2s",
          }}
        >
          About
        </div>

        {/* Giant centered wordmark */}
        <div
          className="flex-1 flex items-center justify-center overflow-hidden"
          style={{
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "none" : "translateY(60px)",
            transition: "opacity 1.1s cubic-bezier(.16,1,.3,1) .35s, transform 1.1s cubic-bezier(.16,1,.3,1) .35s",
          }}
        >
          <h1
            className="font-extrabold text-neutral-900 select-none text-center"
            style={{ fontSize: "clamp(80px, 10vw, 220px)", letterSpacing: "-0.05em", lineHeight: 0.9 }}
          >
            BAHA ARCH<sup style={{ fontSize: "0.1em", verticalAlign: "super", fontWeight: 200, letterSpacing: 0 }}>®</sup>
          </h1>
        </div>

        {/* Desc bottom-right */}
        <div
          className="flex-col items-end text-right px-9 pb-14"
          style={{
            opacity: heroVisible ? 1 : 0,
            transition: "opacity .9s ease .75s",
          }}
        >
          <p className="text-[0.65rem] uppercase tracking-widest font-bold text-gray-600">
            BAHA ARCH is a grand project by HITOBA DESIGN —
          </p>
          <p className="text-[0.65rem] uppercase tracking-widest font-bold text-gray-600">
             enriching both people and places of work
          </p>
          <p className="text-[0.65rem] uppercase tracking-widest font-bold text-gray-600">
             together with clients.
          </p>
        </div>
      </div>

      {/* GALLERY — scrolls over the sticky wordmark, bg white covers it */}
      <div
        className="relative bg-white"
        style={{ zIndex: 10 }}
      >
        <Gallery />
      </div>
    </div>
  );
}

/* ── Gallery (drag-to-scroll horizontal strip) ────────────────────────────── */
function Gallery() {
  const trackRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const autoRef = useRef(null);
  const autoPos = useRef(0);
  const autoDir = useRef(1);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    autoRef.current = setInterval(() => {
      if (isDragging.current) return;
      autoPos.current += 0.4 * autoDir.current;
      el.scrollLeft = autoPos.current;
      if (el.scrollLeft >= el.scrollWidth - el.clientWidth) autoDir.current = -1;
      if (el.scrollLeft <= 0) autoDir.current = 1;
    }, 20);

    const onDown = (e) => {
      isDragging.current = true;
      clearInterval(autoRef.current);
      el.style.cursor = "grabbing";
      startX.current = e.pageX - el.offsetLeft;
      scrollLeft.current = el.scrollLeft;
    };
    const onUp = () => { isDragging.current = false; el.style.cursor = "grab"; };
    const onMove = (e) => {
      if (!isDragging.current) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      el.scrollLeft = scrollLeft.current - (x - startX.current) * 1.6;
      autoPos.current = el.scrollLeft;
    };

    el.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);
    el.addEventListener("mousemove", onMove);
    return () => {
      clearInterval(autoRef.current);
      el.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      el.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div className="overflow-hidden">
      <div
        ref={trackRef}
        className="flex gap-[10px] overflow-x-auto px-9 pb-9 select-none"
        style={{ cursor: "grab", scrollbarWidth: "none" }}
      >
        {IMAGES.map((img, i) => (
          <img
            key={i}
            src={img.src}
            alt=""
            draggable={false}
            className="flex-none object-cover block"
            style={{ width: img.w, minWidth: img.minW, height: "60vh", transition: "transform .6s cubic-bezier(.16,1,.3,1)" }}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.018)"}
            onMouseLeave={e => e.currentTarget.style.transform = ""}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Style Row ───────────────────────────────────────────────────────────── */
function StyleRow({ num, tag, title, body, delay }) {
  const [ref, inView] = useInView();
  const [hovered, setHovered] = useState(false);
  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="border-t border-neutral-100 py-14 grid grid-cols-2 gap-14 items-center"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : "translateY(40px)",
        transition: `opacity .85s cubic-bezier(.16,1,.3,1) ${delay}s, transform .85s cubic-bezier(.16,1,.3,1) ${delay}s`,
      }}
    >
      <div>
        <span className="font-extrabold leading-none select-none" style={{ fontSize: "clamp(72px,10vw,148px)", letterSpacing: "-0.05em", color: hovered ? "#e0e0e0" : "#f2f2f2", transition: "color .5s" }}>
          {num}
        </span>
      </div>
      <div>
        <p className="text-[11.5px] text-neutral-400 tracking-[0.07em] mb-[18px]">{tag}</p>
        <h3 className="font-medium leading-[1.3] mb-5 whitespace-pre-line" style={{ fontSize: "clamp(20px,2.2vw,32px)" }}>{title}</h3>
        <p className="text-[13.5px] leading-[1.95] text-neutral-500 max-w-[440px]">{body}</p>
      </div>
    </div>
  );
}

/* ── Team Row ────────────────────────────────────────────────────────────── */
function TeamRow({ role, headline, body, delay }) {
  const [ref, inView] = useInView();
  const [hovered, setHovered] = useState(false);
  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="border-t border-neutral-100 grid items-start"
      style={{
        gridTemplateColumns: "180px 1fr 1fr",
        gap: "40px",
        padding: hovered ? "40px 36px" : "40px 0",
        margin: hovered ? "0 -36px" : "0",
        background: hovered ? "#fafafa" : "transparent",
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : "translateY(30px)",
        transition: `opacity .8s ease ${delay}s, transform .8s ease ${delay}s, background .2s, padding .25s, margin .25s`,
      }}
    >
      <p className="text-[11.5px] text-neutral-400 tracking-[0.08em] uppercase pt-1">{role}</p>
      <h3 className="font-normal leading-[1.4] whitespace-pre-line" style={{ fontSize: "clamp(17px,1.8vw,26px)" }}>{headline}</h3>
      <p className="text-[13px] leading-[1.9] text-neutral-500">{body}</p>
    </div>
  );
}

/* ── App ─────────────────────────────────────────────────────────────────── */
export default function App() {
  const scrollY = useScrollY();
  const [menuOpen, setMenuOpen] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);


  const headerScrolled = scrollY > 10;

  
const HEADER_H  = 57.6;
const SECTION_H = 44;
const FONT = "'Helvetica Neue', Helvetica, Arial, sans-serif";
const LINK_CLS = "text-[0.65rem] uppercase tracking-widest font-bold text-black hover:opacity-40 transition-opacity duration-[250ms]";






  return (


    





    








    <div className="bg-white text-neutral-900 overflow-x-hidden" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
 <Navbar name="About" />




      {/* ── THE CORE EFFECT: sticky wordmark + gallery covers it ── */}
      <HeroWithStickyWordmark heroVisible={heroVisible} />

      {/* ── Everything below is normal scroll flow, bg white ────── */}
      <div className="relative bg-white" style={{ zIndex: 10 }}>

        {/* Second Wordmark */}
        <Reveal className="text-center px-9 overflow-hidden py-24">
          <div className="font-extrabold select-none" style={{ fontSize: "clamp(52px,6vw,190px)", letterSpacing: "-0.05em", lineHeight: 0.9,padding: "0 60px", color: "black" }}>
            The office is alive.

The office is a place.<sup style={{ fontSize: ".18em", verticalAlign: "super", fontWeight: 400 }}>®</sup>
          </div>
        </Reveal>

        {/* Philosophy intro */}
        

        {/* Two-column philosophy */}
        

        {/* Style section */}
        <section className="px-9 pb-28">
          <Reveal><p className="text-[12px] tracking-[0.14em] uppercase text-neutral-400 mb-[72px]">Style</p></Reveal>
          {STYLES.map((s, i) => <StyleRow key={i} {...s} delay={i * 0.1} />)}
          <div className="border-t border-neutral-100" />
        </section>

        {/* Full-width image */}
       

        {/* Team section */}
    

        {/* Footer CTA */}
       

        {/* Footer */}
         <footer className="border-t border-black px-6 py-1.5">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <li className="text-[0.65rem] uppercase tracking-widest font-bold text-gray-600">
              developed by KHAIR EDDINE LADHARI
            </li>
          <ul className="flex flex-wrap gap-6 items-center">
            {["Contact", "Privacy Policy"].map((item) => (
              <li key={item}>
                <a href="#" className={LINK_CLS}>
                  {item}
                </a>
              </li>
            ))}
            <li className="text-[0.65rem] uppercase tracking-widest font-bold text-gray-600">
              © Baha Architecture
            </li>
          </ul>
        </div>
      </footer>
      </div>
    </div>
  );
}