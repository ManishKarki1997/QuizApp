import Vue from 'vue'
import GAuth from 'vue-google-oauth2'

const gauthOption = {
    clientId: '562088455345-rn52sijr94j2anfen8lbjfqf58qlorl7.apps.googleusercontent.com',
    scope: 'profile email',
    prompt: 'select_account'
}
Vue.use(GAuth, gauthOption)
