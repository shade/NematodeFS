<template lang="jade">
    div
        Navbar(home="true")
        .btn__container
            .btn__wrap(@click="download(newKey())") Create New Hard Drive    
        .updates__container
            .updates__wrap
                | Recently Added files

</template>

<script>
    import Nematode from '../newsdk/api.js'
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
                const hd = new Nematode()
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
            width: 100px
            text-align: center
            border: 0
            cursor: pointer
            font-family: Inconsolata
            font-size: 14px
            display: inline-block
            color: #FFF
            background-color: rgba(0,0,0,0.5)
            border-radius: 2px
            padding: 20px
            margin: 5px
    
    .updates__container 
        width: 100%
        text-align: center
        margin-top: 100px
        float: left
        cursor: pointer
        .updates__wrap
            margin: auto
            width: 60%
            max-width: 600px
            font-family: Inconsolata
            font-size: 12px
            text-align: left
</style>
