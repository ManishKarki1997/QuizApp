<template>
  <div class="lg:w-3/4 px-6 py-2 flex flex-col justify-start items-start">
    <h2 class="rounded bg-gray-700 px-2 text-white">{{questions.topic}}</h2>
    <div class="mt-4 w-full">
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
</template>

<script>
export default {
  data() {
    return {
      activeQuestionIndex: 0,
      selectedOption: '',
      selectedOptionCSS: ['text-white, bg-gray-500'],
      questions: {
        topic: 'Science',
        data: [
          {
            question: {
              question: 'Which is the closest star to the Earth?',
              options: ['Sun', 'Proxima Centauri', 'Betelgeuse', 'North Star'],
              answer: 'Sun'
            }
          },
          {
            question: {
              question: 'Which of the following is used in pencils?',
              options: ['Graphite', 'Silicon', 'Charcoal', 'Phosphorous'],
              answer: 'Graphite'
            }
          },
          {
            question: {
              question: 'The gas usually filled in the electric bulb is : ',
              options: ['Hydrogen', 'Carbon Dioxide', 'Oxygen', 'Nitrogen'],
              answer: 'Nitrogen'
            }
          },
          {
            question: {
              question: 'Washing soda is the common name for : ',
              options: [
                'Calcium BiCarbonate',
                'Sodium Carbonate',
                'Calcium Carbonate',
                'Sodium BiCarbonate'
              ],
              answer: 'Sodium BiCarbonate'
            }
          },
          {
            question: {
              question: 'Which of the gas is not a Green House gas?',
              options: [
                'Methane',
                'Nitrous Oxide',
                'Carbon Dioxide',
                'Hydrogen'
              ],
              answer: 'Hydrogen'
            }
          },
          {
            question: {
              question:
                'The inert gas which is substituted for nitrogen in the air used by deep sea divers for breathing is: ',
              options: ['Argon', 'Xenon', 'Helium', 'Krypton'],
              answer: 'Helium'
            }
          },
          {
            question: {
              question: 'The average salinity of sea water is : ',
              options: ['3%', '3.5%', '2.5%', '2%'],
              answer: '3.5%'
            }
          }
        ]
      }
    }
  },
  methods: {
    selectOption(option) {
      this.selectedOption = option
    }
  }
}
</script>