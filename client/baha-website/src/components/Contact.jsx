import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
import Navbar from "./Navbarcontact";
import Footer from "./Footer";
const NAV_LINKS = [
  { label: "HOME", href: "/" },
  { label: "WORK", href: "/Work" },
  { label: "ABOUT", href: "/About" },
  { label: "CONTACT", href: "/Contact" }
  
 
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
      <Navbar />

      {/* ─── MAIN CONTENT ─── */}
      <main className="pt-[60px]">
        <div className="max-w-[1200px] mx-auto px-8 sm:px-12 lg:px-20 pt-[80px] md:pt-[120px] pb-[80px] md:pb-[120px]">
          <div className="grid grid-cols-1 md:grid-cols-[42%_58%] gap-16 md:gap-0">

            {/* ── Left: Info ── */}
            <div className="md:pr-12">
              <h1 className="text-[24px] tracking-[0.25em] uppercase mb-12 md:mb-16">
                CONTACT
              </h1>

              <div className="flex flex-col gap-6 text-[13px] leading-relaxed">
                <a
                  href="mailto:info@minimalstudio.es"
                  className="text-[0.65rem] uppercase tracking-widest font-bold text-gray-600"
                >
                  info@minimalstudio.es
                </a>

                <div>
                  <p className="text-[0.65rem] uppercase tracking-widest font-bold text-gray-600">Calle Teodor Canet, 8</p>
                  <p className="text-[0.65rem] uppercase tracking-widest font-bold text-gray-600">07400 Puerto de Alcudia. (Baleares) España</p>
                  
                </div>

                <a href="tel:+34660671878" className="text-[0.65rem] uppercase tracking-widest font-bold text-gray-600">
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
          <div className="max-w-[1200px] mx-auto flex justify-between items-start px-8 sm:px-12 lg:px-20 py-14">
  
  {/* Logo mark */}
  <div>
    <a
      href="/"
      className="text-[2.65rem] uppercase tracking-widest font-bold text-gray-600"
    >
      BAHA ARCH
    </a>
  </div>

  {/* Contact info */}
  <div className="flex flex-col gap-2 text-[12px] leading-relaxed">
    <a
      href="tel:+34600655350"
      className="text-[0.65rem] uppercase tracking-widest font-bold text-gray-600"
    >
      +34 600 655 350
    </a>

    <a
      href="mailto:info@minimalstudio.es"
      className="text-[0.65rem] uppercase tracking-widest font-bold text-gray-600"
    >
      info@minimalstudio.es
    </a>

    <p className="text-[0.65rem] uppercase tracking-widest font-bold text-gray-600">
      Calle Teodor Canet, 8, 07400
    </p>

    <p className="text-[0.65rem] uppercase tracking-widest font-bold text-gray-600">
      Puerto de Alcudia, Mallorca
    </p>
  </div>
</div>
        </footer>
      </main>
    </div>
  );
}


