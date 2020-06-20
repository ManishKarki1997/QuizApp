import axios from 'axios';

const action = {

    login({ state, commit }, payload) {
        return axios.post(`${process.env.baseUrl}/api/user`, payload);
    },
    register({ state, commit }, payload) {
        return axios.post(`${process.env.baseUrl}/api/user`, payload);
    },
    fetchCategories({state,commit}, payload){
        return axios.get(`${process.env.baseUrl}/api/category`, {
            headers:{
                Authorization: `Bearer ${state.token}`
            }
        });
    }

}

export default action;