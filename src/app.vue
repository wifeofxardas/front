<template>
  <div id="app">
  <app-header :nos="nos" ></app-header>
    <!--<router-view-->
      <!--v-if="nos !== null"-->
    <router-view
      :nos="nos"
      :contractHash="contractHash"
    />
    <!--<div v-else>yOU aRE nOT in nOS client or something terrible happened!</div>-->
  </div>
</template>
<script>
  import 'vue-awesome/icons/retweet'
  import 'vue-awesome/icons/plus'
  import 'vue-awesome/icons/backward'
  import AppHeader from './components/app-header'
  const nos = window.NOS ? window.NOS.V1 : null

export default {
  name: 'app',
  components: {AppHeader},
  async created () {
    this.userAddress = await nos.getAddress()
  },
  data: function () {
    return {
      nos: nos,
      contractHash: 'e6fa5526029495f7569693beb4e6896ccad870e8',
      userAddress: ''
    }
  }
}
</script>

<style>
  body {
    background-color: rgb(65, 66, 75);
    font-family: 'Muli', sans-serif;
  }
</style>
