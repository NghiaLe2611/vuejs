import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
//import jQuery from 'jquery'
import imageGenerator from './components/imageGenerator'
import vueQuiz from './components/vueQuiz'
import tab from './components/tab'
import todo from './components/todo'
import advancedTodo from './components/advancedTodo'
import filterSearch from './components/filterSearch'
import checkOut from './components/checkOut'
import shoppingCart from './components/shopping-cart/shoppingCart'

//window.$ = window.jQuery = jQuery;

Vue.use(VueRouter)

//Vue.config.productionTip = false

const routes = [
	{ path: '/imageGenerator', component: imageGenerator },
	{ path: '/quiz', component: vueQuiz },
	{ path: '/tab', component: tab },
	{ path: '/todo', component: todo },
	{ path: '/advancedTodo', component: advancedTodo },
	{ path: '/filterSearch', component: filterSearch },
	{ path: '/checkout', component: checkOut },
	{ path: '/shoppingCart', component: shoppingCart }
]

const router = new VueRouter({
	routes
})

new Vue({
	el: '#app',
	router: router,
	render: h => h(App)
})





