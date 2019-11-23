import React, {useContext, useState} from 'react'
import {useMedia} from 'react-use'

const SearchForm = ({handleSearch, search, setSearch, onRefresh}) => {
	const isMobile = useMedia('(max-width: 600px)')
	const handleChange = e => {
		setSearch(e.target.value)
	}

	return (
		<React.Fragment>
			<form onSubmit={e => handleSearch({e, search})}>
				<input
					type={'text'}
					name={search}
					value={search}
					onChange={handleChange}
					className='form-control'
					placeholder='Search here...'
				/>

				<button
					type='submit'
					className={`btn btn-grad-primary  ${
						isMobile ? 'btn-block mt-2' : 'ml-2'
					}`}
				>
					SEARCH
				</button>
				<button
					onClick={onRefresh}
					className={`btn btn-grad-secondary  ${
						isMobile ? 'btn-block' : 'ml-2'
					}`}
				>
					REFRESH
				</button>
			</form>
			<style jsx=''>{`
				form {
					display: ${isMobile ? 'block' : 'flex'};
				}
				.btn-search {
					width: 15%;
				}
			`}</style>
		</React.Fragment>
	)
}

export default SearchForm
