<!-- App.vue -->
<template>
    <div id="app" style="display:flex;flex-direction:column">
        <app-header></app-header>
        <router-view></router-view>
    </div>
</template>

<script>
    import AppHeader from './AppHeader.vue'
    export default {
        components: { AppHeader }
    }
</script>