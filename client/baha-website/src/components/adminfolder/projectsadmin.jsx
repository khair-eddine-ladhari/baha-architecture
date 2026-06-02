

import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios";
import VerticalMenuAdmin from "./verticalmenuadmin.jsx";
import VerticalMenuAdminmobile from "./verticalmenuadminmobile.jsx";
const API_URL = import.meta.env.VITE_API_URL;


const projectsadmin = () => {
    return (
        <div>
            <VerticalMenuAdmin />
            <VerticalMenuAdminmobile />
        </div>
    )
}

export default projectsadmin