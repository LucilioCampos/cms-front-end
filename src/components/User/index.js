import React, { Component } from 'react'
import "./styles.css"

export default class UserComponent extends Component {

  state = {
    id: "",
    name: "",
    email: "",
    status: "",
    kind: "",
    notes: "",
    user: []
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

    this.setState({ id: this.props.id, name: this.props.name, email: this.props.email, notes: this.props.notes })
  }

  handleUser = (user) => {
    return user;
  }

  render() {
    const { id, name, email, status, kind, notes } = this.state
    return (
      <div >
        <table id="customers">
          <tr>
            <th>nome</th>
            <th>email</th>
            <th>status</th>
            <th>tipo</th>
            <th>observações</th>
          </tr>
          <tr>
            <td>{name}</td>
            <td>{email}</td>
            <td>{status}</td>
            <td>{kind}</td>
            <td>{notes}</td>
          </tr>
        </table>
        {/* <ul className="">
          <h3>{this.props.name}</h3>
          <li><p><strong>Email: </strong><span>{email}</span></p></li>
          <li><p><strong>Status: </strong><span>{status}</span></p></li>
          <li><p><strong>Tipo: </strong><span>{kind}</span></p></li>
          <li><p><strong>Observações: </strong></p><span className="notes">{notes}</span></li>
          <li><button onClick={() => this.props.handleUser(user)}>Visualizar</button></li>
        </ul> */}
      </div>
    )
  }
}