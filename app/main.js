import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router/routers.js'

import App from './app.vue'

import './src/font/iconfont.css'
import './src/scss/main.scss'

Vue.use(VueRouter)

const router = new VueRouter({
	routes
});

new Vue({
	router,
	created: function(){
		console.log('main.js')
	}
}).$mount('#app');
