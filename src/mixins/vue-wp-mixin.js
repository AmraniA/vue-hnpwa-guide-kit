// hackernews APIs mixin

function install (Vue) {
  Vue.mixin({
    beforeCreate () {
      const { parent, api } = this.$options
      if (api) {
        this.$api = api
      } else if (parent && parent.$api) {
        this.$api = parent.$api
      }
    }
  })
}

export default {
  install
}
