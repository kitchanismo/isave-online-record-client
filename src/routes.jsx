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
				path='/settings/sms'
				render={props => <Home {...props} menu='settings' sub='sms' />}
			/>
			<AuthRoute
				isAdmin
				path='/settings/backup'
				render={props => <Home {...props} menu='settings' sub='backup' />}
			/>
			<AuthRoute
				isAdmin
				path='/settings/restore'
				render={props => <Home {...props} menu='settings' sub='restore' />}
			/>
			<AuthRoute
				isAdmin
				isGeneral
				path='/spif/new'
				render={props => <Home {...props} menu='spif' sub='new' />}
			/>
			<AuthRoute
				path='/spif/:id'
				render={props => <Home {...props} menu='spif' sub='show' />}
			/>
			<AuthRoute
				isAdmin
				isGeneral
				path='/spif'
				render={props => <Home {...props} menu='spif' />}
			/>
			<AuthRoute
				isNotAdmin
				path='/dashboard'
				render={props => <Home {...props} menu='dashboard' />}
			/>
			<AuthRoute
				isAdmin
				isGeneral
				path='/branches/edit/:id'
				render={props => <Home {...props} menu='branches' sub='editBranch' />}
			/>
			<AuthRoute
				isAdmin
				isGeneral
				path='/branches/new'
				render={props => <Home {...props} menu='branches' sub='newBranch' />}
			/>
			<AuthRoute
				isAdmin
				isGeneral
				path='/branches'
				render={props => <Home {...props} menu='branches' />}
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
				isAdmin
				isGeneral
				isManager
				path='/users/edit/:id'
				render={props => <Home {...props} menu='users' sub='editUser' />}
			/>
			<AuthRoute
				isAdmin
				isGeneral
				isManager
				path='/users/new'
				render={props => <Home {...props} menu='users' sub='newUser' />}
			/>
			<AuthRoute
				isAdmin
				isGeneral
				isManager
				path='/users/show/:id'
				render={props => <Home {...props} menu='users' sub='viewUser' />}
			/>
			<AuthRoute
				isAdmin
				isGeneral
				isManager
				path='/users/:name'
				render={props => <Home {...props} menu='clients' />}
			/>
			<AuthRoute
				isAdmin
				isGeneral
				isManager
				path='/users'
				isAdminOrManager
				render={props => <Home {...props} menu='users' />}
			/>
			<AuthRoute
				isNotAdmin
				path='/clients/edit/fs/:id'
				render={props => <Home {...props} menu='clients' sub='editFs' />}
			/>
			<AuthRoute
				isNotAdmin
				path='/clients/new/fs'
				render={props => <Home {...props} menu='clients' sub='newFs' />}
			/>
			<AuthRoute
				isNotAdmin
				path='/clients/edit/gpa/:id'
				render={props => <Home {...props} menu='clients' sub='editGPA' />}
			/>
			<AuthRoute
				isNotAdmin
				path='/clients/new/gpa'
				render={props => <Home {...props} menu='clients' sub='newGPA' />}
			/>
			<AuthRoute
				isNotAdmin
				path='/clients/show/fs/:id'
				render={props => <Home {...props} menu='clients' sub='showFS' />}
			/>
			<AuthRoute
				isNotAdmin
				path='/clients/show/gpa/:id'
				render={props => <Home {...props} menu='clients' sub='showGPA' />}
			/>
			<AuthRoute
				isNotAdmin
				path='/clients/:name'
				render={props => <Home {...props} menu='clients' />}
			/>
			<AuthRoute
				isNotAdmin
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
