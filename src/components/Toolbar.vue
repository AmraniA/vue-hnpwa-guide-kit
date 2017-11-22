<template>
  <div id="container">
    <a href="#">
      <img src="../assets/logo-32x32.png" alt="Vue.js PWA" /> 
    </a>
    <router-link v-for="link in links" :key="link.id" :to="link.href">
      {{ link.name }}
    </router-link>
  </div>
</template>

<script>
export default {
  data () {
    return {
      links: []
    }
  },
  created () {
    var self = this
    this.$api.getCategories().then(function (data) {
      self.links = data.map(function (el) {
        return { id: el.id, name: el.name, href: '/category/' + el.id, count: el.count }
      })
    }).catch(function (err) {
      return err
    })
  }
}

</script>

<style scoped>
div {
  padding: 0.76em 1em;
  box-sizing: border-box;
}

a {
  color: white;
  margin-right: 1.1em;
  text-decoration: none;
  font-size: 16px;
  font-weight: 800;
  line-height: 32px;
  display: inline-block;
  letter-spacing: .075em;
}

img {
  width: 32px;
  height: 32px;
  vertical-align: middle;
}
</style>
