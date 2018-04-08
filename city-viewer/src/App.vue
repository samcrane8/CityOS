<template>
  <div id="app">
    <v-toolbar flat fixed style="background-color:#FFFFFF">
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer;color: #194769;font-size:30px;">
          CityOS
        </router-link>
      </v-toolbar-title>
      <v-spacer/>
      <v-toolbar-items v-if="!logged_in" class="hidden-sm-and-down">
        <v-btn style="color:#194769;" flat to="/login" >LOGIN</v-btn>
      </v-toolbar-items>
      <v-toolbar-items v-if="logged_in" class="hidden-sm-and-down">
        <v-btn style="color:#194769;" flat to="/map" >MAP</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <router-view absolute v-on:snackbar="_snackbar" v-on:change-toolbar-color="change_toolbar_color"/>
  </div>
</template>

<script>
import Vue from 'vue';
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from '@/router'
import API from './mixins/API.js'
import Vuetify from 'vuetify'
 
Vue.use(VueAxios, axios)
Vue.use(Vuetify, {
  theme: {
    primary: '#1d561a',
    secondary: '#b0bec5',
    accent: '#8c9eff',
    error: '#b71c1c'
  }
})

export default {
  mixins: [API],
  name: 'CityOS',
  data () {
    return {
      toolbar_color: "transparent",
      sidebar: false,
      logged_in: false,
      snackbar: false,
      mode: '',
      y: 'top',
      x: null,
      timeout: 6000,
      text: 'Clearance updated.',
      menuItems: [
      ],
      userMenu: [
        { title: 'Missions', path: '/missions', icon: 'home'},
        { title: 'New Mission', path: '/newmission', icon: 'lock'},
        { title: 'Drones', path: '/drones', icon: 'lock'}
      ],
      notLoggedIn: [

      ],
      settings_menu: [
        'profile',
        'settings',
        'sign out'
      ]
    }
  },
  methods: {
    change_toolbar_color(color) {
      this.toolbar_color = color
    },
    _snackbar(timeout,text) {
      this.timeout = timeout
      this.text = text
      this.snackbar = true
    },
    login() {
      this.logged_in = true
      this.menuItems = this.userMenu
    },
    _logoff() {
      this.logoff(response => {
        this.logged_in = false
        this.menuItems = this.notLoggedIn
        router.push('/')
      },
      error => {
        alert('Hmmm something went wrong with our servers when fetching stations!! Sorry!')
      })
    },
    mounted() {
      this.isLoggedIn(
        response => {
          if (response.data == 'True') {
            this.logged_in = true
            this.menuItems = this.userMenu
            this.toolbar_color = 'primary'
          } else {
            this.logged_in = false
            this.menuItems = this.notLoggedIn
            this.toolbar_color = 'transparent'
          }
        },
        error => {
          alert('Hmmm something went wrong with our servers when fetching stations!! Sorry!')
        })
    }
  }
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
