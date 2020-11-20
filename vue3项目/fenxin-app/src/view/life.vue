<template>
  <div class="container">
    <Article :articleDate="articleDate"></Article>
  </div>
</template>

<script lang="ts">
import Article from "../components/article.vue"
import { reactive, toRefs } from "vue"
import { useRouter, useRoute } from "vue-router"
export default {
  components: {
    Article
  },
  setup() {
    const state =reactive({
      articleDate:{
        type:"生活",
        isNew:0
      }
    })
    return {
      ...state
    }
  },
}
</script>

<style>
</style>