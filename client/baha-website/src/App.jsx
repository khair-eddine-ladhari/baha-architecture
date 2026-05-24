
import './App.css'

import { Route, Routes } from 'react-router'
import Home from './components/Home'
import Noaccess from './components/Noaccess'

function App() {
 
  return (

     
    <div>

    

    <Routes>

      <Route path='/' element={<Home />} />

    

      



     

      <Route path='*' element={<h1 className='text-center text-3xl font-bold mt-10'>404 Not Found</h1>} />

      <Route path='/Noaccess' element={<Noaccess />} />


    </Routes>
    
  

    </div>
   
  )
}

export default App
