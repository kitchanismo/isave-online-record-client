import React, { useState, useContext, useEffect, useRef } from 'react'
import Table from '../../common/table'
import useReport from '../../../hooks/useReport'
import { sortBy } from '../../../services/utilsService'
import { NavLink } from 'react-router-dom'
import { formatDate } from '../../../services/utilsService'
import { restoreUser } from '../../../services/userService'
import { ClientContext } from '../../../context'
import EnforcedModal from '../../common/modalEnforced'
import ApprovedModal from '../../common/modalApproved'
import Spinner from '../../common/spinner'
import auth from '../../../services/authService'
import TablePrint from '../../common/tablePrint'
import CustomModal from '../../common/modal'
import Select from 'react-select'
import ReactToPrint from 'react-to-print'

const Reports = props => {
  const [search, setSearch] = useState('')

  const [gender, setGender] = useState(null)

  const { name = '' } = props.match.params

  const [sortColumn, setSortColumn] = useState({ path: 'name', order: 'asc' })

  const { reports, setReports, setRefresh, isLoaded } = useReport(
    name,
    new URLSearchParams(props.location.search).get('search'),
    gender ? gender.value : ''
  )

  useEffect(() => {
    setSearch('')
    //setGender(null)
  }, [name])

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
        <div>
          <button
            onClick={() => props.history.replace(`/clients/show/${client.id}`)}
            className="btn btn-sm btn-outline-info ml-1"
          >
            VIEW
          </button>

          {!auth.canAccess('promo','admin','general')&& (
            <React.Fragment>
              <button
                onClick={() =>
                  props.history.replace(`/clients/edit/fs/${client.id}`)
                }
                className="btn btn-sm btn-outline-warning ml-1"
              >
                EDIT
              </button>

              <button
                onClick={e => {
                  onCancelled(client.id).then(data => setRefresh(r => !r))
                }}
                className="btn btn-sm btn-outline-danger ml-1"
                name="delete"
              >
                CANCELLED
              </button>
            </React.Fragment>
          )}
        </div>
      )
    }
  ]

  const forApprovalCol = [
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
      key: 'actions',
      label: 'Actions',
      content: client => (
        <button
          onClick={e => {
            setClient(client)
            toggleApproved(e)
          }}
          className="btn btn-sm btn-outline-success"
          name="delete"
        >
          APPROVED
        </button>
      )
    }
  ]

  const lapsedCol = [
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
        
            <button
              onClick={e => {
                setClient(client)
                toggleEnforced(e)
              }}
              className="btn btn-sm btn-outline-success"
              name="delete"
            >
              ENFORCED
            </button>
        
      )
    }
  ]

  const dueCol = [
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
      key: 'notify',
      path: 'isDue',
      label: 'Notify',
      content: client => {
        return client.isDue === 1 ? (
          <span className="fa fa-check text-info" />
        ) : (
          <span className="fa fa-close text-danger" />
        )
      }
    },
    {
      key: 'actions',
      label: 'Actions',
      content: client => (
      
          <button
            onClick={e => {
              setClient(client)
              toggleEnforced(e)
            }}
            className="btn btn-sm btn-outline-success"
            name="delete"
          >
            ENFORCED
          </button>
      
      )
    }
  ]

  const nearExpirationCol = [
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
      key: 'notify',
      path: 'isNear',
      label: 'Notify',
      content: client => {
        return client.isNear === 1 ? (
          <span className="fa fa-check text-info" />
        ) : (
          <span className="fa fa-close text-danger" />
        )
      }
    }
  ]

  const cancelledCol = [
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
        <button
          onClick={e => {
            onRetrieved(client.id).then(data => setRefresh(r => !r))
          }}
          className="btn btn-sm btn-outline-success ml-1"
          name="delete"
        >
          RETRIEVED
        </button>
      )
    }
  ]

  const gpaCol = [
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
    },
    {
      key: 'actions',
      label: 'Actions',
      content: client => (
        <button
          onClick={() =>
            props.history.replace(`/clients/edit/gpa/${client.id}`)
          }
          className="btn btn-sm btn-outline-warning ml-1"
        >
          EDIT
        </button>
      )
    }
  ]

  const archivedCol = [
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
        <button
          onClick={e => {
            setUser(user)
            setModalRestore(modalRestore => !modalRestore)
          }}
          className="btn btn-sm btn-outline-primary ml-1"
        >
          RESTORE
        </button>
      )
    }
  ]

  const logsCol = [
    {
      path: 'user.profile.firstname',
      label: 'Fullname',
      content: ({ user }) => {
        return user
          ? `${user.profile.firstname}, ${user.profile.lastname} ${user.profile.middlename}`
          : ''
      }
    },
    {
      path: 'user.position',
      label: 'Position'
    },
    {
      path: 'dateTimeIn',
      label: 'Logged In',
      content: log => new Date(log.dateTimeIn).toLocaleString()
    },
    {
      path: 'dateTimeOut',
      label: 'Logged Out',
      content: log => getLogStatus(log)
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
      case 'due':
        return dueCol
      case 'cancelled':
        return cancelledCol
      case 'near-expiration':
        return nearExpirationCol
      case 'gpa':
        return gpaCol
      case 'user-archived':
        return archivedCol
      case 'user-logs':
        return logsCol
      default:
        break
    }
  }

  const getLogStatus = log => {
    if (log.dateTimeOut) {
      return new Date(log.dateTimeOut).toLocaleString()
    }

    const now = new Date(Date.now())
    const login = new Date(log.dateTimeIn)
    const days = now.getDate() - login.getDate()

    if (days > 0) {
      return 'session expired'
    }
    return 'active'
  }

  // const getDuration = dateIn => {
  //   const now = new Date(Date.now())
  //   const logIn = new Date(dateIn)
  //   const hours = now.getHours() - logIn.getHours()
  //   const minutes = now.getMinutes() - logIn.getMinutes()
  //   const seconds = now.getSeconds() - logIn.getSeconds()

  //   return `${hours}:${minutes}:${seconds}`
  // }

  const preparedColumns = () => {
    if (!auth.canAccess('promo','admin','general')) return columns()

    const _columns = [...columns()]

    if (name === 'enforced') return _columns

    return name === 'user-archived'
      ? archivedCol
      : _columns.filter(c => c.key !== 'actions')
  }

  const printColums = () => {
    const _columns = [...preparedColumns()]

    return _columns.filter(c => c.key !== 'notify' && c.key !== 'actions')
  }

  const title = () => {
    switch (name) {
      case 'enforced':
        return 'Enforced Policy'
      case 'for-approval':
        return 'For Approval'
      case 'lapsed':
        return 'Lapsed Policy'
      case 'due':
        return 'Due Policy'
      case 'cancelled':
        return 'Cancelled Policy'
      case 'near-expiration':
        return 'Near Expiration'
      case 'gpa':
        return 'Group Personal Accident'
      case 'user-archived':
        return 'View Archived'
      case 'user-logs':
        return 'View Logs'
      default:
        return ''
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
        label={`Are you sure to enforce ${client.firstname}?`}
        primary={{ type: 'primary', label: 'CONFIRM' }}
      />
    )
  }

  const [modalApproved, setModalApproved] = useState(false)

  const toggleApproved = (e, _client) => {
    setModalApproved(modal => !modal)
    if (e.target && e.target.name === 'primary') {
      onApproved(client.id, _client).then(data => {
        setClient(null)
        setRefresh(r => !r)
      })
    }
  }

  const renderModalApproved = () => {
    return (
      <ApprovedModal
        client={client}
        title="Cocolife"
        modal={modalApproved}
        toggle={toggleApproved}
        primary={{ type: 'primary', label: 'CONFIRM' }}
      />
    )
  }

  const [modalRestore, setModalRestore] = useState(false)

  const [user, setUser] = useState(null)

  const toggleRestore = e => {
    setModalRestore(modalRestore => !modalRestore)
    if (e.target && e.target.name === 'primary') {
      restoreUser(user.id).then(data => {
        setRefresh(r => !r)
        setUser(null)
      })
    }
  }

  const renderModalRestore = () => {
    return (
      <CustomModal
        title="Cocolife"
        modal={modalRestore}
        toggle={toggleRestore}
        label={`Are you sure to restore ${user.username}?`}
        primary={{ type: 'primary', label: 'RESTORE' }}
      />
    )
  }

  const handleSearch = ({ e, search }) => {
    e.preventDefault()

    setSearch(search)
    props.history.replace('/clients/' + name + '?search=' + search)
    setRefresh(r => !r)
  }

  const genders = [
    {
      id: 1,
      label: 'Male',
      value: 'male'
    },
    {
      id: 2,
      label: 'Female',
      value: 'female'
    }
  ]

  const handleChangeGender = gender => setGender(gender)

  const componentRef = useRef()
  return (
    <React.Fragment>
      {client && renderModalEnforced(client)}
      {renderModalApproved()}
      {user && renderModalRestore()}
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
        <span className="m-0 p-0">
          <h1 className="h2">{`${
            name.match(/user.*/) ? 'User' : 'Client'
          } Record Management`}</h1>
          <h5 className="text-secondary">{title()}</h5>
        </span>

        {reports.length > 0 && (
          <ReactToPrint
            trigger={() => (
              <button className="btn btn-sm btn-grad-primary ">
                <span className="fa fa-print mr-1"></span>
                PRINT PREVIEW
              </button>
            )}
            content={() => componentRef.current}
          />
        )}
      </div>
      {name !== 'user-archived' &&
        (name !== 'user-logs' && (
          <React.Fragment>
            {/* <SearchForm
            handleSearch={handleSearch}
            search={search}
            setSearch={setSearch}
            onRefresh={() => {
              setSearch('')
              setGender(null)
            }}
          /> */}
            <form onSubmit={e => handleSearch({ e, search })}>
              <div className="col-6 m-0 p-0">
                <input
                  type={'text'}
                  name={search}
                  value={search}
                  onChange={e => {
                    setSearch(e.target.value)
                  }}
                  className="form-control"
                  placeholder="Search here..."
                />
              </div>
              <div className="col-3 m-0 py-0 pl-2">
                <Select
                  placeholder="Filter gender..."
                  isClearable
                  value={gender}
                  onChange={handleChangeGender}
                  options={genders}
                />
              </div>
              <div className="col-3 m-0 p-0  d-flex justify-content-end">
                <button className="btn btn-grad-primary ml-2">SEARCH</button>
                <button
                  onClick={() => {
                    setSearch('')
                    setGender(null)
                  }}
                  className="btn btn-grad-secondary ml-2"
                >
                  REFRESH
                </button>
              </div>
            </form>
            <style jsx="">{`
              form {
                display: flex;
              }
              .btn-search {
                width: 15%;
              }
            `}</style>
            <div className="offset-9 col-3 p-0 mt-2"></div>
          </React.Fragment>
        ))}

      <div className="wrapper-client mt-2">
        <Spinner isLoaded={isLoaded} className="spinner mt-5 pt-5">
          <Table
            columns={preparedColumns()}
            data={reports}
            sortColumn={sortColumn}
            onSort={handleSort}
          />
          <div style={{ display: 'none' }}>
            <TablePrint
              title={title()}
              ref={componentRef}
              columns={printColums()}
              data={reports}
            />
          </div>
        </Spinner>
        {isLoaded && reports.length === 0 && (
          <h6 className="mt-2 mb-5">No records found!</h6>
        )}
      </div>

      <style jsx="">{`
        .fa-print,
        .fa-check,
        .fa-close {
          margin-top: 0 !important;
        }

        .wrapper-client {
          margin: 0;
          padding: 0;
          height: 550px;
          overflow-x: hidden;
          overflow-y: auto;
        }
      `}</style>
    </React.Fragment>
  )
}

export default Reports
