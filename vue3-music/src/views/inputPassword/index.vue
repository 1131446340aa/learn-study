<template>
  <div class="main">
    <van-nav-bar @click-left="onClickLeft">
      <template #left>
        <i class="iconfont icon-left-arrow"></i>
      </template>
      <template #title>
        <div class="text">手机号登录</div>
      </template>
    </van-nav-bar>
    <van-field maxlength="16" type="password" v-model="password" placeholder="请输入密码" />
    <div class="line"></div>
    <div class="button">
      <van-button :round="true" color="red" block @click="toIndex">下一步</van-button>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs } from "vue";
import { login_cellphone } from "../../network/index";
import { useRouter, useRoute } from "vue-router";
import { Toast } from "vant";
import Store from "../../store/index";

export default {
  setup() {
    const data = reactive({
      password: "",
      router: useRouter(),
      route: useRoute(),
    });
    const methods = {
      toIndex() {
        if (!data.password) {
          Toast({ message: "请输入密码", position: "bottom" });
        } else {
          login_cellphone(data.route.query.phone as string, data.password, (res) => {
            Store.methods.changeId(res.account.id);

            localStorage.id = res.account.id;
            data.router.push({ path: "/" });
          });
        }
      },
      onClickLeft() {
        data.router.go(-1);
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
.line {
  margin: 0 10px;
  height: 1px;
  background-color: #e4e7ed;
}

.button {
  margin: 0 20px;
  margin-top: 30px;
}
</style>
