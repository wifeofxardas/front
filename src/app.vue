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
        contractHash: '4734e17a0e6382ea4134672ef3288f06f3967814'
      }
    }
  }
</script>

<style>

</style>
