import axios from 'axios'
import { toast } from 'react-toastify'
import { apiUrl } from '../config.json'

axios.interceptors.response.use(
  response => response,
  error => {
    return throwError(error)
  }
)

axios.interceptors.request.use(config => {
  config.baseURL = process.env.API_URL || apiUrl
  return config
})

function sendJwt({ token }) {
  axios.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${token}`

    return config
  })
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  axios,
  sendJwt
}

function throwError(error) {
  if (
    error.response &&
    error.response.data.status &&
    error.response.data.status.name === 'ExpiredJwtToken'
  ) {
    toast.error('Please Logout!')
    return Promise.reject(error)
  }

  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500
  if (!expectedError) {
    toast.error('An unexpected error occurrred.')
    console.log(error)
  }

  return Promise.reject(error)

  // if (error.response && error.response.data.status.name === 'ExpiredJwtToken') {
  //   if (!isRefreshing) {
  //     isRefreshing = true
  //     axios.interceptors.request.use(config => {
  //       config.headers.Authorization = `Bearer ${localStorage.getItem(
  //         'access-token'
  //       )}`

  //       return config
  //     })
  //     axios
  //       .post('/token/refresh', {
  //         refreshToken: localStorage.getItem('refresh-token')
  //       })
  //       .then((data,x) => {
  //         console.log(data,x)
  //         // saveJwt(data.data.jwt)
  //         isRefreshing = false
  //       })
  //   }
  //   return config
  // }
}
