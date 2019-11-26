import React, {useState, useEffect, useContext} from 'react'
import Joi from 'joi-browser'
import {
	getBranches,
	getManager,
	getUser,
	editUser
} from '../../../services/userService'
import {toast} from 'react-toastify'
import {
	cap,
	joiLettersOnly,
	joiMobileNumber
} from '../../../services/utilsService'
import withAuth from '../../hoc/withAuth'
import Form from './../../common/form'
import Spinner from './../../common/spinner'

import {UserContext} from './../../../context'
import {useMedia} from 'react-use'

const EditUser = ({auth, ...props}) => {
	const isMobile = useMedia('(max-width: 600px)')

	const {onRefresh} = useContext(UserContext)

	const {id} = props.match.params

	const [user, setUser] = useState({
		username: '',
		email: '',
		firstname: '',
		middlename: '',
		lastname: '',
		manager: '',
		codeNo: '',
		position: '',
		branch: '',
		password: '',
		contact: ''
	})
	const [isLoaded, setIsLoaded] = useState(false)

	useEffect(() => {
		setIsLoaded(false)
		getUser(id).then(({profile, username, position}) => {
			setUser({
				username,
				email: profile.email,
				firstname: profile.firstname,
				middlename: profile.middlename,
				lastname: profile.lastname,
				codeNo: '' + profile.codeNo,
				manager: profile.branch ? profile.branch.manager : '',
				branch: profile.branch ? profile.branch.name : '',
				position,
				contact: profile.contact
			})
			setSelectedPosition({
				id: position === 'sales' ? 1 : 2,
				value: position,
				label: cap(
					position +
						(position !== 'manager' && position !== 'general' ? ' officer' : '')
				)
			})
			setSelectedBranch({
				id: profile.branch_id,
				value: profile.branch ? profile.branch.name : '',
				label: cap(profile.branch ? profile.branch.name : '')
			})

			const url =
				position === 'manager'
					? '/api/branches/available'
					: '/api/branches/taken'

			getBranches(url).then(branches => {
				setBranches(branches)
				setIsLoaded(true)
			})
		})
		// .catch(() => props.history.replace('/not-found'))
	}, [])

	const agents = [
		{
			id: 1,
			label: 'Sales Officer',
			value: 'sales'
		},
		{
			id: 2,
			label: 'Promo Officer',
			value: 'promo'
		}
	]

	const [branches, setBranches] = useState([])

	const [selectedPosition, setSelectedPosition] = useState([])
	const [selectedBranch, setSelectedBranch] = useState(null)

	const [errors, setErrors] = useState({})

	const branchJoi = () => {
		if (auth.canAccess('admin')) return Joi.optional()

		return Joi.string()
			.required()
			.label('Branch')
	}
	const schema = {
		username: Joi.string()
			.required()
			.min(6)
			.label('Username'),
		email: Joi.string()
			.required()
			.label('Email'),
		firstname: joiLettersOnly('Firstname'),
		middlename: joiLettersOnly('Middlename'),
		lastname: joiLettersOnly('Lastname'),
		contact: joiMobileNumber('Mobile Contact'),
		position: Joi.string()
			.required()
			.label('Position'),
		branch: branchJoi(),
		manager: Joi.optional(),
		password: Joi.optional(),
		codeNo: Joi.string()
			.min(8)
			.max(8)
			.label('License Code')
	}

	const handleChangePosition = selectedPosition =>
		setSelectedPosition(selectedPosition)

	const handleChangeBranch = selectedBranch => {
		setSelectedBranch(selectedBranch)

		if (!isAgent() || !selectedBranch) return

		getManager(selectedBranch.id).then(username => {
			setUser({...user, manager: username, branch: selectedBranch.value})
		})
	}

	const handleSubmit = async (
		e,
		{
			username,
			email,
			password,
			firstname,
			middlename,
			lastname,
			position,
			codeNo,
			contact
		}
	) => {
		const user = {
			username,
			password,
			position,
			profile: {
				firstname,
				middlename,
				lastname,
				email,
				codeNo,
				contact,
				branch_id: selectedBranch ? selectedBranch.id : null
			}
		}

		try {
			await editUser(id, user)

			toast.success('Updated!')

			setErrors(errors)

			onRefresh()

			props.history.replace('/users')
		} catch ({response}) {
			if (response && response.status === 400) {
				toast.error(response.data.status.errors[0].message)
			}
		}
	}

	const isAgent = () => {
		return !auth.canAccess('general', 'admin', 'manager')
	}

	return (
		<React.Fragment>
			<div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom'>
				<span>
					<h3>User Record Management</h3>
					<h5 className='text-secondary'>Edit User</h5>
				</span>
			</div>

			<Spinner isLoaded={isLoaded} className='spinner'>
				<Form
					data={{data: user, setData: setUser}}
					errors={{errors, setErrors}}
					onSubmit={handleSubmit}
					schema={schema}
				>
					{({renderInput, renderSelect, renderButton}) => {
						return (
							<React.Fragment>
								<div className='row'>
									<div className={isMobile ? 'col-12' : 'col-6 pl-5 pr-3 pt-4'}>
										{renderInput('firstname', 'Firstname')}
										{renderInput('middlename', 'Middlename')}
										{renderInput('lastname', 'Lastname')}
										{renderSelect(
											'position',
											'Position',
											selectedPosition,
											handleChangePosition,
											agents,
											{
												isDisabled:
													user.position === 'manager' ||
													user.position === 'general'
														? true
														: false
											}
										)}
										{renderInput('codeNo', 'License Code Number')}

										{user.position !== 'general' &&
											renderSelect(
												'branch',
												'Branch',
												selectedBranch,
												handleChangeBranch,
												branches,
												{
													isDisabled:
														auth.getCurrentUser().position === 'manager'
												}
											)}

										{isAgent() &&
											renderInput('manager', 'Manager', 'manager', '', {
												disabled: true
											})}
									</div>
									<div className={isMobile ? 'col-12' : 'col-6 pl-3 pr-5 pt-4'}>
										{renderInput('username', 'Username', 'text', 'fa-user')}
										{renderInput('email', 'Email', 'email', 'fa-envelope')}
										{renderInput('contact', 'Mobile Contact')}
										{auth.canAccess('admin') &&
											renderInput(
												'password',
												'New Password',
												'password',
												'fa-key'
											)}
										{renderButton('Update', null, 'Updating...', true)}

										<button
											onClick={e => {
												e.preventDefault()
												props.history.replace('/users')
											}}
											className='btn btn-grad-secondary btn-block mb-2'
											name='back'
										>
											Back
										</button>
									</div>
								</div>
							</React.Fragment>
						)
					}}
				</Form>
			</Spinner>

			<style jsx=''>{`
				.col-4 {
					padding: 0;
				}
				.row {
					border-radius: 5px;
				}
				.side-content {
					background-color: #343a40;
					border-radius: 0 5px 5px 0;
				}
				.spinner {
					margin-top: 200px;
					margin-bottom: 200px;
				}
			`}</style>
		</React.Fragment>
	)
}

export default withAuth(EditUser)
