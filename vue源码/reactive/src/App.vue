<template>
  <div  @click="handleClick">
    <circle  :data="data"  :x="x" :y="300" :r="200"></circle>
    <rect  :data="data"  :x="800" :y="300" :width="200" :height="200"></rect>
  </div>
</template>

<script>
import {  toRefs,ref,reactive} from 'vue'
// import reas from './reactive'
// const {reactive} =reas
// import { stat } from 'fs';

export default {
  name: 'App',
 setup(){
  let state = reactive({
      data: [
        { name: 'chinese', count: 100, color: 'red' },
        { name: 'chinese', count: 200, color: 'pink' },
        { name: 'chinese', count: 300, color: 'blue' },
        { name: 'chinese', count: 400, color: 'skyblue' },
      ],
      pos:{x:300}   
  })
  function handleClick(){
    console.log(state.data.push({ name: 'chinese', count: 400, color: 'skyblue' },));
    this.x=400
  }
  return {...toRefs(state),handleClick}
},
// data(){
//   return{
//     x:100
//   }
// },
data(){
  return{
    x:300
  }
}
}

</script>
