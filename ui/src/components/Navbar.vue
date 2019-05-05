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
            .amount(v-if="hd") ~{{hd.getActions()}} actions left
            .logout(@click="logout()") Logout
</template>
<script>
    import Nematode from '../../../newsdk/src/api';

    export default {
        name: 'Navbar',
        props: ['home'],
        methods: {
            data () {
                return {
                    error: null,
                    hd: 0
                }
            },
            logout() {
                delete localStorage.private
                this.$router.go()
            },
            login (event) {
                const reader = new FileReader();

                reader.addEventListener('loadend', (e) => {
                    const text = e.srcElement.result;
                    let keyfile = null

                    try {
                        keyfile = JSON.parse(text)
                    } catch(e) {
                        this.error = "Could not parse key file"
                        return
                    }

                    if (!keyfile.privateKey) {
                        this.error = "Invalid key file"
                    }

                    this.hd = new Nematode(keyfile)
                });

                reader.readAsText(event.target.files[0]);
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
