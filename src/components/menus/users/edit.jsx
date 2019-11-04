import React, { useState, useEffect, useContext } from 'react'
import Joi from 'joi-browser'
import {
  getBranches,
  getManager,
  getUser,
  editUser
} from '../../../services/userService'
import { toast } from 'react-toastify'
import { cap, joiLettersOnly } from '../../../services/utilsService'
import withAuth from '../../hoc/withAuth'
import Form from './../../common/form'
import Spinner from './../../common/spinner'

import { UserContext } from './../../../context'

const EditUser = ({ auth, ...props }) => {
  const { onRefresh } = useContext(UserContext)
  const { id } = props.match.params
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
    password: ''
  })
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(false)
    getUser(id).then(({ profile, username, position }) => {
      setUser({
        username,
        email: profile.email,
        firstname: profile.firstname,
        middlename: profile.middlename,
        lastname: profile.lastname,
        codeNo: profile.codeNo,
        manager: profile.branch ? profile.branch.manager : '',
        branch: profile.branch ? profile.branch.name : '',
        position
      })
      setSelectedPosition({
        id: position === 'sales' ? 1 : 2,
        value: position,
        label: cap(position + (position !== 'manager' ? ' officer' : ''))
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
    position: Joi.string()
      .required()
      .label('Position'),
    branch: Joi.string()
      .required()
      .label('Branch'),
    manager: Joi.optional(),
    password: Joi.optional(),
    codeNo: Joi.number()
      .required()
      .min(8)
      .label('Code Number')
  }

  const handleChangePosition = selectedPosition =>
    setSelectedPosition(selectedPosition)

  const handleChangeBranch = selectedBranch => {
    setSelectedBranch(selectedBranch)

    if (!isAgent() || !selectedBranch) return

    getManager(selectedBranch.id).then(username => {
      setUser({ ...user, manager: username, branch: selectedBranch.value })
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
      codeNo
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
        branch_id: selectedBranch ? selectedBranch.id : null
      }
    }

    try {
      await editUser(id, user)

      toast.success('Updated!')

      setErrors(errors)

      onRefresh()

      props.history.replace('/users')
    } catch ({ response }) {
      if (response && response.status === 400) {
        toast.error(response.data.status.errors[0].message)
      }
    }
  }

  const isAgent = () => {
    return (
      user.position !== 'manager' &&
      user.position !== 'admin' &&
      user.position !== 'super'
    )
  }

  return (
    <React.Fragment>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
        <h1 className="h2">Edit User</h1>
      </div>

      <Spinner isLoaded={isLoaded} className="spinner">
        <Form
          data={{ data: user, setData: setUser }}
          errors={{ errors, setErrors }}
          onSubmit={handleSubmit}
          schema={schema}
        >
          {({ renderInput, renderSelect, renderButton }) => {
            return (
              <React.Fragment>
                <div className="row m-1">
                  <div className="col-6 pl-5 pr-3 pt-4">
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
                          user.position === 'admin'
                            ? true
                            : false
                      }
                    )}
                    {renderInput('codeNo', 'Code Number')}
                    {user.position !== 'super' &&
                      user.position !== 'admin' &&
                      renderSelect(
                        'branch',
                        'Branch',
                        selectedBranch,
                        handleChangeBranch,
                        branches
                      )}

                    {isAgent() &&
                      renderInput('manager', 'Manager', 'manager', '', {
                        disabled: true
                      })}
                  </div>
                  <div className="col-6 pl-3 pr-5 pt-4">
                    {renderInput('username', 'Username', 'text', 'fa-user')}
                    {renderInput('email', 'Email', 'email', 'fa-envelope')}
                    {user.position === 'admin' &&
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
                      className="btn btn-grad-secondary btn-block"
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
      </Spinner>

      <style jsx="">{`
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
