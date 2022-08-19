<template>
  <div class="login_wrap">
    <div class="form_wrap">
      <el-form
          ref="formRef"
          :model="loginData"
          label-width="70px"
          class="demo-dynamic">
        <!--用户名-->
        <h4 class="header_text">后台管理系统</h4>
        <br>
        <el-form-item
            prop="username"
            label="用户名:"
            :rules="[{
              required:true,
              message:'用户名为必填项',
              trigger:'blur'
            }]">
          <el-input v-model="loginData.username"></el-input>
        </el-form-item>
        <!--密码-->
        <el-form-item
            prop="password"
            label="密码:"
            :rules="[{
              required:true,
              message:'密码为必填项',
              trigger:'blur'
            }]">
          <el-input v-model="loginData.password" type="password" @keydown.enter="handleLogin"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" class="login_btn" @click="handleLogin">登录</el-button>
      <el-link type="primary" href="/reguser">注册一个?</el-link>
    </div>
  </div>
</template>

<script>
import {toRefs, reactive} from "vue";
import router from "@/router";
import axios from 'axios';
import {useStore} from "vuex";
import store from "@/store";

export default {
  name: "Login",
  setup() {
    axios.defaults.baseURL = 'http://127.0.0.1:3007'
    const data = reactive({
      loginData: {
        username: '',
        password: ''
      },
    });
    const store = useStore()
    const handleLogin = () => {
      axios({
        method: 'post',
        url: '/api/login',
        data: {
          username: data.loginData.username,
          password: data.loginData.password
        }
      }).then(response => {
        if (response.data.status === 0) {
          store.commit('setUserInfo', data.loginData)
          localStorage.setItem("loginData", JSON.stringify(data.loginData));
          localStorage.setItem('authorization', response.data.token)
          router.push({
            path: '/'
          })
        } else if (response.data.status === 1) {
          alert('登陆失败'+response.data.message)
        }
      })
    }
    return {
      ...toRefs(data),
      handleLogin,
    }
  }
}
</script>
<style scoped>
.login_wrap {
  width: 100%;
  height: 100vh;
  background: whitesmoke;
  position: relative;
}

.form_wrap {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 30px 50px;
  border-radius: 5px;
}

.login_btn {
  display: block;
  margin: 5px auto;
}

.header_text {
  text-align: center;
}
</style>