<template>
  <div class="lotList">
    <lot v-for="id in ids" :key="id" :id="id" :nos="nos" :contractHash="contractHash" :owned="owned"></lot>
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
  props: ['nos', 'ids', 'contractHash', 'owned'],
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
  .lotList {
    display: flex;
    flex-wrap: wrap;
    max-width: 1200px;
  }
</style>
