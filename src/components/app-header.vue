<template>
  <div>
    <div>
      <div>
        <router-link
          :to="{
            name: 'lots',
            params: { address: myAddress, state: 'open' }
          }"
        >
          My lots
        </router-link>
      </div>
      <div>
        <router-link
          to="/create"
        >
          Create
        </router-link>
      </div>
      <div>
        <router-link
          to="/lots"
        >
          FindLots
        </router-link>
      </div>
    </div>
    <div><img src="../assets/logo.png"/></div>
    <div>back</div>
  </div>
</template>

<script>
  export default {
    name: 'AppHeader',
    props: ['nos'],
    async created () {
      this.myAddress = await this.nos.getAddress()
    },
    data: function () {
      return {
        myAddress: ''
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
