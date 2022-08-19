<template>
  <el-menu background-color="none" text-color="azure" :router="true">
    <el-sub-menu index="1">
      <template #title>
        <span>账号管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/userinfo">个人信息</el-menu-item>
        <el-menu-item index="/updateuinfo">修改信息</el-menu-item>
        <el-menu-item index="/updatepwd">修改密码</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
    <el-sub-menu index="2">
      <template #title>
        <span>文章分类</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="#">文章列表</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
  </el-menu>
</template>

<script>
export default {
  name: "Aside"
}
</script>

<style>


</style>