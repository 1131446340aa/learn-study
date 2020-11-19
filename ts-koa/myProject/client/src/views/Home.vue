<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HelloWorld from '../components/HelloWorld.vue'; // @ is an alias to /src
import {PostInsertRules} from '../axios'
export default defineComponent({
  name: 'Home',
  components: {
    HelloWorld,
  },
  setup(){
    PostInsertRules(res=>{
      console.log(res);
    },{
    "cates_lv2":0,
    "contract_sn":"21312jjj42134",
    "started_at":"2012-2-11",
    "partner_code":"2131242134",
    "partner_name":"2012-2-11",
    "partner_type": 0,
    "price": 0,
    "res_type": 0,
    "settle_method": 0,
    "status": 0,
    "teach_type": 0,
    "unit": 0,
    "ended_at":"2012-2-11"
    })
  }
});
</script>
