import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://jsonplaceholder.typicode.com',
});

instance.interceptors.response.use(
	function (config) {
		return config;
	},
	function (error) {
		if (onlineStatus() === 'offline') {
			return Promise.reject('you are offline ');
		}

		return Promise.reject(error);
	}
);

function onlineStatus() {
	return navigator.onLine ? 'online' : 'offline';
}

window.addEventListener('online', onlineStatus);
window.addEventListener('offline', onlineStatus);

export default instance;
