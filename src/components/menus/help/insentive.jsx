import React, {useState} from 'react'

const InsentiveHelp = ({instruction}) => {
	const [toggle, setToggle] = useState(true)
	return (
		<div className='card mb-1' style={{width: 'auto'}}>
			<div className='card-body'>
				<div className='d-flex justify-content-between'>
					<h4 className='card-title'>Sales Performance Incentive Funds</h4>
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
						question: 'How to add an incentive?',
						steps: [
							'Click the add button from the upper right.',
							'Select categories by year, month and position.',
							'Click Generate Employee.',
							'Show the list of employees from top to bottom based on client count.',
							'Click post to select from list the desire employee to have an incentive.',
							'Enter the prize rewards of employee.'
						]
					})}
					{instruction({
						question: 'How to delete an incentive?',
						steps: [
							'Click the "Delete" button from the action tab.',
							'Click the "Confirm" button to confirm'
						]
					})}
				</div>
			</div>
		</div>
	)
}
export default InsentiveHelp
