<template>
  <div :class="'lot ' + state">
    <div class="number">LOT {{id}}</div>
    <div class="name">{{name}}</div>
    <div class="description">{{desc}}</div>
    <div>
      <div class="stateText">State</div>
      <div class="state">{{state}}</div>
      <div v-if="owned">
        <button class="button" v-if="state === 'open'" @click="close">close</button>
        <button class="button" v-if="state === 'wait'" @click="setWinner">setWinner</button>
      </div>
      <div v-if="winner !== null">
        <div class="winnerText">winner</div>
        <div>{{winner}}</div>
      </div>
    </div>

    <div>
      <label class="stakeText">Stake</label>
      <input class="stakeInput" v-model="stake" v-bind:disabled="stakeDisabled"/>
      <button class="button" @click="placeStake" v-bind:disabled="stakeDisabled">confirm</button>
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
            localStorage.setItem(`${this.id}.confirmed`, true)

            console.log(`confirm stake tx = ${tx}`)
          } catch (e) {
            console.log(e)
          }
        } else if (confirmed || (this.state !== 'wait' && this.state !== 'open')) {
          clearTimeout(this.stakeConfirmationTimeout)
          this.stakeConfirmationTimeout = null
          this.winnerWait()
        } else if (this.state === 'open') {
          this.stakeConfirmationTimeout = setTimeout(this.confirmStake.bind(this, stake, salt), 2500)
        }
      } else {
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
      name: null,
      desc: null,
      state: null,
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
    width: 225px;
    height: 200px;
    padding: 10px;
    margin: 10px;
    border-radius: 5px;
    border: 1px solid;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .lot.open {
    border-color: rgb(253, 204, 0);
  }

  .number, .stateText, .stakeText, .winnerText {
    color: rgb(253, 204, 0);
    font-weight: bold;
  }

  .name {
    font-weight: bold;
  }

  .description, .name, .state {
    color: white;
  }

  .button {
    background-color: rgb(253, 204, 0);
    border-radius: 10px;
    border-style: none;
    width: 3.5rem;
  }

  .stakeInput {
    border-radius: 10px;
    border-style: none;
    box-sizing: padding-box;
    padding-left: 5px;
    width: 5rem;
    outline: none;
  }

  .button, .stakeInput {
    height: 1.5rem;
  }
</style>
