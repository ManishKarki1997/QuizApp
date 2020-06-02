function state() {
    return {
        user: {},
        jwtToken: '',
        isLoggedIn: false,
        apiUrl: process.env.baseUrl,
        preferredColorScheme: 'light',
        onlineUsers: null
    }
}

export default state;