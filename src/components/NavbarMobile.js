import React, { useState } from 'react'
import { FaBars } from 'react-icons/fa'

const NavbarMobile = () => {
  const [showMenu, setShowMenu] = useState(false)

  return (
    <nav className="nav-mobile">
      <FaBars
        className="nav-toggle" 
        onClick={() => {
          setShowMenu(!showMenu)
          console.log(showMenu)
        }} 
      />
      {showMenu && 
        <ul className="nav__list">
          <li className="nav__item">Shop</li>
          <li className="nav__item">About</li>
          <li className="nav__item">Contact</li>
        </ul>
      }
    </nav>
  )
}

export default NavbarMobile