<template>
  <div class="main">
    <van-nav-bar @click-left="onClickLeft">
      <template #left>
        <i class="iconfont icon-left-arrow"></i>
      </template>
      <template #title>
        <div class="text">手机号登录</div>
      </template>
      <template #right>
        <div @click="passLogin" class="passLogin">密码登录</div>
      </template>
    </van-nav-bar>
    <div class="title">请发送验证码</div>
    <div class="send">
      <div class="left">已发送至{{ phone }}</div>
      <div class="right" @click="getRequire">重新获取</div>
    </div>
    <div class="input">
      <van-field @input="sendRequire" maxlength="4" v-model="require" label-width="40" label-align="center" :autofocus="true" :clearable="true" placeholder="请输入验证码" />
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs } from "vue";
import { sentCaptcha, verifyCaptcha } from "../../network/index";
import { useRouter, useRoute } from "vue-router";
import { Toast } from "vant";
import Store from "../../store/index";
export default {
  setup() {
    const data = reactive({
      password: "",
      router: useRouter(),
      route: useRoute(),
      phone: "",
      require: "",
    });
    data.phone = (data.route.query.phone as string).slice(0, 3) + "****" + (data.route.query.phone as string).slice(7);
    sentCaptcha(data.route.query.phone as string);
    const methods = {
      passLogin() {
        data.router.push({
          path: "./inputPassword",
          query: {
            phone: data.route.query.phone,
          },
        });
      },
      sendRequire() {
        if (data.require.length === 4) {
          verifyCaptcha(
            data.route.query.phone as string,
            data.require,
            (res) => {
              if (res.code === 200) {
                Toast({ message: "已重新发送验证码" });
                data.router.push("/");
              }
            },
            () => {
              Toast({ message: "验证码错误,请重新输入" });
              data.require = "";
            }
          );
        }
      },
      getRequire() {
        sentCaptcha(data.route.query.phone as string, (res) => {
          Toast({ message: res.message });
        });
        Toast({ message: "已重新发送验证码" });
      },
    };
    return {
      ...methods,
      ...toRefs(data),
    };
  },
};
</script>

<style lang="less" scoped>
.passLogin {
  font-size: 1rem;
  height: 2rem;
  padding: 0.5rem 1rem;
  border-radius: 1.5rem;
  border: 1px solid #999;
}
.title {
  font-size: 1.8rem;
  margin-top: 2rem;
  padding-left: 2rem;
}
.send {
  display: flex;
  justify-content: space-between;
  line-height: 4rem;
  .left {
    padding-left: 2rem;
    color: #999;
  }
  .right {
    padding-right: 2rem;
    color: rgb(23, 132, 175);
  }
}
</style>
