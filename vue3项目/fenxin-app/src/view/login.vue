<template>
  <div class="container">
    <div class="login">
      <div class="title">登陆</div>
      <loginInput @user="(e)=>{user=e}" @pass="(e)=>{pass=e}"></loginInput>
      <div class="forget">忘记密码?</div>
      <el-button class="login_btn" @click="toLogin">登陆</el-button>
      <span class="register" @click="toRegister">立即注册</span>
      <message :visible="visible">{{message}}</message>
    </div>
  </div>
</template>

<script lang="ts">
import loginInput from "../components/loginInput.vue"
import { useRouter } from "vue-router"
import { reactive, toRefs } from "vue"
import { JieLiu } from "../util/jieliu"
import { isNumber, isNumber_String, AnyString } from "../util/yanzhen"
import { PostLogin } from "../network/index"
import message from "../components/message.vue"
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
      router: useRouter(),
    })
    const { messageState, changeVisible } = processMessage
    const methods = {
      toLogin: JieLiu(() => {
        if (isNumber.test(state.user) && isNumber_String.test(state.pass)) {
          PostLogin(
            (res) => {
              if (res.error === 0) {
                state.router.push("/hots")
                localStorage.blogUserInfo = JSON.stringify(res)
              } else {
                changeVisible("用户名或密码错误，请检查后重新输入", 3000)
              }
            },
            { userName: state.user, password: state.pass }
          )
        } else {
          changeVisible("用户名为6-16位数字，密码为6-16位数字或者字母", 3000)
        }
      }, 2000),
      toRegister: () => {
        state.router.push("/register")
      },
    }

    return {
      ...methods,
      ...toRefs(messageState),
      ...toRefs(state),
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
  min-height: 500px;
  z-index: 3;
  padding: 0 5vw;
  box-sizing: border-box;
  .title {
    text-align: center;
    height: 120px;
    line-height: 160px;
    font-size: 34px;
    font-weight: 700;
  }

  .login_btn {
    transform: translateX(-50%);
    position: relative;
    left: 50%;
    margin-top: 4vh;
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
    height: 40px;
    padding: 0 50px;
  }
  .forget {
    text-align: right;
    font-size: 12px;
    line-height: 30px;
    height: 30px;
    margin-right: 30px;
    margin-top: 3vh;
    color: #909399;
    cursor: pointer;
    &:hover {
      color: #1890ff;
    }
  }
  .register {
    position: absolute;
    text-align: center;
    left: 0;
    right: 0;
    bottom: 3vh;
    cursor: pointer;
    font-size: 14px;
  }
  .register:hover {
    color: #1890ff;
  }
}
</style>