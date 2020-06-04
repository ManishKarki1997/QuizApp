import Vue from 'vue'
// import store from '../store'
import VueSocketIO from 'vue-socket.io'
import SocketIO from "socket.io-client"



export default ({ app: { store, router } }) => {
    const socket = SocketIO('http://localhost:4000');

    // socket.on('connect', () => {
    //     store.commit('setUserSocketId', socket.id);
    // })



    Vue.use(new VueSocketIO({
        debug: false,
        connection: process.env.baseUrl,
        // vuex: {
        //     store,
        // },
    }))
}


