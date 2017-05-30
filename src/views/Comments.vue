<template>
  <div>
    <comment v-for="id in item.kids" :key="id" :id="id" />
  </div>
</template>

<script>
import hackernews from 'firebase-hackernews'
import Comment from '@/components/Comment'

export default {
  beforeMount () {
    this.fetchItems()
  },
  data () {
    return {
      item: {}
    }
  },
  methods: {
    async fetchItems () {
      const story = await hackernews().items(this.$route.params.id)
      if (story.length > 0) {
        this.item = story[0]
        await hackernews().kids(this.item.id)
      }
    }
  },
  components: {
    Comment
  }
}
</script>

<style scoped>
div {
  padding: 0 16px;
}
</style>
