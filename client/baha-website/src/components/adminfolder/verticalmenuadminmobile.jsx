

import { useNavigate, useLocation } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const verticalmenuadminmobile = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const LABEL = "text-[0.65rem] uppercase tracking-widest font-bold";

    const handleNav = (id) => {
      if (id === "logout") {
        sessionStorage.removeItem("adminToken");
        navigate(`/login`);
        return;
      }
      if (id === "") {
        navigate("/Admin");
        return;
      }
      navigate(`/admin/${id}`);
    };

    const MENU_ITEMS = [
      { id: "",   label: "Dashboard", path: "/Admin" },
      { id: "projects", label: "Manage Projects", path: "/admin/projects" },
      { id: "news",     label: "Manage News", path: "/admin/news" },
      { id: "messages", label: "Manage Messages", path: "/admin/messages" },
      { id: "logout",   label: "Logout" },
    ];

    const isActive = (path) => {
      return location.pathname === path;
    };

    return (
      <div className="sm:hidden border-t border-black">
        {MENU_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNav(item.id)}
            className={`w-full text-left px-6 py-4 border-b border-black ${LABEL} transition-colors duration-250 cursor-pointer
              ${isActive(item.path) ? "bg-black text-white" : "text-gray-500 hover:bg-black hover:text-white"}`}
          >
            {item.label}
          </button>
        ))}
      </div>
    );
};
export default verticalmenuadminmobile;