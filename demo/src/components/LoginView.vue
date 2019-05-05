<template lang="jade">
    div
        .header
            .logo
                img(src="../assets/infinitywhite.png" height="30px" style="float:left;margin-top: -7.5px;margin-right: 10px;")
                |Infinite File System

        .btn__container
            .btn__wrap Upload Keyfile
            .btn__wrap(@click="download(newKey())") Create New Keyfile
        
</template>

<script>
    import bsv from 'bsv'

    export default {
        name: 'Login',

        methods: {
            download (data) {
                let str = JSON.stringify(data)
                let link = document.createElement("a")
                link.download = name
                link.href = `data:text/plain;charset=utf-8,${str}`
                link.click()
                // TODO: redirect
            },
            newKey () {
                const key = bsv.ECPair.makeRandom()
                // TODO: create key
            }
        }
    }
</script>

<style lang="sass">
    @import url('https://fonts.googleapis.com/css?family=Inconsolata')

    body
        background-color: #9f5afd

    .header
        font-family: Inconsolata
        max-width: 800px
        width: 80%
        margin: auto
        margin-bottom: 10px
        color: #FFF
        .logo
            float: left
            font-size: 16px
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
    .btn__container
        width: 100%
        text-align: center
        margin-top: 100px
        float: left
        cursor: pointer

        .btn__wrap
            font-family: Inconsolata
            font-size: 12px
            display: inline-block
            color: #FFF
            background-color: rgba(255,255,255,0.1)
            border-radius: 2px
            padding: 20px
            margin: 5px
</style>
