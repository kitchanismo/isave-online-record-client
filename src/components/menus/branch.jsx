import React, { useState } from 'react'
import Joi from 'joi-browser'
import { cap } from '../../services/utilsService'
import { toast } from 'react-toastify'
import Form from './../common/form'
import { isBranchTaken, addBranch } from './../../services/userService'

const Branch = () => {
  const [branch, setBranch] = useState({ name: '', address: '', contact: '' })
  const [errors, setErrors] = useState({})

  const schema = {
    name: Joi.string()
      .required()
      .label('Name'),
    address: Joi.optional(),
    contact: Joi.optional()
  }

  const handleSubmit = async (e, data) => {
    const _errors = await handleCheckUser(e)

    if (Object.keys(_errors).length > 0) {
      setErrors(_errors)
      return
    }

    try {
      await addBranch(data)
      toast.success(`Saved`)
      setErrors({})
      setBranch({ name: '', address: '', contact: '' })
    } catch ({ response }) {
      if (response && response.status === 401) {
        toast.error(response.data.status.errors)
      }
    }
  }

  const handleCheckUser = async ({ currentTarget: input }) => {
    const { isTaken } = await isBranchTaken(input.value)

    const _errors = { ...errors }

    if (isTaken) {
      _errors[input.name] = `"${input.value}" is taken`
    }

    setErrors(_errors)

    return _errors
  }

  return (
    <React.Fragment>
      <main
        role="main"
        className="dashboard col-md-9 ml-sm-auto col-lg-10 pt-3 px-4 bg-light border border-secondary"
      >
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
          <h1 className="h2">Branch</h1>
        </div>

        <div className="row ml-2 mr-2">
          <div className="col-4 side-content"></div>
          <div className="col-8 p-4">
            <Form
              data={{ data: branch, setData: setBranch }}
              errors={{ errors, setErrors }}
              onSubmit={handleSubmit}
              schema={schema}
            >
              {({ renderInput, renderButton }) => {
                return (
                  <React.Fragment>
                    {renderInput('name', 'Name', 'name', '', {
                      onBlur: handleCheckUser
                    })}
                    {renderInput('address', 'Address', 'address')}
                    {renderInput('contact', 'Contact', 'contact')}
                    {renderButton('Add', null, 'Adding...', true)}
                  </React.Fragment>
                )
              }}
            </Form>
          </div>
        </div>

        <style jsx="">{`
          .dashboard {
            border-radius: 0px 7px 0 0;
          }
          .row {
            background-color: white;
            border-radius: 5px;
          }
          .side-content {
            background-color: #343a40;
            border-radius: 5px 0 0 5px;
          }
        `}</style>
      </main>
    </React.Fragment>
  )
}

export default Branch
