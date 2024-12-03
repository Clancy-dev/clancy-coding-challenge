import React from 'react'
import { Menu, Search, Zap, ShoppingCart, User } from 'lucide-react'
import Image from 'next/image'


export default function Header() {
  return (
    <div className='header'>
      <Menu className="header__menu-icon" />
      
      <div className="header__content">
        <Image src="/logo.jpg" alt="Logo" width={120} height={40} className="header__logo" />
        
        <div className="header__search-container">
          <input type="text" placeholder="Search..." />
          <Search className="search-icon" />
        </div>
      </div>
      
      <div className="header__actions">
        <div className="header__order-now">
          <Zap className="zap-icon" />
          <span>Order now and get it within 15secs</span>
        </div>
        <ShoppingCart className="header__cart-icon" />
        <User className="header__user-icon" />
      </div>
    </div>
  )
}

