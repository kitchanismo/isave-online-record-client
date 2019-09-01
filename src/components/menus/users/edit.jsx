import React, { useState, useEffect } from 'react'
import Joi from 'joi-browser'
import {
  getBranches,
  getManagers,
  getUser
} from '../../../services/userService'
import { toast } from 'react-toastify'
import { cap } from '../../../services/utilsService'
import withAuth from '../../hoc/withAuth'
import Form from './../../common/form'

const EditUser = ({ auth, ...props }) => {
  const { id } = props.match.params
  const [user, setUser] = useState({
    username: '',
    email: '',
    firstname: '',
    middlename: '',
    lastname: '',
    codeNo: ''
  })

  useEffect(() => {
    getUser(id).then(user => {
      setUser({
        username: user.username,
        email: user.email,
        firstname: user.firstname,
        middlename: user.middlename,
        lastname: user.lastname,
        codeNo: user.codeNo
      })
      getManagers(user.branch.id).then(managers => {
        setManagers(managers)
      })
      getBranches().then(branches => {
        setBranches(branches)
      })
      setSelectedPosition({
        id: user.position === 'sales officer' ? 1 : 2,
        value: user.position,
        label: cap(user.position)
      })
      setSelectedBranch({
        id: user.branch.id,
        value: user.branch.name,
        label: cap(user.branch.name)
      })
      setSelectedManager({
        id: user.agent ? user.agent.id : 0,
        value: user.agent ? user.agent.manager : '',
        label: user.agent ? cap(user.agent.manager) : ''
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
  const [managers, setManagers] = useState([])

  const [selectedPosition, setSelectedPosition] = useState([])
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

  const handleSubmit = async (e, user) => alert('Under construction!')

  const isAgent = () => {
    console.log(selectedPosition)
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
                      renderSelect(
                        'manager',
                        'Manager',
                        selectedManager,
                        handleChangeManager,
                        managers
                      )}
                  </div>
                  <div className="col-6 pl-3 pr-5 pt-4">
                    {renderInput('username', 'Username', 'text', 'fa-user')}
                    {renderInput('email', 'Email', 'email', 'fa-envelope')}
                    {renderButton('Update', null, 'Updating...', true)}

                    <p className="text-primary p-2 ">
                      *Note: Only admin can update the other managers account
                    </p>
                  </div>
                </div>
              </React.Fragment>
            )
          }}
        </Form>

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
        `}</style>
      </main>
    </React.Fragment>
  )
}

export default withAuth(EditUser)
