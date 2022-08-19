<template>
  <el-link :underline="false" href="/userinfo">{{ username }}
  </el-link>
  &nbsp&nbsp&nbsp
</template>

<script>
import store from "@/store";

export default {
  name: "UserLink",
  setup() {
    const UserDetails = JSON.parse(localStorage.getItem('UserDetails'))
    const username = UserDetails.username
    return {
      username
    }
  }
}
</script>

<style scoped>
.el-link {
  margin-right: 8px;
  font-size: 150%;
}

.el-link .el-icon--right.el-icon {
  vertical-align: text-bottom;
}
</style>