import React, {useState, useEffect} from 'react'
import {toast} from 'react-toastify'
import {onBackup, getFiles, getSql} from '../../../services/databaseService'
import Help from '../../common/help'
import Spinner from '../../common/spinner'
import {theme} from '../../../config.json'
import ReactTooltip from 'react-tooltip'

import _ from 'lodash'
import {useMedia} from 'react-use'

const Backup = () => {
	const [file, setFile] = useState('')
	const isMobile = useMedia('(max-width: 600px)')
	const [isBackedUp, setIsBackedUp] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [isLoadedFiles, setIsLoadedFiles] = useState(false)
	const [files, setFiles] = useState([])

	useEffect(() => {
		fetchFiles()
		setFile(getFile())
	}, [])

	const fetchFiles = () => {
		setIsLoadedFiles(false)
		getFiles().then(files => {
			setFiles(_.sortBy(files, f => f.date).reverse())
			setIsLoadedFiles(true)
		})
	}

	const getFile = () => {
		const now = new Date(Date.now())
		const month = now.getMonth() + 1
		const year = now.getFullYear()
		const day = now.getDate()
		const time = now.getTime()

		return `${month}-${day}-${year}-${time}`
	}

	const downloadSQLFile = (sql, filename) => {
		const element = document.createElement('a')
		const file = new Blob([sql], {type: '*.sql'})
		element.href = URL.createObjectURL(file)
		element.download = `${filename}.sql`
		document.body.appendChild(element) // Required for this to work in FireFox
		element.click()
	}

	const handleBackup = e => {
		e.preventDefault()

		if (!file) return

		setIsBackedUp(true)

		onBackup(file)
			.then(() => {
				setFile(getFile())
				setIsBackedUp(false)
				toast.success('Successfully backed up!')
				fetchFiles()
			})
			.catch(e => console.log(e))
	}

	const handleDownload = file => {
		setIsLoading(true)
		getSql(file).then(sql => {
			downloadSQLFile(sql, file)

			setIsLoading(false)
		})
	}

	const filenames = files => {
		return files.map(file => (
			<li
				key={file.date}
				className={
					isMobile
						? 'list-group-item text-center'
						: 'list-group-item d-flex justify-content-center align-items-center'
				}
			>
				<a className='text-secondary'>{file.name}</a>
				<button
					disabled={isLoading}
					onClick={() => handleDownload(file.name)}
					className='btn btn-outline-info btn-sm ml-5 '
				>
					<span className='fa fa-download '></span> Download
				</button>
			</li>
		))
	}

	return (
		<React.Fragment>
			<ReactTooltip id='backup' type='info' effect='float'>
				<span>How to backup the database?</span>
				<ul className='ml-4 mt-2'>
					<li>Name the filename</li>
					<li>Click Backup</li>
					<li>Click Download</li>
				</ul>
			</ReactTooltip>
			<div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom'>
				<h1 className='h2'>Backup Database</h1>
			</div>
			<div className='row m-0 p-0'>
				<div className={isMobile ? 'col-12 p-0' : 'col-6 pr-2 m-0'}>
					<ul className='list-group mb-3 mt-2'>
						{isLoading && <p className='text-secondary'> Please wait...</p>}
						<li className='header-list  list-group-item d-flex justify-content-between align-items-center'>
							<span className='font-weight-bold'>Backup list</span>
							<span className='font-weight-bold'>Action</span>
						</li>

						<Spinner className='mt-5' isLoaded={isLoadedFiles}>
							<div className='wrapper-list'>
								{filenames(files)}
								{files.length === 0 && (
									<li className='list-group-item d-flex justify-content-between align-items-center'>
										No record/s found!
									</li>
								)}
							</div>
						</Spinner>
					</ul>
				</div>
				<div className={isMobile ? 'col-12 p-0' : 'col-6 pl-2 m-0'}>
					<form onSubmit={handleBackup}>
						<div className='form-group'>
							<label htmlFor='file'>Filename</label>
							<div className='row m-0 p-0'>
								<div className='col-11 m-0 p-0'>
									<input
										type='text'
										name='file'
										value={file}
										onChange={e => setFile(e.currentTarget.value)}
										className='form-control'
									/>
								</div>

								<div className='col-1 m-0 p-0'>
									<a
										data-tip='Generate new filename'
										onClick={() => setFile(getFile())}
										className='fa fa-refresh text-info ml-3'
									></a>
								</div>
							</div>
							<p className='error-message text-danger p-1'>
								{file ? '' : `"Filename" is not allowed to be empty!`}
							</p>
							<button
								disabled={isBackedUp}
								type='submit'
								className='btn btn-grad-primary d-flex'
							>
								{!isBackedUp ? 'BACK UP NOW' : 'BACKING UP...'}
							</button>
						</div>
					</form>
				</div>
			</div>
			<style jsx=''>{`
        .fa-download {
          margin-top: 0 !important;
        }import AddBranch from './../branch/new';

        .side-content {
          border-radius: 5px 0 0 5px;
        }
        .fa-refresh {
          cursor: pointer;
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

        .wrapper-list {
          margin: 0;
          padding: 0;
          height: 200px;
          overflow-x: hidden;
          overflow-y: auto;
        }
      `}</style>
		</React.Fragment>
	)
}

export default Backup
