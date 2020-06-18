<template>
  <div class="lg:w-2/12 md:w-full">
    <button
      :disabled="isLoggedIn"
      :class="[isLoggedIn ? 'bg-gray-700 dark:bg-gray-900 dark:text-gray-300 cursor-not-allowed opacity-50 dark:opacity-100' : 'bg-blue-500']"
      class="mb-4 mr-2 rounded-sm px-4 text-white cursor-pointer"
      @click="loginWithGoogle"
    >Login</button>
    <button
      @click="toggleTheme"
      class="dark:bg-gray-900 dark:text-gray-300 px-4 rounded-sm dark:border-white border"
    >Toggle Theme</button>
    <div v-if="onlineUsers">
      <h2 class="text-xl font-bold mb-2">Online Users</h2>
      <ul
        v-for="user in Object.values(onlineUsers)"
        :key="user.socketId"
        class="flex flex-col w-full"
      >
        <!--   @click="startGame(user)" -->
        <li
          @click="challengeUser(user)"
          class="flex items-center px-2 py-2 mb-4 rounded cursor-pointer transition-all duration-100 bg-gray-300 hover:bg-gray-400 dark:bg-gray-900 dark-hover:bg-gray-800 dark:text-gray-300"
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
import Noty from 'noty'
// import 'vuejs-noty/dist/vuejs-noty.css'

import 'noty/lib/noty.css'

// import 'noty/lib/themes/mint.css'
// import 'noty/lib/themes/relax.css'
// import 'noty/lib/themes/sunset.css'
// import 'noty/lib/themes/light.css'





export default {
  data() {
    return {
      tempUsernames: ['StarScream', 'Vox', 'Skye', 'Catherine', 'Celeste'],
      onlineUsers: null,
      myOpponent: null
    }
  },
  computed: {
    ...mapGetters(['isLoggedIn', 'user', 'userSocketId', 'isLoggedIn', 'isInAGame'])
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
        new Noty({
          // theme: this.$colorMode.value === 'light' ? 'relax' : 'sunset',
          type: 'error',
          text: response.data.message,
          timeout: 1500
        }).show()
        // this.$toast.open({
        //   type: 'error',
        //   message: response.data.message,
        //   position: 'top-right',
        //   duration: 1500
        // })
        return false
      } else {
        this.$store.commit('setUser', {
          token: response.data.payload.token,
          user: response.data.payload.user
        })
        new Noty({
          // theme: this.$colorMode.value === 'light' ? 'relax' : 'sunset',

          type: 'success',
          text: response.data.message,
          timeout: 1500
        }).show()

        // this.$toast.open({
        //   type: 'success',
        //   message: response.data.message,
        //   position: 'top-right',
        //   duration: 1500
        // })
        this.submitUsername(response.data.payload.user)
      }
    },
    submitUsername(user) {
      this.$socket.emit('SUBMIT_USER_DETAILS', user)
    },
    challengeUser(opponentDetails) {
      if(!this.isLoggedIn){
        new Noty({
          // theme: this.$colorMode.value === 'light' ? 'relax' : 'sunset',
          type: 'error',
          text: "You need to login first. ",
          timeout: 1500
        }).show()
        return;
      }else if(this.isInAGame){
         new Noty({
          // theme: this.$colorMode.value === 'light' ? 'relax' : 'sunset',
          type: 'error',
          text: "Please finish the current game to start a new one.",
          timeout: 1500
        }).show()
        return;
      }

      if (opponentDetails.email !== this.user.email) {
        this.$socket.emit('CHALLENGE_USER', {
          challengedBy: this.user,
          challengedTo: opponentDetails
        })
      }else {
        new Noty({
          // theme: this.$colorMode.value === 'light' ? 'relax' : 'sunset',
          type: 'error',
          text: "Uhh... You can't challenge yourself. ",
          timeout: 1500
        }).show()
      }
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
        new Noty({
          // theme: this.$colorMode.value === 'light' ? 'relax' : 'sunset',

          type: 'warning',
          text: "You can't challenge yourself. Not yet.",
          timeout: 1500
        }).show()

        // this.$toast.open({
        //   type: 'warning',
        //   message: "Uhh... you can't challenge yourself. Yet.",
        //   position: 'top-right',
        //   duration: 2500
        // })
        return false
      }
    },
    toggleTheme() {
      this.$colorMode.preference =
        this.$colorMode.value === 'light' ? 'dark' : 'light'
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
    SOMEONE_CHALLENGED_YOU(data) {
      // someone has challenged you
      // a notification promp modal to accept or reject the challenge.
      const that = this
      const n = new Noty({
        // theme: this.$colorMode.value === 'light' ? 'relax' : 'sunset',
        text: `
          <div class="px-4 py-2 rounded-sm">
            <div class="flex items-center">
              <img src="${data.challengedBy.avatar}" class="h-8 w-8 rounded-full mr-2">
              <p><span class="font-bold">${data.challengedBy.name}</span> has challenged you to a game.</p>
            </div>
          </div>
        `,
        closeWith: 'button',
        // text: `<p class="text-lg"><strong>${data.challengedBy.name}</strong> challenged you to a game.</p>`,
        buttons: [
          Noty.button(
            'Accept',
            'ml-4 mr-4',
            function() {
              that.$socket.emit('CHALLENGE_RESPONSE', {
                type: 'ACCEPTATION',
                challengedBy: data.challengedBy,
                challengedTo: data.challengedTo
              })
              n.close()
            },
            { id: 'button1', 'data-status': 'ok' }
          ),

          Noty.button('Reject', 'btn btn-error', function() {
            that.$socket.emit('CHALLENGE_RESPONSE', {
              type: 'REJECTION',
              challengedBy: data.challengedBy,
              challengedTo: data.challengedTo
            })
            n.close()
          })
        ]
      })
      n.show()
    },
    CHALLENGE_RESPONSE(data) {
      const { type, challengedBy, challengedTo } = data
      if (type === 'REJECTION') {
        // notify that the challenge has been rejected.
        new Noty({
          // theme: this.$colorMode.value === 'light' ? 'relax' : 'sunset',
          type: 'info',
          text: `<strong>${challengedTo.name}</strong> has rejected your challenge.`,
          timeout: 3500
        }).show()
      } else if (type === 'ACCEPTATION') {
        // notify that the challenge has been accepted.
        new Noty({
          // theme: this.$colorMode.value === 'light' ? 'relax' : 'sunset',
          type: 'success',
          text: `<strong>${challengedTo.name}</strong> has accepted your challenge.`,
          timeout: 1500
        }).show()

        // wait a couple seconds and emit the event to start the game
        setTimeout(() => {
          this.startGame(data.challengedTo)
        }, 2000)
      }
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
