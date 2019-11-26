import React, {useState, useEffect} from 'react'
import {getUser} from './../../../services/userService'
import {cap, formatDate, labelPosition} from '../../../services/utilsService'
import {appUrl} from '../../../config.json'
import Spinner from '../../common/spinner'
import {useMedia} from 'react-use'

const ViewUser = props => {
	const {id} = props.match.params

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
		getUser(id)
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
				<h1 className='h2'>User Profile</h1>
			</div>
			<Spinner isLoaded={user.username !== ''} className='spinner'>
				<div className='row mb-3'>
					<div className={`${isMobile ? 'col-12 mb-3' : 'col-4 pr-0'}`}>
						<div className='card' style={{width: 'auto'}}>
							<div className='card-body'>
								<h5 className='card-title'>{`${cap(
									user.profile.lastname
								)}, ${cap(user.profile.firstname)} ${cap(
									user.profile.middlename
								)}`}</h5>
								<p className='card-subtitle'>{cap(user.username)}</p>
								<span
									className={`mt-4  badge badge-${
										user.status === 1 ? 'success' : 'danger'
									}`}
								>
									{user.status === 1 ? 'active' : 'unverify'}
								</span>
							</div>
						</div>
					</div>
					<div className={`${isMobile ? 'col-12' : 'col-8'}`}>
						<div className='card' style={{width: 'auto'}}>
							<div className='card-body'>
								<h5 className='card-title'>Personal Details</h5>
								<br></br>
								<p className='card-subtitle'>
									Firstname:&nbsp;
									<span className='text-secondary'>
										{cap(user.profile.firstname)}
									</span>
								</p>
								<br></br>
								<p className='card-subtitle'>
									Middlename:&nbsp;
									<span className='text-secondary'>
										{cap(user.profile.middlename)}
									</span>
								</p>
								<br></br>
								<p className='card-subtitle'>
									Lastname:&nbsp;
									<span className='text-secondary'>
										{cap(user.profile.lastname)}
									</span>
								</p>
								<br></br>
								<p className='card-subtitle'>
									Email:&nbsp;
									<span className='text-secondary'>{user.profile.email}</span>
								</p>{' '}
								<br></br>
								<p className='card-subtitle'>
									Mobile Contact:&nbsp;
									<span className='text-secondary'>{user.profile.contact}</span>
								</p>
							</div>
						</div>
						<div className='card mt-3' style={{width: 'auto'}}>
							<div className='card-body'>
								<h5 className='card-title'>Employment Details</h5>
								<br></br>
								<p className='card-subtitle'>
									Position:&nbsp;
									<span className='text-secondary'>
										{labelPosition(user.position)}
									</span>
								</p>
								<br></br>
								<p className='card-subtitle'>
									Branch:&nbsp;
									<span className='text-secondary'>
										{user.profile.branch
											? cap(user.profile.branch.name)
											: 'All'}
									</span>
								</p>
								<br></br>
								<p className='card-subtitle'>
									License Code Number:&nbsp;
									<span className='text-secondary'>{user.profile.codeNo}</span>
								</p>

								{isAgent() && (
									<React.Fragment>
										<br></br>
										<p className='card-subtitle'>
											Under by:&nbsp;
											<span className='text-secondary'>
												{cap(
													user.profile.branch ? user.profile.branch.manager : ''
												)}
											</span>
										</p>
									</React.Fragment>
								)}
								<p className='mt-3'>
									Registered:
									<span className='text-secondary'>
										&nbsp; {formatDate(user.created_at)}
									</span>
								</p>
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

export default ViewUser
