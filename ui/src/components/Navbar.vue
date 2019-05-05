<template lang="jade">
    div.header
        .logo
            img(src="../assets/infinity.png" height="30px" style="float:left;margin-top: -5px;margin-right: 10px;")
            | Infinite File System
        .top__commands(v-if="home")
            input#loginBtn(type="file" value="Login" @change="login")
            label(for="loginBtn").upload__btn Login
                span(style="font-size: 10px") &nbsp;(load keyfile)
        .top__commands(v-else)
            .amount ~45.4 actions left
            .logout(@click="logout()") Logout
</template>
<script>
    export default {
        name: 'Navbar',
        props: ['home'],
        methods: {
            logout() {
                delete localStorage.private
                delete localStorage.public
                this.$router.go()
            },
            login (event) {
                console.log(event.target.files)
            }
        }
    }
</script>

<style lang="sass">

    .header
        font-family: Inconsolata
        max-width: 800px
        width: 80%
        margin: 40px auto

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
            padding: 5px 20px
            color: rgba(140, 20, 252, 1)
            background-color: rgba(140, 20, 252, 0.1)
            line-height: 20px
        .top__commands
            float: right
            .amount
                display: inline-block
                font-size: 12px
                cursor: pointer
                margin-right: 20px
            .logout
                display: inline-block
                cursor: pointer
            #loginBtn
                display: none

</style>
