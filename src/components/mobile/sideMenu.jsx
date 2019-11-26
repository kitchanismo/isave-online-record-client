import React, {useContext, useState, useEffect} from 'react'
import {NavLink} from 'react-router-dom'
import {theme} from './../../config.json'
import {UserContext, ClientContext} from './../../context'
import auth from './../../services/authService'

const SideMenuMobile = props => {
	const {
		state: {unverify},
		onSetStatus
	} = useContext(UserContext)

	const [clientIsActive, setClientIsActive] = useState(false)
	const [toggleClient, setToggleClient] = useState(false)
	const [toggleSetting, setToggleSetting] = useState(false)
	const [settingIsActive, setSettingIsActive] = useState(false)

	useEffect(() => {
		const url = props.match.url
		if (url.match(/clients.*/)) {
			setClientIsActive(true)
		}

		if (url.match(/settings.*/)) {
			setSettingIsActive(true)
		}
	}, [])

	const {
		status: {total, forApproval, lapsed, nearExpiration, due}
	} = useContext(ClientContext)

	const clientSubMenu = (name, label, value) => {
		return (
			<NavLink
				onClick={() => {
					setToggleClient(!toggleClient)
					setClientIsActive(true)
				}}
				className='dropdown-item mb-1'
				to={`/clients/${name}`}
			>
				{label}
				<span className='client-menu badge badge-sm badge-danger ml-1 mt-0'>
					{value ? value : ''}
				</span>
			</NavLink>
		)
	}

	const settingSubMenu = (name, label) => {
		return (
			<NavLink
				onClick={() => {
					setToggleSetting(!toggleSetting)
					setSettingIsActive(true)
				}}
				className='dropdown-item mb-1'
				to={`/settings/${name}`}
			>
				{label}
			</NavLink>
		)
	}

	const settingMenu = () => {
		return (
			toggleSetting && (
				<div className='sub-menu'>
					<h4 className='text-center text-white py-2 mb-0 title-menu'>
						Settings
					</h4>

					<div className='dropdown pt-2 text-center'>
						{settingSubMenu('backup', 'Backup Database')}
						{settingSubMenu('sms', 'SMS Notification')}

						<hr className='mx-2' />

						<a
							onClick={() => {
								setToggleSetting(!toggleSetting)
							}}
							className=' text-danger  fa fa-close'
						></a>
					</div>
				</div>
			)
		)
	}

	const clientMenu = () => {
		return (
			toggleClient && (
				<div className='sub-menu'>
					<h4 className='text-center text-white py-2 mb-0 title-menu'>
						Clients
					</h4>

					<div className='dropdown pt-2 text-center'>
						{auth.canAccess('sales') && (
							<React.Fragment>
								<NavLink
									onClick={() => {
										setToggleClient(!toggleClient)
										setClientIsActive(true)
									}}
									className='dropdown-item mb-1'
									to={`/clients/new/fs`}
								>
									Add New FSP
								</NavLink>
								<NavLink
									onClick={() => {
										setToggleClient(!toggleClient)
										setClientIsActive(true)
									}}
									className='dropdown-item mb-1'
									to={`/clients/new/gpa`}
								>
									Add New GPA
								</NavLink>
								<hr className='mx-2' />
							</React.Fragment>
						)}

						{clientSubMenu('enforced', 'Enforced Client')}
						{clientSubMenu('gpa', 'GPA')}
						{clientSubMenu('cancelled', 'Cancelled Policy')}
						<hr className='mx-2' />
						{clientSubMenu('for-approval', 'For Approval', forApproval)}
						{clientSubMenu(
							'near-expiration',
							'Near Expiration',
							nearExpiration
						)}
						{clientSubMenu('due', 'Due Policy', due)}
						{clientSubMenu('lapsed', 'Lapsed Policy', lapsed)}
						<hr className='mx-2  ' />
						<a
							onClick={() => {
								setToggleClient(!toggleClient)
							}}
							className=' text-danger  fa fa-close'
						></a>
					</div>
				</div>
			)
		)
	}

	const menus = () => (
		<div className='mobile-menu m-0 d-flex justify-content-around px-0 py-3'>
			{!auth.canAccess('admin') && (
				<NavLink
					onClick={() => {
						setToggleClient(false)
						setToggleSetting(false)
						setClientIsActive(false)
						setSettingIsActive(false)
					}}
					to='/dashboard'
					className='fa fa-bar-chart'
				></NavLink>
			)}
			{auth.canAccess('admin', 'general') && (
				<NavLink
					onClick={() => {
						setToggleClient(false)
						setToggleSetting(false)
						setClientIsActive(false)
						setSettingIsActive(false)
					}}
					to='/spif'
					className='fa fa-trophy'
				></NavLink>
			)}
			{auth.canAccess('admin', 'general') && (
				<NavLink
					onClick={() => {
						setToggleClient(false)
						setToggleSetting(false)
						setClientIsActive(false)
						setSettingIsActive(false)
					}}
					to='/branches'
					className='fa fa-building'
				></NavLink>
			)}
			{!auth.canAccess('promo', 'sales') && (
				<NavLink
					onClick={() => {
						setToggleClient(false)
						setToggleSetting(false)
						setClientIsActive(false)
						setSettingIsActive(false)
					}}
					to='/users'
					className={`fa fa-users ml-1 px-0 text-center`}
				>
					<span className='notif-mobile badge badge-danger px-1 py-0 badge-sm ml-1'>
						{unverify > 9 ? '9+' : unverify === 0 ? '' : unverify}
					</span>
				</NavLink>
			)}

			{!auth.canAccess('admin') && (
				<a
					className={`fa fa-file-text nav-link text-white pt-0 px-0 text-center ${
						clientIsActive ? 'active' : ''
					}`}
					onClick={() => {
						setToggleClient(!toggleClient)
						setToggleSetting(false)
						setSettingIsActive(false)
					}}
				>
					<span className='notif-mobile badge badge-danger px-1 py-0  badge-sm ml-1'>
						{total > 9 ? '9+' : total === 0 ? '' : total}
					</span>
				</a>
			)}

			{auth.canAccess('admin') && (
				<a
					onClick={() => {
						setToggleClient(false)
						setToggleSetting(!toggleSetting)
						setClientIsActive(false)
					}}
					className={`fa fa-gear nav-link text-white pt-0 px-0 text-center ${
						settingIsActive ? 'active' : ''
					}`}
				></a>
			)}
			<NavLink
				onClick={() => {
					setToggleClient(false)
					setToggleSetting(false)
					setClientIsActive(false)
					setSettingIsActive(false)
				}}
				to='/help'
				className='fa fa-question'
			></NavLink>
		</div>
	)

	return (
		<React.Fragment>
			{clientMenu()}
			{settingMenu()}
			{menus()}
			<style jsx=''>{`
				.client-menu {
					position: relative;
					top: -8px;
				}
				.sub-menu {
					position: fixed;
					bottom: 0;
					width: 100%;
					height: 100%;
					background-color: white;
					z-index: 1;
					opacity: 0.98;
				}
				.mobile-menu {
					position: fixed;
					bottom: 0;
					width: 100%;
					padding-top: 20px !important;
					background-color: #343a40;
					z-index: 2;
					-webkit-box-shadow: 0px -3px 12px -4px rgba(0, 0, 0, 0.59);
					-moz-box-shadow: 0px -3px 12px -4px rgba(0, 0, 0, 0.59);
					box-shadow: 0px -3px 12px -4px rgba(0, 0, 0, 0.59);
				}
				.title-menu {
					background-color: #343a40;

					-webkit-box-shadow: 0px 3px 12px -4px rgba(0, 0, 0, 0.82);
					-moz-box-shadow: 0px 3px 12px -4px rgba(0, 0, 0, 0.82);
					box-shadow: 0px 3px 12px -4px rgba(0, 0, 0, 0.82);
				}
				.active {
					color: ${theme.secondary} !important;
					cursor: hand;
				}
				a:hover {
					color: ${theme.secondary} !important;
				}
				.fa-close {
					font-size: 20px;
					margin-top: 0px !important;
				}
				.dropdown-item.active,
				.dropdown-item:active {
					background-color: white;
				}
				.dropdown {
					margin-top: 0px !important;
				}

				.fa-file-text,
				.fa-building,
				.fa-users,
				.fa-bar-chart,
				.fa-gear,
				.fa-question,
				.fa-trophy {
					margin-top: 0 !important;
					margin-bottom: 0 !important;
					color: white;

					font-size: 20px;
				}

				.notif-mobile {
					top: -10px !important;
					left: -8px;
					position: relative;
					border: 2px solid #343a40;
				}
			`}</style>
		</React.Fragment>
	)
}

export default SideMenuMobile
