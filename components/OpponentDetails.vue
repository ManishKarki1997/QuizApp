<template>
  <div class="w-full my-4 py-2">
    <h2 class="mb-4 font-semibold">Your Opponent</h2>
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
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['opponentDetails'])
  }
}
</script>