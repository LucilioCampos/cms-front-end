import React from 'react';
import { useState, useEffect } from 'react'
import { isAuthenticated, logout } from '../../services/auth'

import './styles.css'

const Header = () => {
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    handleLogin()
  }, [logged])

  const handleLogin = () => {
    setLogged(isAuthenticated)
  }
  return (
    <header id="main-header">
      <div className="main-nav">
        <a className="active" href="#Home">Home</a>
        <a href="#contact">Contact</a>
        <a href="#about">About</a>
        {logged && (<a onClick={logout} href="/auth">Logout</a>)}
      </div>

    </header>
  )
}

export default Header