<template>
  <div>
    <lot v-for="id in ids" :key="id" :id="id"></lot>
  </div>
</template>

<script>
// import Helper from '../utils/helper'

import Lot from './lot'
export default {
  components: {
    Lot
  },
  name: 'LotList',
  props: ['nos', 'ids'],
  created () {
  },
  methods: {
  },
  data: function () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
