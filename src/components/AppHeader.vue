<template>

    <div class="d-f mb- ph pv-" style="background-color: black;color: white;">
        <router-link v-bind:to="{ name: 'index' }" style="color:white; text-decoration:none;">Minifig Fan Boy</router-link>

        <div style="margin-left:auto">
            Logged in as: {{ user.name }}
            <button v-if="!user.loggedIn" @click="signIn">signin</button>
            <button v-if="user.loggedIn" @click="signOut">signout</button>
        </div>
       
    </div> 
</template>

<script>
    import _ from 'lodash'

    export default {
        name: 'AppHeader',
        computed: {
            user() {
                return this.$store.state.user
            }
        }, 

        methods: {    
            signIn() {
                this.$store.dispatch('signIn')
            },
            signOut() {
                this.$store.dispatch('signOut')
            }
        }
    }
</script>