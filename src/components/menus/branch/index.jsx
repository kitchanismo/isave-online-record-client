import React, {useState} from 'react'
import Joi from 'joi-browser'
import {toast} from 'react-toastify'
import AddBranch from './new'
import TableBranch from './tableBranch'
import useBranches from '../../../hooks/useBranches'
import Spinner from './../../common/spinner'

const Branch = props => {
	const {branches, setRefresh, setBranches, isLoaded} = useBranches()

	return (
		<React.Fragment>
			<div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom'>
				<h1 className='h2'>Branch Record Management</h1>
				<button
					onClick={() => props.history.replace('/branches/new')}
					className='btn btn-sm btn-grad-primary ml-1'
				>
					<span className='fa fa-plus mr-1'></span>
					BRANCH
				</button>
			</div>

			<div className='row mb-4'>
				<div className='col-12 side-content pt-2'>
					<Spinner isLoaded={isLoaded} className='spinner'>
						<TableBranch
							{...props}
							branches={branches}
							setBranches={setBranches}
						/>
					</Spinner>
				</div>
			</div>

			<style jsx=''>{`
				.side-content {
					border-radius: 5px 0 0 5px;
				}
				.spinner {
					margin-top: 200px;
				}
				.fa-plus {
					margin-top: 0 !important;
				}
			`}</style>
		</React.Fragment>
	)
}

export default Branch
