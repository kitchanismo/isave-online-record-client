import React, { useContext, useState } from 'react'

const SearchForm = ({ handleSearch, placeholder = 'Search here' }) => {
  const [search, setSearch] = useState('')

  const handleChange = e => {
    setSearch(e.target.value)
    // handleSearch({ e, search: e.target.value })
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
          placeholder={placeholder}
        />
        <button className="btn btn-grad-primary ml-2">SEARCH</button>
        <button
          onClick={() => setSearch('')}
          className="btn btn-grad-secondary ml-2"
        >
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
