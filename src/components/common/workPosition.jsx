import React, { useState } from 'react'

const WorkPosition = props => {
  const [hasChoosen, setHasChoosen] = useState(false)
  const [isForManager, setForManager] = useState(true)

  if (hasChoosen) return props.children({ isForManager })

  return (
    <React.Fragment>
      <div className="work-position col-6 offset-3 p-4 border border-warning mt-5">
        <h2>Sign-up for</h2>
        <br></br>
        <button
          className="btn btn-primary btn-block"
          onClick={() => {
            setHasChoosen(true)
            setForManager(true)
          }}
        >
          MANAGER
        </button>

        <button
          className="btn btn-primary btn-block"
          onClick={() => {
            setHasChoosen(true)
            setForManager(false)
          }}
        >
          AGENT
        </button>
        <style jsx="">{`
          .work-position {
            border-radius: 7px;
            height: 200px;
            background-color: white;
          }
        `}</style>
      </div>
    </React.Fragment>
  )
}

export default WorkPosition
