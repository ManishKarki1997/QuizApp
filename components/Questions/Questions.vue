<template>
  <div class="lg:w-6/12 px-6 py-2">
    <div v-if="!gameStarting && questions" class="w-full flex flex-col justify-start items-start">
      <h2 class="rounded bg-gray-700 px-2 text-white">{{questions.topic}}</h2>
      <div class="mt-6 w-full">
        <div class="text-center">
          <h3 class="text-2xl font-bold">{{questions.data[activeQuestionIndex].question.question}}</h3>
          <div class="mt-12 grid grid-cols-12 row-gap-10 col-gap-8">
            <p
              @click="selectOption(option)"
              :class="[selectedOption===option?selectedOptionCSS:'text-teal-700']"
              class="text-lg col-span-6 bg-gray-200 px-2 py-3 rounded cursor-pointer hover:bg-gray-400 transition-all duration-75"
              v-for="option in questions.data[activeQuestionIndex].question.options"
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
export default {
  data() {
    return {
      activeQuestionIndex: 0,
      selectedOption: '',
      selectedOptionCSS: ['text-white, bg-gray-500'],
      questions: null,
      gameStarting: false,
      countdown: 0
    }
  },
  methods: {
    selectOption(option) {
      this.selectedOption = option
    }
  },
  sockets: {
    GAME_QUESTIONS(questions) {
      this.questions = questions
    },
    GAME_IN_SECONDS(seconds) {
      this.gameStarting = true
      this.countdown = seconds
    }
  },
  watch: {
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