import state from "./state"

export default {
    getOnlineUsers: (state) => state.onlineUsers,
    user: state => state.user,
    isLoggedIn: state => state.isLoggedIn,
    opponentDetails: state => state.opponentDetails,
}