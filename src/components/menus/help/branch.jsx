import React, {useState} from 'react'

const UserHelp = ({instruction}) => {
	const [toggle, setToggle] = useState(true)
	return (
		<div className='card mb-1' style={{width: 'auto'}}>
			<div className='card-body'>
				<div className='d-flex justify-content-between'>
					<h4 className='card-title'>Branch Records Management</h4>
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
						question: 'How to edit/update the branch?',
						steps: [
							'Click the edit button from the action tab.',
							'Change the necessary information.',
							'Click update button to save.'
						]
					})}
					{instruction({
						question: 'How to add the branch?',
						steps: [
							'Click the add button from the upper right.',
							'Fill-up the necessary information.',
							'Click add button to save.'
						]
					})}
				</div>
			</div>
		</div>
	)
}
export default UserHelp
