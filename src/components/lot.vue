<template>
  <div class="lot">
    <div>lot #{{id}}</div>
    <!--<div>-->
      <!--<div>owner</div>-->
      <!--<div>{{owner}}</div>-->
    <!--</div>-->
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

export default {
  components: {
  },
  name: 'Lot',
  props: ['id', 'nos', 'contractHash'],
  async created () {
    this.name = await this.nos.getStorage({scriptHash: this.contractHash, key: 'lots.1.name'})
    this.desc = await this.nos.getStorage({scriptHash: this.contractHash, key: 'lots.1.desc'})
    this.state = await this.nos.getStorage({scriptHash: this.contractHash, key: 'lots.1.state'})
  },
  methods: {
    placeStake: function () {

    }
  },
  data: function () {
    return {
      // owner: 'owner',
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
