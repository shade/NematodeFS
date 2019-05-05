<template lang="jade">
    div
        Navbar(home="true")
        .btn__container
            .btn__wrap Upload KeyPassport
            .btn__wrap(@click="download(newKey())") Create New KeyPassport      
        
</template>

<script>
    import bsv from 'bsv'
    import Navbar from './Navbar.vue'

    export default {
        name: 'Login',
        components: {
            Navbar
        },
        mounted () {
            if (localStorage.getItem('private')) {
                this.$router.push({path: '/home'})
            }
        },
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

    .btn__container
        width: 100%
        text-align: center
        margin-top: 100px
        float: left
        cursor: pointer

        .btn__wrap
            font-family: Inconsolata
            font-size: 14px
            display: inline-block
            color: #FFF
            background-color: rgba(0,0,0,0.5)
            border-radius: 2px
            padding: 20px
            margin: 5px
</style>
