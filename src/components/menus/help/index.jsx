import React, {Component} from 'react'
import UserHelp from './user'
import BranchHelp from './branch'
import ClientHelp from './client'
import SettingHelp from './setting'
import InsentiveHelp from './insentive'
import auth from '../../../services/authService'
import {useMedia} from 'react-use'

const Help = () => {
	const isMobile = useMedia('(max-width: 600px)')

	const instruction = ({question, steps}) => (
		<React.Fragment>
			<h5 className='card-title'>{question}</h5>
			<ul className={`ml-${isMobile ? '3' : '5'}`}>
				{steps.map((step, i) => (
					<li key={i}>
						<p className='card-subtitle mt-1'>{step}</p>{' '}
					</li>
				))}
			</ul>
		</React.Fragment>
	)
	return (
		<React.Fragment>
			<div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom'>
				<h1 className='h2'>Help and Support</h1>
			</div>
			<div className='row mb-3'>
				<div className={isMobile ? 'col-12' : 'col-8 offset-2'}>
					{!auth.canAccess('promo', 'sales') && (
						<UserHelp instruction={instruction}></UserHelp>
					)}
					{auth.canAccess('admin', 'general') && (
						<BranchHelp instruction={instruction}></BranchHelp>
					)}
					<ClientHelp instruction={instruction}></ClientHelp>
					{auth.canAccess('admin') && (
						<SettingHelp instruction={instruction}></SettingHelp>
					)}
					{auth.canAccess('admin', 'general') && (
						<InsentiveHelp instruction={instruction}></InsentiveHelp>
					)}
				</div>
			</div>
			<style jsx=''>{`
				.fa-plus,
				.fa-minus {
					cursor: pointer;
				}
			`}</style>
		</React.Fragment>
	)
}

export default Help
