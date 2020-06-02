<template>
  <div class="container flex">
    <OnlineUsers />
  </div>
</template>

<script>
import OnlineUsers from '~/components/OnlineUsers'

export default {
  components: {
    OnlineUsers
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
