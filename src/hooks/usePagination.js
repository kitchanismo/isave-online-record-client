import { useEffect, useReducer } from 'react'
import { toast } from 'react-toastify'
import { pagination } from '../config.json'

import {
  SET_ITEMS,
  SET_PAGENUM,
  SET_PAGES,
  SET_TOTAL,
  SET_REFRESH,
  SEARCH_ITEMS,
  SET_START,
  SET_END,
  SET_NOT_FOUND,
  SET_STATUS,
  SET_UNVERIFY
} from './types'

const reducer = (state, action) => {
  const { payload, type } = action
  switch (type) {
    case SET_PAGENUM:
      return { ...state, pageNum: payload }
    case SET_ITEMS:
      return { ...state, items: payload }
    case SET_PAGES:
      return { ...state, pages: payload }
    case SET_TOTAL:
      return { ...state, total: payload }
    case SET_START:
      return { ...state, start: payload }
    case SET_END:
      return { ...state, end: payload }
    case SET_REFRESH:
      return { ...state, toggle: payload }
    case SEARCH_ITEMS:
      return { ...state, title: payload }
    case SET_NOT_FOUND:
      return { ...state, notFound: payload }
    case SET_STATUS:
      return { ...state, status: payload }
    case SET_UNVERIFY:
      return { ...state, unverify: payload }
    default:
      return state
  }
}

const usePagination = ({
  request,
  data = 'data',
  pages = 'lastPage',
  total = 'total',
  take = 15
}) => {
  const initialState = {
    items: [],
    pageNum: 1,
    status: null,
    unverify: 0,
    pages: 0,
    total: 0,
    take,
    toggle: false,
    start: 1,
    end: pagination.pageNumbers,
    notFound: false
  }
  const [{ toggle, title, status, pageNum, ...rest }, dispatch] = useReducer(
    reducer,
    initialState
  )

  useEffect(() => {
    request(pageNum, take, title, status)
      .then(response => {
        dispatch({ type: SET_ITEMS, payload: response[data] })
        dispatch({ type: SET_PAGES, payload: response[pages] })
        dispatch({ type: SET_TOTAL, payload: response[total] })
        dispatch({ type: SET_UNVERIFY, payload: response['unverify'] })
        dispatch({ type: SET_NOT_FOUND, payload: false })
      })
      .catch(({ response }) => {
        if (response && response.status === 404) {
          dispatch({ type: SET_ITEMS, payload: [] })
          dispatch({ type: SET_PAGES, payload: 0 })
          dispatch({ type: SET_PAGENUM, payload: 1 })
          dispatch({ type: SET_NOT_FOUND, payload: true })
          dispatch({ type: SET_UNVERIFY, payload: 0 })
        }
      })
  }, [toggle, title, pageNum, status])

  useEffect(() => {
    dispatch({ type: SET_ITEMS, payload: [] })
  }, [title, pageNum])

  return {
    state: { toggle, status, pageNum, take, ...rest },
    dispatch
  }
}

export default usePagination
