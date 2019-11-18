import React from 'react'
import {NavLink} from 'react-router-dom'
import auth from '../../services/authService'
import {cap} from '../../services/utilsService'
import {theme} from '../../config.json'
import ReactTooltip from 'react-tooltip'

const Nav = props => {
	const handleLogout = () => {
		auth.logout()
	}

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
				<div className='container-fluid'>
					<h6 className='text-white mt-1'>
						<span>
							<NavLink style={{color: theme.secondary}} to='/'>
								INFOMATECH &nbsp;
							</NavLink>
						</span>
						: Hybrid Management Information System with SMS Notification
					</h6>

					<div
						className='collapse navbar-collapse d-flex justify-content-end'
						id='navbarNav'
					>
						<ul className='navbar-nav'>
							{auth.isValidUser() && (
								<React.Fragment>
									<li className='nav-item ml-1'>
										<NavLink
											data-tip
											data-for='user'
											className='nav-link active'
											to={`/profile/me`}
										>
											<span className='fa fa-user mr-2'></span>

											{cap(auth.getCurrentUser().username) +
												' | ' +
												labelPosition(auth.getCurrentUser().position)}
										</NavLink>
									</li>
									{/* <li className="nav-item">
                    <a
                      href="/login"
                      className="nav-link"
                      onClick={handleLogout}
                    >
                      Logout
                    </a>
                  </li> */}
								</React.Fragment>
							)}
						</ul>
					</div>
				</div>
				<style jsx=''>{`
					.navbar {
						margin-bottom: 20px;
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
				`}</style>
			</nav>
		</React.Fragment>
	)
}

export default Nav
