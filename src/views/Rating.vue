<template>
    <v-container class="rating justify-center">
        <h1 class="text-xs-center mt-5">Leader board</h1>
        <v-layout row class="rounded dark my-5 pa-3" id="leader-list">
            <img src="../assets/icon_location.png" width="70px" height="70px" alt="" class="mr-3">
            <div class="rounded light px-3" style="width: 100%;">
                <v-select :items="branches" v-model="branch" label="Филиал"></v-select>
            </div>
        </v-layout>
        <div class="rounded dark pa-3">
            <h3 class="roboto text-xs-center pb-3" style="font-size: 30pt;">Список</h3>
            <v-container
                    style="height: 400px"
                    class="scroll-y px-3 rounded light pt-3">
                <div class="px-3 pb-3" v-for="(user, index) in list" :key="index">
                    <v-layout row>
                        <h3>{{ index + 1 + ') ' + user.uid }}</h3>
                        <v-spacer/>
                        <h2>{{ user.points }}</h2>
                    </v-layout>
                </div>
            </v-container>
        </div>
        <v-layout>
            <v-spacer/>
            <div class="rounded px-4 py-3 mt-5 dark" style="cursor: pointer;" @click="refresh">
                <h1>Refresh</h1>
            </div>
            <v-spacer/>
        </v-layout>
    </v-container>
</template>

