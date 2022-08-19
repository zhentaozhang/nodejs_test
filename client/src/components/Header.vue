<template>
        <h1 class="title">后台管理系统</h1>
        <div>
          <UserLink></UserLink>
          <LoginOut></LoginOut>
        </div>
</template>

<script>
import LoginOut from "@/components/LoginOut";
import UserLink from "@/components/UserLink";

export default {
  name: "Header",
    components: {LoginOut, UserLink},
}
</script>

<style scoped>
.title {
  color: azure;
}
</style>