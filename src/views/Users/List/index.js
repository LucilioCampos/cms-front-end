import React, { Component } from 'react';
import { conn } from "../../../services/api"

import "./styles.css";
import UserComponent from '../../../components/User';
import Modal from "../../../components/Modal"
import { logger } from 'handlebars';

export default class UsersList extends Component {
  state = {
    users: [],
    page: 1,
    selectedUser: {},
    open: true
  }

  handleOn = async (event) => {
    event.preventDefault();
    const { selectedUser } = this.state;
    const response = await conn.put(`/api/v1/users/${selectedUser.id}`);
    console.log(response)
  }

  handleTextArea(event) {
    console.log(event.target.value);
    console.log(this.state.open)
  }

  handleUser = (user) => {
    this.setState({ modalOpen: true })
  }

  componentDidMount() {
    this.loadUsers();
  }

  loadUsers = async (page = 3) => {
    const response = await conn.get(`/api/v1/users?page=${page}`);
    this.setState({ users: response.data })
    console.log(process.env.NODE_ENV)
  }

  loadUser = (user) => {
    console.log(user.status)

    this.setState({ selectedUser: user })
    this.handleModal()
  }

  handleModal = () => {
    if (this.state.open === true) {
      this.setState({ open: false })
    } else {
      this.setState({ open: true })
    }
  }

  render() {

    const { users, selectedUser, open } = this.state

    return (
      <>
        <Modal className="modal"
          show={open}
          modalHeader={selectedUser.name}
          handleClose={this.handleModal}
          handleOn={this.handleOn}
          close={this.handleModal}
        >
          <form className="user-form">
            <div className="input-name">
              <input type="text" name="name" value={selectedUser.name} placeholder="Digite o nome" required />
            </div>
            <div className="input-email">
              <input type="email" name="email" value={selectedUser.email} placeholder="Digite o email" />
            </div>
            <div className="input-status">
              <span>Ativo</span>
              <input class="check-status" type="checkbox" value={selectedUser.status === 'ativo' ? true : false} />
            </div>
            <div className="select-kind">
              <span>Permissão</span>
              <select>
                <option value={selectedUser.kind}>{selectedUser.kind}</option>
                <option value="vendedor">Vendedor</option>
              </select>
            </div>
            <div className="input-notes">
              <span>Observações</span>
              <textarea name="notes" value={selectedUser.notes} onChange={this.handleTextArea}></textarea>
            </div>
          </form>
        </Modal>
        <div className="users-list">
          {users.map(user => (
            <UserComponent
              key={user.id}
              id={user.id}
              name={user.name}
              email={user.email}
              status={user.status}
              kind={user.kind}
              notes={user.notes}
              handleUser={() => this.loadUser(user)}
            />
          ))}
        </div>
      </>
    )
  }
}