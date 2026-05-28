import { useState, useEffect, useRef } from "react";
import Projectmodal from "./Projectmodal.jsx";
import axios from "axios";
import Footer from "./Footer.jsx";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;
const FONT = { fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" };
const LINK_CLS = "text-[0.65rem] uppercase tracking-widest font-bold text-black hover:opacity-40 transition-opacity duration-[250ms]";

function NewsItem({ item }) {
  const [open, setOpen] = useState(false);
  return (
    <li className="border-t border-black">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left py-4 grid grid-cols-[6rem_1fr] gap-4 group"
      >
        <span className="text-[0.65rem] uppercase tracking-widest font-bold text-gray-400 pt-0.5 tabular-nums">
          {item.date}
        </span>
        <span className="text-[0.65rem] uppercase tracking-widest font-bold leading-snug group-hover:opacity-50 transition-opacity duration-300">
          {item.title}
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
        <p className="text-[0.65rem] uppercase tracking-widest font-bold text-gray-400 leading-relaxed pb-5 pl-[calc(6rem+1rem)] pr-2">
          {item.body}
        </p>
      </div>
    </li>
  );
}

function ProjectTeaser({ project, index, onSelect, titleRef }) {
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

  const navigate = useNavigate();
  const functserchbyslug = (project) => {
    
    navigate(`/Projectmodal/${project.slug}`);


    
  }












  return (
    <div
      ref={ref}
      onClick={()=>functserchbyslug(project)}
      className={`group cursor-pointer transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      style={{ transitionDelay: `${index * 120}ms`, marginBottom: "2rem" }}
    >
      {/* invisible anchor to measure scroll position */}
      <div ref={titleRef} style={{ height: 0 }} />
      <div className="flex justify-between items-baseline border-t border-black py-2">
        <h3 className="text-[0.65rem] uppercase tracking-widest font-bold">
          {project.title}
        </h3>
        <span className="text-[0.65rem] uppercase tracking-widest font-bold text-gray-400 ml-6 shrink-0">
          {project.location}
        </span>
      </div>
      <div className="overflow-hidden w-full" style={{ aspectRatio: "16/10" }}>
        <img
          src={project.cover_image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          loading="lazy"
        />
      </div>
    </div>
  );
}

export default function Home() {




  
  const [searchOpen, setSearchOpen] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState([]);
  const [news, setNews] = useState([]);
  const [passedCount, setPassedCount] = useState(0);
  const titleRefs = useRef([]);


  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projRes, newsRes] = await Promise.all([
          axios.get(`${API_URL}/api/projects`),
          axios.get(`${API_URL}/api/news`),
        ]);
        setProjects(projRes.data);
        setNews(newsRes.data);
        console.log("first project from list:", projRes.data[0]);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      let count = 0;
      titleRefs.current.forEach((ref) => {
        if (ref && ref.getBoundingClientRect().top < 0) count++;
      });
      setPassedCount(count);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [projects]);

  return (
    <div className="bg-white text-black" style={FONT}>

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
            className="w-full max-w-2xl text-3xl font-bold uppercase tracking-widest border-b border-black pb-3 outline-none bg-transparent placeholder-gray-200"
          />
        </div>
      )}

      {/* HERO */}
      <header className="relative w-full bg-black overflow-hidden" style={{ height: "100svh" }}>
        <video
          className="absolute inset-0 w-full h-full object-cover opacity-90"
          autoPlay muted loop playsInline
          src="https://kaanarchitecten.com/media/_960xauto-q60/KAAN-Architecten_The-Learnd_cut_30s-3-2-02.mp4"
        />
        <div
          className={`absolute top-10 left-1/2 -translate-x-1/2 z-10 transition-all duration-1000 ease-out ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
        >
          <span
            className="text-white font-black uppercase"
            style={{ fontSize: "clamp(2rem, 4vw, 5rem)", letterSpacing: "0.15em" }}
          >
            Baha Arch
          </span>
        </div>
      </header>

      {/* MAIN split layout */}
      <div style={{ display: "flex", minHeight: "100vh" }}>

        {/* LEFT sticky nav */}
        <div
          className="hidden lg:flex flex-col justify-start pt-7 px-6"
          style={{ width: "50%", position: "sticky", top: 0, height: "100vh", flexShrink: 0 }}
        >
          <nav>
  <ul>
    {[ "Work","About", "Contact"].map((item) => (
      <li key={item} className="border-b border-black">
        <a
          href={`/${item.toLowerCase()}`}
          className="block font-black leading-none py-2 uppercase hover:opacity-30 transition-opacity duration-300"
          style={{
            fontSize: "clamp(2.8rem, 5.5vw, 5.5rem)",
            letterSpacing: "-0.02em",
          }}
        >
          {item}
        </a>
      </li>
    ))}
  </ul>
</nav>

          {/* Stacked passed titles shown in left panel */}
          {passedCount > 0 && (
            <div className="mt-6">
              {projects.slice(0, passedCount).map((p) => (
                <div key={p.id} className="flex justify-between border-t border-black py-1.5">
                  <span className="text-[0.65rem] uppercase tracking-widest font-bold">{p.title}</span>
                  <span className="text-[0.65rem] uppercase tracking-widest font-bold text-gray-400 ml-4 shrink-0">{p.location}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT scrollable */}
        <div style={{ width: "50%", flexShrink: 0, paddingTop: "1.75rem", paddingLeft: "1.5rem", paddingRight: "1.5rem", paddingBottom: "6rem" }}>

          {/* Projects */}
          <section>
            {projects.map((project, i) => (
  <ProjectTeaser
    key={project._id || project.id || project.slug || i}
    project={project}
    index={i}
    onSelect={setSelectedProject}
    titleRef={(el) => (titleRefs.current[i] = el)}
  />
))}
          </section>

          {/* News */}
          <section style={{ marginTop: "4rem" }}>
            <h2 className="text-[0.65rem] uppercase tracking-widest font-bold text-gray-400 mb-0">
              News
            </h2>
            <ul>
  {news.map((item) => (
    <NewsItem key={item._id || item.id || item.title} item={item} />
  ))}
</ul>
            <div className="border-t border-black pt-4" />
          </section>
        </div>
      </div>

      {/* BAHA ARCH wordmark above footer */}
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", padding: "4rem 0", overflow: "hidden", userSelect: "none" }}>
        <span
          className="font-black uppercase text-black leading-none"
          style={{ fontSize: "clamp(4rem, 10vw, 16rem)", letterSpacing: "-0.03em" }}
        >
          BAHA ARCH
        </span>
      </div>

      {/* FOOTER */}
      
      <Footer />
     

    
    </div>
  );
}