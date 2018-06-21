<template>
  <div id="app">
    <!--v-if="nos !== null" -->
    <router-view :nos="nos"/>
    <!--<div v-else>yOU aRE nOT in nOS client or something terrible happened!</div>-->
  </div>
</template>
<script>
  import 'vue-awesome/icons/edit'
  const nos = window.NOS ? window.NOS.V1 : null

export default {
    name: 'app',
    data: function () {
      return {
        nos: nos
      }
    }
  }
</script>

<style>

</style>
