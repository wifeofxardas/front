<template>
  <div>
    <input placeholder="Trader address" v-model="traderAddress"/>
    <button @click="findLots">find lots</button>
    <button @click="findLots">find lots</button>
    <lot-list v-if="lotIds.length" :ids="lotIds"></lot-list>
    <div v-else>no lots here</div>
  </div>
</template>

<script>
import Helper from '../utils/helper'
export default {
  components: {
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
