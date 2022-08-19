<template>
  <el-card shadow="hover" class="box-card">
    <template #header>
      <div class="card-header">
        <h1>修改密码</h1>
      </div>
    </template>
    <div class="text item">
      <el-form :model="form" label-width="120px">
        <el-form-item label="OldPassword">
          <el-input v-model="form.oldpassword"/>
        </el-form-item>
        <el-form-item label="NewPassword">
          <el-input v-model="form.newpassword"/>
        </el-form-item>
        <el-button type="primary" @click="handleUpdatePassword">修改</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form>
    </div>
  </el-card>
</template>

<script>
import router from "@/router";
import axios from "axios";
import {reactive} from "vue";

export default {
  name: "UpdatePassword",
  setup() {
    axios.defaults.baseURL = 'http://127.0.0.1:3007'
    const UserDetails = JSON.parse(localStorage.getItem('UserDetails'));
    const form = reactive({
      oldpassword: '',
      newpassword: ''
    })
    const handleUpdatePassword = () => {
      axios({
        method: 'post',
        url: '/my/updatepwd',
        data: {
          id: UserDetails.id,
          oldPwd: form.oldpassword,
          newPwd: form.newpassword
        }
      }).then(response => {
        if (response.data.status === 0) {
          alert('密码修改成功')
          localStorage.removeItem("loginData")
          router.push({
            path: '/login'
          })
        } else if (response.data.status === 1) {
          alert('修改失败' + response.data.message)
        }
      })
    }
    const cancel = () => {
      router.push({
        path: '/userinfo'
      })
    }
    return {
      cancel,
      handleUpdatePassword,
      UserDetails,
      form
    }
  }
}
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;

}

.text {
  font-size: 20px;
}

.item {
  margin-bottom: 28px;
}

.box-card {
  width: 100%;
  border-radius: 20px;
}
</style>