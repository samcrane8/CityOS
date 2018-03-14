<template>
    <gmap-map
      ref="map"
      class="map-panel"
      :center="center"
      :zoom="zoom"
      map-type-id="hybrid"
      :options="{minZoom: 2, scrollwheel: true, disableDefaultUI: true, draggable: true, zoomControl: true}"
    >
    </gmap-map>
</template>

<script>
import * as VueGoogleMaps from 'vue2.1-google-maps';
import Vue from 'vue';

Vue.use(VueGoogleMaps, {
    load: {
      installComponents: true,
      key: 'AIzaSyCtbjOc1SD9ozYtUVzrtxd0PDxRpN-0JGs',
    }
  });

export default {
  name: 'MapPage',
  data () {
  	return {
  		center: {
          lat: 33.778,
          lng: -84.396
        },
        zoom:17
  	}
  }
}
</script>

<style>

.map-panel{
	height:100vh;
	overflow:auto;
}
</style>
