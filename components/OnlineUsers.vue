<template>
  <div class="lg:w-1/4 md:w-full">
    <div v-if="onlineUsers">
      <h2 class="text-xl font-bold mb-2">Online Users</h2>
      <ul v-for="user in Object.values(onlineUsers)" :key="user.socketId" class="flex flex-col">
        <li
          class="flex items-center px-2 py-2 mb-4 rounded cursor-pointer transition-all duration-100 bg-gray-300 hover:bg-gray-400"
        >
          <img :src="user.avatar" class="h-6 w-6 rounded-lg" />
          <p class="ml-2">{{user.username}}</p>
        </li>
      </ul>
    </div>
    <div v-else>
      <p>No Online Users</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tempUsernames: ['StarScream', 'Vox', 'Skye', 'Catherine', 'Celeste'],
      onlineUsers: null
    }
  },
  methods: {
    submitUsername() {
      const randomUsername = this.tempUsernames[
        Math.floor(Math.random() * this.tempUsernames.length)
      ]
      this.$socket.emit('SUBMIT_USERNAME', {
        username: randomUsername,
        avatar: `https://avatars.dicebear.com/api/male/${randomUsername}.svg?mood[]=happy`
      })

      // this.$socket.$subscribe('EMIT_ONLINE_USERS', data => {
      //   console.log(Object.values(data))
      //   this.onlineUsers = data
      // })
    }
  },
  sockets: {
    EMIT_ONLINE_USERS(users) {
      this.onlineUsers = users
    }
  },
  mounted() {
    this.submitUsername()
  }
}
</script>