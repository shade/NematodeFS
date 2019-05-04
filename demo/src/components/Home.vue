<template lang="jade">
  div
    div.header
      .logo
        img(src="../assets/infinity.png" height="30px" style="float:left;margin-top: -5px;margin-right: 10px;")
        |Infinite File System
    
</template>

<script>
  export default {
    name: 'Home',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
  @import url('https://fonts.googleapis.com/css?family=Inconsolata')

  .header
    font-family: Inconsolata
    max-width: 800px
    width: 80%
    margin: auto
    .logo
      float: left
      font-size: 20px
    .upload__btn
      float: left
      font-family: Inconsolata
      text-transform: uppercase
      letter-spacing: 1px
      font-size: 12px
      cursor: pointer
      border: 1px solid rgba(160, 20, 252, 1)
      border-radius: 5px
      padding: 10px
      color: rgba(140, 20, 252, 1)
      background-color: rgba(140, 20, 252, 0.1)
      line-height: 20px
</style>
