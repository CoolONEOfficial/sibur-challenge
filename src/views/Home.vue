<template>
    <div class="home" id="app">
        <section class="section has-text-centered">
            <h1 class="text-xs-center">
                Добро<br>пожаловать!<br><br>
                <small>В систему распределения путевок<br>для сотрудников компании</small>
            </h1>
        </section>
        <div id="bottom">
            <v-flex xs10 class="offset-xs1 py-5">
                <div class="rounded py-4" style="background: #20626A; width: 100%;">
                    <v-layout column>
                        <v-layout row justify-center>
                            <img src="../assets/icon_uid.png" alt="" width="100px" height="100px" class="pa-3">
                            <v-divider vertical></v-divider>
                            <div style="background: #C4C4C4; opacity: 0.6;" class="rounded mx-3 px-4 pt-1 my-3">
                                <v-text-field label="ID" v-model="uid"
                                              class="button-text">
                                </v-text-field>
                            </div>
                        </v-layout>
                        <v-layout row justify-center>
                            <img src="../assets/icon_password.png" alt="" width="100px" height="100px" class="pa-3">
                            <v-divider vertical></v-divider>
                            <div style="background: #C4C4C4; opacity: 0.6;" class="rounded mx-3 px-4 pt-1 my-3">
                                <v-text-field label="Пароль" v-model="password" type="password"
                                              class="button-text">
                                </v-text-field>
                            </div>
                        </v-layout>
                    </v-layout>
                </div>
                <v-snackbar
                        v-model="snackbar"
                >
                    <span class="roboto" style="color: white;">{{ snackText }}</span>
                </v-snackbar>
                <div class="rounded mt-4" style="background: #20626A;">
                    <v-layout column>
                        <v-layout row justify-center>
                            <div v-for="(item, index) in [
                                ['Вход', login],
                                ['Регистрация', register],
                            ]" :key="index"
                                 style="background: #C4C4C4; opacity: 0.6; cursor: pointer; font-size: 14pt;"
                                 class="rounded mx-3 py-3 px-4 my-3 button-text"
                                 @click="item[1]">
                                {{ item[0] }}
                            </div>
                        </v-layout>
                    </v-layout>
                </div>
            </v-flex>
        </div>
    </div>
</template>

<script>
    import {db} from '../main';
    import router from '../router'

    export default {
        components: {},
        data: function () {
            return {
                uid: '',
                password: '',
                snackbar: false,
                snackText: '',
            }
        },
        methods: {
            login: function () {
                let vm = this;
                console.log("uid: ", vm.uid);
                db.ref('registered/' + vm.uid).once('value').then(function (snapshot) {
                    console.log("user info: ", snapshot.val());
                    console.log("user admin bool: ", snapshot.val().admin);
                    if (snapshot.val().password === vm.password) {
                        router.push({name: 'admin' in snapshot.val() && snapshot.val().admin === true ? 'rating' : 'motivation', params: {uid: vm.uid}})
                        vm.snackText = "Правильно.";
                    } else {
                        vm.snackText = "Неправильно.\nПопробуй .. еще .. раз.";
                    }
                    vm.snackbar = true;
                });
            },
            register: function () {
                let vm = this;
                console.log("uid: ", vm.uid);
                console.log('sdfsd', vm);
                db.ref('registered/' + vm.uid).set({
                    password: vm.password,
                });
                vm.snackbar = true;
                router.push({name: 'rating', params: {uid: vm.uid}})
            },
        },
    }
</script>

<style scoped lang="scss">
    .button-text {
        font-family: 'Roboto Light', arial, sans-serif;
        font-weight: 100;
        font-size: 20pt;
    }

    #bottom {
        background: #1D3538;
    }

    html, body, #app, section.section {
        height: calc(100%);
    }

    section.section {
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
    }
</style>