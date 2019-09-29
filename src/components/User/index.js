import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import "./styles.css"

export default class UserComponent extends Component {

  state = {
    id: "",
    email: "",
    status: "",
    kind: "",
    notes: "",
  }

  componentDidMount() {
    if (this.props.status === 'active') {
      this.setState({ status: 'ativo' })
    } else if (this.props.status === 'inactive') {
      this.setState({ status: 'inátivo' })
    } else {
      this.setState({ status: 'Não informado' })
    }

    if (this.props.kind === 'manager') {
      this.setState({ kind: "gerente" })
    } else if (this.props.kind === 'salesman') {
      this.setState({ kind: 'vendedor' })
    } else {
      this.setState({ kind: 'Não informado' })
    }

    this.setState({ id: this.props.id, email: this.props.email, notes: this.props.notes })
  }

  render() {
    const { id, email, status, kind, notes } = this.state
    return (
      <div className="show-user">
        <ul className="">
          <h3>{this.props.name}</h3>
          <li><p><strong>Email: </strong>{email}</p></li>
          <li><p><strong>Status: </strong>{status}</p></li>
          <li><p><strong>Tipo: </strong>{kind}</p></li>
          <li><p><strong>Observações: </strong>{notes}</p></li>
          <li><Link to={`/users/${id}`}>Visualizar</Link></li>
        </ul>
      </div>
    )
  }
}