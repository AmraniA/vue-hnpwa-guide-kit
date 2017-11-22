<template>
  <div class="item">
    <span class="score">
      {{item.id}}
    </span>
    <span class="title">
      <a :href="item.link" target="_black" rel="noopener">{{ item.title.rendered }}</a>
    </span>

      <img :src='item._embedded["wp:featuredmedia"][0].source_url' width="50" height="50">

    <br>

    <span class="meta">
      <span>
         by <router-link :to="`/users/${item.author}`">{{ item.author }}</router-link>
       </span>
     </span>
  </div>
</template>

<script>
export default {
  props: ['item']
}
</script>

<style scoped>
.item {
    background-color: #fff;
    padding: 20px 30px 20px 80px;
    border-bottom: 1px solid #eee;
    position: relative;
    line-height: 20px;
}

.score {
  font-size: 1.1em;
  font-weight: 700;
  position: absolute;
  top: 50%;
  left: 0;
  width: 80px;
  text-align: center;
  margin-top: -10px;
}
.img {
  width: 100px;
  height: 100px;
  float: right;
}
.title a {
  color: #0e0e0e;
  text-decoration: none;
}

.title a:hover {
  color: #34495e;
  text-decoration: underline;
}

.meta {
  font-size: .85em;
  color: #828282;
}

.meta a {
  color: #828282;
  text-decoration: none;
}
</style>
