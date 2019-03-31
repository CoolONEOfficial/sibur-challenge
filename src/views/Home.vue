<template>
    <div class="home" id="app">
        <section class="section has-text-centered">
            <h1 class="text-xs-center">
                Добро<br>пожаловать!
            </h1>
        </section>
        <div id="bottom">
        <v-flex xs10 class="offset-xs1 py-5">
            <div class="rounded py-4" style="background: #20626A; width: 100%;">
                <v-layout column>
                    <v-layout row justify-center>
                        <img src="../assets/icon_uid.png" alt="" width="100px" height="100px" class="pa-3">
                        <v-divider vertical></v-divider>
                        <div style="background: #C4C4C4; opacity: 0.6;" class="rounded mx-3 px-3 my-3">
                            <v-text-field label="ID" v-model="uid"
                                          class="button-text">
                            </v-text-field>
                        </div>
                    </v-layout>
                    <v-layout row justify-center>
                        <img src="../assets/icon_password.png" alt="" width="100px" height="100px" class="pa-3">
                        <v-divider vertical></v-divider>
                        <div style="background: #C4C4C4; opacity: 0.6;" class="rounded mx-3 px-3 my-3">
                            <v-text-field label="Пароль" v-model="password"
                                          class="button-text">
                            </v-text-field>
                        </div>
                    </v-layout>
                </v-layout>
            </div>
            <div class="rounded mt-4" style="background: #20626A;">
                <v-layout column>
                    <v-layout row justify-center>
                        <div v-for="(item, index) in [
                                ['Вход', login],
                                ['Авторизация', register],
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
    import router from '../router'

    export default {
        components: {},
        data: function () {
            return {
                uid: '',
                password: '',
            }
        },
        methods: {
            login: function () {
                // let vm = this;
                // console.log("uid: ", vm.uid);
                // db.ref('registered/' + vm.uid).once('value').then(function (snapshot) {
                //     if (snapshot.val().password === vm.password)
                //         console.log("zaebumba");
                //     else console.log("hueva");
                // });
                router.push({ name: 'rating', params: { uid: this.uid } })
            },
            register: function () {
                // let vm = this;
                // console.log("uid: ", vm.uid);
                // console.log('sdfsd', vm);
                // db.ref('registered/' + vm.uid).set({
                //     password: vm.password,
                // });
                router.push({ name: 'rating', params: { uid: this.uid } })
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