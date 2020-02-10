import React from 'react';
import { conn } from "../../../services/api"

import { useState, useEffect } from 'react'
import "./styles.css";
import Modal from "../../../components/Modal"
import Button from "../../../components/Button"
import Fragment from "../../../components/Fragment"
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify'


const UsersList = props => {
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [kind, setKind] = useState()
  const [notes, setNotes] = useState()
  const [status, setStatus] = useState()
  const [user, setUser] = useState({})
  const [open, setOpen] = useState(false)
  const [users, setUsers] = useState([])


  useEffect(() => {
    loadUsers();
  }, [name, email, kind, status, notes, user]);

  const handleOn = async (event) => {
    event.preventDefault();
    console.log(name, email, status)
    const active = status ? 'active' : 'inactive'
    console.log(active)
    setUser({ name, email, active, kind, notes, ...user })
    console.log(user)
    try {
      const response = await conn.put(`/api/v1/users/${user.id}`, { name, email, status: active, kind, notes });
      setUser(response.data);
      toast("Usuário atualizado com sucesso!", { type: "success" })
      console.log(response.data)
    } catch (err) {
      console.error(err);
      toast(`Error ${err.message}`, { type: 'error' })
    }
    handleModal()
  }

  const handleName = (event) => {
    setName(event.target.value)
  }

  const handleEmail = (event) => {
    setEmail(event.target.value)
  }

  const handleStatus = (event) => {
    setStatus(event.target.value)
  }

  const handleKind = (event) => {
    setKind(event.target.value)
  }

  const handleNotes = (event) => {
    setNotes(event.target.value)
  }

  const loadUsers = async (page = 1) => {
    const response = await conn.get(`/api/v1/users?page=${page}`);
    setUsers(response.data)
  }

  const loadUser = (selectUser) => {
    const status = selectUser.status === 'active' ? true : false
    setUser(selectUser)
    setName(selectUser.name)
    setEmail(selectUser.email)
    setKind(selectUser.kind)
    setNotes(selectUser.notes)
    setStatus(status)
    handleModal()
  }

  const handleModal = () => {
    setOpen(!open)
  }

  const handleClose = (event) => {
    event.preventDefault()
    setOpen(false)
  }

  return (
    <Fragment>
      <Modal className="modal"
        show={open}
        modalHeader={name}
        handleOn={handleOn}
        close={handleModal}
      >
        <form className="user-form">
          <div className="input-name">
            <input type="text" name="name" value={name} onChange={(event) => handleName(event)} placeholder="Digite o nome" required />
          </div>
          <div className="input-email">
            <input type="email" name="email" value={email} onChange={(event) => handleEmail(event)} placeholder="Digite o email" required />
          </div>
          <div className="input-status">
            <span>Ativo</span>
            <input className="check-status" type="checkbox" onChange={(event) => handleStatus(event)} defaultChecked={status} />
          </div>
          <div className="select-kind">
            <span>Permissão</span>
            <select onChange={(event) => handleKind(event)}>
              <option value='manager'>Gerente</option>
              <option value='salesman'>Vendedor</option>
            </select>
          </div>
          <div className="input-notes">
            <span>Observações</span>
            <textarea onChange={(event) => handleNotes(event)} name="notes" value={notes}></textarea>
          </div>
          <div className="submit-buttons">
            <Button classes="btn-danger" handleClick={(e) => handleClose(e)} text="Fechar" />
            <Button classes="btn-success" handleClick={(e) => handleOn(e)} text="Continuar" />
          </div>
        </form>
      </Modal>

      <div className="table-wrapper">
        <table id="customers">
          <tr>
            <th>id</th>
            <th>nome</th>
            <th>email</th>
            <th>status</th>
            <th>cargo</th>
            <th>observações</th>
          </tr>
          {users.map(user => (
            <tr onClick={loadUser.bind(this, user)} key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.status === 'active' ? 'ativo' : 'inativo'}</td>
              <td>{user.kind === 'manager' ? 'gerente' : 'vendedor'}</td>
              <td>{user.notes}</td>
            </tr>
          ))}
        </table>
      </div>
    </Fragment>
  )
}

export default UsersList