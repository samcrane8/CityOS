<template>
  <v-layout style="width:100%;height:100%;" fill-height>
    <v-card
      flat
      style="width:35%;top:64px;height:500px;overflow:scroll"
    >
      <v-card-text>
        <v-expansion-panel flat>
          <h3 style="margin-top:5%"> Devices </h3>
          <v-expansion-panel-content flat v-for="(item,i) in devices" :key="i">
            <div slot="header" @click="on_expand(item)">Device #{{i}}</div>
            <v-card flat>
              <v-card-text>This camera is sitting on the corner between North Avenue Techwood, overlooking traffic in the intersection.</v-card-text>
              <v-card-text>The stream url is: {{item.stream_url}}.</v-card-text>
              <v-flex style="margin-left:10px;margin-right:10px">
                <h3> VIDEO WILL BE HERE</h3>
              </v-flex>
              <v-layout row>
                <v-flex class="text-xs-center">
                  <v-btn 
                    flat 
                    outline 
                    dark
                    @click="move_map(item.coordinates)"
                    > 
                      GOTO 
                  </v-btn>
                  <v-btn flat outline dark> STREAM </v-btn>
                </v-flex>
              </v-layout>
            </v-card>
          </v-expansion-panel-content>
          <v-expansion-panel-content>
            <div slot="header">New Device</div>
            <v-card>
              <v-card-text>This will be where new devices can be added.</v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <video ref="videoRef" src="http://52.91.28.88:8080/hls/live.m3u8" id="video-container" type="application/x-mpegURL" width="100%" controls class="video-js">
        </video>
      </v-card-text>
    </v-card>
    <v-flex>
      <gmap-map
        ref="map"
        class="map-panel"
        :center="center"
        :zoom="zoom"
        map-type-id="hybrid"
        :options="{minZoom: 2, scrollwheel: true, disableDefaultUI: true, draggable: true, zoomControl: true}"
      >
        <gmap-marker
        :key="index"
        v-for="(device, index) in devices"
        :position="device.coordinates"
        @click="move_map(device.coordinates)"
        />
      </gmap-map>
    </v-flex>
  </v-layout>
</template>

<script>
import * as VueGoogleMaps from 'vue2.1-google-maps';
import Vue from 'vue';
import Vuetify from 'vuetify';
import API from '../mixins/API.js'
import VueVideoPlayer from 'vue-video-player'

import videojs from'video.js'
import videojsHLS from 'videojs-contrib-hls'


Vue.use(VueGoogleMaps, {
    load: {
      installComponents: true,
      key: 'AIzaSyCtbjOc1SD9ozYtUVzrtxd0PDxRpN-0JGs',
    }
  });


export default {
  mixins: [API],
  name: 'MapPage',
  data () {
  	return {
  		center: {
        lat: 33.778,
        lng: -84.396
      },
      zoom:17,
      devices: []
  	}
  },
  methods: {
    move_map(coordinates){
      this.center = {
        lat: coordinates.lat + Math.random() * 0.0001,
        lng: coordinates.lng + Math.random() * 0.0001
      }
    },
    on_expand(device) {
      this.$refs.videoRef.src = "http://iandevlin.github.io/mdn/video-player/video/tears-of-steel-battle-clip-medium.mp4";
      //this.$refs.videoRef.play();
    }
  },
  mounted() {
    this.get_user_devices(response =>{
      if (response.status == 200) {
        this.devices = response.data

        for(var i = 0; i < this.devices.length; i++) {
          this.devices[i]["playerOptions"] = {
            // videojs options
            muted: true,
            language: 'en',
            playbackRates: [0.7, 1.0, 1.5, 2.0],
            sources: [{
              type: "application/x-mpegurl",
              src: this.devices[i]["stream_url"]
            }],
            poster: "/static/images/author.jpg",
            width: '380',
            height: '250px'
          }
          var coordinates = {
            lat: this.devices[i]["location"]["geometry"]["coordinates"][0],
            lng: this.devices[i]["location"]["geometry"]["coordinates"][1]
          }
          this.devices[i]["coordinates"] = coordinates
        }
      }
    },
    error => {
      alert('Something broke!')
    })
  }
}
</script>

<style>

.map-panel{
	height:100vh;
	overflow:auto;
}
</style>
