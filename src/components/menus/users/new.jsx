import React, {useState, useEffect, useContext} from 'react'
import Joi from 'joi-browser'
import Form from '../../common/form'
import {getBranches, addManager, getUser} from '../../../services/userService'
import {toast} from 'react-toastify'
import {
	cap,
	joiLettersOnly,
	joiMobileNumber
} from '../../../services/utilsService'
import withAuth from './../../hoc/withAuth'
import Spinner from './../../common/spinner'
import {UserContext} from './../../../context'
import {useMedia} from 'react-use'

const NewManager = ({auth, ...props}) => {
	const isMobile = useMedia('(max-width: 600px)')

	const [user, setUser] = useState({
		username: '',
		email: '',
		password: '',
		firstname: '',
		middlename: '',
		lastname: '',
		codeNo: '',
		branch: '',
		position: '',
		confirmPassword: '',
		contact: ''
	})

	const {onRefresh} = useContext(UserContext)

	const [isLoading, setIsLoading] = useState(false)

	const [branches, setBranches] = useState([])
	const [hasBranches, setHasBranches] = useState(false)

	const [selectedBranch, setSelectedBranch] = useState(null)
	const [selectedPosition, setSelectedPosition] = useState([])
	const [errors, setErrors] = useState({})

	const fetchBranches = (position = null) => {
		if (!position) {
			setBranches([])
			setHasBranches(false)
			return
		}

		setIsLoading(true)
		const url = position === 'manager' ? 'available' : 'taken'
		getBranches(`/api/branches/${url}`).then(branches => {
			setBranches(branches)
			setHasBranches(branches.length > 0)
			setIsLoading(false)
			if (branches.length === 0)
				toast.error('No available branch! Please add branch first.')
		})
	}

	useEffect(() => {
		setBranches([])
		setHasBranches(false)
		if (auth.getCurrentUser().position === 'manager') {
			getUser(auth.getCurrentUser().id).then(_user => {
				setUser({...user, branch: _user.profile.branch.name})
				setSelectedBranch({
					id: 1,
					label: cap(_user.profile.branch.name),
					value: _user.profile.branch.name
				})
			})
		}
	}, [])

	const schema = {
		username: Joi.string()
			.required()
			.min(6)
			.label('Username'),
		email: Joi.string()
			.required()
			.label('Email'),
		password: Joi.string()
			.required()
			.min(6)
			.label('Password'),
		confirmPassword: Joi.string()
			.required()
			.valid(Joi.ref('password'))
			.options({language: {any: {allowOnly: 'not match'}}})
			.label('Password'),
		firstname: joiLettersOnly('Firstname'),
		middlename: joiLettersOnly('Middlename'),
		lastname: joiLettersOnly('Lastname'),
		contact: joiMobileNumber('Mobile Contact'),
		branch: Joi.string()
			.required()
			.label('Branch'),
		position: Joi.string()
			.required()
			.label('Position'),
		codeNo: Joi.string()
			.min(8)
			.max(8)
			.label('License Code Number')
	}

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
		},
		{
			id: 3,
			label: 'Branch Manager',
			value: 'manager'
		}
	]

	const preparedAgents = () => {
		if (auth.getCurrentUser().position === 'manager') {
			return agents.filter(agent => agent.id !== 3)
		}

		return agents
	}

	const handleChangePosition = selectedPosition => {
		setSelectedPosition(selectedPosition)
		if (auth.getCurrentUser().position === 'manager') return

		fetchBranches(selectedPosition ? selectedPosition.value : null)
		setSelectedBranch(null)
	}

	const handleCheckTaken = async ({currentTarget: input}) => {
		const {isTaken} =
			input.name === 'username'
				? await auth.isUsernameTaken(input.value)
				: await auth.isCodeNoTaken(input.value)

		const _errors = {...errors}

		if (isTaken) {
			_errors[input.name] = `"${input.value}" is taken`
		}

		setErrors(_errors)

		return _errors
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
			codeNo,
			position,
			contact
		}
	) => {
		const _errors = await handleCheckTaken(e)

		if (Object.keys(_errors).length > 0) {
			setErrors(_errors)
			return
		}

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
				branch_id: selectedBranch ? selectedBranch.id : 0
			}
		}

		try {
			await addManager(user)

			toast.success('Created!')

			setUser({
				username: '',
				email: '',
				password: '',
				firstname: '',
				middlename: '',
				lastname: '',
				codeNo: '',
				contact: '',
				confirmPassword: ''
			})

			setSelectedBranch(null)

			fetchBranches(setBranches)

			setErrors(_errors)

			onRefresh()

			props.history.replace('/users')
		} catch ({response}) {
			if (response && (response.status === 400 || response.status === 401)) {
				toast.error(response.data.status.errors)
			}
		}
	}

	const handleChangeBranch = selectedBranch => {
		setSelectedBranch(selectedBranch)
	}
	return (
		<React.Fragment>
			<div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-4 border-bottom'>
				<span>
					<h1 className='h2'>User Record Management</h1>
					<h5 className='text-secondary'>Add New User</h5>
				</span>
			</div>
			<Form
				data={{data: user, setData: setUser}}
				errors={{errors, setErrors}}
				onSubmit={handleSubmit}
				schema={schema}
			>
				{({renderInput, renderSelect, renderButton}) => {
					return (
						<React.Fragment>
							<div className={isMobile ? 'row mb-3' : 'row mb-3 mx-2'}>
								<div className={isMobile ? 'col-12' : 'col-6 pl-3 pr-2 pt-3'}>
									{renderInput('firstname', 'Firstname')}
									{renderInput('middlename', 'Middlename')}
									{renderInput('lastname', 'Lastname')}
									{renderInput('codeNo', 'License Code Number', 'text', '', {
										onBlur: handleCheckTaken
									})}
									{renderSelect(
										'position',
										'Position',
										selectedPosition,
										handleChangePosition,
										preparedAgents()
									)}

									{renderSelect(
										'branch',
										'Branch',
										selectedBranch,
										handleChangeBranch,
										branches,
										{
											isLoading,
											isDisabled: auth.getCurrentUser().position === 'manager'
										}
									)}
								</div>
								<div className={isMobile ? 'col-12' : 'col-6 pl-2 pr-3 pt-3'}>
									{renderInput('username', 'Username', 'text', 'fa-user', {
										onBlur: handleCheckTaken
									})}
									{renderInput('email', 'Email', 'email', 'fa-envelope')}
									{renderInput('contact', 'Mobile Contact')}
									{renderInput('password', 'Password', 'password', 'fa-key')}
									{renderInput(
										'confirmPassword',
										'Confirm Password',
										'password',
										'fa-key'
									)}
									{renderButton('Add', null, 'Saving...', true)}
								</div>
							</div>
						</React.Fragment>
					)
				}}
			</Form>

			<style jsx=''>{`
				.col-4 {
					padding: 0;
				}
				.row {
					border-radius: 7px;
				}
				.side-content {
					background-color: #343a40;
					border-radius: 7px 0 0 7px;
				}
				.fa-plus {
					margin-top: 0 !important;
				}
			`}</style>
		</React.Fragment>
	)
}

export default withAuth(NewManager)
