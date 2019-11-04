import React, { useState, useEffect } from 'react'

import { getUnverifyUser } from '../services/userService'
import auth from '../services/authService'

export default () => {
  const [unverify, setUnverify] = useState(0)
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    if (!auth.isValidUser()) return
    getUnverifyUser().then(u => setUnverify(u))
  }, [refresh])
  return { unverify, setRefresh, setUnverify }
}
