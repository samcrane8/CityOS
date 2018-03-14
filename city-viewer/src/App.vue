<template>
  <div id="app">
    <v-toolbar flat fixed style="background-color:#FFFFFF">
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer;color: #194769;font-size:30px;margin:20px;">
          CityOS
        </router-link>
      </v-toolbar-title>
      <v-spacer/>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn style="color:#194769;" flat to="/map" >MAP</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <router-view absolute/>
  </div>
</template>

<script>
import Vue from 'vue'
import Vuetify from 'vuetify'
 
Vue.use(Vuetify)

export default {
  name: 'App'
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    height:100px;
    background-color: #F6F6E9;
  }
</style>
