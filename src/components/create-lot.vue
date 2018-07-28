<template>
  <div class="createLot">
    <div>
      <h2>Create my lot</h2>
    </div>
    <div>
      <label>
        <input placeholder="Name" v-model="name"/>
      </label>
    </div>
    <div>
      <label>
        <textarea  placeholder="Description" v-model="desc"> </textarea>
      </label>
    </div>
    <button @click="create">Create</button>
  </div>
</template>

<script>
import Helper from '../utils/helper'
import Icon from 'vue-awesome/components/Icon'
export default {
  components: {
    Icon
  },
  name: 'CreateLot',
  props: ['nos', 'contractHash'],
  created () {
  },
  methods: {
    create: async function () {
      const address = await this.nos.getAddress()

      try {
        const tx = await this.nos.invoke({
          scriptHash: this.contractHash,
          operation: 'openLot',
          args: [
            Helper.decode(address),
            this.name,
            this.desc
          ]
        })
      } catch (e) {
        console.log(e)
      }
    }
  },
  data: function () {
    return {
      name: '',
      desc: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .createLot {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
  .createLot h2 {
    color: rgb(107, 108, 119)
  }

  .createLot input, .createLot textarea {
    max-width: 250px;
    width: 250px;
    -webkit-border-radius: 30px;
    -moz-border-radius: 30px;
    border-radius: 15px;
    border-style: hidden;
    box-sizing: padding-box;
    padding: 10px;
    margin: 10px;
  }

  .createLot textarea {
    height: 4rem;

  }

  .createLot button {
    background-color: rgb(253, 204, 0);
    border-radius: 10px;
    height: 2rem;
    width: 125px;
    border-style: hidden;
  }
</style>
