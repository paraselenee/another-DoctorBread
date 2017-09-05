import axios from 'axios'
import router from './router/index'
import store from './store/index'
import * as types from './store/types'

//
axios.default.timeout = 5000
axios.defaults.headers.post['Content-Type'] = 'application/json'

const instance = axios.create();
instance.defaults.headers.post['Content-Type'] = 'application/json'

axios.interceptors.request.use = instance.interceptors.request.use
instance.interceptors.request.use(config => {
	if (localStorage.getItem('token')) {
		config.headers.Authorization = `token ${localStorage.getItem('token')}`
			.replace(/(^\")|(\"$)/g, '')
	}
	return config
}, err => {
	return Promise.reject(err)
})
// axios拦截响应
// instance.interceptors.response.use(response => {
// 	return response
// }, err => {
// 	if (err.response) {
// 		switch (err.response.status) {
// 			case 401:
// 				// 返回 401 清除token信息并跳转到登录页面
// 				store.commit(types.LOGOUT);
// 				router.replace({
// 					path: 'login',
// 					query: { redirect: router.currentRoute.fullPath }
// 				})
// 		}
// 	}
// 	return Promise.reject(err)
// })

export default {
	// // 用户注册
	// userRegister(data) {
	// 	return instance.post('/hapi/register', data)
	// },
	// // 用户登录
	// UserLogin(data) {
	// 	return instance.post('/hapi/login', data)
	// },
	// // 获取用户
	// getUser() {
	// 	return instance.get('/hapi/user')
	// },
	// // 删除用户
	// delUser(data) {
	// 	return instance.post('/hapi/delUser', data)
	// },
	// 获取bakery
	getBakery() {
		console.log('Im axios');
		data: {};
		return instance.get('/api/bakery');		
	},
	removeBakery(data){
		return instance.post('/api/bakery/remove', {
			bakeryId: data
		});
		//TODO: 删除某个bakery里的所有面包
		// return instance.post('/api/bread/remove', {
		// 	bakeryId: data
		// });
	}
}
// export const requestLogin = params => { 
// 	return axios
// 	.post(`${base}/login`, params).then(res => res.data); 
// }; 
// export const getDialog = params => { 
// 	return instance
// 	.get(base+'/dialogue',{ params: params }); }; 
// export const getUser= params => { 
// 	return instance
// 	.get(base+'/user',{ params: params }); }; 
// export const getRebotContent = params => { 
// 	return instance
// 	.get('http://www.tuling123.com/openapi/api',{ params: params }); }