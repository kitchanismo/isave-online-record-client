import React, { useState, useContext, useEffect } from 'react'
import Table from '../../common/table'
import { UserContext } from '../../../context'
import Paginate from '../../common/paginate'
import CustomModal from '../../common/modal'
import { verifyUser } from '../../../services/userService'
import SearchForm from '../../common/searchForm'
import { pagination } from '../../../config.json'
import { Link } from 'react-router-dom'
import Spinner from '../../common/spinner'

const Users = props => {
  const {
    state: { total, users, pageNum, start, end, notFound, statusCount },
    onDelete,
    onRefresh,
    onPageChange,
    onSort,
    onSearch,
    onSetStart,
    onSetEnd
  } = useContext(UserContext)

  const [selectedUser, setSelectedUser] = useState({})

  const [sortColumn, setSortColumn] = useState({ path: 'name', order: 'asc' })

  const columns = [
    {
      path: 'id',
      label: '#'
    },
    {
      path: 'username',
      label: 'Username'
    },
    {
      path: 'lastname',
      key: 'fullname',
      label: 'Fullname',
      content: user =>
        `${user.profile.firstname}, ${user.profile.middlename} ${user.profile.lastname}`
    },

    {
      path: 'position',
      label: 'Position'
    },
    {
      path: 'profile.branch.name',
      label: 'Branch'
    },
    {
      path: 'profile.codeNo',
      key: 'codeNo',
      label: 'Code #',
      content: ({ profile }) => profile.codeNo
    },
    {
      path: 'status',
      key: 'status',
      label: 'Status',
      content: ({ status, ...user }) => (
        <span
          onClick={async e => {
            if (status === 1) return
            setSelectedUser(user)
            await toggle(e)
          }}
          className={`badge badge-${status === 1 ? 'success' : 'danger'}`}
        >
          {status === 1 ? 'active' : 'unverify'}
        </span>
      )
    },
    {
      key: 'actions',
      label: 'Actions',
      content: user => (
        <div className="row pl-1 pt-1 pr-1">
          <div className="d-flex justify-content-around">
            <Link to={`/users/${user.id}`}>
              <button className="btn btn-sm btn-outline-primary ml-1">
                VIEW
              </button>
            </Link>
            <Link to={`/users/edit/${user.id}`}>
              <button className="btn btn-sm btn-outline-warning ml-1">
                EDIT
              </button>
            </Link>
            <button
              onClick={e => {
                setSelectedUser(user)
                toggleDelete(e).then(data => data)
              }}
              className="btn btn-sm btn-outline-danger ml-1"
              name="delete"
            >
              ARCHIVE
            </button>
          </div>
        </div>
      )
    }
  ]

  const [modal, setModal] = useState(false)

  const toggle = async ({ target }) => {
    setModal(modal => !modal)

    if (target && target.name === 'primary') {
      await verifyUser(selectedUser.id)
      setSelectedUser({})
      onRefresh()
    }
  }

  const [modalDelete, setModalDelete] = useState(false)

  const toggleDelete = async ({ target }) => {
    setModalDelete(modalDelete => !modalDelete)
    if (target && target.name === 'primary') {
      console.log(selectedUser)
      await doDelete(selectedUser)
      setSelectedUser({})
      onRefresh()
    }
  }

  const renderModal = () => {
    return (
      <CustomModal
        title="iSave"
        modal={modal}
        toggle={toggle}
        label={`Activate ${selectedUser.username}?`}
        primary={{ type: 'primary', label: 'CONFIRM' }}
      />
    )
  }

  const renderModalDelete = () => {
    return (
      <CustomModal
        title="iSave"
        modal={modalDelete}
        toggle={toggleDelete}
        label={`Archive ${selectedUser.username}?`}
        primary={{ type: 'danger', label: 'ARCHIVE' }}
      />
    )
  }

  const doDelete = async user => {
    if (!(await onDelete(user))) {
      onPageChange(pageNum - 1)
      if (start > 1) {
        onSetStart(start - 1)
      }
      onSetEnd(end - 1)
      return
    }
    onRefresh()
  }

  const handleSort = sortColumn => {
    onSort(sortColumn)
    setSortColumn(sortColumn)
  }

  const handleSearch = async ({ e, search }) => {
    e.preventDefault()
    // if (!search) return
    onSetStart(1)
    onSetEnd(pagination.pageNumbers)
    onPageChange(1)
    onSearch(search)
  }

  return (
    <React.Fragment>
      {renderModal()}
      {renderModalDelete()}
      <main
        role="main"
        className="dashboard col-md-9 ml-sm-auto col-lg-10 pt-3 px-4 bg-light border border-secondary"
      >
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
          <h1 className="h2">Users Management</h1>
          {/* <span className="h6">
            Total:
            <span className="h6 text-secondary">{total}</span>
          </span>
          <span className="h6">
            Active:
            <span className="h6 text-secondary">{statusCount.active}</span>
          </span>
          <span className="h6 ">
            Unverify:
            <span className="h6 text-secondary">{statusCount.unverify}</span>
          </span> */}
        </div>

        <div className="col-12">
          <div className="mb-3">
            <SearchForm handleSearch={handleSearch} placeholder="Search here" />
          </div>

          <Table
            columns={columns}
            data={users}
            sortColumn={sortColumn}
            onSort={handleSort}
          />
          {users.length === 0 && !notFound && (
            <div className="col-12 d-flex justify-content-center pt-5 ">
              <Spinner />
            </div>
          )}
          {notFound && <h6>No records found!</h6>}
          {users.length > 0 && <Paginate />}
        </div>

        <style jsx="">{`
          .dashboard {
            border-radius: 0px 7px 0 0;
          }
          .col-4 {
            padding: 0;
          }
          .badge {
            cursor: pointer;
            margin-right: 2px !important;
          }
        `}</style>
      </main>
    </React.Fragment>
  )
}

export default Users
