import React, {useState} from 'react'
import {Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import {cap} from '../../services/utilsService'

const PostInsentiveModal = ({
	profile,
	label,
	primary,
	secondary,
	modal,
	toggle,
	className,
	title,
	...props
}) => {
	const [prize, setPrize] = useState(0)

	return (
		<Modal isOpen={modal} toggle={toggle} className={`${className}`} {...props}>
			<ModalHeader toggle={toggle}>{title}</ModalHeader>

			<ModalBody>
				<label htmlFor='name'>Employee Name</label>
				<p className='text-secondary'>{`${cap(profile.lastname)}, ${cap(
					profile.firstname
				)} ${cap(profile.middlename)}`}</p>
				<div className='form-group'>
					<label htmlFor='prize'>Prize Reward</label>
					<div className='input-group mb-2'>
						<div className='input-group-prepend'>
							<div className='input-group-text px-2'>₱</div>
						</div>
						<input
							name='prize'
							id='prize'
							onChange={e => {
								if (isNaN(+e.target.value)) return

								setPrize(+e.target.value)
							}}
							value={prize}
							className='form-control'
						/>{' '}
					</div>
					{!prize && (
						<p className='error-message text-danger p-1'>{`"Prize Rewards" is not allowed to be empty`}</p>
					)}
				</div>
			</ModalBody>

			<ModalFooter>
				<button
					className={`btn btn-${(primary && primary.type) || 'primary'} btn-sm`}
					name='primary'
					onClick={e => {
						if (!prize) return
						toggle(e, prize)
						setPrize(0)
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
						setPrize(0)
					}}
				>
					{(secondary && secondary.label) || 'Cancel'}
				</button>
			</ModalFooter>
		</Modal>
	)
}

export default PostInsentiveModal
