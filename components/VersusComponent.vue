<template>
  <div class="w-full py-4 h-full">
    <div class="flex flex-col h-full justify-between">
      <!-- Player details -->
      <div>
        <img
          :src="user.avatar"
          alt="user avatar image"
          class="h-16 w-16 rounded-full mb-4 mx-auto"
        />

        <div class="relative">
          <h3 class="text-xl font-semibold user-name">{{ user.name }}</h3>
          <span
            class="text-gray-700 text-sm cursor-pointer dark:text-gray-100"
            @click="showEmojis = !showEmojis"
            >Taunt</span
          >
          <Emojis
            v-if="showEmojis"
            @emojiSelected="sendEmoji"
            class="emojis-wrapper"
          />
          <img
            v-if="
              opponentReaction && emojiSentByMe && emojisActiveCountdown > 0
            "
            :src="'gifs/' + opponentReaction + '.gif'"
            alt="user send emoji"
            class="w-24 h-24 rounded-full absolute top-0"
          />
        </div>
        <p>
          <span class="font-bold text-lg">{{ user.totalWins }}</span> wins
        </p>
        <p>
          <span class="font-bold text-lg">{{ user.totalMatches }}</span> matches
        </p>
      </div>

      <!-- Game Statistics  -->
      <div class="w-full py-2 px-2 my-4">
        <p class="mb-1" v-if="playerStatistics">
          Your Points : {{ playerStatistics.points }}
        </p>

        <div
          class="flex items-center flex-wrap lg:w-5/12 mx-auto"
          v-if="playerStatistics"
        >
          <div
            class="w-4 h-4 rounded-sm mr-2 mb-2"
            :class="[pattern === 'W' ? 'bg-green-700' : 'bg-red-700']"
            v-for="pattern in playerStatistics.answerPattern"
            :key="pattern + Math.random() * 1000"
          ></div>
        </div>

        <p
          class="my-6 bg-gray-300 rounded-md py-2 dark:bg-gray-900 dark:text-gray-300"
          v-if="miscGameDetails"
        >
          <span class="text-2xl font-bold">{{
            miscGameDetails.totalQuestions -
              miscGameDetails.questionIndex.index -
              1
          }}</span>
          question(s) remaining
        </p>
        <div
          class="flex items-center flex-wrap lg:w-5/12 mx-auto"
          v-if="opponentStatistics"
        >
          <div
            class="w-4 h-4 rounded-sm mr-2 mb-2"
            :class="[pattern === 'W' ? 'bg-green-700' : 'bg-red-700']"
            v-for="pattern in opponentStatistics.answerPattern"
            :key="pattern + Math.random() * 1000"
          ></div>
        </div>

        <p class="mt-1" v-if="opponentStatistics">
          Opponent's Points : {{ opponentStatistics.points }}
        </p>
      </div>

      <!-- Opponent Details -->
      <div v-if="opponentDetails" class="dark:text-gray-300">
        <img
          :src="opponentDetails.avatar"
          alt="opponent avatar image"
          class="h-16 w-16 rounded-full mb-4 mx-auto"
        />
        <div class="relative">
          <h3 class="text-xl font-semibold">{{ opponentDetails.name }}</h3>
          <img
            v-if="
              opponentReaction && !emojiSentByMe && emojisActiveCountdown > 0
            "
            :src="'gifs/' + opponentReaction + '.gif'"
            alt="user send emoji"
            class="w-24 h-24 rounded-full absolute top-0"
          />
        </div>
        <p>
          <span class="font-bold text-lg">{{ opponentDetails.totalWins }}</span>
          wins
        </p>
        <p>
          <span class="font-bold text-lg">{{
            opponentDetails.totalMatches
          }}</span>
          matches
        </p>

        <div class="w-full my-2">
          <button
            class="px-4 py-1 rounded-sm bg-green-500 cursor-pointer text-white dark:bg-black dark-hover:bg-gray-800 dark:text-gray-300 dark:border-white border"
          >
            Add Friend
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Emojis from '~/components/Emojis'

export default {
  components: {
    Emojis
  },
  data() {
    return {
      opponentReaction: '',
      emojiSentByMe: true,
      showEmojis: false,
      emojisActiveCountdown: 6,
      emojisActiveCountdownTimeout: null
    }
  },
  computed: {
    ...mapGetters([
      'opponentDetails',
      'user',
      'playerStatistics',
      'opponentStatistics',
      'miscGameDetails',
      'roomName'
    ])
  },
  sockets: {
    EMOJI_RECEIVED(emojiData) {
      this.opponentReaction = emojiData.emoji
      this.emojiSentByMe = emojiData.sentBy === this.user.email
      clearTimeout(this.emojisActiveCountdownTimeout)
      this.emojisActiveCountdown = 6
      this.emojisActiveCountdown--
    }
  },
  methods: {
    sendEmoji(emoji) {
      this.$socket.emit('SEND_EMOJI', {
        roomName: this.roomName,
        emoji,
        sentBy: this.user.email
      })
      this.showEmojis = false
    }
  },
  watch: {
    emojisActiveCountdown: function(val) {
      if (val > 0) {
        this.emojisActiveCountdownTimeout = setTimeout(() => {
          this.emojisActiveCountdown--
        }, 1000)
      }
    }
  }
}
</script>

<style scoped>
.emojis-wrapper {
  position: absolute;
  left: -19rem;
  top: -6rem;
}
</style>
