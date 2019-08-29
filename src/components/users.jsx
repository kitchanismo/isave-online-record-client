import React, { useState } from 'react'
import Table from './partials/table'

const Users = props => {
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
      path: 'fullname',
      label: 'Fullname'
    },

    {
      path: 'position',
      label: 'Position'
    },
    {
      path: 'branch',
      label: 'Branch'
    },
    {
      key: 'status',
      label: 'Status',
      content: ({ status }) => (
        <span
          className={`badge badge-${
            status === 'verified' ? 'success' : 'danger'
          }`}
        >
          {status}
        </span>
      )
    },
    {
      key: 'actions',
      label: 'Actions',
      content: () => (
        <div className="row pl-2 pt-1">
          <div className="d-flex justify-content-around">
            <span className="badge badge-primary">VIEW</span>
            <span className="badge badge-warning">EDIT</span>
            <span className="badge badge-danger" name="delete">
              DELETE
            </span>
          </div>
        </div>
      )
    }
  ]

  const users = [
    {
      id: 1,
      username: 'admin',
      email: 'admin@gmail.com',
      fullname: 'juan dela cruz',
      codeNo: '353353',
      position: 'admin',
      branch: 'bacolod',
      status: 'verified'
    },
    {
      id: 2,
      username: 'cardo',
      email: 'manager@gmail.com',
      fullname: 'cardo dalisay',
      codeNo: '35445443',
      position: 'manager',
      branch: 'makati',
      status: 'verified'
    },
    {
      id: 3,
      username: 'peterpan',
      email: 'sales@gmail.com',
      fullname: 'pater pan',
      codeNo: '355443',
      position: 'sales',
      branch: 'makati',
      status: 'unverify'
    },
    {
      id: 4,
      username: 'pdfdfrpan',
      email: 'sadfs@gmail.com',
      fullname: 'patedfan',
      codeNo: '355443',
      position: 'sales',
      branch: 'makati',
      status: 'verified'
    },
    {
      id: 5,
      username: 'fgfgpan',
      email: 'sadgfs@gmail.com',
      fullname: 'patedfan',
      codeNo: '355443',
      position: 'sales',
      branch: 'makati',
      status: 'unverify'
    }
  ]

  const handleSort = () => {}

  const [sortColumn, setSortColumn] = useState({ path: 'name', order: 'asc' })

  return (
    <React.Fragment>
      <main
        role="main"
        className="dashboard col-md-9 ml-sm-auto col-lg-10 pt-3 px-4 bg-light border border-secondary"
      >
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
          <h1 className="h2">Users Management</h1>
        </div>

        <div className="col-12">
          <Table
            columns={columns}
            data={users}
            sortColumn={sortColumn}
            onSort={handleSort}
          />
          <div className="d-flex justify-content-end">
            <ul className="pagination">
              <li className="page-item disabled">
                <a className="page-link">Previous</a>
              </li>
              <li className="page-item active">
                <a className="page-link">
                  <span className="sr-only">(current)</span>1
                </a>
              </li>
              <li className="page-item">
                <a className="page-link">2</a>
              </li>
              <li className="page-item">
                <a className="page-link">3</a>
              </li>
              <li className="page-item">
                <a className="page-link">Next</a>
              </li>
            </ul>
          </div>
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
