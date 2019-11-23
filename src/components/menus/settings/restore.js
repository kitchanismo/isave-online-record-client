import React, {useEffect, useState} from 'react'
import {getFiles, onRestore} from '../../../services/databaseService'
import {theme} from '../../../config.json'
import {toast} from 'react-toastify'
import auth from '../../../services/authService'
import _ from 'lodash'

const Restore = props => {
	const [files, setFiles] = useState([])
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		getFiles().then(files => {
			setFiles(_.sortBy(files, f => f.date).reverse())
		})
	}, [])

	const handleRestore = file => {
		setIsLoading(true)
		onRestore(file)
			.then(() => {
				auth.logout()
				setIsLoading(false)
			})
			.catch(e => {
				auth.logout()
				setIsLoading(false)
			})
	}

	const filenames = files => {
		return files.map(file => (
			<li
				key={file.date}
				className='list-group-item d-flex justify-content-between align-items-center'
			>
				<a className='text-secondary'>{file.name}</a>
				<button
					disabled={isLoading}
					onClick={() => handleRestore(file.name)}
					className='btn btn-outline-info btn-sm ml-5'
				>
					Restore
				</button>
			</li>
		))
	}
	return (
		<React.Fragment>
			<div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom'>
				<h1 className='h2'>Restore Database</h1>
			</div>

			<div className='col-6 p-0 m-0'>
				<ul className='list-group mb-3'>
					{isLoading && <p className='text-secondary'> Please wait...</p>}
					<li className='header-list  list-group-item d-flex justify-content-between align-items-center'>
						<span className='font-weight-bold'>Restore Point</span>
						<span className='font-weight-bold'>Action</span>
					</li>

					{filenames(files)}

					{files.length === 0 && (
						<li className='list-group-item d-flex justify-content-between align-items-center'>
							No record/s found!
						</li>
					)}
				</ul>
			</div>

			<style jsx=''>{`
				.list-group {
					width: 400px !important;
				}

				.side-content {
					border-radius: 5px 0 0 5px;
				}
				.link-policy {
					color: ${theme.secondary};
					cursor: pointer;
				}
				.header-list {
					background-color: ${theme.secondary};
					border-color: ${theme.secondary};
					color: white;
				}
			`}</style>
		</React.Fragment>
	)
}

export default Restore
