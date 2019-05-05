<template lang="jade">
    div.header
        .logo
            img(src="../assets/infinity.png" height="30px" style="float:left;margin-top: -5px;margin-right: 10px;")
            | Infinite File System
        .amount ~45.4 actions left


</template>
<script>
    export default {
        name: 'Navbar'
    }
</script>

<style lang="sass">

    .header
        font-family: Inconsolata
        max-width: 800px
        width: 80%
        margin: 20px auto

        .logo
            float: left
            font-size: 18px
            color: #555
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
        .amount
            float: right
            font-size: 12px
            cursor: pointer
            margin-right: 20px

</style>
