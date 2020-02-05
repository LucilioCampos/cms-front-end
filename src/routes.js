import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import Home from './views/Home'
import SignUp from './views/SignUp'
import UsersList from "./views/Users/List"

import { isAuthenticated } from './services/auth'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest} render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
          <Redirect to={{ pathname: '/auth', state: { from: props.location } }} />
        )
    } />
)



const Routes = () => (
  <BrowserRouter>
    <Switch>
      <PrivateRoute exact path="/" component={Home} />
      <PrivateRoute path="/users" component={UsersList} isLogged={isAuthenticated()} />
      <Route path="/auth" component={SignUp} />
    </Switch>
  </BrowserRouter>
)

export default Routes;