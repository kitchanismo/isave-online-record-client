import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import withAuth from '../hoc/withAuth'

const AuthRoute = ({
	isAdminOrManager = false,
	isAdmin = false,
	auth,
	path,
	component: Component,
	render,
	isNotAdmin,
	isGeneral,
	isManager,
	...rest
}) => {
	return (
		<Route
			{...rest}
			render={props => {
				if (!auth.isValidUser())
					return (
						<Redirect
							to={{
								pathname: '/login',
								state: {from: props.location}
							}}
						/>
					)

				if (
					!isNotAdmin &&
					!isAdminOrManager &&
					!isAdmin &&
					!isGeneral &&
					!isManager
				) {
					return Component ? <Component {...props} /> : render(props)
				}

				if (
					isAdminOrManager &&
					!auth.canAccess('admin', 'manager', 'general')
				) {
					return <Redirect to='/not-found' />
				}

				if (isAdmin && auth.canAccess('admin')) {
					return Component ? <Component {...props} /> : render(props)
				}

				if (isGeneral && auth.canAccess('general')) {
					return Component ? <Component {...props} /> : render(props)
				}

				if (isManager && auth.canAccess('manager')) {
					return Component ? <Component {...props} /> : render(props)
				}

				if (isNotAdmin && !auth.canAccess('admin')) {
					return Component ? <Component {...props} /> : render(props)
				}

				return <Redirect to='/not-found' />
			}}
		/>
	)
}

export default withAuth(AuthRoute)
