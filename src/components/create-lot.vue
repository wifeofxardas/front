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
    <div>
      <label>price</label>
      <input v-model="price"/>
    </div>
    <div>
      <label>state</label>
      <input v-model="state"/>
    </div>
  </div>
</template>

<script>
// import Helper from '../utils/helper'

import Icon from 'vue-awesome/components/Icon'
export default {
  components: {
    Icon
  },
  name: 'CreateLot',
  props: ['nos', 'ids'],
  created () {
  },
  methods: {
  },
  data: function () {
    return {
      name: 'name',
      desc: 'desc',
      price: 'price',
      state: 'state'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
