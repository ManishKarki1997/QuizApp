import axios from 'axios';

const action = {

    login({ state, commit }, payload) {
        return axios.post(`${process.env.BASE_URL}/api/user/login`, payload);
    },
    register({ state, commit }, payload) {
        return axios.post(`${process.env.BASE_URL}/api/user`, payload);
    }

}

export default action;