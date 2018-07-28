<template>
  <div class="header">
    <div class="headerNav">
      <div>
        <router-link
          class="navBtn"
          :to="{
            name: 'lots',
            params: { address: myAddress, state: 'open' }
          }"
        >
          <div class="imgBox">
            <img src="../assets/hummer.png"/>
          </div>
          <div class="BtnText">My lots</div>
        </router-link>
      </div>
      <div>
        <router-link
          class="navBtn"
          to="/create"
        >
          <div class="imgBox">
            <img src="../assets/cross.png"/>
          </div>
          <div class="BtnText">Create</div>
        </router-link>
      </div>
      <div>
        <router-link
          class="navBtn"
          to="/lots"
        >
          <div class="imgBox">
            <img src="../assets/find.png"/>
          </div>
          <div class="BtnText">Find lots</div>
        </router-link>
      </div>
    </div>

    <div><img src="../assets/logo.png"/></div>

    <div class="backNav" @click="$router.go(-1)"><img src="../assets/arrow-colored.png"/></div>
  </div>
</template>

<script>
  export default {
    name: 'AppHeader',
    props: ['nos'],
    async created () {
      this.myAddress = await this.nos.getAddress()
    },
    data: function () {
      return {
        myAddress: ''
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .imgBox {
    width: 2.5rem;
    height: 2.5rem;
    background-color: rgb(253, 204, 0);
    align-items: center;
    display: flex;
    justify-content: center;
    border-radius: 30px;
    margin: 5px;
  }

  .navBtn {
    display: flex;
    text-decoration: none !important;

  }

  .BtnText {
    color: white;
    text-align: center;
    line-height: 2.5rem;
    margin: 5px;
  }

  .header {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
  }

  .backNav {
    width: 2.5rem;
    height: 2.5rem;
    position: absolute;
    right: 20px;
  }

  .headerNav {
    position: absolute;
    left: 20px;
    top: 20px
  }
</style>
