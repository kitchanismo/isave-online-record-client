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
      await addBranch(data)
      toast.success(`Saved`)
      onRefresh(refresh => !refresh)
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
    <Form
      data={{ data: branch, setData: setBranch }}
      errors={{ errors, setErrors }}
      onSubmit={handleSubmit}
      schema={schema}
    >
      {({ renderInput, renderButton, renderTextArea }) => {
        return (
          <React.Fragment>
            {renderInput('name', 'Name', 'name', '', {
              onBlur: handleCheckUser
            })}
            {renderTextArea('address', 'Address', 'address')}
            {renderInput('contact', 'Contact', 'contact')}
            {renderButton('Add', null, 'Adding...', true)}
          </React.Fragment>
        )
      }}
    </Form>
  )
}

export default AddBranch
