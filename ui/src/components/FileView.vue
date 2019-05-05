<template lang="jade">
  div
    Navbar
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
      div.side__container
        div.preview__img
        table.preview__info
          tr
            td.info__header Name
            td.info__data Coolmeme.jpg
          tr
            td.info__header Size
            td.info__data 12.1 kB
          tr
            td.info__header Storage Format
            td.info__data B (B:// protocol)
          tr
            td.info__header Creation Time
            td.info__data Block 3405 (2 mins ago)
          tr
            td.info__header Encrypted?
            td.info__data No
        div.choice(style="font-family: Inconsolata; padding-top: 20px") DOWNLOAD | PREVIEW

</template>

<script>
  import FileEntry from './FileEntry.vue'
  import Navbar from './Navbar.vue'

  export default {
    name: 'Home',
    components: {
      FileEntry,
      Navbar
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
  .side__container
    float: right
    text-align: center
    .preview__img
      margin: auto
      height: 130px
      width: 100px
      background-color: #DDD
      border-radius: 3px
    .preview__info
      font-family: Courier
      font-size: 10px
      margin-top: 40px
      max-width: 180px
      .info__header
        font-weight: 800
      td
        padding-top: 10px
</style>
