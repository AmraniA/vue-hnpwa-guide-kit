<template>
  <div class="comment">
    <span class="text" v-html="comment.text" />
    <span class="meta">
      <router-link :to="`/users/${comment.by}`"> {{ comment.by }}</router-link>
    </span>
    <ul>
      <comment v-for="id in comment.kids" :key="id" :id="id" />
    </ul>
  </div>
</template>

<script>
import hackernews from 'firebase-hackernews'

export default {
  name: 'comment',
  async beforeMount () {
    this.comment = (await hackernews().items(this.id))[0]
  },
  props: ['id'],
  data () {
    return {
      comment: {}
    }
  }
}
</script>

<style>
div.comment {
  background-color: #fff;
  padding: 20px 16px 16px 20px;
  position: relative;
  line-height: 20px;
}

div.comment .text {
  overflow-wrap: break-word;
}

div.comment .text a {
  color: #0e0e0e;
  text-decoration: none;
}

div.comment .text a:hover {
  color: #34495e;
  text-decoration: none;
}

div.comment .meta {
  font-size: .85em;
  color: #828282;
  display: block;
  margin-top: 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid #eee;
}

div.comment .meta a {
  color: #828282;
  text-decoration: none;
}

div.comment ul {
  padding: 0;
}
</style>
