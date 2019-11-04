import React, { useState, useEffect } from 'react'
import { getUser } from './../../../services/userService'
import { cap } from '../../../services/utilsService'
import { appUrl } from '../../../config.json'
import Spinner from '../../common/spinner'

const ViewUser = props => {
  const { id } = props.match.params
  const [user, setUser] = useState({
    username: '',
    profile: {
      firstname: '',
      middlename: '',
      lastname: '',
      branch: { manager: '' }
    }
  })

  useEffect(() => {
    getUser(id)
      .then(data => {
        setUser(data)
      })
      .catch(() => props.history.replace('/not-found'))
  }, [])

  const isAgent = () => {
    return user.position !== 'manager' && user.position !== 'admin'
  }
  return (
    <React.Fragment>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
        <h1 className="h2">User Overview</h1>
      </div>
      <Spinner isLoaded={user.username !== ''} className="spinner">
        <div className="row mb-3">
          <div className="col-4 pr-0">
            <div className="card" style={{ width: 'auto' }}>
              {/* <img
                style={{
                  padding: '10%',
                  backgroundColor: '#343a40',
                  height: '303px'
                }}
                src={`${appUrl}/user.png`}
                className="card-img-top"
                alt=""
              /> */}
              <div className="card-body">
                <h5 className="card-title">{`${cap(
                  user.profile.lastname
                )}, ${cap(user.profile.firstname)} ${cap(
                  user.profile.middlename
                )}`}</h5>
                <p className="card-subtitle">{cap(user.username)}</p>
                <span
                  className={`mt-4 badge badge-${
                    user.status === 1 ? 'success' : 'danger'
                  }`}
                >
                  {user.status === 1 ? 'active' : 'unverify'}
                </span>
              </div>
            </div>
          </div>
          <div className="col-8">
            <div className="card" style={{ width: 'auto' }}>
              <div className="card-body">
                <h5 className="card-title">Personal Details</h5>
                <br></br>
                <p className="card-subtitle">
                  Firstname:{' '}
                  <span className="text-secondary">
                    {cap(user.profile.firstname)}
                  </span>
                </p>
                <br></br>
                <p className="card-subtitle">
                  Middlename:{' '}
                  <span className="text-secondary">
                    {cap(user.profile.middlename)}
                  </span>
                </p>
                <br></br>
                <p className="card-subtitle">
                  Lastname:{' '}
                  <span className="text-secondary">
                    {cap(user.profile.lastname)}
                  </span>
                </p>
                <br></br>
                <p className="card-subtitle">
                  Email:{' '}
                  <span className="text-secondary">{user.profile.email}</span>
                </p>
              </div>
            </div>
            <div className="card mt-3" style={{ width: 'auto' }}>
              <div className="card-body">
                <h5 className="card-title">Employment Details</h5>
                <br></br>
                <p className="card-subtitle">
                  Position:{'   '}
                  <span className="text-secondary">{cap(user.position)}</span>
                </p>
                <br></br>
                <p className="card-subtitle">
                  Branch:{'   '}
                  <span className="text-secondary">
                    {cap(user.profile.branch ? user.profile.branch.name : '')}
                  </span>
                </p>
                <br></br>
                <p className="card-subtitle">
                  Code Number:{'   '}
                  <span className="text-secondary">
                    {cap(user.profile.codeNo)}
                  </span>
                </p>
                <br></br>
                {isAgent() && (
                  <p className="card-subtitle">
                    Under by:{'   '}
                    <span className="text-secondary">
                      {cap(user.profile.branch.manager)}
                    </span>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </Spinner>
      <style jsx="">{`
        .spinner {
          margin-top: 200px;
          margin-bottom: 200px;
        }
      `}</style>
    </React.Fragment>
  )
}

export default ViewUser
