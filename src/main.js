import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import VueFire from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/database'

Vue.config.productionTip = false

Vue.use(VueFire)

firebase.initializeApp({
  apiKey: "AIzaSyAXU_eUd9BnzTrx5Bpgc2CCpgW-2Tmi3ew",
  authDomain: "sibur-challenge.firebaseapp.com",
  databaseURL: "https://sibur-challenge.firebaseio.com",
  projectId: "sibur-challenge",
  storageBucket: "sibur-challenge.appspot.com",
  messagingSenderId: "574049844984"
});
export const db = firebase.database()

new Vue({
  router,
  el: '#app',
  render: h => h(App),
  data: {
    window: {
      width: 0,
      height: 0
    }
  },
  created() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;
    }
  }
}).$mount('#app')
