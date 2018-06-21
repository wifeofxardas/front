<template>
  <div>
    <div @click="getBalanceHandler">aaa</div>
  </div>
</template>

<script>

export default {
  components: {

  },
  name: 'Auction',
  props: ['nos'],
  methods: {
    getBalanceHandler: async function () {
      console.log(await this.nos.getAddress())
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
