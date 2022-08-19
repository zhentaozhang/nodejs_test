<template>
  <el-card shadow="hover" class="box-card">
    <template #header>
      <h1>更改信息</h1>
    </template>
    <div class="text item">
      <el-form :model="form" label-width="120px">
        <el-form-item label="username">
          <el-input type="username" v-model="form.username" :placeholder="form.username"/>
        </el-form-item>
        <el-form-item label="nickname">
          <el-input v-model="form.nickname" :placeholder="form.nickname"/>
        </el-form-item>
        <el-form-item label="email">
          <el-input type="email" v-model="form.email" :placeholder="form.email"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleUpdateUInfo">修改</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<script>
import axios from "axios";
import router from "@/router";
import {reactive} from "vue";

export default {
  name: 'UpdateUInfo',
  setup() {
    axios.defaults.baseURL = 'http://127.0.0.1:3007'
    const UserDetails = JSON.parse(localStorage.getItem('UserDetails'));
    const form = reactive({
      username: UserDetails.username,
      nickname: UserDetails.nickname,
      email: UserDetails.email
    })
    const handleUpdateUInfo = () => {
      axios({
        method: 'post',
        url: '/my/userinfo',
        data: {
          id: UserDetails.id,
          username: form.username,
          nickname: form.nickname,
          email: form.email
        }
      }).then(response => {
        if (response.data.status === 0) {
          alert('更新成功')
          router.push({
            path: '/userinfo'
          })
        } else if (response.data.status === 1) {
          alert('更新失败' + response.data.message)
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
      UserDetails,
      handleUpdateUInfo,
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