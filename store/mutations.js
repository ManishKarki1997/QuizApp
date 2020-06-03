const mutation = {
    setUser(state, { user, token }) {
        state.user = user;
        state.token = state.token || token;
        state.isLoggedIn = true;
    },
    setGameQuestions(state, questions) {
        state.gameQuestions = questions;
    },
    setOpponentDetails(state, opponentDetails) {
        state.opponentDetails = opponentDetails
    }


}

export default mutation;