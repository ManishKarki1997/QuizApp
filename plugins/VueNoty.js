import Vue from 'vue'
import VueNoty from 'vuejs-noty'
import 'vuejs-noty/dist/vuejs-noty.css'
import 'noty/lib/noty.css'

Vue.use(VueNoty, {
    timeout: 1500,
    progressBar: true,
    layout: 'topRight'
});