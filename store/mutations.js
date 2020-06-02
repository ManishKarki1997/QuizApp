const mutation = {
    setUser(state, { user, jwtToken }) {
        state.user = user;
        state.jwtToken = state.jwtToken || jwtToken;
        state.isLoggedIn = true;
    },


}

export default mutation;