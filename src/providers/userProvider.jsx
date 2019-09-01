import React, { memo } from 'react'
import usePagination from '../hooks/usePagination'
import { UserContext } from '../context'
import { pagination } from '../config.json'
import { sortBy } from '../services/utilsService'
import { getPagedUsers, deleteUser } from '../services/userService'
import {
  SET_REFRESH,
  SET_ITEMS,
  SET_PAGENUM,
  SEARCH_ITEMS,
  SET_START,
  SET_END
} from '../hooks/types'

const UserProvider = props => {
  const {
    state: { pageNum, items: users, pages, total, ...rest },
    dispatch
  } = usePagination({ request: getPagedUsers, take: pagination.perPage })

  const handleRefresh = () => {
    dispatch({ type: SET_REFRESH, payload: toggle => !toggle })
  }

  const handlePageChange = pageNum => {
    dispatch({ type: SET_PAGENUM, payload: pageNum })
  }

  const handleDelete = async user => {
    let originalUsers = [...users]

    try {
      const _users = originalUsers.filter(a => a.id !== user.id)

      dispatch({ type: SET_ITEMS, payload: _users })
      console.log('hit3', user.id)
      await deleteUser(user.id)
      return _users.length > 0
    } catch (error) {
      dispatch({ type: SET_ITEMS, payload: originalUsers })
      return originalUsers.length > 0
    }
  }

  const handleSort = sortColumn => {
    dispatch({ type: SET_ITEMS, payload: sortBy(users, sortColumn) })
  }

  const handleSearch = title => {
    dispatch({ type: SEARCH_ITEMS, payload: title })
  }

  const handleSetStart = start => {
    dispatch({ type: SET_START, payload: start })
  }

  const handleSetEnd = end => {
    dispatch({ type: SET_END, payload: end })
  }

  return (
    <UserContext.Provider
      value={{
        state: { users, pages, pageNum, total, ...rest },
        onDelete: handleDelete,
        onRefresh: handleRefresh,
        onPageChange: handlePageChange,
        onSort: handleSort,
        onSearch: handleSearch,
        onSetStart: handleSetStart,
        onSetEnd: handleSetEnd
      }}
    >
      {props.children}
    </UserContext.Provider>
  )
}

export default memo(UserProvider)
