import axios from 'axios'
import router from './router/index'

axios.default.timeout = 5000
axios.defaults.headers.post['Content-Type'] = 'application/json'

const instance = axios.create();
instance.defaults.headers.post['Content-Type'] = 'application/json'

axios.interceptors.request.use = instance.interceptors.request.use



export default {
	// 获取bakery
	getBakery() {
		return instance.get('/api/bakery');
	},
	// getOrderedBakeryId() {
	// 	return instance.get('/api/bakery/bakeryIdOrderByBakeryName');
	// },
	removeBakery(data) {
		return instance.post('/api/bakery/remove', {
			bakeryId: data
		});
	},
	getBreadByBakery(id) {
		return instance.get('/api/bakery/queryByBakery', {
			params: {
				bakeryId: id
			}
		});
	},
	getAllBread() {
		return instance.get('/api/bakery/queryAllBread');
	},

		//TODO: 删除某个bakery里的所有面包
		// return instance.post('/api/bread/remove', {
		// 	bakeryId: data
		// });
}