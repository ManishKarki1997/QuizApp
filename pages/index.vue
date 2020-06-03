<template>
  <div class="flex h-screen px-6 py-6 w-full">
    <OnlineUsers />
    <Questions />
    <GameReport v-if="opponentDetails" />
  </div>
</template>

<script>
import OnlineUsers from '~/components/OnlineUsers'
import Questions from '~/components/Questions/Questions'
import GameReport from '~/components/GameReport'

import { mapGetters } from 'vuex'

export default {
  components: {
    OnlineUsers,
    Questions,
    GameReport
  },
  computed: {
    ...mapGetters(['opponentDetails'])
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
