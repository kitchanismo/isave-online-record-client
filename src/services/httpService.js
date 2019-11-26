import axios from 'axios'
import {toast} from 'react-toastify'

axios.interceptors.response.use(
	response => response,
	error => {
		return throwError(error)
	}
)

const getAPIUrl = () => {
	return process.env.NODE_ENV === 'development'
		? 'http://127.0.0.1:3333'
		: 'https://isave-online-record.herokuapp.com'
}

axios.interceptors.request.use(config => {
	config.baseURL = getAPIUrl()
	return config
})

function sendJwt({token}) {
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
	toast.dismiss()
	if (
		error.response &&
		error.response.data.status &&
		error.response.data.status.name === 'ExpiredJwtToken'
	) {
		toast.error('Session Expired!')
		localStorage.removeItem('refresh-token')
		localStorage.removeItem('access-token')
		window.location.href = window.location.origin
		return Promise.reject(error)
	}

	const expectedError =
		error.response &&
		error.response.status >= 400 &&
		error.response.status < 500
	if (!expectedError) {
		if (error.message === 'Network Error') {
			toast.error('Connection failed!')
		} else {
			toast.error('Server failed!')
		}
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
