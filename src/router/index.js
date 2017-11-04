import Vue from 'vue'
import Router from 'vue-router'

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
		}
	},
	{
		path: '/bakery/update/:id',
		name: 'bakery_edit',
		component(resolve) {
			require.ensure(['@/components/updateBakery.vue'], () => {
				resolve(require('@/components/updateBakery.vue'));
			});
		},
		meta: {
			requireAuth: true
		}
	},

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

export default router
