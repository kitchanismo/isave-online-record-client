import http from './httpService'
import auth from './authService'

export function storeInsentive(data) {
	http.sendJwt(auth.jwt())
	return http.post('/api/insentives', data).then(data => data.data)
}

export function getInsentives(month = null) {
	http.sendJwt(auth.jwt())
	return http
		.get('/api/insentives?month=' + month)
		.then(data => data.data.insentives)
}

export function getInsentive(id) {
	http.sendJwt(auth.jwt())
	return http.get('/api/insentives/' + id).then(data => data.data.insentive)
}

export function deleteInsentive(id) {
	http.sendJwt(auth.jwt())
	return http.delete('/api/insentives/' + id).then(data => data.data)
}
