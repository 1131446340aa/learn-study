<template>
  <div>
  
  </div>
</template>

<script lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import {StoreOpts,Store,createStore,useStore} from './vuex/index'
import {store1} from './store/index'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  setup(){
  
 let x = useStore() as  Store<typeof store1>
  console.log(x.getters.)
  

  
  }
}
</script>
