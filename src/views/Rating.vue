<template>
    <v-container class="rating justify-center">
        <h1 class="text-xs-center mt-5">Leaderboard</h1>
        <v-layout row class="rounded dark my-5 pa-3" id="leader-list">
            <img src="../assets/icon_location.png" width="70px" height="70px" alt="" class="mr-3">
            <div class="rounded light px-4" style="width: 100%;">
                <v-select :items="branches.map(value => value.name)" @input="branchSelect($event)"
                          label="Филиал"></v-select>
            </div>
        </v-layout>
        <div class="rounded dark pa-3" v-show="branch != null">
            <v-container
                    style="height: 400px"
                    class="scroll-y px-3 rounded light pt-4">
                <div v-if="!list.empty || !loading">
                    <div class="px-3 pb-3"
                         v-for="(user, index) in list.slice(0, branch != null ? branch.countBeforeSeven : 0)"
                         :key="index">
                        <v-layout row>
                            <h2 style="color: black;">{{ index + 1 + ') ' + user.uid }}</h2>
                            <v-spacer/>
                            <div v-if="branch.countBeforeSeven <= 0 ? false : user.points === list[branch.countBeforeSeven + 1].points"
                                 class="rounded mr-3 pa-3" style="background: yellow;"></div>
                            <h2 style="color: black;">{{ user.points }}</h2>
                        </v-layout>
                    </div>
                </div>
                <div v-else>
                    <v-layout align-center justify-center fill-height>
                        <v-progress-circular
                                size="100"
                                :width="3"
                                color="white"
                                indeterminate
                        ></v-progress-circular>
                    </v-layout>
                </div>
            </v-container>
            <div v-if="branch != null && branch.countBeforeSeven >= 0">
                <div class="rounded light pa-2 my-2"></div>
            </div>
            <v-container v-if="branch != null && branch.countBeforeSeven >= 0"
                         style="height: 400px"
                         class="scroll-y px-3 rounded light pt-4">
                <div class="px-3 pb-3" v-for="(user, index) in list.slice(branch != null ? branch.countBeforeSeven : 0)"
                     :key="index">
                    <v-layout row>
                        <h2 style="color: black;">{{ (branch != null ? branch.countBeforeSeven : 0) + index + 1 + ') ' +
                            user.uid }}</h2>
                        <v-spacer/>
                        <div v-if="branch.countBeforeSeven <= 0 ? false : user.points === list[branch.countBeforeSeven - 1].points"
                             class="rounded mr-3 pa-3" style="background: yellow;"></div>
                        <h2 style="color: black;">{{ user.points }}</h2>
                    </v-layout>
                </div>
            </v-container>
        </div>
        <v-layout>
            <v-spacer/>
            <div v-show="branch != null" class="rounded px-4 py-3 mt-5 dark" style="cursor: pointer;" @click="refresh">
                <h1 v-if="!loading">Refresh</h1>
                <v-progress-circular
                        v-else
                        size="100"
                        :width="3"
                        color="white"
                        indeterminate
                ></v-progress-circular>

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
                loading: false,
                branches: [
                    {
                        name: "Альдераан",
                        countBeforeSeven: -1,
                    },
                    {
                        name: 'Ба́мблби',
                        countBeforeSeven: -1,
                    },
                    {
                        name: 'Гундабад',
                        countBeforeSeven: -1,
                    },
                    {
                        name: 'Изенгард',
                        countBeforeSeven: -1,
                    },
                    {
                        name: 'Империя сов Илопса',
                        countBeforeSeven: -1,
                    },
                    {
                        name: 'Кашкай',
                        countBeforeSeven: -1,
                    },
                    {
                        name: 'Лесные эдьфы',
                        countBeforeSeven: -1,
                    },
                    {
                        name: 'Лихолесье',
                        countBeforeSeven: -1,
                    },
                    {
                        name: 'Лориэн',
                        countBeforeSeven: -1,
                    },
                    {
                        name: 'Мглистые горы',
                        countBeforeSeven: 97,
                    },
                    {
                        name: 'Минас-Тирит',
                        countBeforeSeven: 27,
                    },
                    {
                        name: 'Мория',
                        countBeforeSeven: 164,
                    },
                    {
                        name: 'Одинокая гора',
                        countBeforeSeven: 140,
                    },
                    {
                        name: 'Озерный город',
                        countBeforeSeven: 309,
                    },
                    {
                        name: 'Площадь Гриммо',
                        countBeforeSeven: -1,
                    },
                    {
                        name: 'Ривенделл',
                        countBeforeSeven: 19,
                    },
                    {
                        name: 'Рохан',
                        countBeforeSeven: -1,
                    },
                    {
                        name: 'Сен-Мартен',
                        countBeforeSeven: 17,
                    },
                    {
                        name: 'Сингапур',
                        countBeforeSeven: -1,
                    },
                    {
                        name: 'Синие горы',
                        countBeforeSeven: 447,
                    },
                    {
                        name: 'Суллуст ',
                        countBeforeSeven: -1,
                    },
                    {
                        name: 'Хельмова Падь',
                        countBeforeSeven: -1,
                    },
                    {
                        name: 'Хоббитон',
                        countBeforeSeven: -1,
                    },
                    {
                        name: 'Шир',
                        countBeforeSeven: -1,
                    },
                ],
            }
                ;
        },
        methods: {
            branchSelect(br) {
                this.branch = this.branches[this.branches.findIndex(value => value.name === br)];
                console.log("loggg", this.branch);
                this.reload();
            },
            reload() {
                let vm = this;

                this.list.splice(0, this.list.length);

                db.ref('rating/' + this.branch.name).orderByChild('points').once(
                    'value'
                ).then(
                    function (snapshot) {
                        let rating = snapshot.val();

                        if (rating == null || rating.empty) vm.refresh();
                        else
                            for (let uid in rating) {
                                let points = rating[uid].points;

                                vm.list.push({
                                    uid: uid,
                                    points: points,
                                });
                            }

                        vm.list.sort(
                            function (a, b) {
                                return b.points - a.points;
                            }
                        );
                    }
                );
            },
            refresh() {
                this.loading = true;

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

              //  let targets = new Map();

                let advantages = new Map();

                // let addTarget = function (uid, icon, text) {
                //     targets.set(uid, [icon, text]);
                // };
                let addAdvantage = function (uid, icon, text) {
                    advantages.set(uid, [icon, text]);
                };

                Promise.all([
                    db.ref('users').orderByChild('branch').equalTo(vm.branch.name)
                        .once(
                            'value'
                        ).then(
                        function (snapshot) {
                            let users = snapshot.val();

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
                    db.ref('chilren').orderByChild('branch').equalTo(vm.branch.name)
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
                                    addAdvantage(uid, "advantage", "У вас есть " + val.relationDegree.toLowerCase());

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
                    db.ref('adoptedChilren').orderByChild('branch').equalTo(vm.branch.name)
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

                                    addAdvantage(uid, 'advantage', "Вы взяли приемного ребенка");

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
                    db.ref('achievements').orderByChild('branch').equalTo(vm.branch.name)
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

                                    addAdvantage(uid, "advantage", `Вы заработали "${val.name}"`);


                                    // ...

                                } else console.log("uid not found!");
                            }

                            console.log("achievements done", rating);
                        }
                    ),
                    db.ref('vouchers').orderByChild('branch').equalTo(vm.branch.name)
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
                    db.ref('promotions').orderByChild('branch').equalTo(vm.branch.name)
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

                                    addAdvantage(uid, "advantage", "Вы получили повышение!");

                                    // ...
                                } else console.log("uid not found!");
                            }

                            console.log("promotions done", rating);
                        }
                    ),
                    db.ref('rating/' + vm.branch.name).remove(),
                ]).then(
                    function () {
                        console.log("ALL done :tada:", rating);

                        let promises = [];

                        advantages.forEach(
                            (advantage, uid) => {
                                console.log("uid: ", uid);
                                console.log("adv", advantage);
                                promises.push(db.ref(
                                    'advantages/' + uid
                                ).set({
                                    icon: advantage[0],
                                    text: advantage[1],
                                }));
                            }
                        );

                        rating.forEach(
                            (points, uid) => {
                                console.log("uid: ", uid);
                                console.log("points", points);
                                promises.push(db.ref(
                                    'rating/' + vm.branch.name + '/' + uid
                                ).set({
                                    points: points,
                                }));
                            }
                        );

                        Promise.all(promises).then(
                            function () {
                                console.log('All pushed!');

                                vm.reload();

                                vm.loading = false;
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