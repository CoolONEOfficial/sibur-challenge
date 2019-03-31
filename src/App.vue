<template>
  <v-app>
    <Header/>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import Header from "./components/Header";

export default {
  name: 'App',
  components: {
    Header,
  },
  data () {
    return {
      //
    }
  }
}
</script>

<style lang="scss">
  @font-face {
    font-family: 'Roboto Light';
    src: url('./assets/fonts/Roboto-Light.woff2') format('woff2'),
    url('./assets/fonts/Roboto-Light.woff') format('woff');
    font-weight: 100;
    font-style: normal;
  }

  #app {
    background: #20626A;
  }

  .rounded {
    border-radius: 40px;
  }

  h1 {
    font-family: 'Roboto Light', arial, sans-serif;
    font-weight: 100;
    font-size: 40pt;
    color: #C9E8EA;
  }

  .roboto {
    font-family: 'Roboto Light', arial, sans-serif;
    font-weight: 100;
    color: #C9E8EA;
  }

  .light {
    background: #C4C4C4;
    opacity: 0.6;
  }

  .dark {
    background: #1D3538;
    opacity: 0.5;
  }
</style>
