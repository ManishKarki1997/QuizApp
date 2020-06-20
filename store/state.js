function state() {
  return {
    user: {},
    token: '',
    isLoggedIn: false,
    apiUrl: process.env.baseUrl,
    preferredColorScheme: 'light',
    onlineUsers: null,
    isInAGame: false,
    gameQuestion: null,
    opponentDetails: null,
    roomName: '',
    userSocketId: '',
    lastGameOptions: {},
    playerStatistics: null,
    opponentStatistics: null,
    miscGameDetails: null
  }
}

export default state
