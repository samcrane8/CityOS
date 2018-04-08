//API JAVASCRIPT MIXIN

// define a mixin object
import Vue from 'vue';
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from '@/router'

Vue.use(VueAxios, axios)

export default {
  data () {
  	return {
  		base_url: 'http://34.201.221.7:5000'
      //base_url: 'http://localhost:5000'
  	}
  },
  methods: {
    //USER API CALLS
    isLoggedIn(success, failure) {
    	var url = this.base_url + '/v1_0/isLoggedIn'
      axios.get(url, {withCredentials:true})
        .then(success)
        .catch(failure);
    },
    is_government_official(success, failure) {
      var url = this.base_url + '/v1_0/is_government_official'
      axios.get(url, {withCredentials:true})
        .then(success)
        .catch(failure);
      },
    login(email, password, success, failure) {
    	var body = {'email': email, 'password': password}
      var url = this.base_url + '/v1_0/login'
      axios.post(url,body, {withCredentials:true})
        .then(success)
        .catch(failure);
    },
    logoff(success, failure) {
    	var url = this.base_url + '/v1_0/logoff'
      axios.get(url, {withCredentials:true})
        .then(success)
        .catch(failure);
    },
    logoff_v1_1(success, failure) {
      var url = this.base_url + '/v1_1/logoff'
      axios.get(url, {withCredentials:true})
        .then(success)
        .catch(failure);
    },
    register_user(email, password, name, success, failure) {
      var body = {'email': email, 'password': password, 'name': name, 'account_type': "operator"}
      var url = this.base_url + '/v1_0/register_user'
      axios.post(url,body, {withCredentials:true})
        .then(success)
        .catch(failure);
    },
    list_all_users(success, failure) {
      var url = this.base_url + '/v1_0/list_all_users'
      axios.get(url, {withCredentials:true})
        .then(success)
        .catch(failure);
    },
    get_user_info(success, failure) {
      var url = this.base_url + '/v1_0/get_user_info'
      axios.get(url, {withCredentials:true})
        .then(success)
        .catch(failure);
    },
    update_user_info(user_info, success, failure) {
      var url = this.base_url + '/v1_0/update_user_info'
      axios.post(url,user_info, {withCredentials:true})
        .then(success)
        .catch(failure);
    },

    //DRONE API CALLS
    get_user_drones(success, failure){
      var url = this.base_url + '/v1_1/get_user_drones'
      axios.get(url, {withCredentials:true})
        .then(success)
        .catch(failure);
    },
    register_drone(description, success, failure) {
      var url = this.base_url + '/v1_0/register_drone'
      var body = {'description': description}
      axios.post(url,body, {withCredentials:true})
        .then(success)
        .catch(failure);
    },
    register_drone_v1_1(description, manufacturer, type, color, number_of_blades, success, failure) {
      var url = this.base_url + '/v1_1/register_drone'
      var body = {'description': description,
              "manufacturer": manufacturer,
              "type": type,
              "color": color,
              "number_of_blades": number_of_blades}
      axios.post(url,body, {withCredentials:true})
        .then(success)
        .catch(failure);
    },
    delete_drone(drone_array, success, failure) {
      var url = this.base_url + '/v1_0/delete_drone'
      axios.post(url,drone_array, {withCredentials:true})
        .then(success)
        .catch(failure);
    },
    //MISSION API CALLS
    register_mission(title, area, description, starts_at, ends_at, success, failure) {
      var body = {'title': title, 'area': area, 'description': description,
                  'starts_at': starts_at, 'ends_at': ends_at}
      var url = this.base_url + '/v1_0/register_mission'
      axios.post(url,body, {withCredentials:true})
        .then(success)
        .catch(failure);
    },
    register_mission_v1_1(title, area, description, starts_at, ends_at, type, success, failure) {
      var body = {'title': title, 'area': area, 'description': description,
                  'starts_at': starts_at, 'ends_at': ends_at, 'type': type}
      var url = this.base_url + '/v1_1/register_mission'
      axios.post(url,body, {withCredentials:true})
        .then(success)
        .catch(failure);
    },
    get_mission_drones(mission_id, success, failure) {
      var body = {'mission_id': mission_id}
      var url = this.base_url + '/v1_0/get_mission_drones'
      axios.post(url,body, {withCredentials:true})
        .then(success)
        .catch(failure);
    },
    get_user_missions(success, failure){
      var url = this.base_url + '/v1_0/get_user_missions'
      axios.get(url, {withCredentials:true})
        .then(success)
        .catch(failure);
    },
    get_mission_info(mission_id, success, failure){
      var body = {'mission_id': mission_id}
      var url = this.base_url + '/v1_0/get_mission_info'
      axios.post(url, body, {withCredentials:true})
        .then(success)
        .catch(failure);
    },
    get_mission_info_v1_1(mission_id, success, failure){
      var body = {'mission_id': mission_id}
      var url = this.base_url + '/v1_1/get_mission_info'
      axios.post(url, body, {withCredentials:true})
        .then(success)
        .catch(failure);
    },
    add_drone_to_mission(drone_id, mission_id, operator_id, success, failure) {
      var body = {'drone_id': drone_id, 'mission_id': mission_id, 'operator_id': operator_id}
      var url = this.base_url + '/v1_0/add_drone_to_mission'
      axios.post(url,body, {withCredentials:true})
        .then(success)
        .catch(failure);
    },
    get_missions(success, failure){
      var url = this.base_url + '/v1_0/get_missions'
      axios.get(url, {withCredentials:true})
        .then(success)
        .catch(failure);
    },
    get_missions_v1_1(starts_at, ends_at, success, failure){
      var body = {'starts_at': starts_at, 'ends_at': ends_at}
      var url = this.base_url + '/v1_1/get_missions'
      axios.post(url,body, {withCredentials:true})
        .then(success)
        .catch(failure);
    },
    get_possible_mission_conflicts(starts_at, ends_at, success, failure){
      var body = {'starts_at': starts_at, 'ends_at': ends_at}
      var url = this.base_url + '/v1_1/get_possible_mission_conflicts'
      axios.get(url,body, {withCredentials:true})
        .then(success)
        .catch(failure);
    },
    delete_mission(mission_id, success, failure) {
      var body = {'mission_id': mission_id}
      var url = this.base_url + '/v1_0/delete_mission'
      axios.post(url,body, {withCredentials:true})
        .then(success)
        .catch(failure);
    },
    get_active_missions(success, failure){
      var url = this.base_url + '/v1_1/get_active_missions'
      axios.get(url, {withCredentials:true})
        .then(success)
        .catch(failure);
    },
    get_past_missions(success, failure){
      var url = this.base_url + '/v1_1/get_past_missions'
      axios.get(url, {withCredentials:true})
        .then(success)
        .catch(failure);
    },
    // Details must be a dictionary with any combination
    // of 'area', 'description', and 'title'. If you don't
    // want to change a value, don't put it in the
    // dictionary, just leave it out. Ex.:
    // to change area, and title:
    // {
    //   'area': <area description>,
    //   'title': 'New Title'
    // }
    // to change title and description:
    // {
    //   'title': 'New Title',
    //   'description': 'New description.'
    // }
    edit_mission_details(details, success, failure) {
      var url = this.base_url + '/v1_0/edit_mission_details'
      axios.post(url,details, {withCredentials:true})
        .then(success)
        .catch(failure);
    },
    // Details must be a dictionary with any combination
    // of 'area', 'description', 'title', 'type', 'starts_at', 'ends_at'. If you don't
    // want to change a value, don't put it in the
    // dictionary, just leave it out. Ex.:
    // to change area, and title and type and starts_at:
    // {
    //   'area': <area description>,
    //   'title': 'New Title'
    //   'type': 'Commercial',
    //   'starts_at': <datetime>
    // }
    // to change title and description and ends_at:
    // {
    //   'title': 'New Title',
    //   'description': 'New description.',
    //   'ends_at': <datetime>
    // }
    edit_mission_details_v1_1(details, success, failure) {
      var url = this.base_url + '/v1_1/edit_mission_details'
      axios.post(url,details, {withCredentials:true})
        .then(success)
        .catch(failure);
    },
    edit_clearance(mission_id,new_clearance_state, success, failure) {
      var url = this.base_url + '/v1_0/edit_clearance'
      var body = {'mission_id' : mission_id, 'new_clearance_state': new_clearance_state}
      axios.post(url,body, {withCredentials:true})
        .then(success)
        .catch(failure);
    }
  }
}