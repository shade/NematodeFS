<template lang="jade">
    div
        Navbar(home="true")
        .btn__container
            .btn__wrap(@click="newHD") Create New Hard Drive    
            br
            a.keyget__btn(
                v-if="download_uri",
                download="HD_KEY_DONT_LOSE_THIS",
                :href="download_uri",
                @click="login()"
            ) Download Harddrive key and login
        .updates__container
            .updates__wrap
                | Recently Added files

</template>

<script>
    import Nematode from './../../../newsdk'
    import Navbar from './Navbar.vue'

    export default {
        name: 'Login',
        components: {
            Navbar
        },
        data() {
            return {
                hd: null,
                download_uri: null
            }
        },
        mounted () {
            if (localStorage.getItem('private')) {
                this.$router.push({path: '/home'})
            }
        },
        methods: {
            login() {
                localStorage.private = JSON.stringify(this.hd.exportKey())
                setTimeout(() => {
                    this.$router.go()
                }, 1000)
            },
            newHD () {
                const hd = new Nematode()
                this.hd = hd

                let keystr = JSON.stringify(hd.exportKey())
                this.download_uri = `data:text/plain;charset=utf-8,${keystr}`
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

        a.keyget__btn
            font-family: Inconsolata
            font-size: 20px
    
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
