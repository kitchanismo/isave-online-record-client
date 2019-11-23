import React, {useState, useContext} from 'react'
import {NavLink} from 'react-router-dom'
import Joi from 'joi-browser'
import {cap} from '../../services/utilsService'
import {toast} from 'react-toastify'
import withAuth from '../hoc/withAuth'
import Form from '../common/form'
import Logo from '../common/logo'
import Footer from '../common/footer'
import forest from '../../img/forest.jpg'

const Login = ({auth, ...props}) => {
	const [user, setUser] = useState({username: '', password: ''})
	const [errors, setErrors] = useState({})

	const schema = {
		username: Joi.string()
			.required()
			.label('Username'),
		password: Joi.string()
			.required()
			.label('Password')
	}

	const handleSubmit = async (e, data) => {
		try {
			await auth.login(data)
		} catch ({response}) {
			if (response && response.status === 401) {
				toast.error(response.data.status.errors)
			}
		}
	}

	const navigateSignUp = () => {
		props.history.replace('/sign-up')
	}

	const visiionMission = () => (
		<div className='row m-0 mt-0 pt-0'>
			<div className='card text-center  mt-0'>
				<div className='card-body'>
					<div className='row'>
						<div className='col-sm-4 '>
							<div className='card '>
								<div className='card-body'>
									<p className='card-text text-white font-italic'>
										"We're Big on Dreams. We're Big on Wealth. We're Big on
										Goals and We're Big on Health."
									</p>
								</div>
							</div>
						</div>
						<div className='col-sm-4 '>
							<div className='card '>
								<div className='card-body'>
									<p className='card-text text-white font-italic'>
										"Cocolife, We're Big on Life. Cocolife, We're Big on Life."
									</p>
								</div>
							</div>
						</div>
						<div className='col-sm-4 '>
							<div className='card '>
								<div className='card-body'>
									<p className='card-text text-white font-italic'>
										"We're Big on Claims and Service too. We're Big on
										Happiness. We're Big on you Cocolife."
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)

	return (
		<React.Fragment>
			<div className='container-fluid'>
				<div className='row mt-3 mx-0 bg-dark'>
					<div className='bg-content col-0 col-lg-8 p-0 bg-dark'>
						<Logo />
						{visiionMission()}
					</div>

					<div className='login col-12 col-lg-4 p-0 m-0'>
						<div className='p-3 pt-2'>
							<h4>Login to your account</h4>
							<hr></hr>
							<Form
								data={{data: user, setData: setUser}}
								errors={{errors, setErrors}}
								onSubmit={handleSubmit}
								schema={schema}
							>
								{({renderInput, renderButton}) => {
									return (
										<React.Fragment>
											{renderInput('username', 'Username', 'text', 'fa-user')}
											{renderInput(
												'password',
												'Password',
												'password',
												'fa-key'
											)}
											{renderButton(
												'Login',
												null,
												'Logging in...',
												true,
												'mt-4'
											)}
										</React.Fragment>
									)
								}}
							</Form>
						</div>
						{/* <div className=" d-flex justify-content-center  py-2  sign-up px-3">
            <p className="mb-0">Create New Agent? &nbsp; &nbsp; </p>
            <NavLink to="/sign-up">Sign-Up</NavLink>
          </div> */}
					</div>
				</div>
				<Footer></Footer>
				<style jsx=''>{`
					.login {
						background-color: white;
						border-radius: 0 5px 0 0 !important;
					}
					.sign-up {
						background-color: white;
						height: auto;
						margin: 0px;
					}
					.row {
						background-color: transparent !important;
						border-radius: 5px !important;
					}
					.card {
						border: 0;
						background-color: transparent !important;
					}
					.sign-up {
						border-top: 1px solid #ddd;
					}
					.bg-content {
						background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.7)),
							url(${forest});
						background-repeat: no-repeat;
						background-size: 100% 100%;
						border-radius: 5px 0px 0px 0px !important;
					}
				`}</style>
			</div>
		</React.Fragment>
	)
}

export default withAuth(Login)
