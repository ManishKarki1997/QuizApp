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
              @click="selectOption(option, index)"
              :class="[(selectOptionIndex === index && selectedOption === correctAnswer) ? selectedOptionCSS : 'bg-gray-300']"
              class="text-lg col-span-6 bg-gray-200 px-2 py-3 rounded cursor-pointer transition-all duration-75"
              v-for="(option,index) in gameQuestion.options"
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
      selectOptionIndex: '',
      selectedOptionCSS: ['text-white, bg-green-600', 'hover:bg-green-700'],
      gameStarting: false,
      countdown: 0,
      answerCountdown: 0,
      gameQuestion: null,
      alreadyClicked: false,
      correctAnswer: '',
      answerCountdownTimeout: null
    }
  },
  computed: {
    // 'gameQuestion',
    ...mapGetters(['user', 'roomName', 'playerStatistics', 'miscGameDetails'])
  },
  methods: {
    selectOption(option, index) {
      // make it so that user can't choose multiple options, multiple times for same question
      if (!this.alreadyClicked) {
        this.selectedOption = option
        this.selectOptionIndex = index
        this.$socket.emit('GAME_MANAGER', {
          answerer: this.user,
          roomName: this.roomName,
          questionIndex: this.activeQuestionIndex,
          answer: option
        })
        this.activeQuestionIndex++
      }
      this.alreadyClicked = true
    }
  },
  sockets: {
    GAME_QUESTIONS(question) {
      this.correctAnswer = question.answer

      // if the received question is not already present,
      // new question has arrived.
      // trigger the countdown
      // if (this.question !== question) {
      //   this.answerCountdown = 17
      //   this.answerCountdown--
      // }
      this.gameQuestion = question
      this.alreadyClicked = false
      clearTimeout(this.answerCountdownTimeout)
      this.answerCountdown = 17
    },
    GAME_IN_SECONDS(data) {
      this.gameStarting = true
      this.countdown = data.gameCountdown
      this.countdown--
      this.$store.commit('setMiscGameDetails', data.miscDetails)
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

      this.$store.commit('setMiscGameDetails', data.miscDetails)
    },
    GAME_OVER(gameRoomDetails) {
      console.log(gameRoomDetails)
      this.$store.commit('setMiscGameDetails', gameRoomDetails.miscDetails)
    }
  },
  watch: {
    answerCountdown: function(val) {
      if (val > 0) {
        this.answerCountdownTimeout = setTimeout(() => {
          this.answerCountdown--
        }, 1000)
      } else {
        this.answerCountdown = 0
        // if the user has not already clicked an option
        // warn the user and send 'null' as the answer
        if (!this.alreadyClicked) {
          this.$toast.open({
            type: 'warning',
            message: "Time's up!",
            position: 'top-right',
            duration: 1500
          })
          this.$socket.emit('GAME_MANAGER', {
            answerer: this.user,
            roomName: this.roomName,
            questionIndex: this.activeQuestionIndex,
            answer: null
          })
          this.activeQuestionIndex++
          this.alreadyClicked = true
        }
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
  }
}
</script>