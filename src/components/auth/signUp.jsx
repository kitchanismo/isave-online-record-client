import React, { Component, useState, useEffect } from 'react'
import Joi from 'joi-browser'
import Form from '../partials/form'
import { getBranches, getManagers } from '../../services/userService'
import { toast } from 'react-toastify'
import { capitalize } from '../../services/utilsService'
import withAuth from './../hoc/withAuth'
import WorkPosition from './../partials/workPosition'

const SignUp = ({ auth, ...props }) => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    firstname: '',
    middlename: '',
    lastname: '',
    codeNo: '',
    confirmPassword: ''
  })
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
  const [managers, setManagers] = useState([])

  useEffect(() => {
    getBranches().then(branches => {
      setBranches(branches)
    })
  }, [])

  const [selectedPosition, setSelectedPosition] = useState(null)
  const [selectedBranch, setSelectedBranch] = useState(null)
  const [selectedManager, setSelectedManager] = useState(null)

  const [errors, setErrors] = useState({})

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
      .options({ language: { any: { allowOnly: 'not match' } } })
      .label('Password'),
    firstname: Joi.string()
      .required()
      .label('Firstname'),
    middlename: Joi.string()
      .required()
      .label('Middlename'),
    lastname: Joi.string()
      .required()
      .label('Lastname'),
    codeNo: Joi.optional()
  }

  const handleChangePosition = selectedPosition =>
    setSelectedPosition(selectedPosition)

  const handleChangeBranch = selectedBranch => {
    setSelectedBranch(selectedBranch)
    setSelectedManager(null)
    getManagers(selectedBranch.id).then(managers => {
      setManagers(managers)
    })
  }

  const handleChangeManager = selectedManager =>
    setSelectedManager(selectedManager)

  const handleCheckUser = async ({ currentTarget: input }) => {
    const { isTaken } = await auth.isUsernameTaken(input.value)

    const _errors = { ...errors }

    if (isTaken) {
      _errors[input.name] = `"${input.value}" is taken`
    }

    setErrors(_errors)

    return _errors
  }

  const handleSubmit = async (
    e,
    { username, email, password, firstname, middlename, lastname, codeNo }
  ) => {
    const _errors = await handleCheckUser(e)

    if (Object.keys(_errors).length > 0) {
      setErrors(_errors)
      return
    }

    const user = {
      username,
      email,
      password,
      firstname,
      middlename,
      lastname,
      codeNo,
      position: selectedPosition ? selectedPosition.value : 'manager',
      manager: selectedManager ? selectedManager.value : '',
      branch_id: selectedBranch ? selectedBranch.id : 0
    }

    try {
      await auth.signUp(user)

      toast.success('Welcome, ' + capitalize(username))

      setUser({
        username: '',
        email: '',
        password: '',
        firstname: '',
        middlename: '',
        lastname: '',
        codeNo: '',
        confirmPassword: ''
      })
      setErrors(_errors)

      props.history.replace('/')
    } catch ({ response }) {
      if (response && response.status === 400) {
        toast.error(response.data.status.errors)
      }
    }
  }

  return (
    <WorkPosition>
      {({ isForManager }) => (
        <React.Fragment>
          <h1>Sign Up - {isForManager ? 'Manager' : 'Agent'}</h1>

          <Form
            data={{ data: user, setData: setUser }}
            errors={{ errors, setErrors }}
            onSubmit={handleSubmit}
            schema={schema}
          >
            {({ renderInput, renderSelect, renderButton }) => {
              return (
                <React.Fragment>
                  <div className="row mt-5">
                    <div className="col-4 p-4 offset-2">
                      {renderInput('firstname', 'Firstname')}
                      {renderInput('middlename', 'Middlename')}
                      {renderInput('lastname', 'Lastname')}
                      <hr />
                      {!isForManager &&
                        renderSelect(
                          'position',
                          'Position',
                          selectedPosition,
                          handleChangePosition,
                          agents
                        )}
                      {renderInput('codeNo', 'Code Number')}
                      {renderSelect(
                        'branch',
                        'Branch',
                        selectedBranch,
                        handleChangeBranch,
                        branches
                      )}

                      {!isForManager &&
                        renderSelect(
                          'manager',
                          'Manager',
                          selectedManager,
                          handleChangeManager,
                          managers
                        )}
                    </div>
                    <div className="col-4 p-4">
                      {renderInput('username', 'Username', {
                        onBlur: handleCheckUser
                      })}
                      {renderInput('email', 'Email', 'email')}
                      {renderInput('password', 'Password', 'password')}
                      {renderInput(
                        'confirmPassword',
                        'Confirm Password',
                        'password'
                      )}
                      {renderButton('Sign Up', null, 'Signing in...', true)}
                      <button
                        onClick={e => {
                          e.preventDefault()
                          props.history.replace('/login')
                        }}
                        className="btn btn-secondary btn-block"
                        name="back"
                      >
                        Back
                      </button>
                    </div>
                  </div>
                </React.Fragment>
              )
            }}
          </Form>

          <style jsx="">{`
            .col-4 {
              padding: 0;
            }
          `}</style>
        </React.Fragment>
      )}
    </WorkPosition>
  )
}

export default withAuth(SignUp)
