import React, { Component } from 'react';
import { Link } from "react-router-dom"
import { login } from '../../services/auth'
import { conn } from '../../services/api'

export default class Signup extends Component {

  state = {
    email: "",
    password: "",
    error: "",
  }

  handleSignUp = async e => {
    e.preventDefault();
    const { email, password } = this.state;
    if (!email || !password) {
      this.setState({ error: "Preencha todos os dados para se cadastrar" });
    } else {
      try {
        const response = await conn.post("/user_token", { auth: { email, password } });
        login(response.data.jwt)
        console.log(response.data.jwt)
        this.props.history.push("/users");
      } catch (err) {
        console.log(err);
        this.setState({ error: "Ocorreu um erro ao registrar sua conta. T.T" });
      }
    }
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSignUp}>
          {this.state.errors && <span>{this.state.errors.map(error => (
            <p>{error}</p>
          ))}</span>}
          <input
            type="text"
            placeholder="email"
            onChange={e => this.setState({ email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Senha"
            onChange={e => this.setState({ password: e.target.value })}
          />

          <button type="submit">Realizer o Login</button>
          <hr />
          <Link to="/">Fazer Login</Link>
        </form>
      </div>
    )
  }

}