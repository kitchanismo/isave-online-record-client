import React, { useState } from 'react'
import Joi from 'joi-browser'
import { cap } from '../../services/utilsService'
import { toast } from 'react-toastify'
import withAuth from '../hoc/withAuth'
import Form from '../common/form'
import Logo from '../common/logo'

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
      toast.success(`Welcome, ${cap(data.username)}`)
      props.history.replace('/')
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
      <div className="row mt-3 mb-3 border border-secondary">
        <div className="col-8 p-0">
          <Logo />
        </div>
        <div className="col-4 p-3 pt-2">
          <h3>Login</h3>
          <hr></hr>
          <Form
            data={{ data: user, setData: setUser }}
            errors={{ errors, setErrors }}
            onSubmit={handleSubmit}
            schema={schema}
          >
            {({ renderInput, renderButton }) => {
              return (
                <React.Fragment>
                  {renderInput('username', 'Username', 'text', 'fa-user')}
                  {renderInput('password', 'Password', 'password', 'fa-key')}
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

      <div className="row mb-3 ">
        <div className="card text-center border border-secondary">
          <div className="card-header bg-dark text-white">Featured</div>
          <div className="card-body">
            <div className="row">
              <div className="col-sm-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Special title treatment</h5>
                    <p className="card-text">
                      It's a broader card with text below as a natural lead-in
                      to extra content. This content is a little longer.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Special title treatment</h5>
                    <p className="card-text">
                      It's a broader card with text below as a natural lead-in
                      to extra content. This content is a little longer.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Special title treatment</h5>
                    <p className="card-text">
                      It's a broader card with text below as a natural lead-in
                      to extra content. This content is a little longer.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card-footer text-muted">Copyright 2019</div>
        </div>
      </div>

      <style jsx="">{`
        .row {
          border-radius: 5px !important;
          background-color: white;
        }
        .col-8;
      `}</style>
    </React.Fragment>
  )
}

export default withAuth(Login)
