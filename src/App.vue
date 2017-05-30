<template>
  <div id="app">
    <header>
      <toolbar />
    </header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import Toolbar from './components/Toolbar'

export default {
  name: 'app',
  components: {
    Toolbar
  }
}
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

header {
  margin: 0;
  height: 56px;
  background-color: #4fc08d;
  color: #ffffff;
}

header span {
  display: block;
  position: relative;
  font-size: 20px;
  line-height: 1;
  letter-spacing: .02em;
  font-weight: 400;
  box-sizing: border-box;
  padding-top: 16px;
}

header span img {
  width: 32px;
}
</style>
