import React, {useState} from 'react'

const SettingHelp = ({instruction}) => {
	const [toggle, setToggle] = useState(true)
	return (
		<div className='card mb-1' style={{width: 'auto'}}>
			<div className='card-body'>
				<div className='d-flex justify-content-between'>
					<h4 className='card-title'>Settings</h4>
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
						question: 'How to backup the database?',
						steps: [
							'Name the filename.',
							'Click "Backup" button',
							'Click Download button to save the sql file.'
						]
					})}
					{instruction({
						question: 'SMS Notification Setting',
						steps: [
							'Toggle the switch to on and off the sms.',
							'Code is used to send a message to sms service(itexmo)'
						]
					})}
				</div>
			</div>
		</div>
	)
}
export default SettingHelp
