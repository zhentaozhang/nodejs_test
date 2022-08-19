import {createRouter, createWebHistory} from 'vue-router'
import User from '../views/pages/User'
import store from "@/store";

const routes = [
	{
		//登录页面
		path: '/login',
		name: 'login',
		component: () => import('../views/pages/Login'),
	},
	{
		path: '/reguser',
		name: 'reguser',
		component: () => import('../views/pages/RegUser'),
	},
	{
		path: '/',
		name: 'user',
		component: User,
		children: [
			{
				path: '/userinfo',
				name: 'userinfo',
				component: () => import('../views/UserInfo'),
			},
			{
				path: '/updateuinfo',
				name: 'updateuinfo',
				component: () => import('../views/pages/UpdateUInfo')
			},
			{
				path: '/updatepwd',
				name: 'updatepwd',
				component:()=>import('../views/pages/UpdatePassword')
			}
		]
	},
	{
		path: '/'
	}
]
const router = createRouter({
	history: createWebHistory(),
	routes
})
router.beforeEach((to, form, next) => {
	const uInfo = store.state.uInfo.userInfo
	if (!uInfo.username) {
		if (to.path === '/login') {
			return next()
		}
		if (to.path === '/reguser') {
			return next()
		}
		next('/login')
	} else {
		next()
	}
})

export default router
