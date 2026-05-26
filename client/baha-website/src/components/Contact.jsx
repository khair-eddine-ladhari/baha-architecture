import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
const NAV_LINKS = [
  { label: "HOME", href: "/" },
  { label: "WORK", href: "/Work" },
  { label: "ABOUT", href: "/About" },
  
 
];

function ChevronDown({ size = 10 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 10 6" fill="none" className="inline-block ml-1">
      <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowRight({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}


export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });




  

  

    const funsubscribe = async () => {
  try {
    const firstName =form.name;
    const email = form.email;
    const lastName = form.message;

    const response = await axios.post(`${API_URL}/api/messages`, {
      firstName,
      email,
      lastName,
    });

    console.log("SUBSCRIBE RESPONSE:", response.data);

    firstNameRef.current.value = "";
    emailRef.current.value = "";
    lastNameRef.current.value = "";

    alert("You have successfully subscribed to our newsletter!");

  } catch (error) {
    console.error("Error subscribing:", error);
  }
};
















  return (
    <div className="min-h-screen bg-[#efefef] font-[Helvetica,Arial,sans-serif] text-[#222]">
      {/* ─── NAV ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#efefef] border-b border-[#efefef]">
        <div className="max-w-[1200px] mx-auto px-8 sm:px-12 lg:px-20 h-[60px] flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="text-[13px] tracking-[0.3em] font-normal uppercase select-none">
            BAHA ARCH
          </a>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-6 lg:gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className={`text-[11px] tracking-[0.18em] uppercase transition-opacity hover:opacity-60 ${
                    link.active ? "underline underline-offset-4" : ""
                  }`}
                >
                  {link.label}
                  {link.hasDropdown && <ChevronDown />}
                </a>
              </li>
            ))}
           
          </ul>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-1"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <span className="block w-5 h-px bg-[#222]" />
            <span className="block w-5 h-px bg-[#222]" />
            <span className="block w-5 h-px bg-[#222]" />
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden bg-[#efefef] border-t border-[#ddd]">
            <div className="max-w-[1200px] mx-auto px-8 sm:px-12 py-4 flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`text-[11px] tracking-[0.18em] uppercase ${link.active ? "underline" : ""}`}
              >
                {link.label}
              </a>
            ))}
            </div>
          </div>
        )}
      </nav>

      {/* ─── MAIN CONTENT ─── */}
      <main className="pt-[60px]">
        <div className="max-w-[1200px] mx-auto px-8 sm:px-12 lg:px-20 pt-[80px] md:pt-[120px] pb-[80px] md:pb-[120px]">
          <div className="grid grid-cols-1 md:grid-cols-[42%_58%] gap-16 md:gap-0">

            {/* ── Left: Info ── */}
            <div className="md:pr-12">
              <h1 className="text-[11px] tracking-[0.25em] uppercase mb-12 md:mb-16">
                CONTACT
              </h1>

              <div className="flex flex-col gap-6 text-[13px] leading-relaxed">
                <a
                  href="mailto:info@minimalstudio.es"
                  className="hover:opacity-60 transition-opacity"
                >
                  info@minimalstudio.es
                </a>

                <div>
                  <p>Calle Teodor Canet, 8</p>
                  <p>07400 Puerto de Alcudia. (Baleares) España</p>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] tracking-[0.15em] uppercase underline underline-offset-2 hover:opacity-60 transition-opacity mt-1 inline-block"
                  >
                    VIEW ON GOOGLE MAPS
                  </a>
                </div>

                <a href="tel:+34660671878" className="hover:opacity-60 transition-opacity">
                  +34 660 671 878
                </a>
              </div>
            </div>

            {/* ── Right: Form ── */}
            <div>
              <div className="flex flex-col gap-10">

                {/* Name */}
                <div className="flex flex-col gap-2">
                  <label className="text-[12px] tracking-[0.08em]" htmlFor="name">
                    Name *
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    className="bg-transparent border-0 border-b border-[#999] outline-none text-[13px] py-2 focus:border-[#222] transition-colors placeholder:text-transparent"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label className="text-[12px] tracking-[0.08em]" htmlFor="email">
                    Email *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    className="bg-transparent border-0 border-b border-[#999] outline-none text-[13px] py-2 focus:border-[#222] transition-colors"
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2">
                  <label className="text-[12px] tracking-[0.08em]" htmlFor="message">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    className="bg-transparent border-0 border-b border-[#999] outline-none text-[13px] py-2 resize-none focus:border-[#222] transition-colors"
                  />
                </div>

           

                {/* reCAPTCHA mock */}
                

                {/* Submit */}
                <div>
                  <button className="flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase border-b border-[#222] pb-0.5 hover:opacity-50 transition-opacity group" onClick={funsubscribe}>
                    SEND
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ─── FOOTER ─── */}
        <footer className="bg-[#efefef] border-t border-[#ddd]">
          <div className="max-w-[1200px] mx-auto px-8 sm:px-12 lg:px-20 py-14 grid grid-cols-1 md:grid-cols-[30%_40%_30%] gap-10 md:gap-0 md:items-start">

            {/* Logo mark */}
            <div>
              <a href="/" className="text-[13px] tracking-[0.3em] font-normal uppercase select-none">
                BAHA ARCH
              </a>
            </div>

            {/* Contact info */}
            <div className="flex flex-col gap-2 text-[12px] leading-relaxed">
              <a href="tel:+34600655350" className="hover:opacity-60 transition-opacity">+34 600 655 350</a>
              <a href="mailto:info@minimalstudio.es" className="hover:opacity-60 transition-opacity">info@minimalstudio.es</a>
              <p>Calle Teodor Canet, 8, 07400</p>
              <p>Puerto de Alcudia, Mallorca</p>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-60 transition-opacity underline underline-offset-2"
              >
                View on Google Maps
              </a>

              {/* Social icons */}
             
            </div>

            {/* Links */}
            <div className="flex flex-col gap-6 text-[12px]">
              <div>
                <p className="mb-1">Subscribe to our newsletter</p>
                <a href="#" className="flex items-center gap-1.5 text-[10px] tracking-[0.2em] uppercase border-b border-[#222] pb-0.5 w-fit hover:opacity-50 transition-opacity">
                  SUBSCRIBE <ArrowRight size={11} />
                </a>
              </div>
              <div>
                <p className="mb-1">Visit our store</p>
                <a href="#" className="flex items-center gap-1.5 text-[10px] tracking-[0.2em] uppercase border-b border-[#222] pb-0.5 w-fit hover:opacity-50 transition-opacity">
                  VISIT <ArrowRight size={11} />
                </a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}


