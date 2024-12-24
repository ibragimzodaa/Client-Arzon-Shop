
import axios from 'axios'

export const axiosRequest = axios.create({
	baseURL: "https://store-api.softclub.tj",
})

axiosRequest.interceptors.request.use(
	config => {
		const accessToken = localStorage.getItem('access_token')
		if (accessToken) {
			config.headers.Authorization = `Bearer ${accessToken}`
		}
		return config
	},
	error => {
		return Promise.reject(error)
	}
)
