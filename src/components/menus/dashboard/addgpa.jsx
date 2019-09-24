import React, { useState, useContext } from 'react'
import Form from '../../common/form'
import Joi from 'joi-browser'
import { toast } from 'react-toastify'

import { ClientContext } from './../../../context'
const AddGPA = () => {
  const { onAddClient } = useContext(ClientContext)

  const [client, setClient] = useState({
    firstname: '',
    lastname: '',
    middlename: '',
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
    firstname: Joi.string()
      .required()
      .label('Firstname'),
    middlename: Joi.string()
      .required()
      .label('Middlename'),
    lastname: Joi.string()
      .required()
      .label('Lastname'),
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

  return (
    <main
      role="main"
      className="dashboard col-md-9 ml-sm-auto col-lg-10 pt-3 px-4 bg-light border border-secondary"
    >
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
        <h1 className="h2">GPA Form</h1>
      </div>
      <Form
        data={{ data: client, setData: setClient }}
        errors={{ errors, setErrors }}
        onSubmit={handleSubmit}
        schema={schema}
      >
        {({ renderInput, renderSelect, renderTextArea }) => {
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
              </div>
            </div>
          )
        }}
      </Form>
    </main>
  )
}

export default AddGPA
