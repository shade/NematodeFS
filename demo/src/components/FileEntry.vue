<template lang="jade">
    div.container
     table(style="width: 100%")
        tr
            td(align="left")
                img(src="../assets/file.png" height="15px")
            td(align="left") {{name}}
            td(align="right") May 3d, 2016
</template>
<script>
export default {
    name: 'FileEntry',
    props: [ 'name' ]
}
</script>
<style lang="sass">
    .container
        padding: 10px
        box-sizing: border-box
        width: 100%
        float: left
        box-shadow: 0px 1px 3px #999 
        border-radius: 3px
        margin-top: 5px
        font-size: 12px
</style>
