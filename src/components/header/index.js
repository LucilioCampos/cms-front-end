import React from 'react';
import { isAuthenticated, logout } from '../../services/auth'

import './styles.css'

export default class Header extends React.Component {
  state = {
    isLogged: ""
  }

  componentDidMount() {
    this.setState({ isLogged: isAuthenticated() })
  }

  render() {
    return (
      <header id="main-header">
        <div className="main-nav">
          <a className="active" href="#Home">Home</a>
          <a href="#contact">Contact</a>
          <a href="#about">About</a>
          {this.state.isLogged && (<a onClick={logout} href="/auth">Logout</a>)}
        </div>

      </header>
    )
  }
}