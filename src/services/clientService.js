import http from './httpService'
import auth from './authService'
import {mapToSelect} from './utilsService'

export function addClient(client) {
	return http.post('/api/clients', client).then(data => data.data)
}

export function getTop(data) {
	http.sendJwt(auth.jwt())
	return http.post('/api/clients/spif', data).then(data => data.data.top)
}

export function getStatus() {
	http.sendJwt(auth.jwt())
	return http.get('/api/clients/status').then(data => data.data)
}

export function getClients(report, search, gender = '') {
	http.sendJwt(auth.jwt())
	return http
		.get('/api/clients/' + report + '?search=' + search + '&gender=' + gender)
		.then(data => data.data.clients)
}

export function getClient(id) {
	http.sendJwt(auth.jwt())
	return http.get('/api/clients/show/' + id).then(data => data.data)
}

export function getClientGPA(id) {
	http.sendJwt(auth.jwt())
	return http.get('/api/clients/show-gpa/' + id).then(data => data.data)
}

export function approved(id, client) {
	http.sendJwt(auth.jwt())
	return http.put('/api/clients/approved/' + id, {...client}).then(data => data)
}

export function getStatistics(year) {
	http.sendJwt(auth.jwt())
	return http
		.post('/api/clients/statistic/', {year})
		.then(data => data.data.statistic)
}

export function updateClient(id, client) {
	http.sendJwt(auth.jwt())
	return http.put('/api/clients/edit/' + id, client).then(data => data)
}

export function enforced(client) {
	http.sendJwt(auth.jwt())
	return http
		.put('/api/clients/enforced/' + client.id, {...client})
		.then(data => data)
}

export function cancelled(id) {
	http.sendJwt(auth.jwt())

	return http.put('/api/clients/cancelled/' + id, {}).then(data => data)
}

export function retrieved(id) {
	http.sendJwt(auth.jwt())

	return http.put('/api/clients/retrieved/' + id, {}).then(data => data)
}
