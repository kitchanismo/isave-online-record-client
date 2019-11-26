import React from 'react'
import {NavLink} from 'react-router-dom'
import auth from './../../services/authService'
import {cap} from '../../services/utilsService'
import {theme} from '../../config.json'
import ReactTooltip from 'react-tooltip'
import {useMedia} from 'react-use'

const Nav = props => {
	const isMobile = useMedia('(max-width: 600px)')

	const labelPosition = position => {
		switch (position) {
			case 'admin':
				return 'System Administrator'
			case 'general':
				return 'General Manager'
			case 'manager':
				return 'Branch Manager'
			case 'sales':
				return 'Sales Officer'
			case 'promo':
				return 'Promo Officer'
			default:
				return ''
		}
	}

	return (
		<React.Fragment>
			<ReactTooltip id='user'>
				<span>View my profile</span>
			</ReactTooltip>
			<nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
				<div
					className={`container-fluid ${
						isMobile ? 'd-flex justify-content-center mt-2' : ''
					}`}
				>
					<h6 className='text-white mt-1'>
						<span>
							<NavLink style={{color: theme.secondary}} to='/'>
								INFOMATECH &nbsp;
							</NavLink>
						</span>
						{isMobile
							? ''
							: ': Hybrid Management Information System with SMS Notification'}
					</h6>

					<div
						className={`collapse navbar-collapse d-flex justify-content-${
							isMobile ? 'center' : 'end'
						}`}
						id='navbarNav'
					>
						<ul className='navbar-nav'>
							{auth.isValidUser() && (
								<React.Fragment>
									<li className='nav-item ml-1'>
										<NavLink
											data-tip
											data-for='user'
											className='nav-link active profile-username'
											to={`/profile/me`}
										>
											<span className='fa fa-user mr-2'></span>

											{cap(auth.getCurrentUser().username) +
												' | ' +
												labelPosition(auth.getCurrentUser().position)}
										</NavLink>
									</li>
								</React.Fragment>
							)}
						</ul>
					</div>
				</div>
				<style jsx=''>{`
					.navbar {
						margin-bottom: ${isMobile ? '15px' : '20px'};

						-webkit-box-shadow: 0px 3px 12px -4px rgba(0, 0, 0, 0.82);
						-moz-box-shadow: 0px 3px 12px -4px rgba(0, 0, 0, 0.82);
						box-shadow: 0px 3px 12px -4px rgba(0, 0, 0, 0.82);
					}
					.fa {
						margin-top: 12px !important;
					}

					.fa-user {
						margin-top: 0 !important;
					}

					i {
						cursor: pointer;
					}
					.profile-username {
						${isMobile
							? 'font-size: 12px !important; padding: 0px !important;'
							: ''}
					}
				`}</style>
			</nav>
		</React.Fragment>
	)
}

export default Nav
