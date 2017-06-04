// hackernews APIs mixin

function install (Vue) {
  Vue.mixin({
    beforeCreate () {
      const { parent, hn } = this.$options
      if (hn) {
        this.$hn = hn
      } else if (parent && parent.$hn) {
        this.$hn = parent.$hn
      }
    }
  })
}

export default {
  install
}
