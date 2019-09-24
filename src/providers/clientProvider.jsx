import React, { useEffect, useState } from 'react'
import { ClientContext } from '../context'
import {
  getStatus,
  addClient,
  approved,
  cancelled,
  retrieved,
  enforced
} from '../services/clientService'
//import useClient from '../hooks/useClient'

const ClientProvider = props => {
  const [status, setStatus] = useState({})

  useEffect(() => {
    getStatus().then(status => setStatus(status))
  }, [])

  const handleAddClient = async client => {
    await addClient(client)
    setStatus(await getStatus())
  }

  const handleApproved = async (id, codeNo) => {
    await approved(id, codeNo)
    setStatus(await getStatus())
  }
  const handleCancelled = async id => {
    await cancelled(id)
    setStatus(await getStatus())
  }
  const handleRetrieved = async id => {
    await retrieved(id)
    setStatus(await getStatus())
  }

  const handleEnforced = async client => {
    await enforced(client)
    setStatus(await getStatus())
  }

  return (
    <ClientContext.Provider
      value={{
        status,
        onAddClient: handleAddClient,
        onApproved: handleApproved,
        onCancelled: handleCancelled,
        onRetrieved: handleRetrieved,
        onEnforced: handleEnforced
      }}
    >
      {props.children}
    </ClientContext.Provider>
  )
}

export default ClientProvider
