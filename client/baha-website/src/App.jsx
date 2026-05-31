import './App.css'
import { Route, Router, Routes } from 'react-router'
import Home from './components/Home'
import Noaccess from './components/Noaccess'
import ProjectModal from './components/Projectmodal.jsx'
import About from './components/About.jsx'
import Work from './components/Work.jsx'
import Contact from './components/Contact.jsx'
import EntryScreen from './components/EntryScreen.jsx'
import { useState, useRef } from 'react'
import AdminDashboard from './components/adminfolder/admindashboard.jsx'
import Login  from './components/Login.jsx'

import { useContext } from 'react'
import { GlobalContext } from './components/GlobalContext.jsx'
import { Navigate } from 'react-router-dom'
function App() {

    const { user } = useContext(GlobalContext);

    const userInfo = {
    isconnected: user ? true : false,
    role: user ? user.role : null
    };


  const [entered, setEntered] = useState(
    () => sessionStorage.getItem("entered") === "true"  // ← this is the fix
  );
  const doneRef = useRef(false);

  const handleDone = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    sessionStorage.setItem("entered", "true");
    setEntered(true);
  };

  return (

    

    <>

      {!entered && <EntryScreen onDone={handleDone} />}

      {entered && (
        <div>
          <Routes>
            <Route path='/' element={<Home user={user} />} />
            <Route path='/Home' element={<Home user={user} />} />
            <Route path='/Projectmodal/:slug' element={<ProjectModal />} />
            <Route path='/About' element={<About />} />
            <Route path='/Work' element={<Work />} />
            <Route path='/Contact' element={<Contact />} />
            <Route path='/Noaccess' element={<Noaccess />} />
            <Route path='/Admin' element={sessionStorage.getItem("adminToken") ? <AdminDashboard /> : <Navigate to="/Login" />
} />
            <Route path='/Login' element={<Login />} />
            <Route path='*' element={<h1 className='text-center text-3xl font-bold mt-10'>404 Not Found</h1>} />

            



          </Routes>
        </div>
      )}
    </>
  )
}

export default App