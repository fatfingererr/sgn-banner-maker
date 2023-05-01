import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VideoBg from 'vue-videobg'
 
Vue.config.productionTip = false

import "../public/css/materialdesignicons.min.css";
import 'swiper/swiper-bundle.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import { BootstrapVue } from 'bootstrap-vue'
var VueScrollTo = require('vue-scrollto');
import Scrollspy from 'vue2-scrollspy';
import VueYoutube from 'vue-youtube'
import vueVimeoPlayer from 'vue-vimeo-player'
import VueMasonry from 'vue-masonry-css'

Vue.use(VueScrollTo, {
  duration: 3000,
  easing: "ease"
})

Vue.use(BootstrapVue)
Vue.use(Scrollspy);
Vue.use(VueYoutube)
Vue.use(vueVimeoPlayer)
Vue.use(VueMasonry)
Vue.component('video-bg', VideoBg)


new Vue({
  router,
  components: { VideoBg },
  render: h => h(App)
}).$mount('#app')
