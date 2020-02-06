import React, { Component } from 'react';

import { login } from '../../services/auth'
import { conn } from '../../services/api'

import "./styles.css"

export default class Signup extends Component {

  state = {
    email: "",
    password: "",
    error: "",
  }

  componentDidMount() {
    console.log(process.env.NODE_ENV)
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
      <div className="content">
        <div id="login">
          <form className="form-control" onSubmit={this.handleSignUp}>
            {this.state.errors && <span>{this.state.errors.map(error => (
              <p>{error}</p>
            ))}</span>}
            <h1>Login</h1>
            <p>
              <label htmlFor="email_login">Seu e-mail</label>
              <input
                id="email_login"
                name="email_login"
                required="required"
                type="text"
                placeholder="ex. contato@techope.com.br"
                onChange={e => this.setState({ email: e.target.value })}
              />
            </p>

            <p>
              <label htmlFor="password">Sua Senha</label>
              <input
                id="password"
                name="password"
                required="required"
                type="password"
                placeholder="ex. senha"
                onChange={e => this.setState({ password: e.target.value })}
              />
            </p>

            <p>
              <input type="submit" value="Logar" />
            </p>

          </form>
        </div>
      </div>
    )
  }

}