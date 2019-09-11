import React, { useState } from 'react'
import Form from '../../common/form'
import Joi from 'joi-browser'

const AddClient = () => {
  const [client, setClient] = useState({
    firstname: '',
    lastname: '',
    middlename: ''
  })
  const [errors, setErrors] = useState({})

  const schema = {
    firstname: Joi.string()
      .required()
      .label('firstname'),
    middlename: Joi.string()
      .required()
      .label('Middlename'),
    lastname: Joi.string()
      .required()
      .label('Lastname')
  }

  const handleSubmit = async (e, data) => {
    alert('under construction')
  }

  return (
    <Form
      data={{ data: client, setData: setClient }}
      errors={{ errors, setErrors }}
      onSubmit={handleSubmit}
      schema={schema}
    >
      {({ renderInput }) => {
        return (
          <React.Fragment>
            <div className="col-12 pt-0 p-2 pr-5 ">
              {renderInput('firstname', 'Firstname')}
              {renderInput('middlename', 'Middlename')}
              {renderInput('lastname', 'Lastname')}
              <button className="btn btn-grad-primary btn-block" name="back">
                Add Client
              </button>
            </div>
          </React.Fragment>
        )
      }}
    </Form>
  )
}

export default AddClient
