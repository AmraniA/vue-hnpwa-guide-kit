<template>
	<div class="images">
		<span class="img" v-for="media in medias">
			<img :src="media.guid.rendered" width="50" height="50">
		</span>
	</div>
</template>


<script>
export default {
  data () {
    return {
      medias: ''
    }
  },
  created () {
    var self = this
    this.$api.getMedia().then(function (res) {
      self.medias = res
    }).catch((err) => {
      return err
    })
  }
}
</script>


<style scoped>
.images {
  background-color: #fff;
  padding: 20px 30px 20px 80px;
  border-bottom: 1px solid #eee;
  position: relative;
  line-height: 20px;
}

.img{
  width: 100px;
  height: 100px;
}
</style>
