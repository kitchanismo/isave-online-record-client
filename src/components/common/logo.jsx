import React from 'react'
import infomatech from '../../img/infomatech.png'
const Logo = props => {
  return (
    <React.Fragment>
      <div className="row m-0" {...props}>
        <img className="logo pt-5 px-3" src={infomatech}></img>
      </div>
      <style jsx="">{`
        .logo {
          width: 100%;
          height: 100%;
          border-radius: 5px 0 0 0;
        }
      `}</style>
    </React.Fragment>
  )
}

export default Logo
