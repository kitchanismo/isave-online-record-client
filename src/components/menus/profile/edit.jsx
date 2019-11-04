import React, { useState, useEffect, useContext } from 'react'
import Joi from 'joi-browser'
import { getMe, editUser } from '../../../services/userService'
import { toast } from 'react-toastify'
import { joiLettersOnly } from '../../../services/utilsService'
import withAuth from '../../hoc/withAuth'
import Form from './../../common/form'
import Spinner from './../../common/spinner'

const EditUser = ({ auth, ...props }) => {
  const [user, setUser] = useState({
    id: '',
    username: '',
    email: '',
    firstname: '',
    middlename: '',
    lastname: '',
    password: ''
  })
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(false)
    getMe().then(({ profile, username, position, id }) => {
      setUser({
        id,
        username,
        email: profile.email,
        firstname: profile.firstname,
        middlename: profile.middlename,
        lastname: profile.lastname
      })
      setIsLoaded(true)
    })
    // .catch(() => props.history.replace('/not-found'))
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
    firstname: joiLettersOnly('Firstname'),
    middlename: joiLettersOnly('Middlename'),
    lastname: joiLettersOnly('Lastname'),
    id: Joi.optional(),
    password: Joi.optional()
  }
  const handleSubmit = async (
    e,
    { username, email, password, firstname, middlename, lastname, id }
  ) => {
    const user = {
      id,
      username,
      password,
      profile: {
        firstname,
        middlename,
        lastname,
        email
      }
    }

    try {
      await editUser(user.id, user)

      toast.success('Updated!')

      setErrors(errors)

      props.history.replace('/profile/me')
    } catch ({ response }) {
      if (response && response.status === 400) {
        toast.error(response.data.status.errors[0].message)
      }
    }
  }

  return (
    <React.Fragment>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
        <h1 className="h2">Edit Profile</h1>
      </div>

      <Spinner isLoaded={isLoaded} className="spinner">
        <Form
          data={{ data: user, setData: setUser }}
          errors={{ errors, setErrors }}
          onSubmit={handleSubmit}
          schema={schema}
        >
          {({ renderInput, renderButton }) => {
            return (
              <React.Fragment>
                <div className="row m-1">
                  <div className="col-6 pl-5 pr-3 pt-4">
                    {renderInput('firstname', 'Firstname')}
                    {renderInput('middlename', 'Middlename')}
                    {renderInput('lastname', 'Lastname')}
                  </div>
                  <div className="col-6 pl-3 pr-5 pt-4">
                    {renderInput('username', 'Username', 'text', 'fa-user')}
                    {renderInput('email', 'Email', 'email', 'fa-envelope')}
                    {renderInput(
                      'password',
                      'New Password',
                      'password',
                      'fa-key'
                    )}
                    {renderButton('Update', null, 'Updating...', true)}

                    <button
                      onClick={e => {
                        e.preventDefault()
                        props.history.replace('/profile/me')
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
