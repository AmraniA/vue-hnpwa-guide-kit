<template>
  <div>
    <template v-for="item in items">
      <item :item="item" />
    </template>
    <div class="page-nav">
      <span v-show="hasMore">
        <router-link :to="`/${type}/${this.page + 1}`">More stories</router-link>
      </span>
    </div>
  </div>
</template>

<script>
import hackernews from 'firebase-hackernews'
import Item from '@/components/Item'

export default {
  beforeMount () {
    this.fetchItems()
  },
  props: {
    type: String
  },
  data () {
    return {
      items: [],
      itemPerPage: 30,
      maxPage: 0
    }
  },
  computed: {
    page () {
      return Number(this.$route.params.page) || 1
    },
    hasMore () {
      return this.page < this.maxPage
    }
  },
  watch: {
    page (to, from) {
      this.fetchItems()
    }
  },
  methods: {
    async fetchItems () {
      this.items = await hackernews().stories(this.type, {
        page: this.page,
        count: this.itemPerPage
      })

      this.maxPage = Number.parseInt(this.items.totalLength / this.itemPerPage)
    }
  },
  components: {
    Item
  }
}
</script>

<style scoped>
div {
  padding: 0 16px;
}

.page-nav a {
  margin: 16px 0;
  text-decoration: none;
  color: #0e0e0e;
  font-size: 16px;
  font-weight: 600;
  line-height: 32px;
  display: inline-block;
  letter-spacing: .075em;
}

.page-nav a:hover {
  color: #34495e;
  text-decoration: underline;
}
</style>
