<template>
  <div
    id="game-over-modal"
    class="px-8 py-6 rounded-md bg-gray-200 dark:bg-gray-800 dark:text-gray-300 shadow-xl"
    v-if="miscGameDetails"
  >
    <h2
      v-if="miscGameDetails.gameDraw"
      class="text-center text-teal-600 font-bold text-4xl mb-2"
    >Draw</h2>

    <h2
      v-else-if="!miscGameDetails.gameDraw &&  miscGameDetails.gameWonBy.email && miscGameDetails.gameWonBy.email === user.email"
      class="text-center text-teal-600 font-bold text-4xl mb-2"
    >You Won</h2>

    <h2 v-else class="text-center text-teal-600 font-bold text-4xl mb-2">You Lost</h2>

    <div class="flex items-center justify-between w-full my-4">
      <div class="flex items-center">
        <img :src="playerStatistics.avatar" class="h-8 w-8 rounded-full mr-2" />
        <h3>{{playerStatistics.name}}</h3>
      </div>
      <div class="flex items-center mx-8">
        <h3
          class="font-bold text-4xl"
          :class="{'text-red-600':miscGameDetails.gameWonBy && miscGameDetails.gameWonBy.email !== user.email,
          'text-teal-600':miscGameDetails.gameWonBy && miscGameDetails.gameWonBy.email === user.email}"
        >{{playerStatistics.points}}</h3>
        <h3 class="text-2xl mx-1">-</h3>
        <h3 class="font-bold text-4xl">{{opponentStatistics.points}}</h3>
      </div>
      <div class="flex items-center">
        <img :src="opponentStatistics.avatar" class="h-8 w-8 rounded-full mr-2" />
        <h3>{{opponentStatistics.name}}</h3>
      </div>
    </div>
    <div class="w-1/2 mx-auto flex items-center justify-between">
      <button
        @click="rematch"
        class="bg-teal-600 hover:bg-teal-700 text-white rounded-sm px-2 py-1"
      >Play Again</button>
      <button
        @click="leaveGame"
        class="bg-red-600 hover:bg-red-700 text-white rounded-sm px-2 py-1"
      >Leave</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'miscGameDetails',
      'user',
      'playerStatistics',
      'opponentStatistics'
    ])
  },
  methods: {
    leaveGame() {
      this.$emit('leaveGame')
    },
    rematch() {
      this.$emit('rematch')
    }
  }
}
</script>

<style scoped>
#game-over-modal {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>