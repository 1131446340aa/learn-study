<template>
 <Suspense>
  <template>
    <div>2132</div>
  </template>
  <template #fallback>
    <div>3</div>
  </template>
</Suspense>

</template>

<script>
export default {
components: {
        Child: { template: "<div>Placeholder</div>" }
      }
}
</script>

<style>

</style>