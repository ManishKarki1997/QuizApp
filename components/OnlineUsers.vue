<template>
  <div class="lg:w-2/12 md:w-full">
    <button
      :disabled="isLoggedIn"
      :class="[isLoggedIn ? 'bg-gray-700 cursor-not-allowed opacity-50' : 'bg-blue-500']"
      class="mb-4 rounded-sm px-4 text-white cursor-pointer"
      @click="loginWithGoogle"
    >Login</button>
    <div v-if="onlineUsers">
      <h2 class="text-xl font-bold mb-2">Online Users</h2>
      <ul
        v-for="user in Object.values(onlineUsers)"
        :key="user.socketId"
        class="flex flex-col w-full"
      >
        <li
          @click="startGame(user)"
          class="flex items-center px-2 py-2 mb-4 rounded cursor-pointer transition-all duration-100 bg-gray-300 hover:bg-gray-400"
        >
          <img :src="user.avatar" class="h-6 w-6 rounded-lg" />
          <p class="ml-2">{{user.name}}</p>
        </li>
      </ul>
    </div>
    <div v-else>
      <p>No Online Users</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      tempUsernames: ['StarScream', 'Vox', 'Skye', 'Catherine', 'Celeste'],
      onlineUsers: null,
      myOpponent: null
    }
  },
  computed: {
    ...mapGetters(['isLoggedIn', 'user', 'userSocketId'])
  },
  methods: {
    async loginWithGoogle() {
      if (this.isLoggedIn) {
        this.submitUsername(this.user)
        return false
      }
      const googleRes = await this.$gAuth.signIn()

      const user = {
        name: googleRes.Tt.Bd,
        email: googleRes.Tt.Du,
        avatar: googleRes.Tt.SK
      }

      const response = await this.$store.dispatch('login', user)
      if (response.data.error) {
        this.$toast.open({
          type: 'error',
          message: response.data.message,
          position: 'top-right',
          duration: 1500
        })
        return false
      } else {
        this.$store.commit('setUser', {
          token: response.data.payload.token,
          user: response.data.payload.user
        })
        this.$toast.open({
          type: 'success',
          message: response.data.message,
          position: 'top-right',
          duration: 1500
        })
        this.submitUsername(response.data.payload.user)
      }
    },
    submitUsername(user) {
      this.$socket.emit('SUBMIT_USER_DETAILS', user)
    },
    startGame(opponentDetails) {
      if (opponentDetails.email !== this.user.email) {
        this.$socket.emit('START_GAME', {
          challenger: {
            socketId: this.userSocketId,
            ...this.user
          },
          opponent: {
            socketId: opponentDetails.socketId,
            ...opponentDetails
          }
        })
      } else {
        this.$toast.open({
          type: 'warning',
          message: "Uhh... you can't challenge yourself. Yet.",
          position: 'top-right',
          duration: 2500
        })
        return false
      }
    }
  },
  sockets: {
    MY_SOCKET_ID(socketId) {
      // this.mySocketId = socketId
      this.$store.commit('setUserSocketId', socketId)
    },
    EMIT_ONLINE_USERS(onlineUsers) {
      this.onlineUsers = onlineUsers
    },
    GAME_QUESTIONS(questions) {
      this.questions = questions
      this.$store.commit('setGameQuestions', questions)
    },
    OPPONENT_DETAILS(opponent) {
      const roomName = opponent[2]
      this.$store.commit('setRoomName', roomName)
      const myOpponentDetails = opponent.filter(
        opp => opp.email !== this.user.email
      )
      this.myOpponent = myOpponentDetails[0]
      this.$store.commit('setOpponentDetails', this.myOpponent)
    }
  },
  mounted() {
    if (this.isLoggedIn) {
      this.submitUsername(this.user)
    }
  }
}
</script>