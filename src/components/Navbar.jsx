import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
      <NavLink to="/" className="text-2xl font-bold text-blue-500 hover:text-blue-700">
        Home
        </NavLink>      
        <NavLink to="/paste" className="ml-4 text-2xl font-bold text-blue-500 hover:text-blue-700">
        Paste
        </NavLink>
       
    </div>
  )
}

export default Navbar
