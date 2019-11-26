import React, {useState, useEffect} from 'react'
import {getMe} from './../../../services/userService'
import {cap, labelPosition} from '../../../services/utilsService'
import {appUrl} from '../../../config.json'
import Spinner from '../../common/spinner'
import auth from '../../../services/authService'
import {useMedia} from 'react-use'

const Me = props => {
	const isMobile = useMedia('(max-width: 600px)')

	const [user, setUser] = useState({
		username: '',
		profile: {
			firstname: '',
			middlename: '',
			lastname: '',
			branch: {manager: ''}
		}
	})

	useEffect(() => {
		getMe()
			.then(data => {
				setUser(data)
			})
			.catch(() => props.history.replace('/not-found'))
	}, [])

	const isAgent = () => {
		return (
			user.position !== 'manager' &&
			user.position !== 'admin' &&
			user.position !== 'general'
		)
	}
	return (
		<React.Fragment>
			<div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom'>
				<h1 className='h2'>My Profile</h1>
				<button
					onClick={() => auth.logout()}
					className={`btn btn-sm btn-outline-danger`}
				>
					LOGOUT
				</button>
			</div>
			<Spinner isLoaded={user.username !== ''} className='spinner'>
				<div className='row mb-3'>
					<div className={isMobile ? 'col-12 mb-3' : 'col-4 pr-0'}>
						<div className='card' style={{width: 'auto'}}>
							<div className='card-body'>
								<h5 className='card-title'>{`${cap(
									user.profile.lastname
								)}, ${cap(user.profile.firstname)} ${cap(
									user.profile.middlename
								)}`}</h5>
								<p className='card-subtitle'>{cap(user.username)}</p>
								<button
									onClick={() => props.history.replace('/profile/edit')}
									className={`mt-4 btn btn-sm btn-outline-warning`}
								>
									EDIT
								</button>
							</div>
						</div>
					</div>
					<div className={isMobile ? 'col-12' : 'col-8'}>
						<div className='card' style={{width: 'auto'}}>
							<h5 className='card-title text-center mt-3 mb-0 p-0'>
								Personal Details
							</h5>
							<hr></hr>
							<div className='card-body m-0 pt-0'>
								<br></br>
								<p className='card-subtitle'>
									Firstname:{' '}
									<span className='text-secondary'>
										{cap(user.profile.firstname)}
									</span>
								</p>
								<br></br>
								<p className='card-subtitle'>
									Middlename:{' '}
									<span className='text-secondary'>
										{cap(user.profile.middlename)}
									</span>
								</p>
								<br></br>
								<p className='card-subtitle'>
									Lastname:{' '}
									<span className='text-secondary'>
										{cap(user.profile.lastname)}
									</span>
								</p>
								<br></br>
								<p className='card-subtitle'>
									Email:{' '}
									<span className='text-secondary'>{user.profile.email}</span>
								</p>
								<br></br>
								<p className='card-subtitle'>
									Mobile Number:{' '}
									<span className='text-secondary'>{user.profile.contact}</span>
								</p>
							</div>
						</div>
						<div className='card mt-3' style={{width: 'auto'}}>
							<h5 className='card-title text-center mt-3 mb-0 p-0'>
								Employement Details
							</h5>
							<hr></hr>
							<div className='card-body m-0 pt-0'>
								<br></br>
								<p className='card-subtitle'>
									Position:{'   '}
									<span className='text-secondary'>
										{labelPosition(user.position)}
									</span>
								</p>
								<br></br>
								<p className='card-subtitle'>
									Branch:{'   '}
									<span className='text-secondary'>
										{cap(
											user.profile.branch ? user.profile.branch.name : 'All'
										)}
									</span>
								</p>
								<br></br>
								<p className='card-subtitle'>
									Code Number:{'   '}
									<span className='text-secondary'>
										{cap(user.profile.codeNo)}
									</span>
								</p>
								<br></br>
								{isAgent() && (
									<p className='card-subtitle'>
										Under by:{'   '}
										<span className='text-secondary'>
											{cap(
												user.profile.branch ? user.profile.branch.manager : ''
											)}
										</span>
									</p>
								)}
							</div>
						</div>
					</div>
				</div>
			</Spinner>
			<style jsx=''>{`
				.spinner {
					margin-top: 200px;
					margin-bottom: 200px;
				}
			`}</style>
		</React.Fragment>
	)
}

export default Me
