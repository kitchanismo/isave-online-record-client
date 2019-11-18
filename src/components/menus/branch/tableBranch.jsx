import React, { useState, useEffect } from 'react'
import Table from '../../common/table'
import { NavLink } from 'react-router-dom'

import { sortBy, toElipse } from '../../../services/utilsService'

const TableBranch = ({ branches, setBranches, ...props }) => {
  const [sortColumn, setSortColumn] = useState({ path: 'name', order: 'asc' })

  const _branches = () =>
    branches.map(b => {
      b.address = toElipse(b.address, 15)
      b.manager = b.manager !== null ? toElipse(b.manager, 10) : b.manager
      return b
    })

  const handleSort = sortColumn => {
    setSortColumn(sortColumn)
    setBranches(sortBy(branches, sortColumn))
  }

  const columns = [
    {
      path: 'id',
      label: '#'
    },
    {
      path: 'name',
      label: 'Name'
    },
    {
      path: 'manager',
      label: 'Manager'
    },

    {
      path: 'address',
      label: 'Address'
    },
    {
      path: 'contact',
      label: 'Contact'
    },
    {
      key: 'actions',
      label: 'Action',
      content: branch => (
        <button
          onClick={() => props.history.replace(`/branches/edit/${branch.id}`)}
          className="btn btn-sm btn-outline-warning ml-1"
        >
          EDIT
        </button>
      )
    }
  ]

  return (
    <Table
      columns={columns}
      data={_branches()}
      sortColumn={sortColumn}
      onSort={handleSort}
    />
  )
}

export default TableBranch
