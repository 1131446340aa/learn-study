<template>
<div class="container">
  <div class="title">个人资料</div>
  <div class="userInfo-item">
    <div class="desc">头像</div>
    <img src alt />
  </div>
  <div class="userInfo-item" v-for="(item,index) in userInfoArray" :key="index">
    <div class="desc">{{item}}</div>
    <input type="text" @focus="handleFocus(index)" @blur="handleBlur" v-if="index===0" v-model="nickName" />
    <input type="text" @focus="handleFocus(index)" @blur="handleBlur" v-if="index===1" v-model="work" />
    <input type="text" @focus="handleFocus(index)" @blur="handleBlur" v-if="index===2" v-model="desc" />
    <div class="update" v-if="updateKey!==index">
      <i class="iconfont icon-bi"></i> 修改
    </div>
    <div class="update" v-show="updateKey===index">
      <span @click="update">保存</span>
      <span class="quxiao">取消</span>
    </div>
  </div>
</div>
</template>

<script>
import {
  reactive,
  toRefs
} from 'vue'
import {
  updtateInfo,
  GetUserInfo
} from '../network/index'
export default {
  setup() {
    const state = reactive({
      userInfoArray: ['昵称', '职业', '个人介绍'],
      updateKey: -1,
      nickName: "",
      work: "",
      desc: ""
    })
    let userInfo
    GetUserInfo((res) => {
      state.userInfo = res
      localStorage.blogUserInfo = JSON.stringify(res)
      userInfo = JSON.parse(localStorage.blogUserInfo).data[0]
      state.nickName = userInfo.nickName
      state.work = userInfo.work || '暂无'
      state.desc = userInfo.desc || '暂无'
    })

    const methods = {

      handleFocus(key) {
        state.updateKey = key
      },
      handleBlur() {
        // 
        setTimeout(() => {
          state.updateKey = -1
          methods.update()
        });
      },
      update() {
        updtateInfo(res => {
          console.log(res);
        }, {
          nickName: state.nickName,
          work: state.work,
          desc: state.desc
        })
      }

    }
    return {
      ...toRefs(state),
      ...methods
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  width: 900px;
  margin: 0 auto;
  padding: 30px 50px;
  background-color: #fff;
  margin-top: 20px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

  .title {
    line-height: 60px;
    font-size: 32px;
    font-weight: bold;
    border-bottom: 1px solid #f1f1f1;
    padding-bottom: 20px;
  }

  .userInfo-item {
    display: flex;
    line-height: 20px;
    padding: 40px 0px;
    border-bottom: 1px solid #f1f1f1;
    color: #333;

    .desc {
      width: 120px;
      font-size: 14px;
    }

    input {
      outline: none;
      border: none;
      flex: 1;
    }

    .update {
      width: 120px;
      color: #007fff;
      cursor: pointer;

      .quxiao {
        color: #333;
        margin-left: 10px;
      }
    }
  }
}
</style>
