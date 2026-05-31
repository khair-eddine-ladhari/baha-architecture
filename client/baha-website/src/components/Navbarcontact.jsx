import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const headerScrolled = scrollY > 10;

  const HEADER_H = 57.6;

  function KaanLogo() {
    const navigate = useNavigate();
    return (
      <div>
        <p className="cursor-pointer" onClick={() => navigate('/')}>BAHA ARCHITECTURE</p>
      </div>
    );
  }

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: HEADER_H,
        zIndex: 500,
        background: "rgba(239,239,239,0.7)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        borderBottom: "1px solid #e0e0e0",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 2.2rem",
        transition: "background 0.25s",
      }}
    >
      <KaanLogo width={80} />
      <nav style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
        {["Home", "Work", "About", "Contact"].map(n => (
          <a
            key={n}
            href={`${n.toLowerCase()}`}
            className="text-[0.65rem] uppercase tracking-widest font-bold text-black hover:opacity-40 transition-opacity duration-[250ms]"
            style={{
              textDecoration: "none",
              borderBottom: n === "Contact" ? "1px solid #000" : "none",
              paddingBottom: 1,
            }}
          >
            {n}
          </a>
        ))}
      </nav>
    </header>
  );
}

export default Navbar;