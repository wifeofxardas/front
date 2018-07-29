<template>
  <div class="about">
      <div class="text">
        A Vickrey auction is a type of sealed-bid auction.
        Bidders sumbit written bids without knowing the bid of the other people in the auction.
      </div>
      <div class="text">
        The highest bidder wins but the price paid i the second-highest bid.
      </div>
      <div>
        <img src="../assets/lots.png"/>
      </div>
  </div>
</template>

<script>
  export default {
    name: 'About'
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .about {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .text {
    width: 550px;
    color: white;
    font-size: 26px;
    padding: 20px;
    text-align: center;
  }
</style>
