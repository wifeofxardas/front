<template>
  <div>
    <div v-bind:onclick="getBalanceHandler">aaa</div>
  </div>
</template>

<script>
import {VueTabs, VTab} from 'vue-nav-tabs'
import 'vue-nav-tabs/themes/vue-tabs.css'
import PulseLoader from '../../node_modules/vue-spinner/src/PulseLoader.vue'
import Icon from '../../node_modules/vue-awesome/components/Icon.vue'
import Book from './book.vue'

export default {
  components: {
    Icon,
    PulseLoader,
    VueTabs,
    VTab,
    Book
  },
  name: 'Auction',
  props: ['nos'],
  created () {

  },
  beforeDestroy () {

  },
  methods: {
    getBalanceHandler: function () {
      console.log(this.nos)
    }
  },
  data () {
    return {
      books: [
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
