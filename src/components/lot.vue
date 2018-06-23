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
    <div v-if="winner !== null">
      <div>winner</div>
      <div>{{winner}}</div>
    </div>
    <div>
      <div>state</div>
      <div>{{state}}</div>
    </div>
    <div v-if="owned">
      <button v-if="state === 'open'" @click="close">close</button>
      <button v-if="state === 'wait'" @click="setWinner">setWinner</button>
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
  props: ['id', 'nos', 'contractHash', 'owned'],
  async created () {
    // localStorage.clear()
    this.owner = await this.nos.getStorage({scriptHash: this.contractHash, key: `lots.${this.id}.owner`})
    this.name = await this.nos.getStorage({scriptHash: this.contractHash, key: `lots.${this.id}.name`})
    this.desc = await this.nos.getStorage({scriptHash: this.contractHash, key: `lots.${this.id}.desc`})
    this.state = await this.nos.getStorage({scriptHash: this.contractHash, key: `lots.${this.id}.state`})
    await this.checkWinner()

    const savedStake = localStorage.getItem(`${this.id}.stake`)

    if (savedStake && this.winner === null) {
      const salt = localStorage.getItem(`${this.id}.salt`)
      this.stake = savedStake
      this.placeStake(savedStake, salt)
    }
  },
  methods: {
    placeStake: async function (stake, savedSalt) {
      if (this.owner !== null) {
        const salt = savedSalt || Helper.getSalt()
        const hashedStake = Helper.sha256((typeof stake === 'string' ? stake : this.stake) + salt)
        const hashConfirmed = localStorage.getItem(`${this.id}.hashConfirm`)

        if (!hashConfirmed) {
          localStorage.setItem(`${this.id}.stake`, this.stake)
          localStorage.setItem(`${this.id}.salt`, salt)

          try {
            const tx = await this.nos.invoke({
              scriptHash: this.contractHash,
              operation: 'placeStake',
              args: [
                Helper.decode(await this.nos.getAddress()),
                this.id,
                Helper.unhex(hashedStake)
              ]
            })

            console.log(`place stake tx = ${tx}`)

            localStorage.setItem(`${this.id}.hashConfirm`, true)
          } catch (e) {
            console.log(e)
            return
          }
        }

        this.confirmStake(stake, salt)
      } else {
        console.error('something going wrong, try to reload page and/or do it again')
      }
    },
    confirmStake: async function (stake, salt) {
      const confirmed = localStorage.getItem(`${this.id}.confirmed`)

      if (await this.hashConfirmedByBlockchain()) {
        if (await this.stakesClosed() && !confirmed && this.state === 'wait') {
          try {
            const tx = await this.nos.invoke({
              scriptHash: this.contractHash,
              operation: 'confirmStake',
              args: [
                Helper.decode(await this.nos.getAddress()),
                this.id,
                stake,
                salt
              ]
            })

            console.log(`confirm stake tx = ${tx}`)
          } catch (e) {
            console.log(e)
          }
        } else if (confirmed || (this.state !== 'wait' && this.state !== 'open')) {
          clearTimeout(this.stakeConfirmationTimeout)
          this.stakeConfirmationTimeout = null
          this.winnerWait()
        } else if (this.state === 'open') {
          localStorage.setItem(`${this.id}.confirmed`, true)
          this.stakeConfirmationTimeout = setTimeout(this.confirmStake.bind(this, stake, salt), 2500)
        }
      } else {
        localStorage.setItem(`${this.id}.confirmed`, true)
        this.stakeConfirmationTimeout = setTimeout(this.confirmStake.bind(this, stake, salt), 2500)
      }
    },
    winnerWait: async function () {
      if (this.state === 'canceled') {
        return
      }

      if (!await this.checkWinner()) {
        this.winnerTimeout = setTimeout(this.winnerWait.bind(this), 5000)
      }
    },
    checkWinner: async function () {
      try {
        const winner = await this.nos.getStorage({scriptHash: this.contractHash, key: `lots.${this.id}.winner`})
        if (winner === Helper.decode(await this.nos.getAddress())) {
          this.winner = 'you'
        } else {
          this.winner = 'not you'
        }
        return true
      } catch (e) {
        console.log(`no winner for lot ${this.id}`)
        this.winner = null
        return false
      }
    },
    hashConfirmedByBlockchain: async function () {
      try {
        const myAddress = Helper.decode(await this.nos.getAddress())
        const storedHash = await this.nos.getStorage({scriptHash: this.contractHash, key: `${myAddress}.stakes.hashed${this.id}`})

        return storedHash !== null
      } catch (e) {
        console.error('there is no hashed stake or troubles with connection')
        return false
      }
    },
    stakesClosed: async function () {
      try {
        this.state = await this.nos.getStorage({scriptHash: this.contractHash, key: `lots.${this.id}.state`})

        return this.state === 'wait' || this.state === 'closed' || this.state === 'canceled'
      } catch (e) {
        console.error('there is no state or troubles with connection')
        return false
      }
    },
    close: async function () {
      try {
        const tx = await this.nos.invoke({
          scriptHash: this.contractHash,
          operation: 'closeLot',
          args: [
            Helper.decode(await this.nos.getAddress()),
            this.id
          ]
        })

        this.updateState()

        console.log(`close lot tx = ${tx}`)
      } catch (e) {
        console.log(e)
      }
    },
    setWinner: async function () {
      try {
        const tx = await this.nos.invoke({
          scriptHash: this.contractHash,
          operation: 'setLotWinner',
          args: [
            Helper.decode(await this.nos.getAddress()),
            this.id
          ]
        })
        this.updateState()

        console.log(`close lot tx = ${tx}`)
      } catch (e) {
        console.log(e)
      }
    },
    updateState: function () {
      const currentState = ''.concat(this.state)

      clearInterval(this.updateStateInterval)

      this.updateStateInterval = setInterval(async () => {
        await this.stakesClosed()

        if (this.state !== currentState) {
          clearInterval(this.updateStateInterval)
          this.updateStateInterval = null
        }
      }, 2500)
    }
  },
  computed: {
    stakeDisabled: function () {
      return this.owner === null || this.stakeConfirmationTimeout !== null ||
        this.state !== 'open' || this.winnerTimeout !== null || this.updateStateInterval !== null
    }
  },
  data: function () {
    return {
      owner: null,
      name: 'name',
      desc: 'desc',
      state: 'open',
      stake: 0,
      stakeConfirmationTimeout: null,
      winner: null,
      winnerTimeout: null,
      updateStateInterval: null
    }
  },
  beforeDestroy () {
    clearInterval(this.stakeConfirmationTimeout)
    this.stakeConfirmationTimeout = null
    clearInterval(this.updateStateInterval)
    this.updateStateInterval = null
    clearTimeout(this.winnerTimeout)
    this.winnerTimeout = null
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
