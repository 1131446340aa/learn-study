<template>
  <div class="container">
    <div class="login">
      <div class="title">注册</div>
      <loginInput @user="(e)=>{user=e}" @pass="(e)=>{pass=e}"></loginInput>
      <div class="pass login_title">密码:</div>
      <el-input
        type="password"
        prefix-icon="el-icon-lock"
        placeholder="请再次输入密码"
        @input="(e)=>{pass2=e}"
      ></el-input>

      <div class="pass login_title">昵称</div>
      <el-input placeholder="请输入昵称" prefix-icon="el-icon-user" @input="(e)=>{nickName=e}"></el-input>
      <div class="pass login_title">密保问题:</div>
      <el-input placeholder="请输入密保问题" prefix-icon="el-icon-question" @input="(e)=>{question=e}"></el-input>
      <div class="pass login_title">密保答案:</div>
      <el-input
        placeholder="请输入密保答案"
        prefix-icon="el-icon-chat-line-round"
        @input="(e)=>{answer=e}"
      ></el-input>
      <el-button class="login_btn" @click="toRegister">注册</el-button>
      <div class="register" @click="toLogin">立即登陆</div>
      <message :visible="visible">{{message}}</message>
    </div>
  </div>
</template>

<script lang="ts">
import loginInput from "../components/loginInput.vue"
import message from "../components/message.vue"
import { JieLiu } from "../util/jieliu"
import { isNumber, isNumber_String, AnyString } from "../util/yanzhen"
import { reactive, toRefs } from "vue"
import { PostRegister } from "../network/index"
import { useRouter, useRoute } from "vue-router"
import processMessage from "../mixins/controllMessage"
export default {
  components: {
    loginInput,
    message,
  },
  setup() {
    const state = reactive({
      user: "",
      pass: "",
      pass2: "",
      question: "",
      answer: "",
      nickName: "",
      router: useRouter(),
    })
    const { messageState, changeVisible } = processMessage
    const methods = {
      toLogin() {
        state.router.push("/login")
      },
      toRegister: JieLiu(() => {
        console.log(1)

        if (
          isNumber.test(state.user) &&
          isNumber_String.test(state.pass) &&
          isNumber_String.test(state.pass2) &&
          AnyString.test(state.question) &&
          AnyString.test(state.answer) &&
          AnyString.test(state.nickName)
        ) {
          if (state.pass !== state.pass2) {
            changeVisible("两次密码不一致！！", 3000)
            // message.warning('两次密码不一致！！', 2)
          } else {
            PostRegister(
              (res) => {
                state.router.push("/hots")
              },
              {
                userName: state.user,
                nickName: state.nickName,
                password: state.pass,
                question: state.question,
                answer: state.answer,
              }
            )
          }
        } else {
          changeVisible(
            "用户名为6-16位数字，密码为6-16位数字或者字母,密保和答案至少三个字符",
            3000
          )
          // message.warning('用户名为6-16位数字，密码为6-16位数字或者字母,密保和答案至少三个字符', 2)
        }
      }, 1000),
    }

    return {
      ...toRefs(state),
      ...methods,
      ...toRefs(messageState),
    }
  },
}
</script>

<style lang="less" scoped>
.container {
  background-image: linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%);
  width: 100vw;
  height: 100vh;
  position: relative;
}
.login {
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  position: absolute;
  top: 23vh;
  left: 33vw;
  right: 33vw;
  bottom: 23vh;
  z-index: 3;
  padding: 0 5vw;
  box-sizing: border-box;
  overflow: auto;
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
    margin-top: 2vh;
  }
  .login_btn {
    height: 40px;
    transform: translateX(-50%);
    position: relative;
    left: 50%;
    margin-top: 40px;
    background-image: linear-gradient(
      to right,
      #b8cbb8 0%,
      #b8cbb8 0%,
      #b465da 0%,
      #cf6cc9 33%,
      #ee609c 66%,
      #ee609c 100%
    );
    color: #ffffff;
    padding: 0 50px;
  }

  .register {
    text-align: center;
    cursor: pointer;
    margin: 30px 0;
    &:hover {
      color: #1890ff;
    }
  }
}
</style>