<template>
  <div class="lot">
    <div>lot #{{id}}</div>
    <div>
      <div>owner</div>
      <div>{{owner}}</div>
    </div>
    <div>
        <div>name</div>
        <div>{{name}}</div>
    </div>
    <div>
        <div>desc</div>
        <div>{{desc}}</div>
    </div>
    <div>
      <div>state</div>
      <div>{{state}}</div>
    </div>
    <div>
      <label>Stake</label>
      <input v-model="stake"/>
      <button @click="placeStake">confirm</button>
    </div>
  </div>
</template>

<script>
import Helper from '../utils/helper'

export default {
  components: {
  },
  name: 'Lot',
  props: ['id', 'nos', 'contractHash'],
  async created () {
    this.owner = await this.nos.getStorage({scriptHash: this.contractHash, key: 'lots.1.owner'})
    console.log(this.owner)
    console.log(Helper.unhex(Helper.decode('AK2nJJpJr6o664CWJKi1QRXjqeic2zRp8y')))
    console.log(this.owner.toString())
  },
  methods: {
    placeStake: function () {

    }
  },
  data: function () {
    return {
      owner: 'owner',
      name: 'name',
      desc: 'desc',
      state: 'open',
      stake: 0
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .lot > div {
    display: flex;
    justify-content: space-between;
  }

  .lot {
    width: 150px;
    padding: 10px;
    margin: 10px;
    border-radius: 10px;
    border: black 1px solid;
  }
</style>
