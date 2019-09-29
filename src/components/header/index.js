import React from 'react';

import './styles.css'

const Header = () => (
  <header id="main-header">
    <div className="main-nav">
      <a className="active" href="#Home">Home</a>
      <a href="#contact">Contact</a>
      <a href="#about">About</a>
    </div>
  </header>
)

export default Header;