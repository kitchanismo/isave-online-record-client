import React, { useState, useContext } from 'react'
import Table from '../../common/table'
import useClient from '../../../hooks/useClient'
import { sortBy } from '../../../services/utilsService'
import { Link } from 'react-router-dom'
import { formatDate } from './../../../services/utilsService'
import { ClientContext } from '../../../context'
import EnforcedModal from '../../common/modalEnforced'
import ApprovedModal from '../../common/modalApproved'

const Reports = props => {
  let name = new URLSearchParams(props.location.search).get('name')

  const [sortColumn, setSortColumn] = useState({ path: 'name', order: 'asc' })

  const { clients, setClients, setRefresh } = useClient(name)

  const [client, setClient] = useState(null)

  const { onApproved, onCancelled, onRetrieved, onEnforced } = useContext(
    ClientContext
  )

  const handleSort = sortColumn => {
    setSortColumn(sortColumn)
    setClients(sortBy(clients, sortColumn))
  }

  const enforcedCol = [
    {
      path: 'id',
      label: '#'
    },
    {
      path: 'client.firstname',
      label: 'Fullname',
      content: client =>
        `${client.firstname}, ${client.lastname} ${client.middlename}`
    },
    {
      path: 'codeNo',
      label: 'Code Number'
    },
    {
      path: 'mode',
      label: 'Mode of Payment'
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
            <Link to={`/clients/${client.id}`}>
              <button className="btn btn-sm btn-outline-primary ml-1">
                VIEW
              </button>
            </Link>
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
      path: 'client.firstname',
      label: 'Fullname',
      content: client =>
        `${client.firstname}, ${client.lastname} ${client.middlename}`
    },
    {
      path: 'mode',
      label: 'Mode of Payment'
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
            <Link to={`/clients/${client.id}`}>
              <button className="btn btn-sm btn-outline-primary ml-1">
                VIEW
              </button>
            </Link>

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
      path: 'client.firstname',
      label: 'Fullname',
      content: client =>
        `${client.firstname}, ${client.lastname} ${client.middlename}`
    },
    {
      path: 'mode',
      label: 'Mode of Payment'
    },
    {
      path: 'dateInsured',
      label: 'Date Insured',
      content: client => formatDate(client.dateInsured)
    },
    {
      path: 'expiredDate',
      label: 'Date Expire',
      content: client => formatDate(client.expiredDate)
    },
    {
      key: 'actions',
      label: 'Actions',
      content: client => (
        <div className="row pl-1 pt-1 pr-1">
          <div className="d-flex justify-content-between">
            <Link to={`/clients/${client.id}`}>
              <button className="btn btn-sm btn-outline-primary ml-1">
                VIEW
              </button>
            </Link>

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
      path: 'client.firstname',
      label: 'Fullname',
      content: client =>
        `${client.firstname}, ${client.lastname} ${client.middlename}`
    },
    {
      path: 'mode',
      label: 'Mode of Payment'
    },
    {
      path: 'dateInsured',
      label: 'Date Insured',
      content: client => formatDate(client.dateInsured)
    },
    {
      path: 'expiredDate',
      label: 'Date Expire',
      content: client => formatDate(client.expiredDate)
    },
    {
      key: 'actions',
      label: 'Actions',
      content: client => (
        <div className="row pl-1 pt-1 pr-1">
          <div className="d-flex justify-content-between">
            <Link to={`/clients/${client.id}`}>
              <button className="btn btn-sm btn-outline-primary ml-1">
                VIEW
              </button>
            </Link>
          </div>
        </div>
      )
    }
  ]

  const cancelledCol = [
    {
      path: 'id',
      label: '#'
    },
    {
      path: 'client.firstname',
      label: 'Fullname',
      content: client =>
        `${client.firstname}, ${client.lastname} ${client.middlename}`
    },
    {
      path: 'codeNo',
      label: 'Code Number'
    },
    {
      path: 'mode',
      label: 'Mode of Payment'
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
            <Link to={`/clients/${client.id}`}>
              <button className="btn btn-sm btn-outline-primary ml-1">
                VIEW
              </button>
            </Link>

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
      path: 'client.firstname',
      label: 'Fullname',
      content: client =>
        `${client.firstname}, ${client.lastname} ${client.middlename}`
    },
    ,
    {
      path: 'codeNo',
      label: 'Policy #'
    },
    {
      path: 'coverage',
      label: 'Coverage'
    },
    {
      key: 'actions',
      label: 'Actions',
      content: client => (
        <div className="row pl-1 pt-1 pr-1">
          <div className="d-flex justify-content-between">
            <Link to={`/clients/${client.id}`}>
              <button className="btn btn-sm btn-outline-primary ml-1">
                VIEW
              </button>
            </Link>
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
    <main
      role="main"
      className="dashboard col-md-9 ml-sm-auto col-lg-10 pt-3 px-4 bg-light border border-secondary"
    >
      {client && renderModalEnforced(client)}
      {renderModalApproved()}
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
        <h1 className="h2">{title()}</h1>
        <button className="btn btn-sm btn-outline-success">
          <span className="fa fa-print mr-1"></span>
          PRINT
        </button>
      </div>

      <Table
        columns={columns()}
        data={clients}
        sortColumn={sortColumn}
        onSort={handleSort}
      />
      <style jsx="">{`
        .dashboard {
          border-radius: 0px 7px 0 0;
        }
        .fa-print {
          margin-top: 0 !important;
        }
      `}</style>
    </main>
  )
}

export default Reports
