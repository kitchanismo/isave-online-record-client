import React, {useState, useEffect} from 'react'
import Form from '../../common/form'
import Joi from 'joi-browser'
import {getBranch, updateBranch} from '../../../services/userService'
import Spinner from '../../common/spinner'
import {toast} from 'react-toastify'
import {useMedia} from 'react-use'

const EditBranch = props => {
	const isMobile = useMedia('(max-width: 600px)')
	const {id} = props.match.params
	const [isLoaded, setIsLoaded] = useState(false)
	const [branch, setBranch] = useState({name: '', address: '', contact: ''})
	const [errors, setErrors] = useState({})

	useEffect(() => {
		setIsLoaded(false)
		getBranch(id).then(({branch: {name, address, contact}}) => {
			setBranch({name, address, contact})
			setIsLoaded(true)
		})
	}, [])

	const schema = {
		name: Joi.string()
			.required()
			.label('Name'),
		address: Joi.optional(),
		contact: Joi.optional()
	}

	const handleSubmit = async (e, branch) => {
		try {
			updateBranch(id, branch).then(() => props.history.replace('/branches'))
			toast.success(`Saved`)
		} catch ({response}) {
			if (response && response.status === 401) {
				toast.error(response.data.status.errors)
			}
		}
	}

	return (
		<React.Fragment>
			<div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom'>
				<span>
					<h1 className='h2'>Branch Record Management</h1>
					<h5 className='text-secondary'>Edit Branch</h5>
				</span>
			</div>
			<Spinner isLoaded={isLoaded} className='spinner'>
				<div className={isMobile ? 'col-12 m-0 p-0' : 'col-6 offset-3'}>
					<Form
						data={{data: branch, setData: setBranch}}
						errors={{errors, setErrors}}
						onSubmit={handleSubmit}
						schema={schema}
					>
						{({renderInput, renderButton, renderTextArea}) => {
							return (
								<React.Fragment>
									{renderInput('name', 'Name', 'name', '')}
									{renderTextArea('address', 'Address', 'address')}
									{renderInput('contact', 'Contact', 'contact')}
									{renderButton('UPDATE', null, 'Updating...', true)}
								</React.Fragment>
							)
						}}
					</Form>
					<button
						onClick={e => {
							e.preventDefault()
							props.history.replace('/branches')
						}}
						className='btn btn-grad-secondary btn-block mt-3'
						name='back'
					>
						Back
					</button>
				</div>
			</Spinner>
			<style jsx=''>{`
				.spinner {
					margin-top: 200px;
				}
			`}</style>
		</React.Fragment>
	)
}

export default EditBranch
