<template>
  <div class="con">
    <div class="username login_title">用户名:</div>
    <el-input
    prefix-icon="el-icon-s-custom"
     placeholder="请输入用户名" @input="(e)=>{this.$emit('user',e)}">
    
    </el-input>
    <div class="pass login_title">密码:</div>
    <el-input
    type="password"
    prefix-icon="el-icon-lock"
     placeholder="请输入密码" @input="(e)=>{this.$emit('pass',e)}" >
    </el-input>
  </div>
</template>

<script lang="ts"> 
import {reactive,toRefs} from 'vue'
export default {
setup(){
  let state = reactive({
    user:""
  })
  return{
    ...toRefs(state)
  }
}
}
</script>

<style lang="less" scoped>
.container {
  .title {
    text-align: center;
    height: 120px;
    line-height: 160px;
    font-size: 34px;
    font-weight: 700;
  }
  .login_title {
    font-size: 16px;
    height: 30px;
    line-height: 30px;
    margin-top: 3vh;
  }
}
</style>