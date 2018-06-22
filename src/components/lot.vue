<template>
  <div class="lot">
    <div>lot #{{id}}</div>
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
      <input v-model="stake" v-bind:disabled="stakeDisabled"/>
      <button @click="placeStake" v-bind:disabled="stakeDisabled">confirm</button>
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
    // localStorage.clear()
    this.owner = await this.nos.getStorage({scriptHash: this.contractHash, key: `lots.${this.id}.owner`})
    this.name = await this.nos.getStorage({scriptHash: this.contractHash, key: `lots.${this.id}.name`})
    this.desc = await this.nos.getStorage({scriptHash: this.contractHash, key: `lots.${this.id}.desc`})
    this.state = await this.nos.getStorage({scriptHash: this.contractHash, key: `lots.${this.id}.state`})

    const savedStake = localStorage.getItem(`${this.id}.stake`)

    if (savedStake) {
      const salt = localStorage.getItem(`${this.id}.salt`)
      this.stake = savedStake
      this.placeStake(savedStake, salt)
    }
  },
  methods: {
    placeStake: function (stake, savedSalt) {
      if (this.owner !== null) {
        const salt = savedSalt || Helper.getSalt()
        const hashedStake = Helper.sha256((typeof stake === 'string' ? stake : this.stake) + salt)

        localStorage.setItem(`${this.id}.stake`, this.stake)
        localStorage.setItem(`${this.id}.salt`, salt)

        this.stakeInterval = setInterval(() => {
          console.log(hashedStake)
        }, 1000)
      } else {
        console.error('something going wrong, try to reload page and/or do it again')
      }
    }
  },
  computed: {
    stakeDisabled: function () {
      return this.owner === null || this.stakeInterval !== null
    }
  },
  data: function () {
    return {
      owner: null,
      name: 'name',
      desc: 'desc',
      state: 'open',
      stake: 0,
      stakeInterval: null
    }
  },
  beforeDestroy () {
    clearInterval(this.stakeInterval)
    this.stakeInterval = null
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
