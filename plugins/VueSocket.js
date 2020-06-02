import Vue from 'vue'
import store from '../store'
import VueSocketIO from 'vue-socket.io'
import SocketIO from "socket.io-client"

Vue.use(new VueSocketIO({
    debug: false,
    connection: process.env.baseUrl,
    vuex: {
        store,
    },
}))
