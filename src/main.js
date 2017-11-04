// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from './axios'
import _ from 'underscore'
import Vuetify from 'vuetify'
import'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

/* eslint-disable no-new */
new Vue({
	axios,
	router,
	render: h => h(App)
})
	.$mount('#app')
