import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'

import Home from './components/home'
import Login from './components/auth/login'
import SignUp from './components/auth/signUp'
import NotFound from './components/common/notFound'

import AuthRoute from './components/common/authRoute'
import GuestRoute from './components/common/guestRoute'

const Routes = props => {
  return (
    <Switch>
      <AuthRoute
        path="/dashboard/new-fs"
        render={props => <Home {...props} menu="dashboard" sub="newFs" />}
      />
      <AuthRoute
        path="/dashboard/new-gpa"
        render={props => <Home {...props} menu="dashboard" sub="newGPA" />}
      />
      <AuthRoute
        path="/dashboard"
        render={props => <Home {...props} menu="dashboard" />}
      />
      <AuthRoute
        path="/branches/edit/:id"
        render={props => <Home {...props} menu="branches" sub="editBranch" />}
      />
      <AuthRoute
        path="/branches/new"
        render={props => <Home {...props} menu="branches" sub="newBranch" />}
      />
      <AuthRoute
        path="/branches"
        render={props => <Home {...props} menu="branches" />}
      />
      <AuthRoute
        path="/agents"
        render={props => <Home {...props} menu="agents" />}
      />
      <AuthRoute
        isAdmin
        path="/users/new"
        render={props => <Home {...props} menu="users" sub="newUser" />}
      />
      <AuthRoute
        isAdminOrManager
        path="/users/edit/:id"
        render={props => <Home {...props} menu="users" sub="editUser" />}
      />
      <AuthRoute
        path="/users/:id"
        render={props => <Home {...props} menu="users" sub="viewUser" />}
      />
      <AuthRoute
        path="/users"
        isAdminOrManager
        render={props => <Home {...props} menu="users" />}
      />
      <AuthRoute
        path="/reports/:name"
        render={props => <Home {...props} menu="reports" />}
      />
      <AuthRoute
        path="/reports"
        render={props => <Home {...props} menu="reports" />}
      />
      <AuthRoute
        path="/clients/edit/:id"
        render={props => <Home {...props} menu="clients" />}
      />
      <GuestRoute path="/login" render={props => <Login {...props}></Login>} />
      <GuestRoute path="/sign-up" component={SignUp} />
      <Route path="/not-found" component={NotFound} />>
      <Redirect from="/" exact to="/dashboard" />
      <Redirect to="/not-found" />
    </Switch>
  )
}

export default Routes
