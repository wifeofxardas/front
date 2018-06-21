<template>
  <div>
    <input placeholder="Trader address" v-model="traderAddress"/>
    <label for="findLotsButton">
      <icon name="retweet" scale="1"></icon>
    </label>
    <button style="visibility: hidden;" id="findLotsButton" @click="findLots"></button>
    <router-link
      to="/create"
    >
      <icon name="plus" sacle="1"></icon>
    </router-link>
    <lot-list v-if="lotIds.length" :ids="lotIds"></lot-list>
    <div v-else>no lots here</div>
  </div>
</template>

<script>
import Helper from '../utils/helper'
import LotList from './lot-list'
import Icon from 'vue-awesome/components/Icon'

export default {
  components: {
    Icon,
    LotList
  },
  name: 'Auction',
  props: ['nos', 'contractHash'],
  created () {
  },
  methods: {
    findLots: async function () {
      try {
        this.lotIds = (await this.nos.getStorage({
          scriptHash: this.contractHash, key: `${Helper.encodeAddress(this.traderAddress)}.lots`
        })).split(';').filter(id => !isNaN(parseInt(id)))
      } catch (e) {
        console.error(`can not find lots ${e}`)
        this.lotIds = []
      }
    },
    createLot: function () {
      return ''
    }
  },
  data: function () {
    return {
      traderAddress: 'AK2nJJpJr6o664CWJKi1QRXjqeic2zRp8y',
      lotIds: []
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
