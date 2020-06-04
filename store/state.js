function state() {
    return {
        user: {},
        token: '',
        isLoggedIn: false,
        apiUrl: process.env.baseUrl,
        preferredColorScheme: 'light',
        onlineUsers: null,
        gameQuestions: null,
        opponentDetails: null,
        roomName: "",
        userSocketId: '',
        playerStatistics: null,
        opponentStatistics: null,
        miscGameDetails: null
    }
}

export default state;