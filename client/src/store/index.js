import { createStore } from 'vuex'
import uInfo from './state/userinfo.state.js'
export default createStore({
  state: {
    LoginName:''
  },
  getters: {
  },
  mutations: {
    SetName(state,data){
      state.LoginName=data.name
    }
  },
  actions: {
  },
  modules: {
    uInfo
  }
})
