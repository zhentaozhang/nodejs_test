import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import axios from "axios";

createApp(App).use(store).use(router).use(ElementPlus).mount('#app')
axios.interceptors.request.use(function (config) {
	let token = localStorage.getItem('authorization');
	if (token) {
		config.headers['authorization'] = token;
	}
	return config;
})