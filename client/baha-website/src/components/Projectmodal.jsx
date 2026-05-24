import { useEffect, useRef, useState } from "react";

const ProjectModal = ({ project, onClose}) => {
  const [readMore, setReadMore] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState({});
  const scrollRef = useRef(null);
  const lastScrollY = useRef(0);

  // Lock body scroll when modal open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // Keyboard close
  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  // Hide/show sticky meta bar on scroll
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handleScroll = () => {
      const currentY = el.scrollTop;
      setHeaderVisible(currentY < lastScrollY.current || currentY < 80);
      lastScrollY.current = currentY;
    };
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  const handleImageLoad = (id) =>
    setImagesLoaded((prev) => ({ ...prev, [id]: true }));

  if (!project) return null;

  // Split images into pairs for 2-col grid
  const imagePairs = [];
  const imgs = project.images || [];
  for (let i = 0; i < imgs.length; i += 2) {
    imagePairs.push(imgs.slice(i, i + 2));
  }

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-end"
      style={{ background: "rgba(0,0,0,0.35)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Modal Panel — slides up from bottom */}
      <div
        className="relative w-full bg-white"
        style={{
          height: "100vh",
          animation: "slideUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
          overflowY: "auto",
        }}
        ref={scrollRef}
      >
        {/* ── STICKY META BAR ── */}
        <div
          className="sticky top-0 z-20 w-full bg-white border-b border-black/10"
          style={{
            transform: headerVisible ? "translateY(0)" : "translateY(-100%)",
            transition: "transform 0.3s ease",
          }}
        >
          <div className="flex items-center justify-between px-6 py-3">
            <div className="flex gap-6 text-xs tracking-widest uppercase text-black/50">
              {project.location && <span>{project.location}</span>}
              {project.category && <span>{project.category}</span>}
              {project.year && <span>{project.year}</span>}
              {project.size && <span>{project.size}</span>}
            </div>
            {/* Close button */}
            <button
              onClick={onClose}
              className="flex items-center gap-2 text-xs tracking-widest uppercase hover:opacity-50 transition-opacity"
              aria-label="Close"
            >
              <span>Close</span>
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                <path d="M4 16L16 4" stroke="black" strokeWidth="1.2" />
                <path d="M4 4L16 16" stroke="black" strokeWidth="1.2" />
              </svg>
            </button>
          </div>
        </div>

        {/* ── HERO HEADER ── */}
        <div className="px-6 pt-10 pb-8">
          <h1
            className="font-normal leading-none tracking-tight"
            style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)", letterSpacing: "-0.02em" }}
          >
            {project.title?.toUpperCase()}
          </h1>
        </div>

        {/* ── HERO IMAGE ── */}
        <div
          className="w-full overflow-hidden bg-gray-100"
          style={{ aspectRatio: "16/9", maxHeight: "85vh" }}
        >
          <img
            src={project.cover_image?.url || project.cover_image}
            alt={project.title}
            className="w-full h-full object-cover"
            style={{
              opacity: imagesLoaded["cover"] ? 1 : 0,
              transition: "opacity 0.8s ease",
              transform: "scale(1.02)",
            }}
            onLoad={() => handleImageLoad("cover")}
          />
        </div>

        {/* ── DESCRIPTION ── */}
        <div className="px-6 py-16 max-w-3xl">
          <p
            className="text-black leading-relaxed"
            style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)", lineHeight: 1.5 }}
          >
            {project.description}
          </p>

          {project.descriptionFull && (
            <>
              {readMore && (
                <p
                  className="text-black leading-relaxed mt-6"
                  style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)", lineHeight: 1.5 }}
                >
                  {project.descriptionFull}
                </p>
              )}
              <button
                onClick={() => setReadMore(!readMore)}
                className="mt-6 text-2xl hover:opacity-50 transition-opacity"
                aria-label={readMore ? "Read less" : "Read more"}
              >
                {readMore ? "−" : "+"}
              </button>
            </>
          )}
        </div>

        {/* ── IMAGES GRID ── */}
        <div className="px-6 pb-16 space-y-3">
          {imagePairs.map((pair, pairIdx) => (
            <div
              key={pairIdx}
              className={`grid gap-3 ${pair.length === 2 ? "grid-cols-2" : "grid-cols-1"}`}
            >
              {pair.map((img, imgIdx) => {
                const id = `img-${pairIdx}-${imgIdx}`;
                const url = img.url || img;
                return (
                  <div
                    key={imgIdx}
                    className="overflow-hidden bg-gray-100 group cursor-zoom-in"
                    style={{
                      aspectRatio: pair.length === 1 ? "16/9" : "4/3",
                    }}
                  >
                    <img
                      src={url}
                      alt=""
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      style={{
                        opacity: imagesLoaded[id] ? 1 : 0,
                        transition: "opacity 0.8s ease, transform 0.7s ease",
                      }}
                      loading="lazy"
                      onLoad={() => handleImageLoad(id)}
                    />
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* ── INFO / CREDITS ── */}
        {project.info && (
          <div
            className="border-t border-black/10 px-6 py-16"
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}
          >
            {/* Left: info table */}
            <div>
              <h3 className="text-xs tracking-widest uppercase text-black/40 mb-8">Info</h3>
              <dl className="space-y-4">
                {Object.entries(project.info).map(([key, val]) => (
                  <div key={key} className="grid grid-cols-2 gap-4">
                    <dt className="text-xs tracking-widest uppercase text-black/40">{key}</dt>
                    <dd className="text-xs uppercase tracking-wide">{val}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Right: last image or a detail image */}
            {imgs.length > 0 && (
              <div className="overflow-hidden bg-gray-100" style={{ aspectRatio: "4/3" }}>
                <img
                  src={(imgs[imgs.length - 1]).url || imgs[imgs.length - 1]}
                  alt=""
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            )}
          </div>
        )}

        {/* ── RELATED PROJECTS ── */}
        {project.related && project.related.length > 0 && (
          <div className="border-t border-black/10 px-6 py-16">
            <h2 className="text-xs tracking-widest uppercase text-black/40 mb-10">Related</h2>
            <div className="grid grid-cols-3 gap-3">
              {project.related.map((rel, i) => (
                
                <div
                  key={i}
                  className="group cursor-pointer"
                >
                  <div className="overflow-hidden bg-gray-100 mb-3" style={{ aspectRatio: "4/3" }}>
                    <img
                      src={rel.cover_image?.url || rel.cover_image}
                      alt={rel.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <p className="text-xs uppercase tracking-wide">{rel.title}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── FOOTER ── */}
        <div className="border-t border-black/10 px-6 py-8 flex justify-between items-center">
          <span className="text-xs tracking-widest uppercase text-black/40">
            © {new Date().getFullYear()} Baha Architecture
          </span>
          <button
            onClick={onClose}
            className="text-xs tracking-widest uppercase hover:opacity-50 transition-opacity"
          >
            Close Project
          </button>
        </div>
      </div>

      {/* ── SLIDE-UP ANIMATION ── */}
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to   { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default ProjectModal;