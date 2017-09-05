import App from '../app.vue'

//这种写法可以给模块重命名，只在打包生产时起作用，开发模式中还是以默认的命名方式
//const Home = () => import(/* webpackChunkName: "group-foo" */ '../pages/home/home.vue')

const Home = () => import('../pages/home/home.vue')
const Item = () => import('../pages/item/item.vue')

export default [{
	path: '/',
	component: App,
	children: [{
		path: '/home',
		name: 'home',
		component: Home
	},{
		path: '/item',
		name: 'item',
		component: Item
	}]
}]