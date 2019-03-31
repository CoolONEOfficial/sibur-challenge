<template>
    <div id="header" class="mx-1">
        <v-layout row class="pa-3">
            <img id="logo" src="../assets/logo.png" alt="" height="30">
            <v-spacer></v-spacer>
        </v-layout>
    </div>
</template>

<script>
    export default {
        name: "Header"
    }
</script>

<style scoped lang="scss">
    #header {
        height: 66px;
        background: #1D3538;
        border-radius: 0 0 15px 15px;
    }
</style>