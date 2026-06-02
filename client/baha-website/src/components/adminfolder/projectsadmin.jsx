import { useState, useMemo } from "react";

const CATS = ["Residential", "Commercial", "Cultural", "Urban"];
const CAT_ABBR = { Residential: "RES", Commercial: "COM", Cultural: "CUL", Urban: "URB" };
import VerticalMenuAdmin from "./verticalmenuadmin.jsx";
import VerticalMenuAdminmobile from "./verticalmenuadminmobile.jsx";
const INITIAL_PROJECTS = [
  { id: 1, title: "Carthage Residential Complex", slug: "carthage-residential-complex", location: "Carthage, Tunisia", description: "A high-end residential complex with panoramic sea views and sustainable design.", year: 2021, category: "Residential", cover_image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400", images: ["https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400", "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400", "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400"], published: true, buildings: "index" },
  { id: 2, title: "Tunis Business Tower", slug: "tunis-business-tower", location: "Tunis, Tunisia", description: "A 22-floor commercial tower in the heart of the city.", year: 2022, category: "Commercial", cover_image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400", images: ["https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400"], published: true, buildings: "tower" },
  { id: 3, title: "Medina Cultural Center", slug: "medina-cultural-center", location: "Medina, Tunisia", description: "A contemporary cultural center embedded in historical urban fabric.", year: 2023, category: "Cultural", cover_image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=400", images: ["https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=400"], published: false, buildings: "complex" },
  { id: 4, title: "Sfax Urban District", slug: "sfax-urban-district", location: "Sfax, Tunisia", description: "Mixed-use urban regeneration project across 4 city blocks.", year: 2020, category: "Urban", cover_image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400", images: ["https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400"], published: true, buildings: "district" },
];

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

const EMPTY_FORM = () => ({
  title: "", location: "", description: "",
  year: new Date().getFullYear(),
  category: "Residential",
  cover_image: "", images: [], published: false, buildings: "",
});

// ─── Reusable UI ────────────────────────────────────────────────────────────

function Label({ children, className = "" }) {
  return (
    <span className={`text-[0.6rem] font-bold uppercase tracking-[0.12em] ${className}`}>
      {children}
    </span>
  );
}

function Field({ label, children }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[0.6rem] font-bold uppercase tracking-[0.1em] text-zinc-400">{label}</label>
      {children}
    </div>
  );
}

const inputCls = "w-full border border-black px-3 py-2 font-mono text-[0.75rem] bg-white focus:bg-zinc-100 outline-none";

// ─── Modal ──────────────────────────────────────────────────────────────────

function Modal({ title, onClose, footer, children }) {
  return (
    <div
      className="absolute inset-0 bg-black/45 flex items-start justify-center px-4 py-8 z-50 min-h-full"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white border border-black w-full max-w-[560px]">
        <div className="flex items-center justify-between border-b border-black px-5 py-4">
          <Label>{title}</Label>
          <button onClick={onClose} className="text-zinc-400 hover:text-black transition-colors p-1">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 1l12 12M13 1L1 13" />
            </svg>
          </button>
        </div>
        {children}
        <div className="flex border-t border-black">{footer}</div>
      </div>
    </div>
  );
}

function ModalBtn({ children, onClick, variant = "default" }) {
  const base = "flex-1 py-3 font-mono text-[0.6rem] font-bold uppercase tracking-[0.1em] border-r border-black last:border-r-0 transition-colors cursor-pointer";
  const variants = {
    default: "bg-white text-black hover:bg-zinc-100",
    primary: "bg-black text-white hover:bg-zinc-800",
    danger: "bg-white text-red-600 hover:bg-red-50",
  };
  return (
    <button className={`${base} ${variants[variant]}`} onClick={onClick}>
      {children}
    </button>
  );
}

// ─── Project Form ────────────────────────────────────────────────────────────

function ProjectForm({ form, onChange }) {
  const [imgInput, setImgInput] = useState("");

  function addImg() {
    const v = imgInput.trim();
    if (!v) return;
    onChange("images", [...(form.images || []), v]);
    setImgInput("");
  }

  function removeImg(i) {
    onChange("images", form.images.filter((_, idx) => idx !== i));
  }

  return (
    <div className="p-5 flex flex-col gap-4">
      <Field label="Title *">
        <input className={inputCls} value={form.title} onChange={(e) => onChange("title", e.target.value)} placeholder="Project title" />
      </Field>

      <div className="grid grid-cols-2 gap-3">
        <Field label="Location">
          <input className={inputCls} value={form.location} onChange={(e) => onChange("location", e.target.value)} placeholder="City, Country" />
        </Field>
        <Field label="Year">
          <input className={inputCls} type="number" value={form.year} onChange={(e) => onChange("year", e.target.value)} placeholder="2024" />
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Field label="Category">
          <select className={inputCls} value={form.category} onChange={(e) => onChange("category", e.target.value)}>
            {CATS.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </Field>
        <Field label="Buildings">
          <input className={inputCls} value={form.buildings} onChange={(e) => onChange("buildings", e.target.value)} placeholder="index / tower / complex" />
        </Field>
      </div>

      <Field label="Description">
        <textarea className={`${inputCls} min-h-[70px] resize-y`} value={form.description} onChange={(e) => onChange("description", e.target.value)} />
      </Field>

      <Field label="Cover Image URL">
        <input className={inputCls} value={form.cover_image} onChange={(e) => onChange("cover_image", e.target.value)} placeholder="https://..." />
      </Field>

      <Field label={`Images Array (${form.images?.length ?? 0})`}>
        <div className="flex flex-col gap-1">
          {(form.images || []).map((img, i) => (
            <div key={i} className="flex items-center gap-2 px-2 py-1 border border-zinc-200 text-[0.7rem]">
              <span className="flex-1 text-zinc-600 truncate font-mono" title={img}>{img}</span>
              <button onClick={() => removeImg(i)} className="text-zinc-400 hover:text-red-600 transition-colors text-xs leading-none">✕</button>
            </div>
          ))}
        </div>
        <div className="flex mt-1.5">
          <input
            className="flex-1 border border-black border-r-0 px-2 py-1.5 font-mono text-[0.72rem] outline-none focus:bg-zinc-100"
            placeholder="https://... add image URL"
            value={imgInput}
            onChange={(e) => setImgInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addImg(); } }}
          />
          <button onClick={addImg} className="bg-black text-white px-3 font-mono text-[0.6rem] font-bold uppercase tracking-[0.1em] hover:bg-zinc-800 transition-colors">
            Add
          </button>
        </div>
      </Field>

      <div className="flex items-center gap-2.5">
        <input
          type="checkbox"
          id="f-pub"
          checked={form.published}
          onChange={(e) => onChange("published", e.target.checked)}
          className="border border-black w-4 h-4 cursor-pointer accent-black"
        />
        <label htmlFor="f-pub" className="text-[0.6rem] font-bold uppercase tracking-[0.1em] text-zinc-400 cursor-pointer">
          Published
        </label>
      </div>
    </div>
  );
}

// ─── Delete Confirm ──────────────────────────────────────────────────────────

function DeleteModal({ project, onClose, onConfirm }) {
  return (
    <Modal title="Delete Project" onClose={onClose} footer={
      <>
        <ModalBtn onClick={onClose}>Cancel</ModalBtn>
        <ModalBtn variant="danger" onClick={onConfirm}>Delete</ModalBtn>
      </>
    }>
      <div className="px-5 py-4 border-b border-zinc-200">
        <p className="font-bold text-sm text-black mb-1">{project.title}</p>
        <p className="text-[0.78rem] text-zinc-600 font-mono">
          This will permanently remove the project and all associated data. This action cannot be undone.
        </p>
      </div>
    </Modal>
  );
}

// ─── Project Row ─────────────────────────────────────────────────────────────

function ProjectRow({ project, onEdit, onDelete, onTogglePublish }) {
  const [imgErr, setImgErr] = useState(false);

  return (
    <div className="grid grid-cols-[56px_1fr_90px_60px_90px_100px] gap-px bg-black border-b border-black group">
      {/* Thumb */}
      <div className="bg-white p-1 flex items-center">
        {project.cover_image && !imgErr ? (
          <img
            src={project.cover_image}
            alt={project.title}
            className="w-12 h-9 object-cover border border-zinc-200"
            onError={() => setImgErr(true)}
          />
        ) : (
          <div className="w-12 h-9 bg-zinc-100 border border-zinc-200 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
          </div>
        )}
      </div>

      {/* Title */}
      <div className="bg-white group-hover:bg-zinc-50 px-3 py-2.5 flex flex-col justify-center gap-0.5 transition-colors">
        <span className="font-bold text-[0.75rem] leading-tight">{project.title}</span>
        <Label className="text-zinc-400">{project.location} · {project.year}</Label>
      </div>

      {/* Category */}
      <div className="bg-white group-hover:bg-zinc-50 px-3 py-2.5 flex items-center transition-colors">
        <span className="text-[0.6rem] font-bold uppercase tracking-[0.08em] text-zinc-600">{project.category}</span>
      </div>

      {/* Images count */}
      <div className="bg-white group-hover:bg-zinc-50 px-3 py-2.5 flex items-center transition-colors">
        <Label className="text-zinc-400">{project.images.length} img{project.images.length !== 1 ? "s" : ""}</Label>
      </div>

      {/* Status */}
      <div className="bg-white group-hover:bg-zinc-50 px-3 py-2.5 flex items-center transition-colors">
        <button
          onClick={() => onTogglePublish(project)}
          className={`px-1.5 py-0.5 text-[0.58rem] font-bold uppercase tracking-[0.1em] border border-black cursor-pointer transition-colors ${
            project.published ? "bg-black text-white hover:bg-zinc-800" : "bg-white text-black hover:bg-zinc-100"
          }`}
        >
          {project.published ? "Published" : "Draft"}
        </button>
      </div>

      {/* Actions */}
      <div className="bg-white group-hover:bg-zinc-50 flex items-center transition-colors">
        <button
          onClick={() => onEdit(project)}
          className="flex-1 h-full flex items-center justify-center text-zinc-400 hover:text-black transition-colors border-r border-black"
          title="Edit"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
        </button>
        <button
          onClick={() => onDelete(project)}
          className="flex-1 h-full flex items-center justify-center text-zinc-400 hover:text-red-600 transition-colors"
          title="Delete"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
            <path d="M10 11v6M14 11v6" /><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
          </svg>
        </button>
      </div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function ProjectsDashboard() {
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [nextId, setNextId] = useState(5);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(null); // null | {type, project?}
  const [form, setForm] = useState(EMPTY_FORM());

  const catCounts = useMemo(() => {
    const c = {};
    CATS.forEach((cat) => { c[cat] = projects.filter((p) => p.category === cat).length; });
    return c;
  }, [projects]);

  const totalPub = projects.filter((p) => p.published).length;

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchCat = filter === "All" || p.category === filter;
      const q = search.trim().toLowerCase();
      const matchQ = !q || p.title.toLowerCase().includes(q) || p.location.toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  }, [projects, filter, search]);

  function openAdd() {
    setForm(EMPTY_FORM());
    setModal({ type: "add" });
  }

  function openEdit(p) {
    setForm({ ...p, images: [...p.images] });
    setModal({ type: "edit", project: p });
  }

  function openDelete(p) {
    setModal({ type: "delete", project: p });
  }

  function closeModal() { setModal(null); }

  function handleFormChange(key, val) {
    setForm((f) => ({ ...f, [key]: val }));
  }

  function saveProject() {
    if (!form.title.trim()) return;
    const slug = slugify(form.title);
    const data = {
      ...form,
      slug,
      cover_image: form.cover_image.trim() || form.images[0] || "",
      year: parseInt(form.year) || new Date().getFullYear(),
      buildings: form.buildings.trim() || "index",
    };
    if (modal.type === "add") {
      setProjects((ps) => [{ ...data, id: nextId }, ...ps]);
      setNextId((n) => n + 1);
    } else {
      setProjects((ps) => ps.map((p) => p.id === form.id ? { ...data, id: p.id } : p));
    }
    closeModal();
  }

  function deleteProject() {
    setProjects((ps) => ps.filter((p) => p.id !== modal.project.id));
    closeModal();
  }

  function togglePublish(p) {
    setProjects((ps) => ps.map((x) => x.id === p.id ? { ...x, published: !x.published } : x));
  }

  const STATS = [
    { label: "Total", value: projects.length, note: "projects" },
    ...CATS.map((c) => ({ label: CAT_ABBR[c], value: catCounts[c], note: c.toLowerCase() })),
  ];

  return (




 <div className="flex min-h-screen font-mono bg-white text-black w-full">
         <VerticalMenuAdmin/>
    <div className="flex-1 min-w-0 overflow-auto">
    
    <div className="relative min-h-screen font-mono bg-white text-black">


      
       



      <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;700&display=swap" rel="stylesheet" />

      {/* Top bar */}
      <div className="border-b border-black px-5 pt-6 pb-5">
        <Label className="text-zinc-400 block mb-1">Baha Architecture</Label>
        <div className="flex items-end justify-between flex-wrap gap-3">
          <h1 className="text-[1.3rem] font-bold uppercase tracking-[0.12em]">Manage Projects</h1>
          <div className="flex items-center gap-2">
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Search…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border border-black py-2 pl-3 pr-8 font-mono text-[0.75rem] bg-white focus:bg-zinc-100 outline-none w-44"
              />
              <svg className="absolute right-2.5 text-zinc-400 pointer-events-none" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
              </svg>
            </div>
            <button
              onClick={openAdd}
              className="flex items-center gap-1.5 bg-black text-white px-4 py-2 font-mono text-[0.6rem] font-bold uppercase tracking-[0.1em] hover:bg-zinc-800 transition-colors"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 5v14M5 12h14" />
              </svg>
              Add Project
            </button>
          </div>
        </div>
      </div>

      {/* Stat row */}
      <div className="grid grid-cols-5 gap-px bg-black border-b border-black">
        {STATS.map((s) => (
          <div key={s.label} className="bg-white px-4 py-3">
            <Label className="text-zinc-400 block mb-0.5">{s.label}</Label>
            <span className="block text-[1.6rem] font-bold leading-none">{s.value}</span>
            <Label className="text-zinc-200">{s.note}</Label>
          </div>
        ))}
      </div>

      {/* Filter strip */}
      <div className="flex border-b border-black">
        {["All", ...CATS].map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`flex-1 py-2.5 border-r border-black last:border-r-0 font-mono text-[0.6rem] font-bold uppercase tracking-[0.1em] transition-colors ${
              filter === c ? "bg-black text-white" : "bg-white text-zinc-400 hover:bg-zinc-100 hover:text-black"
            }`}
          >
            {c} ({c === "All" ? projects.length : catCounts[c]})
          </button>
        ))}
      </div>

      {/* Table header */}
      <div className="grid grid-cols-[56px_1fr_90px_60px_90px_100px] gap-px bg-black border-b border-black">
        {["", "Title / Location", "Category", "Images", "Status", "Actions"].map((h, i) => (
          <div key={i} className="bg-zinc-100 px-3 py-2">
            <Label className="text-zinc-400">{h}</Label>
          </div>
        ))}
      </div>

      {/* Rows */}
      {filtered.length > 0 ? (
        filtered.map((p) => (
          <ProjectRow
            key={p.id}
            project={p}
            onEdit={openEdit}
            onDelete={openDelete}
            onTogglePublish={togglePublish}
          />
        ))
      ) : (
        <div className="py-12 text-center">
          <Label className="text-zinc-400">No projects found</Label>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between px-5 py-3 border-t border-black">
        <Label className="text-zinc-400">{filtered.length} of {projects.length} shown</Label>
        <Label className="text-zinc-400">{totalPub} published · {projects.length - totalPub} draft</Label>
      </div>

      {/* Modals */}
      {modal?.type === "delete" && (
        <DeleteModal project={modal.project} onClose={closeModal} onConfirm={deleteProject} />
      )}

      {(modal?.type === "add" || modal?.type === "edit") && (
        <Modal
          title={modal.type === "edit" ? "Edit Project" : "Add Project"}
          onClose={closeModal}
          footer={
            <>
              <ModalBtn onClick={closeModal}>Cancel</ModalBtn>
              <ModalBtn variant="primary" onClick={saveProject}>
                {modal.type === "edit" ? "Save Changes" : "Add Project"}
              </ModalBtn>
            </>
          }
        >
          <ProjectForm form={form} onChange={handleFormChange} />
        </Modal>
      )}
    </div>
    </div>
</div>
  );
}