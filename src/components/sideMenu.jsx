import React, {useState, useContext, useEffect} from 'react'
import withAuth from './hoc/withAuth'
import {NavLink} from 'react-router-dom'
import {theme} from './../config.json'
import {UserContext, ClientContext} from './../context'

const SideMenu = ({auth, ...props}) => {
	const [toggleClient, setToggleClient] = useState(false)
	const [toggleSetting, setToggleSetting] = useState(false)
	const [settingIsActive, setSettingIsActive] = useState(false)
	const [clientIsActive, setClientIsActive] = useState(false)

	const {
		state: {unverify},
		onSetStatus
	} = useContext(UserContext)

	const {
		status: {total, forApproval, lapsed, nearExpiration, due}
	} = useContext(ClientContext)

	useEffect(() => {
		const url = props.match.url

		if (url.match(/clients.*/)) {
			setClientIsActive(true)
		}

		if (url.match(/settings.*/)) {
			setSettingIsActive(true)
		}
	}, [])

	const clientMenu = (name, label, value) => {
		return (
			<NavLink
				onClick={() => {
					setToggleClient(false)
					setSettingIsActive(false)
					setClientIsActive(true)
				}}
				className='dropdown-item'
				to={`/clients/${name}`}
			>
				{label}
				<span className='client-menu badge badge-sm badge-danger ml-1 mt-0'>
					{value ? value : ''}
				</span>
			</NavLink>
		)
	}

	return (
		<React.Fragment>
			<nav className='side-menu col-md-2 d-none bg-dark d-md-block mr-0'>
				<ul className='nav flex-column mb-2 mt-2 pr-0'>
					{!auth.canAccess('admin') && (
						<li className='nav-item'>
							<NavLink
								onClick={() => {
									setToggleSetting(false)
									setToggleClient(false)
									setSettingIsActive(false)
									setClientIsActive(false)
								}}
								name='dashboard'
								to='/dashboard'
								className={`nav-link text-white `}
							>
								<span className='fa fa-bar-chart mr-2'></span>
								Dashboard
							</NavLink>
						</li>
					)}
					{auth.canAccess('admin', 'general') && (
						<li className='nav-item'>
							<NavLink
								onClick={() => {
									setToggleSetting(false)
									setToggleClient(false)
									setSettingIsActive(false)
									setClientIsActive(false)
								}}
								name='spif'
								to='/spif'
								className={`nav-link text-white`}
							>
								<span className='fa fa-trophy mr-2'></span>
								SPIF
							</NavLink>
						</li>
					)}
					{auth.canAccess('admin', 'general') && (
						<li className='nav-item'>
							<NavLink
								onClick={() => {
									setToggleSetting(false)
									setToggleClient(false)
									setSettingIsActive(false)
									setClientIsActive(false)
								}}
								name='branch'
								to='/branches'
								className={`nav-link text-white`}
							>
								<span className='fa fa-building mr-2'></span>
								Branch
							</NavLink>
						</li>
					)}

					{auth.canAccess('admin', 'manager', 'general') && (
						<li className='nav-item'>
							<div className='row '>
								<div className='d-flex ml-3'>
									<NavLink
										onClick={() => {
											setToggleClient(false)
											setToggleSetting(false)
											onSetStatus(null)
											setSettingIsActive(false)
											setClientIsActive(false)
										}}
										to='/users'
										className={`nav-link text-white pr-1`}
									>
										<span className='fa fa-users mr-2'></span>
										Users
									</NavLink>
									<NavLink
										data-toggle='tooltip'
										title={`You have ${unverify} inactive user/s!`}
										onClick={() => {
											setToggleClient(false)
											setToggleSetting(false)
											onSetStatus(0)
											setSettingIsActive(false)
											setClientIsActive(false)
										}}
										to='/users'
										className={`nav-link text-white pt-1 pl-0`}
									>
										<span className='badge badge-sm badge-danger ml-1'>
											{unverify ? unverify : ''}
										</span>
									</NavLink>
								</div>
							</div>
						</li>
					)}

					{!auth.canAccess('admin') && (
						<li className='nav-item'>
							<div className='row'>
								<div className='d-flex ml-3'>
									<a
										onClick={() => {
											setToggleClient(!toggleClient)
											setToggleSetting(false)
											setSettingIsActive(false)
										}}
										className={`nav-link text-white pr-1 ${
											clientIsActive ? 'active' : ''
										}`}
									>
										<span className='fa fa-file-text mr-2'></span>
										Clients
										<span
											className={`fa fa-angle-${
												!toggleClient ? 'down' : 'up'
											} ml-1`}
										></span>
									</a>
									<a
										data-toggle='tooltip'
										title={`You have ${total} clients!`}
										className={`nav-link text-white pt-1 pl-0 ${
											clientIsActive ? 'active' : ''
										}`}
									>
										{total > 0 && (
											<span className='badge badge-sm badge-danger ml-1'>
												{total > 9 ? '9+' : total}
											</span>
										)}
									</a>
								</div>
							</div>
							{toggleClient && (
								<div className='dropdown'>
									{auth.canAccess('sales') && (
										<React.Fragment>
											<NavLink
												onClick={() => {
													setToggleClient(false)
													setSettingIsActive(false)
													setClientIsActive(true)
												}}
												className='dropdown-item'
												to={`/clients/new/fs`}
											>
												Add New FSP
											</NavLink>
											<NavLink
												onClick={() => {
													setToggleClient(false)
													setSettingIsActive(false)
													setClientIsActive(true)
												}}
												className='dropdown-item'
												to={`/clients/new/gpa`}
											>
												Add New GPA
											</NavLink>
											<hr className='mx-2' />
										</React.Fragment>
									)}

									{clientMenu('enforced', 'Enforced Client')}
									{clientMenu('gpa', 'GPA')}
									{clientMenu('cancelled', 'Cancelled Policy')}
									<hr className='mx-2' />
									{clientMenu('for-approval', 'For Approval', forApproval)}
									{clientMenu(
										'near-expiration',
										'Near Expiration',
										nearExpiration
									)}
									{clientMenu('due', 'Due Policy', due)}
									{clientMenu('lapsed', 'Lapsed Policy', lapsed)}
								</div>
							)}
						</li>
					)}

					{auth.canAccess('admin') && (
						<li className='nav-item'>
							<div className='row'>
								<div className='d-flex ml-3'>
									<a
										onClick={() => {
											setToggleSetting(!toggleSetting)
											setToggleClient(false)
											setClientIsActive(false)
										}}
										className={`nav-link text-white pr-1 ${
											settingIsActive ? 'active' : ''
										}`}
									>
										<span className='fa fa-gear mr-2'></span>
										Settings
										<span
											className={`fa fa-angle-${
												!toggleSetting ? 'down' : 'up'
											} ml-1`}
										></span>
									</a>
								</div>
							</div>

							{toggleSetting && (
								<React.Fragment>
									<div className='dropdown'>
										<NavLink
											onClick={() => {
												setToggleSetting(false)
												setSettingIsActive(true)
											}}
											className='dropdown-item'
											to={`/settings/backup`}
										>
											Backup Database
										</NavLink>
										<NavLink
											onClick={() => {
												setToggleSetting(false)
												setSettingIsActive(true)
											}}
											className='dropdown-item'
											to={`/settings/sms`}
										>
											SMS Notification
										</NavLink>
									</div>
								</React.Fragment>
							)}
						</li>
					)}

					{!auth.canAccess('promo') && (
						<li className='nav-item '>
							<NavLink
								onClick={() => {
									setToggleSetting(false)
									setToggleClient(false)
									setSettingIsActive(false)
									setClientIsActive(false)
								}}
								name='branch'
								to='/help'
								className={`nav-link text-white `}
							>
								<span className='fa fa-question mr-2 '></span>
								Help
							</NavLink>
						</li>
					)}
				</ul>

				<style jsx=''>{`
					.client-menu {
						position: relative;
						top: -8px;
					}
					.dropdown-item.active,
					.dropdown-item:active {
						background-color: white;
					}
					.fa-question {
						font-size: 1.3em;
					}
					.nav-item {
						height: 40px !important;
					}
					.badge-danger {
						margin-top: -5px;
					}
					.active {
						color: ${theme.secondary} !important;
						cursor: hand;
					}
					.nav-link {
						cursor: pointer;
					}
					a:hover {
						color: #ddd !important;
					}

					hr {
						margin-top: 3;
						border: 0.5px solid gray;
					}
					.side-menu {
						border-radius: 5px 0 0 0;
					}
					.dropdown {
						width: 100%;

						margin-left: 30px;
						padding-right: 0 !important;
						background-color: white;
						z-index: 2 !important;
						border-radius: 3px !important;
						padding-top: 10px;

						padding-bottom: 10px;
						border: 1px solid #343a40;
					}
					.dropdown-item {
						font-size: 14px;
					}
					.dropdown-item:hover {
						color: gray !important;
					}
					.dropdown-item:active {
						background-color: white !important;
					}
				`}</style>
			</nav>
			{props.children}
		</React.Fragment>
	)
}

export default withAuth(SideMenu)