<script>
    import {db} from "../main";

    export default {
        name: "Rating",
        data() {
            return {
                branch: null,
                list: [],
                branches: [
                    'Альдераан',
                    'Ба́мблби',
                    'Гундабад',
                    'Изенгард',
                    'Империя сов Илопса',
                    'Кашкай',
                    'Лесные эдьфы',
                    'Лихолесье',
                    'Лориэн',
                    'Мглистые горы',
                    'Минас-Тирит',
                    'Мория',
                    'Одинокая гора',
                    'Озерный город',
                    'Площадь Гриммо',
                    'Ривенделл',
                    'Рохан',
                    'Сен-Мартен',
                    'Сингапур',
                    'Синие горы',
                    'Суллуст ',
                    'Хельмова Падь',
                    'Хоббитон',
                    'Шир',
                ],
            };
        },
        watch: {
            branch(val) {
                if (val != null)
                    this.reload();
            }
        },
        methods: {
            reload() {
                let vm = this;

                this.list.splice(0, this.list.length);

                db.ref('rating/' + this.branch).orderByChild('points').once(
                    'value'
                ).then(
                    function (snapshot) {
                        let rating = snapshot.val();

                        for (let uid in rating) {
                            let points = rating[uid].points;

                            vm.list.push({
                                uid: uid,
                                points: points,
                            });
                        }
                    }
                );
            },
            refresh() {
                let vm = this;

                let rating = new Map();

                let getPoints = function (key) {
                    return rating.get(key) || 0;
                };

                let addPoints = function (uid, points) {
                    rating.set(uid, getPoints(uid) + points);
                };

                let removePoints = function (uid, points) {
                    rating.set(uid, getPoints(uid) - points);
                };

                Promise.all([
                    db.ref('users').orderByChild('branch').equalTo(vm.branch)
                        .once(
                            'value'
                        ).then(
                        function (snapshot) {
                            let users = snapshot.val();

                            //console.log(users);

                            for (let key in users) {
                                let val = users[key];
                                let uid = val.uid;
                                if (uid != null) {
                                    // console.log("mUId: ", uid);

                                    // Experience
                                    let exp = val.exp;
                                    if (exp != null) {
                                        // console.log("exp not null",);

                                        let expYears = parseInt(exp.match(/\d+/)[0], 10);
                                        //console.log("exp years", expYears);

                                        if (expYears > 10) {
                                            addPoints(val.uid, 80);
                                        } else if (expYears > 7) {
                                            addPoints(val.uid, 50);
                                        } else if (expYears > 5) {
                                            addPoints(val.uid, 30);
                                        } else if (expYears > 3) {
                                            addPoints(val.uid, 20);
                                        } else if (expYears > 1) {
                                            addPoints(val.uid, 10);
                                        }
                                    }

                                    // Family status
                                    let familyStatus = val.familyStatus;
                                    if (familyStatus != null) {
                                        if (familyStatus.includes('брак')) {
                                            addPoints(uid, 15);
                                        } else if (familyStatus.includes("разведен")) {
                                            addPoints(uid, 20);
                                        } else if (familyStatus.includes('вдов')) {
                                            addPoints(uid, 30);
                                        } else if (familyStatus.includes('одинок')) {
                                            addPoints(uid, 25);
                                        }
                                    } else console.log('family status is null!');
                                } else console.log("uid not found!");
                            }

                            console.log("users done", rating);
                        }
                    ),
                    db.ref('chilren').orderByChild('branch').equalTo(vm.branch)
                        .once(
                            'value'
                        ).then(
                        function (snapshot) {
                            let children = snapshot.val();

                            for (let key in children) {
                                let val = children[key];
                                let uid = val.uid;
                                if (uid != null) {
                                    addPoints(uid, 20);

                                    // // Bithday
                                    // let bithdayStr = val.bithday;
                                    // if(bithdayStr != null) {
                                    //     let age = new Date(Date.now()).getFullYear() - new Date(bithdayStr).getFullYear();
                                    //
                                    //     if(age < )
                                    // } else console.log("bithday not found!");
                                } else console.log("uid not found!");
                            }

                            console.log("children done", rating);
                        }
                    ),
                    db.ref('adoptedChilren').orderByChild('branch').equalTo(vm.branch)
                        .once(
                            'value'
                        ).then(
                        function (snapshot) {
                            let adoptedChildren = snapshot.val();

                            for (let key in adoptedChildren) {
                                let val = adoptedChildren[key];
                                let uid = val.uid;
                                if (uid != null) {
                                    addPoints(uid, 30);

                                    // // Bithday
                                    // let bithdayStr = val.bithday;
                                    // if(bithdayStr != null) {
                                    //     let age = new Date(Date.now()).getFullYear() - new Date(bithdayStr).getFullYear();
                                    //
                                    //     if(age < )
                                    // } else console.log("bithday not found!");
                                } else console.log("uid not found!");
                            }

                            console.log("adapted children done", rating);
                        }
                    ),
                    db.ref('achievements').orderByChild('branch').equalTo(vm.branch)
                        .once(
                            'value'
                        ).then(
                        function (snapshot) {
                            let achievements = snapshot.val();

                            for (let key in achievements) {
                                let val = achievements[key];
                                let uid = val.uid;
                                if (uid != null) {
                                    addPoints(uid, 15);

                                    // ...

                                } else console.log("uid not found!");
                            }

                            console.log("achievements done", rating);
                        }
                    ),
                    db.ref('vouchers').orderByChild('branch').equalTo(vm.branch)
                        .once(
                            'value'
                        ).then(
                        function (snapshot) {
                            let vouchers = snapshot.val();

                            for (let key in vouchers) {
                                let val = vouchers[key];
                                let uid = val.uid;
                                if (uid != null) {
                                    let ban = val.ban;
                                    if (ban >= 1) {
                                        // HUAK
                                        removePoints(uid, getPoints(uid));
                                    }

                                    // // Bithday
                                    // let bithdayStr = val.bithday;
                                    // if(bithdayStr != null) {
                                    //     let age = new Date(Date.now()).getFullYear() - new Date(bithdayStr).getFullYear();
                                    //
                                    //     if(age < )
                                    // } else console.log("bithday not found!");
                                } else console.log("uid not found!");
                            }

                            console.log("vouchers done", rating);
                        }
                    ),
                    db.ref('promotions').orderByChild('branch').equalTo(vm.branch)
                        .once(
                            'value'
                        ).then(
                        function (snapshot) {
                            let promotions = snapshot.val();

                            for (let key in promotions) {
                                let val = promotions[key];
                                let uid = val.uid;
                                if (uid != null) {
                                    addPoints(uid, 15);

                                    // ...
                                } else console.log("uid not found!");
                            }

                            console.log("promotions done", rating);
                        }
                    ),
                    db.ref('rating/' + vm.branch).remove(),
                ]).then(
                    function () {
                        console.log("ALL done :tada:", rating);

                        let promises = [];

                        rating.forEach(
                            (points, uid) => {
                                console.log("uid: ", uid);
                                console.log("points", points);
                                promises.push(db.ref(
                                    'rating/' + vm.branch + '/' + uid
                                ).set({
                                    points: points,
                                }));
                            }
                        );

                        Promise.all(promises).then(
                            function () {
                                console.log('All pushed!');

                                vm.reload();
                            }
                        );
                    }
                );
                console.log(this.branch);
            }
        },
    }
</script>

<style scoped>
</style>