import React, {useState} from 'react'

const ClientHelp = ({instruction}) => {
	const [toggle, setToggle] = useState(true)
	return (
		<div className='card mb-1' style={{width: 'auto'}}>
			<div className='card-body'>
				<div className='d-flex justify-content-between'>
					<h4 className='card-title'>Client Records Management</h4>
					<a
						onClick={() => setToggle(!toggle)}
						className={`fa fa-${toggle ? 'plus' : 'minus'} ml-3 text-info`}
					></a>
				</div>
				<div
					style={{display: toggle ? 'none' : ''}}
					className='wrapper-help ml-2 p-0'
				>
					<hr></hr>

					{instruction({
						question: 'How to add clients on FSP?',
						steps: [
							'To add new client you need to input client information needed.',
							'Click the box if the new client is for approval.',
							'If the client is not for approval uncheck the box “for approval”and input the date on when the client’s insured.',
							'Click the save button to save the client information.'
						]
					})}
					{instruction({
						question: 'How to add clients on GPA?',
						steps: [
							'To add new client you need to input client information needed.',
							'Click the save button to save the client information.'
						]
					})}
					{instruction({
						question: 'How to edit/update clients?',
						steps: [
							'Click the “Edit” button to edit the information.',
							'Click “Update” button to save the information.'
						]
					})}
					{instruction({
						question: 'How to approve clients?',
						steps: [
							'Click the "Approved" button',
							'Fill up the policy number and date insured',
							'Click "Confirm" to save.'
						]
					})}
					{instruction({
						question: 'How to enforce a due/lapsed policy of a client?',
						steps: [
							'Click the "Enforced" button',
							'Select Mode of Payment',
							'Click "Confirm" to save.'
						]
					})}
					{instruction({
						question: 'How to cancel a policy of a client?',
						steps: ['Click the "Cancelled" button', 'Click "Confirm" to save.']
					})}

					{instruction({
						question: 'How to retrive a policy of a client?',
						steps: ['Click the "Retrived" button', 'Click "Confirm" to save.']
					})}
				</div>
			</div>
		</div>
	)
}
export default ClientHelp
