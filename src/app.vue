<template>
  <div id="app">
    <!--v-if="nos !== null" -->
    <router-view :nos="nos" :contractHash="contractHash"/>
    <!--<div v-else>yOU aRE nOT in nOS client or something terrible happened!</div>-->
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
        contractHash: '2b02dc2b1bde7e5566c0631a0c6eaf2d4b509204'
      }
    }
  }
</script>

<style>

</style>
