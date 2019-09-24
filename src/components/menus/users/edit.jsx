import React, { useState, useEffect, useContext } from 'react'
import Joi from 'joi-browser'
import {
  getBranches,
  getManager,
  getUser,
  editUser
} from '../../../services/userService'
import { toast } from 'react-toastify'
import { cap } from '../../../services/utilsService'
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
    branch: ''
  })

  useEffect(() => {
    getUser(id)
      .then(({ profile, username, position }) => {
        setUser({
          username,
          email: profile.email,
          firstname: profile.firstname,
          middlename: profile.middlename,
          lastname: profile.lastname,
          codeNo: profile.codeNo,
          manager: profile.branch.manager,
          branch: profile.branch.name,
          position
        })
        setSelectedPosition({
          id: position === 'sales' ? 1 : 2,
          value: position,
          label: cap(position + (position !== 'manager' ? ' officer' : ''))
        })
        setSelectedBranch({
          id: profile.branch_id,
          value: profile.branch.name,
          label: cap(profile.branch.name)
        })

        const url =
          position === 'manager'
            ? '/api/branches/available'
            : '/api/branches/taken'

        getBranches(url).then(branches => {
          setBranches(branches)
        })
      })
      .catch(() => props.history.replace('/not-found'))
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
    firstname: Joi.string()
      .required()
      .label('Firstname'),
    middlename: Joi.string()
      .required()
      .label('Middlename'),
    lastname: Joi.string()
      .required()
      .label('Lastname'),
    position: Joi.string()
      .required()
      .label('Position'),
    branch: Joi.string()
      .required()
      .label('Branch'),
    manager: Joi.optional(),
    codeNo: Joi.number()
      .required()
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
      // console.log(user)
      toast.success('Updated!')

      // setUser({
      //   username: '',
      //   email: '',
      //   password: '',
      //   firstname: '',
      //   middlename: '',
      //   lastname: '',
      //   codeNo: '',
      //   confirmPassword: ''
      // })

      // setSelectedBranch(null)
      // setSelectedPosition(null)

      //fetchBranches(setBranches)

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
    return user.position !== 'manager' && user.position !== 'admin'
  }

  return (
    <React.Fragment>
      <main
        role="main"
        className="dashboard col-md-9 ml-sm-auto col-lg-10 pt-3 px-4 bg-light border border-secondary"
      >
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
          <h1 className="h2">Edit User</h1>
        </div>

        <Spinner isLoaded={user.username !== ''} className="spinner">
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

                      {isAgent() &&
                        renderInput('manager', 'Manager', 'manager', '', {
                          disabled: true
                        })}
                    </div>
                    <div className="col-6 pl-3 pr-5 pt-4">
                      {renderInput('username', 'Username', 'text', 'fa-user')}
                      {renderInput('email', 'Email', 'email', 'fa-envelope')}
                      {renderButton('Update', null, 'Updating...', true)}

                      {/* <p className="text-primary p-2 ">
                      *Note: Only admin can update the other managers account
                    </p> */}
                    </div>
                  </div>
                </React.Fragment>
              )
            }}
          </Form>
        </Spinner>

        <style jsx="">{`
          .dashboard {
            border-radius: 0px 5px 0 0;
          }
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
      </main>
    </React.Fragment>
  )
}

export default withAuth(EditUser)
