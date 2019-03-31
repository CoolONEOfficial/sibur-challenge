<template>
    <v-container class="rating justify-center">
        <h1 class="text-xs-center mt-5">Преимущества</h1>
        <div class="rounded dark pa-3">
            <v-container
                    style="height: 400px"
                    class="scroll-y px-3 rounded light py-4">
                <v-layout column>
                    <v-layout row v-for="item in list" :key="item" class="rounded dark ma-3 pa-3">
                        <h1 style="color: white;">{{ item.text }}</h1>
                        <v-spacer></v-spacer>
                        <img :src="`icon_${item.icon}.png`" alt="" width="70px" height="70px">
                    </v-layout>
                </v-layout>
            </v-container>
        </div>
    </v-container>
</template>

<script>
    import {db} from '../main';

    export default {
        name: "Motivation",
        data: function () {
            return {
                'list': [],
            };
        },
        created() {
            let vm = this;

            console.log("uid: ", this.$route.params.uid);
            db.ref('advantages/' + this.$route.params.uid).once(
                'value'
            ).then(
                function(snapshot) {
                    if(snapshot.val() != null) {
                        let val = snapshot.val();
                        console.log('advantages', val);
                        if(val instanceof Array) {
                            for (let item in val) {
                                vm.list.push(item);
                            }
                        }
                        else vm.list.push(val);
                    } else console.log('advantages is nulll!!!');
                }
            );
        }
    }
</script>

<style scoped>

</style>