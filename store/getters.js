// import state from "./state"

export default {
    getOnlineUsers: (state) => state.onlineUsers,
    user: state => state.user,
    isLoggedIn: state => state.isLoggedIn,
    opponentDetails: state => state.opponentDetails,
    gameQuestion: state => state.gameQuestion,
    roomName: state => state.roomName,
    userSocketId: state => state.userSocketId,
    isInAGame: state => state.isInAGame,
    playerStatistics: state => state.playerStatistics,
    opponentStatistics: state => state.opponentStatistics,
    miscGameDetails: state => state.miscGameDetails,
}