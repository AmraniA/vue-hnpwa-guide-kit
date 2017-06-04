<template>
  <div id="container">
    <a href="https://vuejs.org">
      <img src="../../static/img/logo-32x32.png" alt="Vue.js PWA" /> 
    </a>
    <router-link v-for="link in links" :key="link.herf" :to="link.href">
      {{ link.label }}
    </router-link>
  </div>
</template>

<script>
export default {
  data () {
    return {
      links: [
        {href: '/top', label: 'Top'},
        {href: '/new', label: 'New'},
        {href: '/best', label: 'Best'},
        {href: '/ask', label: 'Ask'},
        {href: '/show', label: 'Show'},
        {href: '/job', label: 'Job'}
      ]
    }
  }
}
</script>

<style scoped>
div {
  max-width: 800px;
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
