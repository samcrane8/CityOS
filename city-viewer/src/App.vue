<template>
  <div id="app">
    <v-toolbar flat fixed color="transparent" :style="toolbar_text">
      <v-toolbar-title>
        <router-link v-if="!logged_in" to="/" tag="span" style="cursor:pointer;font-size:30px;color:white;">
          CityOS
        </router-link>
        <router-link v-if="logged_in" to="/map" tag="span" style="cursor: pointer;font-size:30px;color:black;">
          CityOS
        </router-link>
      </v-toolbar-title>
      <v-spacer/>
      <v-toolbar-items v-if="!logged_in" class="hidden-sm-and-down">
        <v-btn flat to="/login" :style="toolbar_text">LOGIN</v-btn>
      </v-toolbar-items>
      <v-toolbar-items v-if="logged_in" class="hidden-sm-and-down">
        <v-btn flat @click="_logoff" :style="toolbar_text">LOGOFF</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <router-view absolute v-on:snackbar="_snackbar" v-on:change-toolbar-color="change_toolbar_color" v-on:login="login"/>
    <v-snackbar
      :timeout="timeout"
      :top="y === 'top'"
      :bottom="y === 'bottom'"
      :right="x === 'right'"
      :left="x === 'left'"
      :multi-line="mode === 'multi-line'"
      :vertical="mode === 'vertical'"
      v-model="snackbar"
      color="white"
    >
      <v-flex class="text-xs-center">
        <span style="color:black"> {{ text }} </span>
      </v-flex>
    </v-snackbar>
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
      items: [{title:'guy'}],
      toolbar_color: "transparent",
      toolbar_text: "color:white",
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
        this._snackbar(2000,'Logged off.')
        router.push('/')
      },
      error => {
        alert('Hmmm something went wrong with our servers when fetching stations!! Sorry!')
      })
    }
  },  
  mounted() {
    this.isLoggedIn(
      response => {
        if (response.data == 'True') {
          this.logged_in = true
          this.menuItems = this.userMenu
          this.toolbar_color = 'black'
        } else {
          this.logged_in = false
          this.menuItems = this.notLoggedIn
          this.toolbar_color = 'transparent'
          router.push('/')
        }
      },
      error => {
        alert('Hmmm something went wrong with our servers when fetching stations!! Sorry!')
      })
  }
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height:100px;
    background-color: white;
  }
</style>
