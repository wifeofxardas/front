<template>
  <div>
    <router-link
      to="/"
    >
      <icon name="backward" sacle="1"></icon>
    </router-link>
    <div>
      <label>name</label>
      <input v-model="name"/>
    </div>
    <div>
      <label>desc</label>
      <input v-model="desc"/>
    </div>
    <button @click="create">create</button>
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
            Helper.encode(address),
            this.name,
            this.desc
          ]
        })

        console.log(`tx = ${tx}`)
      } catch (e) {
        console.log(e)
      }
    }
  },
  data: function () {
    return {
      name: 'name',
      desc: 'desc'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
