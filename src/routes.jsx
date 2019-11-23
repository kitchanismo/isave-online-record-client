import React from 'react'
import {Route, Redirect, Switch} from 'react-router-dom'

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
				path='/help'
				render={props => <Home {...props} menu='help' />}
			/>
			<AuthRoute
				isAdmin
				path='/settings/backup'
				render={props => <Home {...props} menu='settings' sub='backup' />}
			/>
			<AuthRoute
				isAdmin
				path='/spif/new'
				render={props => <Home {...props} menu='spif' sub='new' />}
			/>
			<AuthRoute
				path='/spif/:id'
				render={props => <Home {...props} menu='spif' sub='show' />}
			/>
			<AuthRoute
				isAdmin
				path='/spif'
				render={props => <Home {...props} menu='spif' />}
			/>
			<AuthRoute
				isAdmin
				path='/settings/restore'
				render={props => <Home {...props} menu='settings' sub='restore' />}
			/>
			<AuthRoute
				isNotAdmin
				path='/dashboard'
				render={props => <Home {...props} menu='dashboard' />}
			/>
			<AuthRoute
				path='/branches/edit/:id'
				render={props => <Home {...props} menu='branches' sub='editBranch' />}
			/>
			<AuthRoute
				path='/branches/new'
				render={props => <Home {...props} menu='branches' sub='newBranch' />}
			/>
			<AuthRoute
				path='/branches'
				render={props => <Home {...props} menu='branches' />}
			/>
			<AuthRoute
				path='/agents'
				render={props => <Home {...props} menu='agents' />}
			/>
			<AuthRoute
				path='/profile/me'
				render={props => <Home {...props} menu='profile' sub='me' />}
			/>
			<AuthRoute
				path='/profile/edit'
				render={props => <Home {...props} menu='profile' sub='edit' />}
			/>
			<AuthRoute
				isAdminOrManager
				path='/users/edit/:id'
				render={props => <Home {...props} menu='users' sub='editUser' />}
			/>
			<AuthRoute
				isAdminOrManager
				path='/users/new'
				render={props => <Home {...props} menu='users' sub='newUser' />}
			/>
			<AuthRoute
				path='/users/show/:id'
				render={props => <Home {...props} menu='users' sub='viewUser' />}
			/>
			<AuthRoute
				path='/users/:name'
				render={props => <Home {...props} menu='clients' />}
			/>
			<AuthRoute
				path='/users'
				isAdminOrManager
				render={props => <Home {...props} menu='users' />}
			/>
			<AuthRoute
				path='/clients/edit/fs/:id'
				render={props => <Home {...props} menu='clients' sub='editFs' />}
			/>
			<AuthRoute
				path='/clients/new/fs'
				render={props => <Home {...props} menu='clients' sub='newFs' />}
			/>
			<AuthRoute
				path='/clients/edit/gpa/:id'
				render={props => <Home {...props} menu='clients' sub='editGPA' />}
			/>
			<AuthRoute
				path='/clients/new/gpa'
				render={props => <Home {...props} menu='clients' sub='newGPA' />}
			/>
			<AuthRoute
				path='/clients/show/fs/:id'
				render={props => <Home {...props} menu='clients' sub='showFS' />}
			/>
			<AuthRoute
				path='/clients/show/gpa/:id'
				render={props => <Home {...props} menu='clients' sub='showGPA' />}
			/>
			<AuthRoute
				path='/clients/:name'
				render={props => <Home {...props} menu='clients' />}
			/>
			<AuthRoute
				path='/clients'
				render={props => <Home {...props} menu='clients' />}
			/>
			<GuestRoute path='/login' render={props => <Login {...props}></Login>} />
			<Route path='/not-found' component={NotFound} />>
			<Redirect from='/' exact to='/dashboard' />
			<Redirect to='/not-found' />
		</Switch>
	)
}

export default Routes
