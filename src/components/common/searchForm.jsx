import React, { useContext, useState } from 'react'

const SearchForm = ({ handleSearch, search, setSearch, onRefresh }) => {
  const handleChange = e => {
    setSearch(e.target.value)
  }

  return (
    <React.Fragment>
      <form onSubmit={e => handleSearch({ e, search })}>
        <input
          type={'text'}
          name={search}
          value={search}
          onChange={handleChange}
          className="form-control"
          placeholder="Search here..."
        />

        <button className="btn btn-grad-primary ml-2">SEARCH</button>
        <button onClick={onRefresh} className="btn btn-grad-secondary ml-2">
          REFRESH
        </button>
      </form>
      <style jsx="">{`
        form {
          display: flex;
        }
        .btn-search {
          width: 15%;
        }
      `}</style>
    </React.Fragment>
  )
}

export default SearchForm
