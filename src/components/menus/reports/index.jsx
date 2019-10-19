import React, { useState, useContext, useEffect } from 'react'
import Table from '../../common/table'
import useReport from '../../../hooks/useReport'
import { sortBy } from '../../../services/utilsService'
import { Link } from 'react-router-dom'
import { formatDate } from './../../../services/utilsService'
import { restoreUser } from './../../../services/userService'
import { ClientContext } from '../../../context'
import EnforcedModal from '../../common/modalEnforced'
import ApprovedModal from '../../common/modalApproved'
import Spinner from './../../common/spinner'

const Reports = props => {
  //let name = new URLSearchParams(props.location.search).get('name')
  const { name } = props.match.params

  const [sortColumn, setSortColumn] = useState({ path: 'name', order: 'asc' })

  const { reports, setReports, setRefresh, isLoaded } = useReport(name)

  const [client, setClient] = useState(null)

  const { onApproved, onCancelled, onRetrieved, onEnforced } = useContext(
    ClientContext
  )

  const handleSort = sortColumn => {
    setSortColumn(sortColumn)
    setReports(sortBy(reports, sortColumn))
  }

  const calculateAge = date => {
    if (!date) return 'N/A'
    const birthdate = new Date(formatDate(date))

    const ageDif = Date.now() - birthdate.getTime()
    const ageDate = new Date(ageDif)
    return Math.abs(ageDate.getUTCFullYear() - 1970)
  }

  const enforcedCol = [
    {
      path: 'id',
      label: '#'
    },
    {
      path: 'firstname',
      label: 'Fullname',
      content: client =>
        `${client.firstname}, ${client.lastname} ${client.middlename}`
    },
    {
      path: 'birthdate',
      label: 'Age',
      content: client => calculateAge(client.birthdate)
    },
    {
      path: 'gender',
      label: 'Gender'
    },
    {
      path: 'codeNo',
      label: 'Code Number'
    },
    {
      path: 'mode',
      label: 'Mode'
    },
    {
      path: 'dateInsured',
      label: 'Date Insured',
      content: client => formatDate(client.dateInsured)
    },
    {
      key: 'actions',
      label: 'Actions',
      content: client => (
        <div className="row pl-1 pt-1 pr-1">
          <div className="d-flex justify-content-between">
            <Link to={`/clients/edit/${client.id}`}>
              <button className="btn btn-sm btn-outline-warning ml-1">
                EDIT
              </button>
            </Link>
            <button
              onClick={e => {
                onCancelled(client.id).then(data => setRefresh(r => !r))
              }}
              className="btn btn-sm btn-outline-danger ml-1"
              name="delete"
            >
              CANCELLED
            </button>
          </div>
        </div>
      )
    }
  ]

  const forApprovalCol = [
    {
      path: 'id',
      label: '#'
    },
    {
      path: 'firstname',
      label: 'Fullname',
      content: client =>
        `${client.firstname}, ${client.lastname} ${client.middlename}`
    },
    {
      path: 'mode',
      label: 'Mode'
    },
    {
      path: 'dateInsured',
      label: 'Date Insured',
      content: client => formatDate(client.dateInsured)
    },
    {
      key: 'actions',
      label: 'Actions',
      content: client => (
        <div className="row pl-1 pt-1 pr-1">
          <div className="d-flex justify-content-between">
            <button
              onClick={e => {
                setClient(client)
                toggleApproved(e)
              }}
              className="btn btn-sm btn-outline-success ml-1"
              name="delete"
            >
              APPROVED
            </button>
          </div>
        </div>
      )
    }
  ]

  const lapsedCol = [
    {
      path: 'id',
      label: '#'
    },
    {
      path: 'firstname',
      label: 'Fullname',
      content: client =>
        `${client.firstname}, ${client.lastname} ${client.middlename}`
    },
    {
      path: 'birthdate',
      label: 'Age',
      content: client => calculateAge(client.birthdate)
    },

    {
      path: 'gender',
      label: 'Gender'
    },
    {
      path: 'mode',
      label: 'Mode'
    },
    {
      path: 'dateInsured',
      label: 'Date Insured',
      content: client => formatDate(client.dateInsured)
    },
    {
      path: 'expiredDate',
      label: 'Due Date',
      content: client => formatDate(client.expiredDate)
    },
    {
      key: 'actions',
      label: 'Actions',
      content: client => (
        <div className="row pl-1 pt-1 pr-1">
          <div className="d-flex justify-content-between">
            <button
              onClick={e => {
                setClient(client)
                toggleEnforced(e)
              }}
              className="btn btn-sm btn-outline-success ml-1"
              name="delete"
            >
              ENFORCED
            </button>
          </div>
        </div>
      )
    }
  ]

  const nearExpirationCol = [
    {
      path: 'id',
      label: '#'
    },
    {
      path: 'firstname',
      label: 'Fullname',
      content: client =>
        `${client.firstname}, ${client.lastname} ${client.middlename}`
    },
    {
      path: 'birthdate',
      label: 'Age',
      content: client => calculateAge(client.birthdate)
    },
    {
      path: 'gender',
      label: 'Gender'
    },
    {
      path: 'mode',
      label: 'Mode'
    },
    {
      path: 'dateInsured',
      label: 'Date Insured',
      content: client => formatDate(client.dateInsured)
    },
    {
      path: 'expiredDate',
      label: 'Due Date',
      content: client => formatDate(client.expiredDate)
    }
  ]

  const cancelledCol = [
    {
      path: 'id',
      label: '#'
    },
    {
      path: 'firstname',
      label: 'Fullname',
      content: client =>
        `${client.firstname}, ${client.lastname} ${client.middlename}`
    },

    {
      path: 'birthdate',
      label: 'Age',
      content: client => calculateAge(client.birthdate)
    },
    {
      path: 'gender',
      label: 'Gender'
    },
    {
      path: 'codeNo',
      label: 'Code Number'
    },
    {
      path: 'mode',
      label: 'Mode'
    },
    {
      path: 'dateInsured',
      label: 'Date Insured',
      content: client => formatDate(client.dateInsured)
    },
    {
      key: 'actions',
      label: 'Actions',
      content: client => (
        <div className="row pl-1 pt-1 pr-1">
          <div className="d-flex justify-content-between">
            <button
              onClick={e => {
                onRetrieved(client.id).then(data => setRefresh(r => !r))
              }}
              className="btn btn-sm btn-outline-success ml-1"
              name="delete"
            >
              RETRIEVED
            </button>
          </div>
        </div>
      )
    }
  ]

  const gpaCol = [
    {
      path: 'id',
      label: '#'
    },
    {
      path: 'firstname',
      label: 'Fullname',
      content: client =>
        `${client.firstname}, ${client.lastname} ${client.middlename}`
    },
    {
      path: 'birthdate',
      label: 'Age',
      content: client => calculateAge(client.birthdate)
    },
    {
      path: 'gender',
      label: 'Gender'
    },
    {
      path: 'codeNo',
      label: 'Policy #'
    },
    {
      path: 'coverage',
      label: 'Coverage(Year)'
    }
  ]

  const archivedCol = [
    {
      path: 'id',
      label: '#'
    },
    {
      path: 'username',
      label: 'Username'
    },
    {
      path: 'profile.lastname',
      key: 'fullname',
      label: 'Fullname',
      content: user =>
        user.profile
          ? `${user.profile.firstname}, ${user.profile.middlename} ${user.profile.lastname}`
          : ''
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
      content: ({ profile }) => (profile ? profile.codeNo : '')
    },
    {
      key: 'actions',
      label: 'Actions',
      content: user => (
        <div className="row pl-1 pt-1 pr-1">
          <div className="d-flex justify-content-around">
            <button
              onClick={() =>
                restoreUser(user.id).then(data => setRefresh(r => !r))
              }
              className="btn btn-sm btn-outline-primary ml-1"
            >
              RESTORE
            </button>
          </div>
        </div>
      )
    }
  ]

  const columns = () => {
    switch (name) {
      case 'enforced':
        return enforcedCol
      case 'for-approval':
        return forApprovalCol
      case 'lapsed':
        return lapsedCol

      case 'cancelled':
        return cancelledCol
      case 'near-expiration':
        return nearExpirationCol
      case 'gpa':
        return gpaCol
      case 'user-archived':
        return archivedCol
      default:
        break
    }
  }

  const title = () => {
    switch (name) {
      case 'enforced':
        return 'Enforced Policy'
      case 'for-approval':
        return 'For Approval'
      case 'lapsed':
        return 'Lapsed Policy'

      case 'cancelled':
        return 'Cancelled Policy'
      case 'near-expiration':
        return 'Near Expiration'
      case 'gpa':
        return 'GPA'
      case 'user-archived':
        return 'User Archived'
      default:
        return 'Reports'
    }
  }

  const [modalEnforced, setModalEnforced] = useState(false)

  const toggleEnforced = (e, client) => {
    setModalEnforced(modal => !modal)
    if (e.target && e.target.name === 'primary') {
      onEnforced(client).then(data => {
        setRefresh(r => !r)
        setClient(null)
      })
    }
  }

  const renderModalEnforced = client => {
    return (
      <EnforcedModal
        client={client}
        title="Cocolife"
        modal={modalEnforced}
        toggle={toggleEnforced}
        label={`Enforce ${client.firstname}?`}
        primary={{ type: 'primary', label: 'CONFIRM' }}
      />
    )
  }

  const [modalApproved, setModalApproved] = useState(false)

  const toggleApproved = (e, codeNo) => {
    setModalApproved(modal => !modal)
    if (e.target && e.target.name === 'primary') {
      onApproved(client.id, codeNo).then(data => {
        setClient(null)
        setRefresh(r => !r)
      })
    }
  }

  const renderModalApproved = () => {
    return (
      <ApprovedModal
        title="Cocolife"
        modal={modalApproved}
        toggle={toggleApproved}
        primary={{ type: 'primary', label: 'CONFIRM' }}
      />
    )
  }

  return (
    <React.Fragment>
      {client && renderModalEnforced(client)}
      {renderModalApproved()}
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
        <h1 className="h2">{title()}</h1>
        <button className="btn btn-sm btn-grad-secondary ">
          <span className="fa fa-print mr-1"></span>
          PRINT
        </button>
      </div>
      <div className="wrapper-client">
        <Spinner isLoaded={isLoaded} className="spinner mt-5 pt-5">
          <Table
            columns={columns()}
            data={reports}
            sortColumn={sortColumn}
            onSort={handleSort}
          />
          {isLoaded && reports.length === 0 && (
            <h6 className="mt-2 mb-5">No records found!</h6>
          )}
        </Spinner>
      </div>
      <style jsx="">{`
        .fa-print {
          margin-top: 0 !important;
        }
        .wrapper-client {
          margin: 0;
          padding: 0;
          height: 550px;
          overflow-y: auto;
          overflow-x: hidden;
        }
      `}</style>
    </React.Fragment>
  )
}

export default Reports
