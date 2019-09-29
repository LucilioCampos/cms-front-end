import React, { Component } from 'react';
import { conn } from "../../../services/api"

import "./styles.css";
import UserComponent from '../../../components/User';

export default class UsersList extends Component {
  state = {
    users: [],
    page: 1,
  }

  componentDidMount() {
    this.loadUsers();
  }

  loadUsers = async (page = 1) => {
    const response = await conn.get(`/users`);

    this.setState({ users: response.data })
  }

  render() {

    const { users } = this.state

    return (
      <div className="users-list">
        {users.map(user => (
          <UserComponent key={user.id} id={user.id} name={user.name} email={user.email} status={user.status} kind={user.kind} notes={user.notes} />
        ))}
      </div>
    )
  }
}