<template>
  <div class="xx_page">
    <pd-breadcrumb :navs="navConfigWithRoute" />
    <el-form
      ref="form"
      :model="form"
    >
    </el-form>
    <el-table
      v-loading="loading"
      :data="tableData"
      style="width: 100%"
    >
      <div slot="empty">
        <common-empty />
      </div>
    </el-table>
  </div>
</template>

<script>

import Apis from './apis'
import { routes } from "../../router/config";
import { VRequired, } from 'libs/common_validator.js'
import commonEmpty from '@/components/common/commonEmpty'
export default { 
  name:"xx",
  components: { commonEmpty },
  data () {
    return {
      navConfigWithRoute: Object.freeze([
        { title: '首页', routeName: routes[0].name },
        { title: '' }
      ]),
      companyId:'',
      userInfoId:'',
      tableData:[],
      loading:false,
      form:{},
      rules:Object.freeze({})
    }
  },
  mounted() {
    this.companyId = localStorage.getItem('company') && JSON.parse(localStorage.getItem('company')).id
    this.userInfoId = localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo')).id
  },
  
  methods: {

  }
}
</script>

<style lang="scss">
  @import  '../../../../static/css/table.scss';
  .xx_page{
    background: transparent !important;
    padding: 0 20px;
  }
</style>