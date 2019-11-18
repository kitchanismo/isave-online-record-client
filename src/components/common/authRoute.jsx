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
					isAdminOrManager &&
					!auth.canAccess('admin', 'manager', 'general')
				) {
					return <Redirect to='/not-found' />
				}
				if (isAdmin && !auth.canAccess('admin')) {
					return <Redirect to='/not-found' />
				}
				return Component ? <Component {...props} /> : render(props)
			}}
		/>
	)
}

export default withAuth(AuthRoute)