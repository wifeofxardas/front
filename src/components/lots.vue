<template>
  <div class="lots">
    <div>
      <div class="stateSelect">
        <div>
          <input type="radio" id="open-lots" value="open" v-model="state" @change="findLots"/>
          <label for="open-lots">Open</label>
        </div>
        <div>
          <input type="radio" id="close-lots" value="closed" v-model="state" @change="findLots"/>
          <label for="close-lots">Closed</label>
        </div>
      </div>
      <div>
        <input placeholder="Trader address" v-model="traderAddress"/>
        <label for="findLotsButton">
          <icon name="retweet" scale="1"></icon>
        </label>
      </div>
      <button style="visibility: hidden;" id="findLotsButton" @click="findLots"></button>
      <lot-list
        v-if="lotIds.length"
        :ids="lotIds"
        :nos="nos"
        :contractHash="contractHash"
        :owned="owned"
      ></lot-list>
      <div class="noLots" v-else>
        <div>
          No lots here...
        </div>
        <img src="../assets/face.png">
      </div>
    </div>
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
  name: 'Lots',
  props: ['nos', 'contractHash'],
  async created () {
    this.userAddress = await this.nos.getAddress()
    this.traderAddress = this.$route.params.address

    if (this.traderAddress) {
      this.findLots()
    }
  },
  methods: {
    findLots: async function () {
      try {
        this.lotIds = (await this.nos.getStorage({
          scriptHash: this.contractHash,
          key: `${Helper.decode(this.traderAddress)}.${this.state === 'open' ? 'lots' : 'closedLots'}`
        })).split(';').filter(id => !isNaN(parseInt(id)))
      } catch (e) {
        console.error(`can not find lots ${e}`)
        this.lotIds = []
      }
    }
  },
  data: function () {
    return {
      traderAddress: '',
      lotIds: [],
      state: this.$route.params.state || 'open',
      userAddress: ''
    }
  },
  computed: {
    owned: function () {
      return this.traderAddress === this.userAddress
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .lots {
    display: flex;
    justify-content: center;
    padding: 20px;
  }

  .noLots {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: rgb(107, 108, 119);
    font-size: 2rem;
    padding-top: 4rem;
  }

  .stateSelect {
    display: flex;
    justify-content: center;
    color: white;
  }
</style>
