<template>
  <div class="common-layout">
    <el-container>
      <el-header class="common-header flex-float">
        <Header></Header>
      </el-header>
      <el-container>
        <el-aside width="150px" class="common-aside">
          <Aside></Aside>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import axios from "axios";
import Header from "@/components/Header";
import Aside from "@/components/Aside";

export default {
  name: "User",
  components: {Header, Aside},
  setup() {
    axios.defaults.baseURL = 'http://127.0.0.1:3007'
    axios.get('/my/userinfo').then((response) => {
      const UserDetails = response.data.data
      localStorage.setItem('UserDetails', JSON.stringify(UserDetails))
    })
    return {}
  }
}
</script>

<style>
.el-container {
  height: 100vh;
  overflow: hidden;
}

.common-header {
  background: rgb(175, 200, 234);
  display: flex;
}

.common-aside {
  background: rgb(159, 168, 190);
}

.flex-float {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.flex {
  display: flex;
  align-items: center;
}
el-menu-item:hover{
	  background: #1c88cf!important;
	  color: #fff!important;;
}
.el-menu-item.is-active {
   background-color: rgb(231, 235, 240) !important;
}
.el-menu-item {
  background-color: #af8f8f !important;
}
.el-menu-item:hover{
  outline: 0 !important;
  color: #409EFF !important;
}
.el-menu-item.is-active {
  color: #fff !important;
  background: #409EFF !important;
}
.el-submenu__title:focus, .el-submenu__title:hover{
  outline: 0 !important;
  color: #409EFF !important;
  background: none !important;
}
</style>