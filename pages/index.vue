<template>
  <div class="container flex">
    <OnlineUsers />
    <Questions />
  </div>
</template>

<script>
import OnlineUsers from '~/components/OnlineUsers'
import Questions from '~/components/Questions/Questions'

export default {
  components: {
    OnlineUsers,
    Questions
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
