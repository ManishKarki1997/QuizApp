const mutation = {
    setUser(state, { user, token }) {
        state.user = user;
        state.token = state.token || token;
        state.isLoggedIn = true;
    },
    setUserSocketId(state, socketId) {
        state.user.socketId = socketId;
        state.userSocketId = socketId;
    },
    setGameQuestions(state, questions) {
        state.gameQuestions = questions;
    },
    setOpponentDetails(state, opponentDetails) {
        state.opponentDetails = opponentDetails
    },
    setRoomName(state, roomName) {
        state.roomName = roomName;
    },
    setPlayerStatistics(state, stats) {
        state.playerStatistics = stats;
    },
    setOpponentStatistics(state, stats) {
        state.opponentStatistics = stats;
    },
    setMiscGameDetails(state, miscGameDetails) {
        state.miscGameDetails = miscGameDetails;
    },
    resetGame(state, payload) {
        state.miscGameDetails = null;
        state.playerStatistics = null;
        state.opponentDetails = null;
        state.gameQuestions = null;
        state.roomName = null;
    }


}

export default mutation;