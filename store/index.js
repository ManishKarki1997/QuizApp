import VuexPersist from 'vuex-persist';

const vuexLocalStorage = new VuexPersist({
    key: 'quizapp',
    // storage: window.localStorage,
    reducer: state => ({
        user: state.user,
        isLoggedIn: state.isLoggedIn,
        jwtToken: state.jwtToken,
        preferredColorScheme: state.preferredColorScheme,
    })
})

import state from './state.js'
import mutation from './mutations.js'
import action from './actions.js'
import getters from './getters.js'

export default {
    state,
    mutation,
    action,
    getters,
    plugins: [vuexLocalStorage.plugin]
}