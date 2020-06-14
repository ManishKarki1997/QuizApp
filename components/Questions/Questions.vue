<template>
  <div class="lg:w-8/12 px-6 py-2">
    <div
      v-if="!gameStarting && gameQuestion"
      class="w-full flex flex-col justify-start items-start"
    >
      <div class="w-full flex justify-between items-center">
        <h2 class="rounded bg-gray-700 px-2 text-white">{{gameQuestion.categoryId.name}}</h2>
        <p>{{answerCountdown}}</p>
      </div>
      <div class="mt-6 w-full">
        <div class="text-center">
          <h3 class="text-2xl font-bold">{{gameQuestion.title}}</h3>
          <div class="mt-12 grid grid-cols-12 row-gap-10 col-gap-8">
            <p
              @click="selectOption(option)"
              :class="[selectedOption===option ? selectedOptionCSS : 'text-teal-700']"
              class="text-lg col-span-6 bg-gray-200 px-2 py-3 rounded cursor-pointer hover:bg-gray-400 transition-all duration-75"
              v-for="option in gameQuestion.options"
              :key="option"
            >{{option}}</p>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="!gameStarting && countdown>0">
      <p>Game starting in {{countdown}} seconds.</p>
    </div>
    <div v-else>
      <p>Click on a user to start the game.</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      activeQuestionIndex: 0,
      selectedOption: '',
      selectedOptionCSS: ['text-white, bg-gray-500'],
      gameStarting: false,
      countdown: 0,
      answerCountdown: 17,
      gameQuestion: null
    }
  },
  computed: {
    // 'gameQuestion',
    ...mapGetters(['user', 'roomName', 'playerStatistics'])
  },
  methods: {
    selectOption(option) {
      this.selectedOption = option
      this.$socket.emit('GAME_MANAGER', {
        answerer: this.user,
        roomName: this.roomName,
        questionIndex: this.activeQuestionIndex,
        answer: option
      })
      this.activeQuestionIndex++
    }
  },
  sockets: {
    GAME_QUESTIONS(question) {
      this.gameQuestion = question
    },
    GAME_IN_SECONDS(seconds) {
      this.gameStarting = true
      this.countdown = seconds
      this.answerCountdown--
    },
    ANSWER_RESULT(data) {
      const player = Object.values(data).filter(
        val => val.email === this.user.email
      )
      const opponent = Object.values(data).filter(
        val => val.email !== this.user.email && val.socketId
      )
      this.$store.commit('setPlayerStatistics', player[0])
      this.$store.commit('setOpponentStatistics', opponent[0])

      console.log(player[0])

      const toArrayValues = Object.values(data)
      const miscDetails = toArrayValues[toArrayValues.length - 1] // bad way of doing it
      this.$store.commit('setMiscGameDetails', miscDetails)
    }
  },
  watch: {
    answerCountdown: function(val) {
      if (val > 0) {
        setTimeout(() => {
          this.answerCountdown--
        }, 1000)
      }
    },
    countdown: {
      handler(value) {
        if (value > 0) {
          setTimeout(() => {
            this.countdown--
          }, 1000)
          this.gameStarting = false
        }
      }
    }
    // answerCountdown: {
    //   handler(value) {
    //     console.log(value)
    //     if (value > 0) {
    //       setTimeout(() => {
    //         this.answerCountdown--
    //       }, 1000)
    //     }
    //   }
    // }
  }
}
</script>