import { useState, useEffect, useRef } from "react";

const projects = [
  {
    id: 1,
    title: "Building 140 CERN",
    location: "Geneva, CH",
    slug: "building-140-cern",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1400&q=80",
  },
  {
    id: 2,
    title: "Antwerp Coordination Center — ACC",
    location: "Antwerp, BE",
    slug: "antwerp-coordination-center",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1400&q=80",
  },
  {
    id: 3,
    title: "Netherlands American Cemetery Visitor Center",
    location: "Margraten, NL",
    slug: "netherlands-american-cemetery",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&q=80",
  },
];

const news = [
  {
    id: 1,
    date: "29/04 2026",
    title: "Appointed lead architect for Schiphol's long-term investment programme",
    body: "Royal Schiphol Group has appointed the firm as lead architect for the multi-year investment programme that will reshape the airport over the coming decade.",
  },
  {
    id: 2,
    date: "01/04 2026",
    title: "Advanced Science Building receives building permit",
    body: "Located near the EPFL Innovation Park in Lausanne, construction is set to start in spring 2026 and continue until 2030.",
  },
  {
    id: 3,
    date: "19/03 2026",
    title: "Design win for Area 19 at Eindhoven University of Technology",
    body: "Won the tender for Area 19 at TU/e, including the design of a new research and education building and the urban development of a new campus area.",
  },
  {
    id: 4,
    date: "17/12 2025",
    title: "Studio expands its leadership towards the future",
    body: "An expanded leadership structure reflects the firm's ongoing growth and long-term vision.",
  },
];

function NewsItem({ item }) {
  const [open, setOpen] = useState(false);
  return (
    <li className="border-t border-black">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left py-4 grid grid-cols-[6rem_1fr] gap-4 group"
      >
        <span className="text-xs text-gray-400 pt-0.5 font-light tabular-nums">
          {item.date}
        </span>
        <span className="text-sm font-light leading-snug group-hover:opacity-50 transition-opacity duration-300">
          {item.title}
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-xs text-gray-400 font-light leading-relaxed pb-5 pl-[calc(6rem+1rem)] pr-2">
          {item.body}
        </p>
      </div>
    </li>
  );
}

function ProjectTeaser({ project, index }) {
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
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      <a href={`/work/${project.slug}`} className="block group">
        {/* Title row — exactly like KAAN */}
        <div className="flex justify-between items-baseline border-t border-black py-2">
          <h3 className="text-[11px] font-light uppercase tracking-wider group-hover:opacity-40 transition-opacity duration-300">
            {project.title}
          </h3>
          <span className="text-[11px] font-light text-gray-400 uppercase tracking-wider ml-6 shrink-0">
            {project.location}
          </span>
        </div>
        {/* Image */}
        <div className="overflow-hidden w-full" style={{ aspectRatio: "16/10" }}>
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            loading="lazy"
          />
        </div>
      </a>
    </div>
  );
}

export default function Home() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="bg-white text-black"
      style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
    >
      {/* Search icon — fixed top right always */}
      <button
        onClick={() => setSearchOpen(true)}
        className="fixed top-5 right-5 z-50 p-1 hover:opacity-40 transition-opacity duration-300"
        aria-label="Search"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor">
          <circle cx="9.5" cy="9.5" r="7" strokeWidth="1.2" />
          <path d="M15 15L19 19" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </button>

      {/* Search modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col pt-24 px-8">
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
            className="w-full max-w-2xl text-3xl font-light border-b border-black pb-3 outline-none bg-transparent placeholder-gray-200"
          />
        </div>
      )}

      {/* HERO — full screen video */}
      <header
        className="relative w-full bg-black overflow-hidden"
        style={{ height: "100svh" }}
      >
        <video
          className="absolute inset-0 w-full h-full object-cover opacity-90"
          autoPlay muted loop playsInline
          src="https://kaanarchitecten.com/media/_960xauto-q60/KAAN-Architecten_The-Learnd_cut_30s-3-2-02.mp4"
        />
        {/* Studio name — bottom center */}
        <div
          className={`absolute bottom-10 left-1/2 -translate-x-1/2 z-10 transition-all duration-1000 ease-out ${
            heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
        >
          <span className="text-white text-[10px] uppercase tracking-[0.35em] font-light">
            Baha Architecture
          </span>
        </div>
      </header>

      {/* MAIN — split layout: sticky left + scrolling right */}
      <div className="flex" style={{ minHeight: "100vh" }}>

        {/* LEFT — sticky nav */}
        <div
          className="hidden lg:flex flex-col justify-start pt-7 px-6"
          style={{
            width: "50%",
            position: "sticky",
            top: 0,
            height: "100vh",
            flexShrink: 0,
          }}
        >
          <nav aria-label="Main menu">
            <ul>
              {["About", "Work", "Repository"].map((item) => (
                <li key={item} className="border-b border-black">
                  <a
                    href={`/${item.toLowerCase()}`}
                    className="block font-light leading-none py-2 uppercase hover:opacity-30 transition-opacity duration-300"
                    style={{ fontSize: "clamp(2.8rem, 5.5vw, 5.5rem)", letterSpacing: "-0.02em" }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* RIGHT — scrollable projects + news */}
        <div
          className="w-full lg:w-1/2 pt-7 px-6 pb-24"
          style={{ flexShrink: 0 }}
        >
          {/* Projects */}
          <section>
            <h2 className="sr-only">Projects</h2>
            <div className="space-y-8">
              {projects.map((project, i) => (
                <ProjectTeaser key={project.id} project={project} index={i} />
              ))}
            </div>
          </section>

          {/* News */}
          <section className="mt-16">
            <h2 className="text-[10px] uppercase tracking-widest font-light text-gray-400 mb-0">
              News
            </h2>
            <ul>
              {news.map((item) => (
                <NewsItem key={item.id} item={item} />
              ))}
            </ul>
            <div className="border-t border-black pt-4">
              <a
                href="/news"
                className="text-[10px] uppercase tracking-widest font-light hover:opacity-40 transition-opacity duration-300"
              >
                News archive
              </a>
            </div>
          </section>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="border-t border-black px-6 py-4">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <a
            href="/"
            className="text-[10px] uppercase tracking-[0.25em] font-light hover:opacity-40 transition-opacity"
          >
            Baha Architecture
          </a>
          <ul className="flex flex-wrap gap-6 items-center">
            {["Contact", "News Archive", "Instagram", "LinkedIn", "Privacy Policy"].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="text-[10px] font-light hover:opacity-40 transition-opacity duration-300"
                >
                  {item}
                </a>
              </li>
            ))}
            <li className="text-[10px] font-light text-gray-300">© Baha Architecture</li>
          </ul>
        </div>
      </footer>
    </div>
  );
}