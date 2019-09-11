import React, { useState, useEffect } from 'react'

import { getBranches } from '../services/userService'

export default () => {
  const [branches, setBranches] = useState([])
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    getBranches('/api/branches', true).then(branches => setBranches(branches))
  }, [refresh])
  return { branches, setRefresh, setBranches }
}
