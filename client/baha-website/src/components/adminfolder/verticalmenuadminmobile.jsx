

import { useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const verticalmenuadminmobile=() => {
        const navigate = useNavigate();
const LABEL = "text-[0.65rem] uppercase tracking-widest font-bold";

const handleNav = (id) => {
  // Implement navigation logic here, e.g.:
  if (id === "logout") {
    sessionStorage.removeItem("adminToken");
    navigate(`/login`);
    return;
  }
  navigate(`/admin/${id}`);
};
    return (
        <div className="sm:hidden border-t border-black">
  {[
    { id: "",   label: "dashboard" },
    { id: "projects", label: "Manage Projects" },
    { id: "news",     label: "Manage News" },
    { id: "messages", label: "Manage Messages" },
    { id: "logout",   label: "Logout" },
    
    
  ].map((item) => (
    <button
      key={item.id}
      onClick={() => handleNav(item.id)}
      className={`w-full text-left px-6 py-4 border-b border-black ${LABEL} text-gray-500
        hover:bg-black hover:text-white transition-colors duration-[250ms] cursor-pointer`}
    >
      {item.label}
    </button>
  ))}
</div>
    );
}
export default verticalmenuadminmobile;