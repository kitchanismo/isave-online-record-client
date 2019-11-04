import React, { useEffect, memo } from 'react'
import SideMenu from './sideMenu'
import Dashboard from './menus/dashboard/index'
import AddFS from './menus/client/addFs'
import AddGPA from './menus/client/addgpa'
import Branch from './menus/branch/index'
import { toast } from 'react-toastify'
import Users from './menus/users/index'
import Reports from './menus/reports/index'
import Footer from './common/footer'
import UserProvider from '../providers/userProvider'
import ClientProvider from '../providers/clientProvider'
import ViewUser from './menus/users/view'
import Me from './menus/profile/me'
import EditProfile from './menus/profile/edit'
import EditUser from './menus/users/edit'
import NewUser from './menus/users/new'
import EditBranch from './menus/branch/edit'
import NewBranch from './menus/branch/new'
import EditClient from './menus/client/edit'
import EditGPA from './menus/client/editgpa'
const Home = ({ menu, sub, ...props }) => {
  return (
    <React.Fragment>
      <UserProvider>
        <ClientProvider>
          <div className="container-fluid">
            <div
              className="row"
              style={{ backgroundColor: 'transparent', minHeight: '800px' }}
            >
              <SideMenu>
                <main
                  role="main"
                  className="dashboard col-md-9 ml-sm-auto col-lg-10 pt-3 px-4 bg-light border border-secondary"
                >
                  {menu === 'dashboard' && (
                    <React.Fragment>
                      {sub === 'newFs' && <AddFS {...props} />}
                      {sub === 'newGPA' && <AddGPA {...props} />}
                      {sub === 'editGPA' && <EditGPA {...props} />}
                      {!sub && <Dashboard {...props} />}
                    </React.Fragment>
                  )}
                  {menu === 'profile' && (
                    <React.Fragment>
                      {sub === 'me' && <Me {...props} />}
                      {sub === 'edit' && <EditProfile {...props} />}
                      {!sub && <Dashboard {...props} />}
                    </React.Fragment>
                  )}
                  {menu === 'branches' && (
                    <React.Fragment>
                      {sub === 'editBranch' && <EditBranch {...props} />}
                      {sub === 'newBranch' && <NewBranch {...props} />}
                      {!sub && <Branch {...props} />}
                    </React.Fragment>
                  )}
                  {menu === 'users' && (
                    <React.Fragment>
                      {sub === 'viewUser' && <ViewUser {...props} />}
                      {sub === 'editUser' && <EditUser {...props} />}
                      {sub === 'newUser' && <NewUser {...props} />}
                      {!sub && <Users {...props} />}
                    </React.Fragment>
                  )}
                  {menu === 'reports' && <Reports {...props} />}

                  {menu === 'clients' && <EditClient {...props} />}
                </main>
              </SideMenu>

              <Footer></Footer>
            </div>
          </div>
        </ClientProvider>
      </UserProvider>
      <style jsx="">{`
        .dashboard {
          border-radius: 5px px 0 0;
        }
       
      `}</style>
    </React.Fragment>
  )
}

export default Home
