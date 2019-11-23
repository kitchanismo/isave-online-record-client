import React, {useState} from 'react'

const UserHelp = ({instruction}) => {
	const [toggle, setToggle] = useState(true)
	return (
		<div className='card mb-1' style={{width: 'auto'}}>
			<div className='card-body'>
				<div className='d-flex justify-content-between'>
					<h4 className='card-title'>User Records Management</h4>
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
						question: 'How to view the users account?',
						steps: ['Click the view button from the action tab.']
					})}
					{instruction({
						question: 'How to add the users account?',
						steps: [
							'Click the add button from the upper right.',
							'Fill-up the necessary information.',
							'Click add button to save.'
						]
					})}
					{instruction({
						question: 'How to edit/update the users account?',
						steps: [
							'Click the edit button from the action tab.',
							'Change the necessary information.',
							'Click update button to save.'
						]
					})}
					{instruction({
						question: 'How to active/inactive the status of users account?',
						steps: [
							'Click the active/inactive to toggle the status from status tab.'
						]
					})}
					{instruction({
						question: 'How to archive the users account?',
						steps: [
							'Inactive first the status of the user.',
							'Click the "Archive" button from the action tab.',
							'Click archive to confirm.'
						]
					})}
					{instruction({
						question: 'How to restore the archived users account?',
						steps: [
							'Click the "Restore" button from the action tab.',
							'Click restore to confirm.'
						]
					})}
				</div>
			</div>
		</div>
	)
}
export default UserHelp
