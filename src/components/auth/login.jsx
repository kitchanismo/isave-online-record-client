import React, { useState } from 'react'
import Joi from 'joi-browser'
import { capitalize } from '../../services/utilsService'
import { toast } from 'react-toastify'
import withAuth from '../hoc/withAuth'
import Form from '../partials/form'
import Logo from '../partials/logo'

const Login = ({ auth, ...props }) => {
  const [user, setUser] = useState({ username: '', password: '' })
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
      toast.success(`Welcome, ${capitalize(data.username)}`)
      props.history.replace('/home')
    } catch ({ response }) {
      if (response && response.status === 401) {
        toast.error(response.data.status.errors)
      }
    }
  }

  const navigateSignUp = () => {
    props.history.replace('/sign-up')
  }

  return (
    <React.Fragment>
      <div className="row mt-5">
        <div className="offset-2 col-4 mr-2">
          <Logo />
        </div>
        <div className="col-4 ml-2">
          <h1>Login</h1>
          <Form
            data={{ data: user, setData: setUser }}
            errors={{ errors, setErrors }}
            onSubmit={handleSubmit}
            schema={schema}
          >
            {({ renderInput, renderButton }) => {
              return (
                <React.Fragment>
                  {renderInput('username', 'Username')}
                  {renderInput('password', 'Password', 'password')}
                  {renderButton('Login', null, 'Logging in...', true)}
                  <p className="mt-3 text-center">or</p>
                </React.Fragment>
              )
            }}
          </Form>
          <button
            onClick={navigateSignUp}
            className="btn btn-secondary btn-block"
            name="createAccount"
          >
            Create Account
          </button>
        </div>
      </div>
      <style jsx="">{`
        .col-4 {
          padding: 0;
        }
      `}</style>
    </React.Fragment>
  )
}

export default withAuth(Login)
