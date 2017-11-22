<template>
  <div>
     <template v-for="item in items">
        <item :item="item" />
      </template>

   
    <div class="page-nav">
      <span v-show="hasMore">
        <router-link :to="`/category/${category}/page/${this.page + 1}`">More stories</router-link>
      </span>
    </div>
  </div>
</template>

<script>
import Item from '@/components/Item'

export default {
  props: {
    category: String
  },
  data () {
    return {
      items: ''
    }
    // items will be updated when navigation changed
  },

  created () {
    this.getPosts(this.category)
  },
  methods: {
    getPosts (category = false, page = 1) {
      var self = this
      this.$api.getPosts(category, page).then(function (data) {
        self.items = data
      }).catch(function (err) {
        return err
      })
    }
  },
  computed: {
    page () {
      return Number(this.$route.params.page) || 1
    },
    hasMore () {
      // return this.page < this.maxPage
      return true
    },
    maxPage () {
      return this.totalItems / this.items.length
    }
  },
  watch: {
    page (to, from) {
      // items will be updated when page changed
      this.getPosts(this.category, to)
    },
    category (to, from) {
      if (to !== from) {
        this.getPosts(to)
      }
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
