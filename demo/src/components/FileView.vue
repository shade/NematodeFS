<template lang="jade">
  div
    div.header
      .logo
        img(src="../assets/infinity.png" height="30px" style="float:left;margin-top: -5px;margin-right: 10px;")
        |Infinite File System
    br
    div.main__container
      div.entry__container
        div.entry__header
          span.current_location /home/joe/10
          span.up_one
        FileEntry(name="hi.txt")
        FileEntry(name="cool.png")
        FileEntry(name="lulz.exe")
        FileEntry(name=".." type="folder")
      div.
</template>

<script>
  import FileEntry from './FileEntry.vue'
  
  export default {
    name: 'Home',
    components: {
      FileEntry
    },
    mounted () {
      if (!localStorage.getItem('private')) {
        this.$router.push({path: '/'})
      }
    },
    data () {
      // TODO: Fetch the folders local to this
      // TODO: Show the folders

      return {
        msg: 'Welcome to Your Vue.js App'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass">
  @import url('https://fonts.googleapis.com/css?family=Inconsolata')
  body
    background-color: #FFF

  .header
    font-family: Inconsolata
    max-width: 800px
    width: 80%
    margin: auto
    margin-bottom: 10px
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

  .main__container
    width: 80%
    max-width: 800px
    height: 100%
    margin: auto
    margin-top: 50px
  .entry__container
    width: 66%
    float: left
    .entry__header
      font-family: Courier
      font-size: 12px
      float: left

</style>
