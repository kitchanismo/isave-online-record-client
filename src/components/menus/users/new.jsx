import React, { useState, useEffect, useContext } from 'react'
import Joi from 'joi-browser'
import Form from '../../common/form'
import { getBranches, addManager } from '../../../services/userService'
import { toast } from 'react-toastify'
import { cap, joiLettersOnly } from '../../../services/utilsService'
import withAuth from './../../hoc/withAuth'
import Spinner from './../../common/spinner'
import { UserContext } from './../../../context'

const NewManager = ({ auth, ...props }) => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    firstname: '',
    middlename: '',
    lastname: '',
    codeNo: '',
    branch: '',
    confirmPassword: ''
  })

  const { onRefresh } = useContext(UserContext)

  const [branches, setBranches] = useState([])
  const [hasBranches, setHasBranches] = useState(false)

  const fetchBranches = setBranches => {
    getBranches('/api/branches/available').then(branches => {
      setBranches(branches)
      setHasBranches(branches.length > 0)
    })
  }

  useEffect(() => {
    fetchBranches(setBranches)
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
    branch: Joi.string()
      .required()
      .label('Branch'),
    codeNo: Joi.number()
      .required()
      .min(8)
      .label('Code Number')
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
    { username, email, password, firstname, middlename, lastname, codeNo }
  ) => {
    const _errors = await handleCheckUser(e)

    if (Object.keys(_errors).length > 0) {
      setErrors(_errors)
      return
    }

    const user = {
      username,
      password,
      position: 'manager',
      profile: {
        firstname,
        middlename,
        lastname,
        email,
        codeNo,
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
        confirmPassword: ''
      })

      setSelectedBranch(null)

      fetchBranches(setBranches)

      setErrors(_errors)

      onRefresh()

      props.history.replace('/users')
    } catch ({ response }) {
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
      <div className="col-12 d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-4 border-bottom">
        <h1 className="h2">Add New Manager</h1>
      </div>
      <Form
        data={{ data: user, setData: setUser }}
        errors={{ errors, setErrors }}
        onSubmit={handleSubmit}
        schema={schema}
      >
        {({ renderInput, renderSelect, renderButton }) => {
          return (
            <React.Fragment>
              <div className="row mb-3 mr-0">
                <div className="col-6 pl-3 pr-2 pt-3">
                  {renderInput('firstname', 'Firstname')}
                  {renderInput('middlename', 'Middlename')}
                  {renderInput('lastname', 'Lastname')}

                  {renderInput('codeNo', 'Code Number')}
                  {!hasBranches && (
                    <React.Fragment>
                      <label>No Available Branch</label>
                      <br />
                      <button
                        onClick={() => props.history.replace('/branches/new')}
                        className="btn btn-sm btn-outline-info ml-1"
                      >
                        <span className="fa fa-plus mr-1"></span>
                        BRANCH
                      </button>
                    </React.Fragment>
                  )}
                  {hasBranches &&
                    renderSelect(
                      'branch',
                      'Available Branch',
                      selectedBranch,
                      handleChangeBranch,
                      branches
                    )}
                </div>
                <div className="col-6 pl-2 pr-3 pt-3">
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
                  {renderButton('Add', null, 'Saving...', true)}
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
