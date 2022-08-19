<template>
  <el-card shadow="hover" class="box-card">
    <template #header>
      <div class="card-header">
        <h1>我的信息</h1>
        <el-button class="button" text @click="handleUpdateUInfo">修改我的信息</el-button>
      </div>
    </template>
    <div class="text item">
      <p><b>id: </b>{{ UserDetails.id }}</p>
      <el-divider/>
      <p><b>username: </b>{{ UserDetails.username }}</p>
      <el-divider/>
      <p><b>nickname: </b>{{ UserDetails.nickname }}</p>
      <el-divider/>
      <p><b>email: </b>{{ UserDetails.email }}</p>
      <el-divider/>
      <p><b>user_pic: </b>{{ UserDetails.user_pic }}</p></div>
  </el-card>
</template>

<script>
import router from "@/router";

export default {
  name: "UserInfo",
  components: {},
  setup() {
    const UserDetails = JSON.parse(localStorage.getItem('UserDetails'))
    const handleUpdateUInfo = () => {
      router.push({
        path: '/updateuinfo'
      })
    }
    return {
      UserDetails,
      handleUpdateUInfo
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