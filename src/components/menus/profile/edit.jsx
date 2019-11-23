import React, {useState, useEffect, useContext} from 'react'
import Joi from 'joi-browser'
import {getMe, editUser} from '../../../services/userService'
import {toast} from 'react-toastify'
import {joiLettersOnly, joiMobileNumber} from '../../../services/utilsService'
import withAuth from '../../hoc/withAuth'
import Form from './../../common/form'
import Spinner from './../../common/spinner'
import {useMedia} from 'react-use'

const EditUser = ({auth, ...props}) => {
	const isMobile = useMedia('(max-width: 600px)')
	const [user, setUser] = useState({
		id: '',
		username: '',
		email: '',
		firstname: '',
		middlename: '',
		lastname: '',
		password: '',
		contact: ''
	})
	const [isLoaded, setIsLoaded] = useState(false)

	useEffect(() => {
		setIsLoaded(false)
		getMe().then(({profile, username, position, id}) => {
			setUser({
				id,
				username,
				email: profile.email,
				firstname: profile.firstname,
				middlename: profile.middlename,
				lastname: profile.lastname,
				contact: profile.contact
			})
			setIsLoaded(true)
		})
		// .catch(() => props.history.replace('/not-found'))
	}, [])

	const [selectedBranch, setSelectedBranch] = useState(null)

	const [errors, setErrors] = useState({})

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
		contact: joiMobileNumber('Mobile Number'),
		id: Joi.optional(),
		password: Joi.optional()
	}

	const handleSubmit = async (
		e,
		{username, email, password, firstname, middlename, lastname, id, contact}
	) => {
		const user = {
			id,
			username,
			password,
			profile: {
				firstname,
				middlename,
				lastname,
				email,
				contact
			}
		}

		try {
			const {jwt} = await editUser(user.id, user)

			toast.success('Updated!')

			setErrors(errors)

			//	console.log(jwt)

			auth.saveJwt(jwt)

			window.location.href = window.location.origin + '/profile/me'
		} catch ({response}) {
			if (response && response.status === 400) {
				toast.error(response.data.status.errors[0].message)
			}
		}
	}

	return (
		<React.Fragment>
			<div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom'>
				<h1 className='h2'>Edit Profile</h1>
			</div>

			<Spinner isLoaded={isLoaded} className='spinner'>
				<Form
					data={{data: user, setData: setUser}}
					errors={{errors, setErrors}}
					onSubmit={handleSubmit}
					schema={schema}
				>
					{({renderInput, renderButton}) => {
						return (
							<React.Fragment>
								<div className='row m-1'>
									<div
										className={isMobile ? 'col-12 p-0' : 'col-6 pl-5 pr-3 pt-4'}
									>
										{renderInput('firstname', 'Firstname')}
										{renderInput('middlename', 'Middlename')}
										{renderInput('lastname', 'Lastname')}
									</div>
									<div
										className={isMobile ? 'col-12 p-0' : 'col-6 pl-3 pr-5 pt-4'}
									>
										{renderInput('username', 'Username', 'text', 'fa-user')}
										{renderInput('email', 'Email', 'email', 'fa-envelope')}
										{renderInput('contact', 'Mobile Contact')}
										{renderInput(
											'password',
											'New Password',
											'password',
											'fa-key'
										)}
										{renderButton('Update', null, 'Updating...', true)}

										<button
											onClick={e => {
												e.preventDefault()
												props.history.replace('/profile/me')
											}}
											className='btn btn-grad-secondary btn-block'
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
