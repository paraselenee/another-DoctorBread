import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index.js'

Vue.use(Router)

const router = new Router({
	routes: [{
		path: '/bakery',
		name: 'bakery',
		component(resolve) {
			require.ensure(['@/components/anotherBakery.vue'], () => {
				resolve(require('@/components/anotherBakery.vue'));
			});
		},
		meta: {
			requireAuth: true
		},
		// children: [
		// 	{
		// 		path: 'update/:id',
		// 		component: updateBakery
		// 	}
		// ]
	},
	// {
	// 	path: '/login',
	// 	name: 'login',
	// 	component(resolve) {
	// 		require.ensure(['@/components/Login.vue'], () => {
	// 			resolve(require('@/components/Login.vue'));
	// 		});
	// 	}
	// },
	// {
	// 	path: '/register',
	// 	name: 'register',
	// 	component(resolve) {
	// 		require.ensure(['@/components/Register.vue'], () => {
	// 			resolve(require('@/components/Register.vue'));
	// 		});
	// 	}
	// },

	// 简单设置404页面
	{
		path: '*',
		component(resolve) {
			require.ensure(['@/components/404.vue'], () => {
				resolve(require('@/components/404.vue'));
			});
		},
		hidden: true
	}
	]
})

// 验证 token，存在才跳转
// router.beforeEach((to, from, next) => {
// 	let token = localStorage.getItem('token')
// 	if (to.meta.requireAuth) {
// 		if (token) {
// 			next()
// 		} else {
// 			next({
// 				path: '/login',
// 				query: { redirect: to.fullPath }
// 			})
// 		}
// 	} else {
// 		next()
// 	}
// })

export default router
