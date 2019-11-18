import React, { Component, useState, useEffect } from 'react'
import Joi from 'joi-browser'
import Form from '../common/form'
import { getBranches, getManager } from '../../services/userService'
import { toast } from 'react-toastify'
import withAuth from './../hoc/withAuth'
import { joiLettersOnly } from '../../services/utilsService'
import logo from './../../img/cocolife-tree.png'
import forest from '../../img/forest.jpg'

const SignUp = ({ auth, ...props }) => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    firstname: '',
    middlename: '',
    lastname: '',
    codeNo: '',
    manager: '',
    confirmPassword: '',
    position: '',
    branch: ''
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
  const [hasBranches, setHasBranches] = useState(false)

  const fetchBranches = setBranches => {
    getBranches('/api/branches/taken').then(branches => {
      setBranches(branches)
      setHasBranches(branches.length > 0)
    })
  }

  useEffect(() => {
    fetchBranches(setBranches)
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
    firstname: joiLettersOnly('Firstname'),
    middlename: joiLettersOnly('Middlename'),
    lastname: joiLettersOnly('Lastname'),
    position: Joi.string()
      .required()
      .label('Position'),
    branch: Joi.string()
      .required()
      .label('Branch'),
    codeNo: Joi.string()
      .min(8)
      .max(8)
      .label('License Code Number'),
    manager: Joi.optional()
  }

  const handleChangePosition = selectedPosition =>
    setSelectedPosition(selectedPosition)

  const handleChangeBranch = selectedBranch => {
    setSelectedBranch(selectedBranch)
    setUser({ ...user, manager: '' })

    if (!selectedBranch) return

    // branch needs to populate after fetching manager
    getManager(selectedBranch.id)
      .then(fullname => {
        setUser({ ...user, manager: fullname, branch: selectedBranch.value })
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

  const handleCheckCodeNo = async ({ currentTarget: input }) => {
    const { isTaken } = await auth.isCodeNoTaken(input.value)

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
      position: selectedPosition ? selectedPosition.value : '',
      profile: {
        firstname,
        middlename,
        lastname,
        email,
        codeNo,
        branch: { manager },
        branch_id: selectedBranch ? selectedBranch.id : 0
      }
    }

    try {
      await auth.signUp(user)

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
        branch: '',
        position: '',
        confirmPassword: ''
      })

      setSelectedPosition(null)
      setSelectedBranch(null)

      fetchBranches(setBranches)

      setErrors(_errors)
      props.history.replace('/login')
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
                <div className="side-content p-0 d-flex justify-content-center align-content-center col-4">
                  <img className="logo px-0 m-0" src={logo}></img>
                </div>

                <div className="col-4 pl-3 pr-2 pt-3">
                  <div className="col-12  d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-4 border-bottom">
                    <h1 className="h2">Sign Up New Agent</h1>
                  </div>

                  {renderInput('firstname', 'Firstname')}
                  {renderInput('middlename', 'Middlename')}
                  {renderInput('lastname', 'Lastname')}

                  {renderSelect(
                    'position',
                    'Position',
                    selectedPosition,
                    handleChangePosition,
                    agents
                  )}
                  {renderInput('codeNo', 'License Code Number', 'text', '', {
                    onBlur: handleCheckCodeNo
                  })}
                  {!hasBranches && <label>No Available Branch</label>}
                  {hasBranches &&
                    renderSelect(
                      'branch',
                      'Available Branch',
                      selectedBranch,
                      handleChangeBranch,
                      branches
                    )}
                  {renderInput('manager', 'Manager', 'manager', '', {
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
                  {renderButton('Sign Up', null, 'Signing up...', true)}
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
                    *Note: Account needs to verify by manager to activate
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
          border-radius: 7px 0 0 7px;
          background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
            url(${forest});
          background-repeat: no-repeat;
          background-size: 100% 100%;
        }
        .logo {
          padding-top: 100% !important;
          padding-bottom: 100% !important;
        }
        .bg-content {
        }
      `}</style>
    </React.Fragment>
  )
}

export default withAuth(SignUp)
