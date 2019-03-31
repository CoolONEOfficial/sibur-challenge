<template>
    <div id="header" class="mx-1">
        <v-layout row class="pa-3">
            <img id="logo" src="../assets/logo.png" alt="" height="30">
            <v-layout row justify-end v-if="$route.params.uid != null">
                <h2 class="roboto mr-2">#{{ $route.params.uid }}</h2>
                <h2 class="roboto" style="cursor: pointer" @click="toHome">Выйти</h2>
            </v-layout>
        </v-layout>
    </div>
</template>

<script>
    import router from '../router';

    export default {
        name: "Header",
        methods: {
            toHome() {
                router.push('/')
            }
        }
    }
</script>

<style scoped lang="scss">
    #header {
        height: 66px;
        background: #1D3538;
        border-radius: 0 0 15px 15px;
    }
</style>