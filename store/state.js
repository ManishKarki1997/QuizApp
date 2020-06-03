function state() {
    return {
        user: {},
        token: '',
        isLoggedIn: false,
        apiUrl: process.env.baseUrl,
        preferredColorScheme: 'light',
        onlineUsers: null,
        gameQuestions: null
    }
}

export default state;