const mutation = {
    setUser(state, { user, token }) {
        state.user = user;
        state.token = state.token || token;
        state.isLoggedIn = true;
    },
    setGameQuestions(state, questions) {
        state.gameQuestions = questions;
    },


}

export default mutation;