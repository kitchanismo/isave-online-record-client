import React, { useState, useEffect } from 'react'
import Table from '../../common/table'

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
      label: 'Fullname'
    },
    {
      path: 'codeNo',
      label: 'Code Number'
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
