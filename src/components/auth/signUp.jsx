import React, { Component, useState, useEffect } from 'react'
import Joi from 'joi-browser'
import Form from '../common/form'
import {
  getBranches,
  getAvailableBranches,
  getManager
} from '../../services/userService'
import { toast } from 'react-toastify'
import { cap } from '../../services/utilsService'
import withAuth from './../hoc/withAuth'
import withWorkPosition from './../hoc/withWorkPosition'

const SignUp = ({ auth, isForManager, ...props }) => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    firstname: '',
    middlename: '',
    lastname: '',
    codeNo: '',
    manager: '',
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

  useEffect(() => {
    fetchBranches(isForManager, setBranches)
  }, [])

  const [selectedPosition, setSelectedPosition] = useState(null)
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
    codeNo: Joi.optional(),
    manager: Joi.optional()
  }

  const handleChangePosition = selectedPosition =>
    setSelectedPosition(selectedPosition)

  const handleChangeBranch = selectedBranch => {
    setSelectedBranch(selectedBranch)
    setUser({ ...user, manager: '' })

    if (isForManager) return

    getManager(selectedBranch.id)
      .then(fullname => {
        setUser({ ...user, manager: fullname })
      })
      .catch(({ response }) => {
        if (response && response.status === 404) {
          toast.error(response.data.status.error)
        }
      })
  }

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
    {
      username,
      email,
      password,
      firstname,
      middlename,
      lastname,
      codeNo,
      manager
    }
  ) => {
    const _errors = await handleCheckUser(e)

    if (Object.keys(_errors).length > 0) {
      setErrors(_errors)
      return
    }

    const user = {
      username,
      password,
      position: selectedPosition ? selectedPosition.value : 'manager',
      profile: {
        firstname,
        middlename,
        lastname,
        email,
        codeNo,
        manager,
        branch: { manager },
        branch_id: selectedBranch ? selectedBranch.id : 0
      }
    }

    try {
      await auth.signUp(user)
      toast.success('Registered!')
      toast.success('Please wait for verification!')

      setUser({
        username: '',
        email: '',
        password: '',
        firstname: '',
        middlename: '',
        lastname: '',
        codeNo: '',
        manager: '',
        confirmPassword: ''
      })

      setSelectedPosition(null)
      setSelectedBranch(null)

      fetchBranches(isForManager, setBranches)

      setErrors(_errors)
    } catch ({ response }) {
      if (response && (response.status === 400 || response.status === 401)) {
        toast.error(response.data.status.errors)
      }
    }
  }

  return (
    <React.Fragment>
      <Form
        data={{ data: user, setData: setUser }}
        errors={{ errors, setErrors }}
        onSubmit={handleSubmit}
        schema={schema}
      >
        {({ renderInput, renderSelect, renderButton }) => {
          return (
            <React.Fragment>
              <div className="row mt-3 mb-3 border border-secondary">
                <div className="side-content col-4"></div>

                <div className="col-4 pl-3 pr-2 pt-3">
                  <div className="col-12  d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-4 border-bottom">
                    <h1 className="h2">
                      Sign Up - {isForManager ? 'Manager' : 'Agent'}
                    </h1>
                  </div>

                  {renderInput('firstname', 'Firstname')}
                  {renderInput('middlename', 'Middlename')}
                  {renderInput('lastname', 'Lastname')}
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
                    'Available Branch',
                    selectedBranch,
                    handleChangeBranch,
                    branches
                  )}
                  {!isForManager &&
                    renderInput('manager', 'Manager', 'manager', '', {
                      disabled: true
                    })}
                </div>
                <div className="col-4 pl-2 pr-3 pt-5 mt-5">
                  {renderInput('username', 'Username', 'text', 'fa-user', {
                    onBlur: handleCheckUser
                  })}
                  {renderInput('email', 'Email', 'email', 'fa-envelope')}
                  {renderInput('password', 'Password', 'password', 'fa-key')}
                  {renderInput(
                    'confirmPassword',
                    'Confirm Password',
                    'password',
                    'fa-key'
                  )}
                  {renderButton('Sign Up', null, 'Signing in...', true)}
                  <button
                    onClick={e => {
                      e.preventDefault()
                      props.history.replace('/login')
                    }}
                    className="btn btn-grad-secondary btn-block"
                    name="back"
                  >
                    Back
                  </button>
                  <p className="text-primary p-2 ">
                    *Note: Account needs to verify by admin or manager to
                    activate
                  </p>
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
        .row {
          background-color: white;
          border-radius: 7px;
        }
        .side-content {
          background-color: #343a40;
          border-radius: 7px 0 0 7px;
        }
      `}</style>
    </React.Fragment>
  )
}

export default withWorkPosition(withAuth(SignUp))
function fetchBranches(isForManager, setBranches) {
  const url = isForManager ? '/api/branches/available' : '/api/branches/taken'
  getBranches(url).then(branches => {
    setBranches(branches)
  })
}
