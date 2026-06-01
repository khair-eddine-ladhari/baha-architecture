

import { useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const verticalmenuadmin =() => {
    const navigate = useNavigate();
const LABEL = "text-[0.65rem] uppercase tracking-widest font-bold";
    const MENU_ITEMS = [
  { id: "projects", label: "Manage Projects" },
  { id: "news",     label: "Manage News" },
  { id: "messages", label: "Manage Messages" },
 
  { id: "logout", label: "Logout" },
];

const handleNav = (id) => {
  // Implement navigation logic here, e.g.:
  if (id === "logout") {
    sessionStorage.removeItem("adminToken");
    navigate(`/login`);
    return;
  }
  navigate(`/admin/${id}`);
};





    return(
      
       <aside className="hidden sm:flex flex-col border-r border-black w-48 shrink-0 h-screen">

        <Link to="/Admin" className={`${LABEL} text-black  px-6 py-4 border-b border-black`}>
         <p className={`${LABEL} text-gray-600 px-6 pt-6 pb-3 hover:text-gray-500`}>Quick access</p>
        </Link>
          


          {MENU_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className={`text-left px-6 py-4 border-t border-black ${LABEL} text-gray-500
                hover:bg-black hover:text-white transition-colors duration-[250ms] cursor-pointer`}
            >
              {item.label}
            </button>
          ))}
        </aside>
    )
}
export default verticalmenuadmin;