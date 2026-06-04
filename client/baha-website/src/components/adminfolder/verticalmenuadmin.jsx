

import { useNavigate, useLocation } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const verticalmenuadmin = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const LABEL = "text-[0.65rem] uppercase tracking-widest font-bold";
    const MENU_ITEMS = [
      { id: "projects", label: "Manage Projects", path: "/admin/projects" },
      { id: "news",     label: "Manage News", path: "/admin/news" },
      { id: "messages", label: "Manage Messages", path: "/admin/messages" },
      { id: "logout", label: "Logout" },
    ];

    const handleNav = (id) => {
      if (id === "logout") {
        sessionStorage.removeItem("adminToken");
        navigate(`/login`);
        return;
      }
      navigate(`/admin/${id}`);
    };

    const isActive = (path) => {
      return location.pathname === path;
    };

    return (
      <aside className="hidden sm:flex flex-col border-r border-black w-48 shrink-0 h-screen">
        <Link to="/Admin" className={`${LABEL} text-black px-6 py-4 border-b border-black ${isActive("/Admin") ? "bg-black text-white" : "hover:bg-gray-100"} transition-colors`}>
          <p className={`${LABEL} ${isActive("/Admin") ? "text-white" : "text-gray-600 hover:text-gray-500"}`}>Dashboard</p>
        </Link>

        {MENU_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNav(item.id)}
            className={`text-left px-6 py-4 border-t border-black ${LABEL} transition-colors duration-250 cursor-pointer
              ${isActive(item.path) ? "bg-black text-white" : "text-gray-500 hover:bg-black hover:text-white"}`}
          >
            {item.label}
          </button>
        ))}
      </aside>
    );
};
export default verticalmenuadmin;