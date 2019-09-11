import React from 'react'

import Charts from './charts'
import withAuth from '../../hoc/withAuth'
import { cap } from './../../../services/utilsService'
import AddClient from './addClient'

const Dashboard = ({ auth }) => {
  const { position } = auth.getCurrentUser()

  const isSales = position === 'sales'
  return (
    <React.Fragment>
      <main
        role="main"
        className="dashboard col-md-9 ml-sm-auto col-lg-10 pt-3 px-4 bg-light border border-secondary"
      >
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
          <h1 className="h2">Dashboard</h1>
        </div>
        <div className="row">
          <div
            className={
              isSales
                ? 'col-8 offset-2 d-flex justify-content-center mt-3'
                : 'col-6'
            }
          >
            <Charts dimension={isSales ? '600' : '400'}></Charts>
          </div>
          {!isSales && (
            <div className="col-6">
              <AddClient />
            </div>
          )}
        </div>

        <style jsx="">{`
          .dashboard {
            border-radius: 0px 7px 0 0;
          }
        `}</style>
      </main>
    </React.Fragment>
  )
}

export default withAuth(Dashboard)
