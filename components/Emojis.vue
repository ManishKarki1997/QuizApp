<template>
  <div
    class="bg-white rounded-md px-4 py-2 flex items-center  justify-between h-32"
  >
    <img
      class="w-16 h-16 rounded-full cursor-pointer"
      v-for="emoji in emojiNames"
      :key="emoji"
      :src="'gifs/' + emoji + '.gif'"
      alt="emoji"
      @click="sendEmoji(emoji)"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      emojiNames: [
        'angry',
        'applaud',
        'crying',
        "i'm fine",
        'traumatized',
        'dancing'
      ]
    }
  },
  methods: {
    sendEmoji(emoji) {
      this.$emit('emojiSelected', emoji)
    }
  }
}
</script>
