import React, { useState } from 'react'
import Joi from 'joi-browser'
import { cap } from '../../../services/utilsService'
import { toast } from 'react-toastify'
import Form from '../../common/form'
import { isBranchTaken, addBranch } from '../../../services/userService'

const AddBranch = ({ onRefresh, ...props }) => {
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
      addBranch(data).then(() => props.history.replace('/branches'))
      toast.success(`Saved`)
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
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
        <span>
          <h1 className="h2">Branch Record Management</h1>
          <h5 className="text-secondary">Add New Branch</h5>
        </span>
      </div>
      <div className="col-6 offset-3">
        <Form
          data={{ data: branch, setData: setBranch }}
          errors={{ errors, setErrors }}
          onSubmit={handleSubmit}
          schema={schema}
        >
          {({ renderInput, renderButton, renderTextArea }) => {
            return (
              <React.Fragment>
                {renderInput('name', 'Name', 'name', '')}
                {renderTextArea('address', 'Address', 'address')}
                {renderInput('contact', 'Contact', 'contact')}
                {renderButton('ADD', null, 'Adding...', true)}
              </React.Fragment>
            )
          }}
        </Form>
        <button
          onClick={e => {
            e.preventDefault()
            props.history.replace('/branches')
          }}
          className="btn btn-grad-secondary btn-block mt-3"
          name="back"
        >
          Back
        </button>
      </div>

      <style jsx="">{`
        .spinner {
          margin-top: 200px;
        }
      `}</style>
    </React.Fragment>
  )
}

export default AddBranch
