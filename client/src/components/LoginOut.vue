<template>
  <el-button type="danger" @click="loginOut">退出</el-button>
</template>

<script>
import store from "@/store";
import router from "@/router";

export default {
  name: "LoginOut",
  setup(){
    const loginOut = () => {
      localStorage.removeItem("loginData")
      store.commit('setUserInfo', {})
      router.push({
        path: '/login'
      })
    }
    return {loginOut}
  }
}
</script>

<style scoped>

</style>