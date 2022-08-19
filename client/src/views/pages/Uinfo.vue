<template>
  <h1>
    <slot name="cardTitle"></slot>
  </h1>
  <el-button class="button" text @click="handleUpdateUInfo">修改我的信息</el-button>

</template>

<script>
import router from "@/router";

export default {
  name: "Uinfo",
  setup() {
    const handleUpdateUInfo = () => {
      router.push({
        path: '/updateuinfo'
      })
    }
    return{
      handleUpdateUInfo
    }
  }
}
</script>

<style scoped>

</style>