import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'

import Home from './components/home'
import Login from './components/auth/login'
import SignUp from './components/auth/signUp'
import NotFound from './components/partials/notFound'

import AuthRoute from './components/partials/authRoute'
import GuestRoute from './components/partials/guestRoute'

const Routes = () => {
  return (
    <Switch>
      <AuthRoute path="/home" component={Home} />
      <GuestRoute path="/login" component={Login} />
      <GuestRoute path="/sign-up" component={SignUp} />
      <Route path="/not-found" component={NotFound} />>
      <Redirect from="/" exact to="/home" />
      <Redirect to="/not-found" />
    </Switch>
  )
}

export default Routes
