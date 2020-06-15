<template>
  <div class="flex h-screen px-6 py-6 w-full overflow-hidden">
    <OnlineUsers class="flex-grow-0" />
    <Questions class="flex-1" />
    <GameReport class="flex-grow-0" v-if="opponentDetails" />
    <GameOverModal
      @leaveGame="leaveGame"
      @rematch="rematch"
      v-if="miscGameDetails && miscGameDetails.gameOver"
    />
  </div>
</template>

<script>
import OnlineUsers from '~/components/OnlineUsers'
import Questions from '~/components/Questions/Questions'
import GameReport from '~/components/GameReport'
import GameOverModal from '~/components/GameOverModal'

import { mapGetters } from 'vuex'

export default {
  components: {
    OnlineUsers,
    Questions,
    GameReport,
    GameOverModal
  },
  data() {
    return {
      gameEnded: false
    }
  },
  computed: {
    ...mapGetters(['opponentDetails', 'miscGameDetails', 'roomName', 'user'])
  },

  methods: {
    rematch() {
      this.$socket.emit('START_GAME', {
        challenger: {
          socketId: this.userSocketId,
          ...this.user
        },
        opponent: {
          socketId: this.opponentDetails.socketId,
          ...this.opponentDetails
        }
      })
    },
    leaveGame() {
      // reset all game information
      this.$store.commit('setMiscGameDetails', {
        ...this.miscGameDetails,
        gameOver: false
      })
      this.$socket.emit('PLAYER_LEFT_THE_GAME', this.roomName)
    }
  }
}
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
  @apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
</style>
