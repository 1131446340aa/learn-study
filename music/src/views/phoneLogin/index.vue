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

    <div class="text">未注册手机号登录后将自动创建帐号</div>
    <div class="input">
      <van-field v-model="phone" label-width="40" label-align="center" :autofocus="true" :clearable="true" label="+86" placeholder="请输入手机号" />
    </div>
    <div class="button">
      <van-button :round="true" color="red" block @click="tonext">下一步</van-button>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import { ExistUser, fetchGet } from "../../network/index";
import { Toast } from "vant";
export default {
  setup() {
    const data = reactive({
      phone: "",
      router: useRouter(),
    });
    const methods = {
      tonext() {
        if (!data.phone) {
          console.log(11);
          Toast({ message: "请输入手机号", position: "bottom" });
        } else {
          var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
          if (!myreg.test(data.phone)) {
            Toast({ message: "请输入正确手机号", position: "bottom" });
          } else {
            ExistUser(data.phone, (res) => {
              if (res.exist === 1) {
                data.router.push({
                  path: "./loginPatcha",
                  query: {
                    phone: data.phone,
                  },
                });
              }
              if (res.exist === -1) {
                data.router.push({
                  path: "loginPatcha",
                  query: {
                    phone: data.phone,
                    register: 1,
                  },
                });
              }
            });
            //   fetchGet("/login/cellphone", {
            //     phone: this.phone,
            //     password: "113144aa"
            //   }).then(
            //       res=>{
            //           console.log(res);

            //       }
            //   ).catch(res => {
            //     //   if(res.code===501){
            //     //       console.log(res);

            //     //       this.$router.push({
            //     //           path:"./phonevalidation"
            //     //       })
            //     //   }
            //     //   if(res.code===502){}
            //     //检查号码是否存在接口崩溃，用登录接口代替
            //   });
          }
        }
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
.text {
  font-size: 12px;
  margin-left: 10px;
  color: #909399;
  height: 60px;
  line-height: 60px;
}

.button {
  margin: 0 20px;
  margin-top: 30px;
}
</style>
