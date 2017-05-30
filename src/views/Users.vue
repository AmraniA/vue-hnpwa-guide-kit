<template>
  <div>
    <h1>{{ this.userid }}</h1>
    <ul>
      <li>Created: {{ this.created }}</li>
      <li>Karama: {{ this.user.karma }}</li>
      <li></li>
    </ul>
  </div>
</template>

<script>
import hackernews from 'firebase-hackernews'

export default {
  async beforeMount () {
    this.user = await hackernews().user(this.userid)
  },
  data () {
    return {
      user: {}
    }
  },
  computed: {
    userid () {
      return this.$route.params.id || ''
    },
    created () {
      return !this.user.created
        ? ''
        : new Date(this.user.created * 1000).toISOString().slice(0, 10)
    }
  }
}
</script>

<style scoped>
div {
  background-color: #fff;
  box-sizing: border-box;
  padding: 2em 3em;
}

li {
  list-style-type: none
}
</style>
