import { useState, useEffect, useRef } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
console.log("API URL:", API_URL);

const slides = [
  "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1400&q=80",
  "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1400&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&q=80",
  "https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?w=1400&q=80",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1400&q=80",
];

const awards = [
  { year: "2026", items: ["Shortlist EU Mies Award 2026"] },
  { year: "2025", items: ["Winner Schreudersprijs", "Nomination BNA Award, Identity and Iconic Value", "Nomination Architectenweb Awards (School Building of the Year)"] },
  { year: "2024", items: ["Winner Prix Versailles Museums 2024", "Special commendation European Museum of the Year (EMYA)", "Nomination ArchDaily Building of the Year"] },
  { year: "2023", items: ["Winner Cultural Building of the Year, Archello Awards 2023", "Winner Hugo Häring Preis, Neckar-Alb district", "Nomination Dezeen Awards 2023"] },
  { year: "2022", items: ["Winner International Architecture Awards 2022", "Nomination Simon Prize 2022", "Nomination DAM Preis"] },
  { year: "2021", items: ["Winner Macael Award – Loenen Pavilion", "Winner ABB LEAF Awards", "Nomination EU Mies Award 2021"] },
];

// Slideshow component
function Slideshow() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full overflow-hidden bg-gray-100" style={{ aspectRatio: "16/9" }}>
      {slides.map((src, i) => (
        <img
          key={i}
          src={src}
          alt=""
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
          style={{ opacity: i === current ? 1 : 0 }}
        />
      ))}
      {/* slide indicators */}
      <div className="absolute bottom-3 right-4 flex gap-1.5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === current ? "bg-white" : "bg-white/40"}`}
          />
        ))}
      </div>
    </div>
  );
}

// Reveal on scroll
function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// Awards expandable list
function AwardsList() {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? awards : awards.slice(0, 3);
  return (
    <div className="mt-8">
      <h3 className="text-xs uppercase tracking-widest font-light text-black mb-6 border-t border-black pt-4">Awards</h3>
      <div className="space-y-5">
        {visible.map((group, i) => (
          <Reveal key={group.year} delay={i * 60}>
            <dl className="grid grid-cols-[4rem_1fr] gap-4">
              <dt className="text-xs font-light text-gray-500 pt-0.5">{group.year}</dt>
              <dd>
                {group.items.map((item, j) => (
                  <p key={j} className="text-xs font-light leading-relaxed text-black">{item}</p>
                ))}
              </dd>
            </dl>
          </Reveal>
        ))}
      </div>
      <button
        onClick={() => setExpanded(!expanded)}
        className="mt-6 flex items-center gap-2 text-xs uppercase tracking-widest font-light hover:opacity-50 transition-opacity duration-300"
      >
        <span className="text-lg leading-none">{expanded ? "−" : "+"}</span>
        <span>{expanded ? "Show less" : "Show more"}</span>
      </button>
    </div>
  );
}

// Section component — like KAAN's "register__section"
// Header is always visible, content expands/collapses
function RegisterSection({ id, title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id={id}
      className="border-t border-black"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}
    >
      {/* section header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-baseline py-5 group text-left"
      >
        <h2
          className="font-light uppercase leading-none group-hover:opacity-50 transition-opacity duration-300"
          style={{ fontSize: "clamp(2.2rem, 5vw, 4.5rem)", letterSpacing: "-0.02em" }}
        >
          {title}
        </h2>
        <span className="text-xl font-light text-gray-400 ml-4 shrink-0">
          {open ? "−" : "+"}
        </span>
      </button>

      {/* section content */}
      <div
        className="overflow-hidden transition-all duration-700 ease-in-out"
        style={{ maxHeight: open ? "9999px" : "0px", opacity: open ? 1 : 0 }}
      >
        <div className="pb-16">
          {children}
        </div>
      </div>
    </section>
  );
}

