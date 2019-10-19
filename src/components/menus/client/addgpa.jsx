import React, { useState, useContext } from 'react'
import Form from '../../common/form'
import Joi from 'joi-browser'
import { toast } from 'react-toastify'
import { formatDate, joiLettersOnly } from '../../../services/utilsService'

import { ClientContext } from '../../../context'
const AddGPA = props => {
  const { onAddClient } = useContext(ClientContext)

  const [client, setClient] = useState({
    firstname: '',
    lastname: '',
    middlename: '',
    birthdate: '',
    address: '',
    contact: '',
    codeNo: '',
    gender: '',
    coverage: 0
  })

  const [selectedCoverage, setSelectedCoverage] = useState(null)
  const [selectedGender, setSelectedGender] = useState(null)
  const [errors, setErrors] = useState({})

  const schema = {
    firstname: joiLettersOnly('Firstname'),
    middlename: joiLettersOnly('Middlename'),
    lastname: joiLettersOnly('Lastname'),
    birthdate: Joi.string()
      .required()
      .label('Birthdate'),
    gender: Joi.string()
      .required()
      .label('Gender'),
    coverage: Joi.number()
      .required()
      .label('Coverage'),
    contact: Joi.optional(),
    address: Joi.optional(),
    codeNo: Joi.number()
      .required()
      .label('Code Number')
  }

  const handleChangeCoverage = coverage => setSelectedCoverage(coverage)

  const handleChangeGender = gender => setSelectedGender(gender)
  const handleSubmit = async (e, client) => {
    try {
      await onAddClient({ ...client, isGPA: true })
      toast.success('Saved')

      setClient({
        firstname: '',
        lastname: '',
        middlename: '',
        address: '',
        contact: '',
        codeNo: '',
        gender: '',
        birthdate: '',
        coverage: 0
      })
      setSelectedGender(null)
      setSelectedCoverage(null)
    } catch (error) {
      console.log(error)
    }
  }

  const genders = [
    {
      id: 1,
      label: 'Male',
      value: 'smale'
    },
    {
      id: 2,
      label: 'Female',
      value: 'female'
    }
  ]

  const coverages = [
    {
      id: 1,
      label: '1 Year',
      value: 1
    },
    {
      id: 2,
      label: '2 Years',
      value: 2
    },
    {
      id: 3,
      label: '3 Years',
      value: 3
    }
  ]
  const handleBirthdate = date => {
    setClient({
      ...client,
      birthdate: formatDate(date)
    })
  }
  return (
    <React.Fragment>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
        <h1 className="h2">GPA Form</h1>
      </div>
      <Form
        data={{ data: client, setData: setClient }}
        errors={{ errors, setErrors }}
        onSubmit={handleSubmit}
        schema={schema}
      >
        {({ renderInput, renderSelect, renderTextArea, renderDatePicker }) => {
          return (
            <div className="row">
              <div className="col-6">
                {renderInput('firstname', 'Firstname')}
                {renderInput('middlename', 'Middlename')}
                {renderInput('lastname', 'Lastname')}
                {renderSelect(
                  'gender',
                  'Gender',
                  selectedGender,
                  handleChangeGender,
                  genders
                )}
                {renderDatePicker('birthdate', 'Birthdate', {
                  onChange: handleBirthdate
                })}
                {renderInput('contact', 'Contact')}
                {renderTextArea('address', 'Address')}
              </div>

              <div className="col-6">
                {renderInput('codeNo', 'GPA No.')}

                {renderSelect(
                  'coverage',
                  'Coverage',
                  selectedCoverage,
                  handleChangeCoverage,
                  coverages
                )}
                <button className="btn btn-grad-primary btn-block" name="back">
                  Save
                </button>
                <button
                  onClick={e => {
                    e.preventDefault()
                    props.history.replace('/dashboard')
                  }}
                  className="btn btn-grad-secondary btn-block"
                  name="back"
                >
                  Back
                </button>
              </div>
            </div>
          )
        }}
      </Form>
    </React.Fragment>
  )
}

export default AddGPA
