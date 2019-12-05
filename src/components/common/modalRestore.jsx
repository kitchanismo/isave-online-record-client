import React, {useState, useEffect} from 'react'
import Select from 'react-select'
import {Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import {cap, formatDate} from '../../services/utilsService'
import auth from '../../services/authService'
import {getBranches} from '../../services/userService'

const ModalRestore = ({
	user,
	label,
	primary,
	secondary,
	modal,
	toggle,
	className,
	title,
	...rest
}) => {
	const [branches, setBranches] = useState([])
	const [branch, setBranch] = useState(null)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		setIsLoading(true)
		getBranches('/api/branches/available')
			.then(branches => {
				setBranches(branches)
				setIsLoading(false)
			})
			.catch(() => setIsLoading(false))
	}, [])

	const handleOnChange = branch => setBranch(branch)

	return (
		<Modal isOpen={modal} toggle={toggle} className={`${className}`} {...rest}>
			<ModalHeader toggle={toggle}>{title}</ModalHeader>

			<ModalBody>
				<div className='form-group'>
					<p>Username:</p>
					<p className='text-secondary'>{user.username}</p>
					<label htmlFor='branch'>Select Available Branch</label>
					<Select
						isSearchable
						isLoading={isLoading}
						value={branch}
						onChange={handleOnChange}
						options={branches}
					/>
					{!branch && (
						<p className='error-message text-danger p-1'>{`"Branch is not allowed to be empty"`}</p>
					)}
				</div>
			</ModalBody>

			<ModalFooter>
				<button
					className={`btn btn-${(primary && primary.type) || 'primary'} btn-sm`}
					name='primary'
					onClick={e => {
						if (!branch) return
						toggle(e, branch)
						setBranch(null)
					}}
				>
					{(primary && primary.label) || 'Ok'}
				</button>
				<button
					className={`btn btn-${(secondary && secondary.type) ||
						'secondary'} btn-sm`}
					name='secondary'
					onClick={e => {
						toggle(e)
						setBranch(null)
					}}
				>
					{(secondary && secondary.label) || 'Cancel'}
				</button>
			</ModalFooter>
		</Modal>
	)
}

export default ModalRestore
