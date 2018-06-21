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
        contractHash: 'f70f1f4efb58caec3c9fe37f5fd53fce949ac4c1'
      }
    }
  }
</script>

<style>

</style>
