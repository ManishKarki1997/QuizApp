<template>
  <div class="w-full py-4 h-full">
    <div class="flex flex-col h-full justify-between">
      <!-- Player details -->
      <div>
        <img :src="user.avatar" alt="user avatar image" class="h-16 w-16 rounded-full mb-4 mx-auto" />
        <h3 class="text-xl font-semibold">{{user.name}}</h3>
        <p>
          <span class="font-bold text-lg">{{user.totalWins}}</span> wins
        </p>
        <p>
          <span class="font-bold text-lg">{{user.totalMatches}}</span> matches
        </p>
      </div>

      <!-- Game Statistics  -->
      <div class="w-full py-2 px-2 my-4">
        <p class="mb-1" v-if="playerStatistics">Your Points : {{playerStatistics.points}}</p>

        <div class="flex items-center flex-wrap lg:w-5/12 mx-auto" v-if="playerStatistics">
          <div
            class="w-4 h-4 rounded-sm mr-2 mb-2"
            :class="[pattern==='W' ? 'bg-green-700' : 'bg-red-700']"
            v-for="pattern in playerStatistics.answerPattern"
            :key="pattern + Math.random()*1000"
          ></div>
        </div>

        <p class="my-6 bg-gray-300 rounded-md py-2" v-if="miscGameDetails">
          <span
            class="text-2xl font-bold"
          >{{miscGameDetails.totalQuestions - miscGameDetails.questionIndex.index - 1 }}</span> question(s) remaining
        </p>
        <div class="flex items-center flex-wrap lg:w-5/12 mx-auto" v-if="opponentStatistics">
          <div
            class="w-4 h-4 rounded-sm mr-2 mb-2"
            :class="[pattern==='W' ? 'bg-green-700' : 'bg-red-700']"
            v-for="pattern in opponentStatistics.answerPattern"
            :key="pattern + Math.random()*1000"
          ></div>
        </div>

        <p class="mt-1" v-if="opponentStatistics">Opponent's Points : {{opponentStatistics.points}}</p>
      </div>

      <!-- Opponent Details -->
      <div v-if="opponentDetails">
        <img
          :src="opponentDetails.avatar"
          alt="opponent avatar image"
          class="h-16 w-16 rounded-full mb-4 mx-auto"
        />
        <h3 class="text-xl font-semibold">{{opponentDetails.name}}</h3>
        <p>
          <span class="font-bold text-lg">{{opponentDetails.totalWins}}</span> wins
        </p>
        <p>
          <span class="font-bold text-lg">{{opponentDetails.totalMatches}}</span> matches
        </p>

        <div class="w-full my-2">
          <button class="px-4 py-1 rounded-sm bg-green-500 cursor-pointer text-white">Add Friend</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'opponentDetails',
      'user',
      'playerStatistics',
      'opponentStatistics',
      'miscGameDetails'
    ])
  }
}
</script>