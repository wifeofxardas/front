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
        <div>price</div>
        <div>{{price}}</div>
    </div>
    <div>
      <div>state</div>
      <div>{{state}}</div>
    </div>
  </div>
</template>

<script>
// import Helper from '../utils/helper'

export default {
  components: {
  },
  name: 'Lot',
  props: ['id'],
  created () {
  },
  methods: {
  },
  data: function () {
    return {
      owner: 'owner',
      name: 'name',
      desc: 'desc',
      price: 228,
      state: 'open'
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
