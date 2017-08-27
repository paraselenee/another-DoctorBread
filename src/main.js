// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import bakery from './components/bakery'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import axios from './axios'
import store from './store/index.js'

Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
		axios,
		store,
		router,
		render: h => h(App)
	})
	.$mount('#app')