export default function About() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("practice");

  // track scroll to highlight active section in top nav
  useEffect(() => {
    const sections = ["practice", "contact"];
    const handleScroll = () => {
      for (const id of sections) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 80) setActiveSection(id);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


















  return (
    <div
      className="min-h-screen text-black"
      style={{
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
        backgroundColor: "#E1E3E3",
      }}
    >
      {/* Search modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-[#E1E3E3] flex flex-col pt-24 px-8">
          <button
            onClick={() => setSearchOpen(false)}
            className="absolute top-5 right-5 p-1 hover:opacity-40 transition-opacity"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor">
              <path d="M4 16L16 4" strokeWidth="1.2" strokeLinecap="round" />
              <path d="M4 4L16 16" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </button>
          <input
            autoFocus
            type="search"
            placeholder="Search..."
            className="w-full max-w-2xl text-3xl font-light border-b border-black pb-3 outline-none bg-transparent placeholder-gray-400"
          />
        </div>
      )}

      {/* TOP NAV — horizontal like KAAN about page */}
      <header
        className="sticky top-0 z-40 flex items-center justify-between px-6 border-b border-black/20"
        style={{ height: "3.6rem", backgroundColor: "rgba(225,227,227,0.92)", backdropFilter: "blur(8px)" }}
      >
        {/* left: nav links */}
        <nav className="flex items-center gap-8">
          {[
             { label: "Home", href: "/Home" },
            { label: "About", href: "/About", active: true },
            { label: "Work", href: "/Work" },
            { label: "Contact", href: "/Contact" },
           
          ].map(item => (
            <a
              key={item.label}
              href={item.href}
              className={`text-xs font-light transition-opacity duration-200 ${item.active ? "opacity-100" : "opacity-60 hover:opacity-100"}`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* center: logo */}
        <a href="/" className="absolute left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.2em] font-light">
          Baha Architecture
        </a>

        {/* right: search */}
    
      </header>

      {/* SUB NAV — practice / contact links */}
      <div className="px-6 py-3 border-b border-black/10 flex gap-6">
        {["practice", "contact"].map(id => (
          <a
            key={id}
            href={`#${id}`}
            className={`text-xs font-light capitalize transition-opacity duration-200 ${activeSection === id ? "opacity-100" : "opacity-40 hover:opacity-80"}`}
          >
            {id}
          </a>
        ))}
      </div>

      {/* MAIN CONTENT */}
      <main className="px-6 lg:px-10 pb-24">

        {/* ── PRACTICE SECTION ── */}
        <RegisterSection id="practice" title="Practice" defaultOpen={true}>

          {/* Text block 1 */}
          <Reveal className="max-w-3xl mb-10">
            <p className="text-sm font-light leading-relaxed">
              An international architectural practice engaged in context-specific, timeless designs spanning a broad range of scales and typologies in both the private and public sectors. Based in Tunis, the office is led by founding partners with satellite offices across the region, and nearly twenty years of experience. A diverse international team shapes a dynamic, culturally rich work environment.
            </p>
            <br />
            <p className="text-sm font-light leading-relaxed">
              The firm's approach centers on an architecture of dialogue, embracing an inclusive, relational understanding to the surrounding world, fostering meaningful connections within its growing complexity.
            </p>
          </Reveal>

          {/* Slideshow */}
          <Reveal className="w-full mb-10">
            <Slideshow />
          </Reveal>

          {/* Text block 2 */}
          <Reveal className="max-w-3xl mb-10" delay={100}>
            <p className="text-sm font-light leading-relaxed">
              Research and education are integral to the practice, with partners and team members actively engaging in teaching and academic exchange. The office maintains close ties with leading universities where founding partners hold professorial positions.
            </p>
          </Reveal>

          {/* Text block 3 */}
          <Reveal className="max-w-3xl mb-10" delay={150}>
            <p className="text-sm font-light leading-relaxed">
              The work is defined by an equilibrium of clarity and complexity — an architecture of dialogue that seeks coherence amid competing demands. Each project emerges from the overlap of truth, agreement, and practice where multiple voices converge through a shared narrative. The resulting buildings are both rational and expressive — precise in geometry, rigorous in craft, and rooted in a civic sense of permanence.
            </p>
          </Reveal>

          {/* Second slideshow */}
          <Reveal className="w-full mb-10" delay={100}>
            <Slideshow />
          </Reveal>

          {/* Awards */}
          <Reveal delay={100}>
            <AwardsList />
          </Reveal>

        </RegisterSection>

        {/* ── CONTACT SECTION ── */}
 
      </main>

      {/* FOOTER */}
      <footer className="border-t border-black px-6 py-4">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <a href="/" className="text-[10px] uppercase tracking-[0.25em] font-light hover:opacity-40 transition-opacity">
            Baha Architecture
          </a>
          <ul className="flex flex-wrap gap-6 items-center">
            {["Contact", "News Archive", "Instagram", "LinkedIn", "Privacy Policy"].map(item => (
              <li key={item}>
                <a href="#" className="text-[10px] font-light hover:opacity-40 transition-opacity duration-300">{item}</a>
              </li>
            ))}
            <li className="text-[10px] font-light text-gray-400">© Baha Architecture</li>
          </ul>
        </div>
      </footer>
    </div>
  );
}



///now we will make the ; text bigger and make the images smaller=> (make to images beside each other);and the animation also have to be good like the website like the animation of news;like this image

