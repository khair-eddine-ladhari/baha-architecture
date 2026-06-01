

import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios";
import VerticalMenuAdmin from "./verticalmenuadmin.jsx";
const API_URL = import.meta.env.VITE_API_URL;


const projectsadmin = () => {
    return (
        <div>
            <VerticalMenuAdmin />
        </div>
    )
}

export default projectsadmin