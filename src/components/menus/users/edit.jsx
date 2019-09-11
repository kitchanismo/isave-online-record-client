import React, { useState, useEffect } from 'react'
import Joi from 'joi-browser'
import { getBranches, getManager, getUser } from '../../../services/userService'
import { toast } from 'react-toastify'
import { cap } from '../../../services/utilsService'
import withAuth from '../../hoc/withAuth'
import Form from './../../common/form'
import Spinner from './../../common/spinner'

const EditUser = ({ auth, ...props }) => {
  const { id } = props.match.params
  const [user, setUser] = useState({
    username: '',
    email: '',
    firstname: '',
    middlename: '',
    lastname: '',
    manager: '',
    codeNo: ''
  })

  useEffect(() => {
    getUser(id).then(({ profile, username, position }) => {
      setUser({
        username,
        email: profile.email,
        firstname: profile.firstname,
        middlename: profile.middlename,
        lastname: profile.lastname,
        codeNo: profile.codeNo,
        manager: profile.branch.manager
      })
      setSelectedPosition({
        id: position === 'sales officer' ? 1 : 2,
        value: position,
        label: cap(position)
      })
      setSelectedBranch({
        id: profile.branch_id,
        value: profile.branch.name,
        label: cap(profile.branch.name)
      })

      getBranches('/api/branches').then(branches => {
        setBranches(branches)
      })
    })
    //.catch(() => props.history.replace('/not-found'))
  }, [])

  const agents = [
    {
      id: 1,
      label: 'Sales Officer',
      value: 'sales officer'
    },
    {
      id: 2,
      label: 'Promo Officer',
      value: 'promo officer'
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
    manager: Joi.optional(),
    codeNo: Joi.optional()
  }

  const handleChangePosition = selectedPosition =>
    setSelectedPosition(selectedPosition)

  const handleChangeBranch = selectedBranch => {
    setSelectedBranch(selectedBranch)
    getManager(selectedBranch.id).then(username => {
      setUser({ ...user, manager: username })
    })
  }

  const handleSubmit = async (e, user) => alert('Under construction!')

  const isAgent = () => {
    return (
      selectedPosition.value !== 'manager' && selectedPosition.value !== 'admin'
    )
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
            border-radius: 0px 7px 0 0;
          }
          .col-4 {
            padding: 0;
          }
          .row {
            background-color: white;
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
