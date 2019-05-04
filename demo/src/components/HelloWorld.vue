<template lang="jade">
  div
    div.header
      .logo Infinite File System
      .upload__btn 
        span(style="font-size: 15px; float: left") &#x21EA;&nbsp;
        | Upload
</template>

<script>
  import 'coinify-psp-lib'

  console.log()
  export default {
    name: 'HelloWorld',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
  @import url('https://fonts.googleapis.com/css?family=Vesper+Libre:400|Inconsolata')

  .header
    font-family: Vesper Libre
    max-width: 800px
    width: 80%
    margin: auto
    .logo
      float: left
      font-size: 20px
    .upload__btn
      float: right
      font-family: Inconsolata
      text-transform: uppercase
      letter-spacing: 1px
      font-size: 12px
      cursor: pointer
      border: 1px solid rgba(140, 20, 252, 1)
      border-radius: 5px
      padding: 10px
      color: rgba(140, 20, 252, 1)
      background-color: rgba(140, 20, 252, 0.1)
      line-height: 20px
</style>
