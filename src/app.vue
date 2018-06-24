<template>
  <div id="app">
    <router-view v-if="nos !== null" :nos="nos" :contractHash="contractHash"/>
    <div v-else>yOU aRE nOT in nOS client or something terrible happened!</div>
  </div>
</template>
<script>
  import 'vue-awesome/icons/retweet'
  import 'vue-awesome/icons/plus'
  import 'vue-awesome/icons/backward'
  const nos = window.NOS ? window.NOS.V1 : null

export default {
    name: 'app',
    data: function () {
      return {
        nos: nos,
        contractHash: 'e6fa5526029495f7569693beb4e6896ccad870e8'
      }
    }
  }
</script>

<style>

</style>
