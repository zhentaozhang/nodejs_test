<template>
  <div class="login_wrap">
    <div class="form_wrap">
      <el-form
          ref="formRef"
          :model="registerData"
          label-width="70px"
          class="demo-dynamic">
        <!--用户名-->
        <h4 class="header_text">注册管理账号</h4>
        <br>
        <el-form-item
            prop="username"
            label="用户名:"
            :rules="[{
              required:true,
              message:'用户名为必填项',
              trigger:'blur'
            }]">
          <el-input v-model="registerData.username"></el-input>
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
          <el-input v-model="registerData.password" type="password" @keydown.enter="handlerRegister"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" class="login_btn" @click="handlerRegister">注册</el-button>
    </div>
  </div>
</template>

<script>

import axios from "axios";
import {reactive, toRefs} from "vue";
import router from "@/router";

export default {
  name: "RegUser",
  setup() {
    axios.defaults.baseURL = 'http://127.0.0.1:3007'
    const data = reactive({
      registerData: {
        username: '',
        password: ''
      },
    });
    const handlerRegister = () => {
      axios({
        method: 'post',
        url: '/api/reguser',
        data: {
          username: data.registerData.username,
          password: data.registerData.password
        }
      }).then(response => {
        if (response.data.status === 0) {
          alert('注册完成，正在跳转到登录页面')
          router.push({
            path: '/login'
          })
        } else if (response.data.status === 1) {
          alert('注册失败，请稍后再试!')
        }
      })
    }
    return {
      ...toRefs(data),
      handlerRegister,
      data
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