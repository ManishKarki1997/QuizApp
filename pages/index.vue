<template>
  <div class="flex h-screen px-6 py-6 w-full overflow-hidden">
    <OnlineUsers class="flex-grow-0" />
    <Questions class="flex-1" />
    <!-- <Emojis class="w-2/6" /> -->
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
import Emojis from '~/components/Emojis'

import Noty from 'noty'
import 'noty/lib/noty.css'

import { mapGetters } from 'vuex'

export default {
  components: {
    OnlineUsers,
    Questions,
    GameReport,
    GameOverModal,
    Emojis
  },
  data() {
    return {
      gameEnded: false
    }
  },
  computed: {
    ...mapGetters([
      'opponentDetails',
      'miscGameDetails',
      'roomName',
      'user',
      'lastGameOptions'
    ])
  },

  methods: {
    rematch() {
      this.$socket.emit('CHALLENGE_USER', {
        challengedBy: {
          socketId: this.userSocketId,
          ...this.user
        },
        challengedTo: {
          socketId: this.opponentDetails.socketId,
          ...this.opponentDetails
        },
        gameOptions: this.lastGameOptions
      })
      new Noty({
        type: 'info',
        text: 'Challenging your opponent...',
        timeout: 1500
      }).show()
      this.$store.commit('setGameQuestions', null)
      this.$store.commit('setIsInAGame', true)
    },
    leaveGame() {
      // reset all game information
      this.$store.commit('setMiscGameDetails', {
        ...this.miscGameDetails,
        gameOver: false
      })
      this.$socket.emit('PLAYER_LEFT_THE_GAME', this.roomName)
      this.$store.commit('setIsInAGame', false)
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
